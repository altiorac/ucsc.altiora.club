import { NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { applications, applicationEssays } from "@/db/schema";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute between updates

const hasDivisionChanges = (incoming: string[], existing: string[]) => {
	const sort = (values: string[]) => [...values].sort();
	const a = sort(incoming);
	const b = sort(existing);
	if (a.length !== b.length) return true;
	return a.some((value, index) => value !== b[index]);
};

const mapToComparable = (value: unknown) => (value ?? "").toString();

export async function POST(request: Request) {
	try {
		const formData = await request.json();
		const divisions = Array.isArray(formData.divisions) ? formData.divisions.map((division: unknown) => String(division)) : [];

		const now = new Date();

		const existingApplication = await db.query.applications.findFirst({
			where: or(eq(applications.email, formData.email), eq(applications.phone, formData.phone)),
			with: { essays: true },
		});

		if (!existingApplication) {
			const newApplication = await db
				.insert(applications)
				.values({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					phone: formData.phone,
					year: formData.year,
					major: formData.major,
					divisions,
					instagram: formData.instagram,
					linkedin: formData.linkedin,
					portfolio: formData.portfolio,
					howHear: formData.howHear,
					createdAt: now,
					updatedAt: now,
				})
				.returning({ id: applications.id });

			const applicationId = newApplication[0].id;

			await db.insert(applicationEssays).values({
				applicationId,
				convince: formData.convince,
				project: formData.project,
				reasons: formData.reasons,
				intent: formData.intent,
			});

			return NextResponse.json({ message: "Application submitted successfully", fresh: true }, { status: 201 });
		}

		const lastUpdatedAt = existingApplication.updatedAt ?? existingApplication.createdAt;
		if (lastUpdatedAt) {
			const delta = now.getTime() - new Date(lastUpdatedAt).getTime();
			if (delta < RATE_LIMIT_WINDOW_MS) {
				const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - delta) / 1000);
				return NextResponse.json(
					{ message: "Please wait before resubmitting your application.", retryAfter },
					{ status: 429, headers: { "Retry-After": retryAfter.toString() } },
				);
			}
		}

		const essays = existingApplication.essays;
		const currentSnapshot = {
			firstName: mapToComparable(existingApplication.firstName),
			lastName: mapToComparable(existingApplication.lastName),
			email: mapToComparable(existingApplication.email),
			phone: mapToComparable(existingApplication.phone),
			year: mapToComparable(existingApplication.year),
			major: mapToComparable(existingApplication.major),
			divisions: existingApplication.divisions ?? [],
			instagram: mapToComparable(existingApplication.instagram),
			linkedin: mapToComparable(existingApplication.linkedin),
			portfolio: mapToComparable(existingApplication.portfolio),
			howHear: mapToComparable(existingApplication.howHear),
			convince: mapToComparable(essays?.convince),
			project: mapToComparable(essays?.project),
			reasons: mapToComparable(essays?.reasons),
			intent: mapToComparable(essays?.intent),
		};

		const incomingSnapshot = {
			firstName: mapToComparable(formData.firstName),
			lastName: mapToComparable(formData.lastName),
			email: mapToComparable(formData.email),
			phone: mapToComparable(formData.phone),
			year: mapToComparable(formData.year),
			major: mapToComparable(formData.major),
			divisions,
			instagram: mapToComparable(formData.instagram),
			linkedin: mapToComparable(formData.linkedin),
			portfolio: mapToComparable(formData.portfolio),
			howHear: mapToComparable(formData.howHear),
			convince: mapToComparable(formData.convince),
			project: mapToComparable(formData.project),
			reasons: mapToComparable(formData.reasons),
			intent: mapToComparable(formData.intent),
		};

		type Snapshot = typeof incomingSnapshot;
		type TextSnapshotKey = Exclude<keyof Snapshot, "divisions">;

		const textFieldKeys: TextSnapshotKey[] = [
			"firstName",
			"lastName",
			"email",
			"phone",
			"year",
			"major",
			"instagram",
			"linkedin",
			"portfolio",
			"howHear",
			"convince",
			"project",
			"reasons",
			"intent",
		];

		const textFieldsChanged = textFieldKeys.some((key) => currentSnapshot[key] !== incomingSnapshot[key]);
		const divisionsChanged = hasDivisionChanges(incomingSnapshot.divisions, currentSnapshot.divisions);

		if (!textFieldsChanged && !divisionsChanged) {
			return NextResponse.json({ message: "No changes detected. Update cancelled." }, { status: 409 });
		}

		await db.transaction(async (tx) => {
			await tx
				.update(applications)
				.set({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					phone: formData.phone,
					year: formData.year,
					major: formData.major,
					divisions,
					instagram: formData.instagram,
					linkedin: formData.linkedin,
					portfolio: formData.portfolio,
					howHear: formData.howHear,
					updatedAt: now,
				})
				.where(eq(applications.id, existingApplication.id));

			if (essays) {
				await tx
					.update(applicationEssays)
					.set({
						convince: formData.convince,
						project: formData.project,
						reasons: formData.reasons,
						intent: formData.intent,
					})
					.where(eq(applicationEssays.applicationId, existingApplication.id));
			} else {
				await tx.insert(applicationEssays).values({
					applicationId: existingApplication.id,
					convince: formData.convince,
					project: formData.project,
					reasons: formData.reasons,
					intent: formData.intent,
				});
			}
		});

		return NextResponse.json({ message: "Application updated successfully", updated: true }, { status: 200 });
	} catch (error) {
		console.error("Error submitting application:", error);
		return NextResponse.json({ message: "Failed to submit application" }, { status: 500 });
	}
}
