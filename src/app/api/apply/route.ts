import { NextResponse } from "next/server";
import { db } from "@/db";
import { applications, applicationEssays } from "@/db/schema";

export async function POST(request: Request) {
	try {
		const formData = await request.json();
		const newApplication = await db
			.insert(applications)
			.values({
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				phone: formData.phone,
				year: formData.year,
				major: formData.major,
				instagram: formData.instagram,
				linkedin: formData.linkedin,
				portfolio: formData.portfolio,
				howHear: formData.howHear,
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

		return NextResponse.json({ message: "Application submitted successfully" }, { status: 201 });
	} catch (error) {
		console.error("Error submitting application:", error);
		return NextResponse.json({ message: "Failed to submit application" }, { status: 500 });
	}
}
