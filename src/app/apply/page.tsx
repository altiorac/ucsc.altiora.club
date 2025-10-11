"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TextScroller from "@/components/ui/textscroll";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { DivisionSelector } from "@/components/ui/division-selector";

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const itemVariants: Variants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: "easeOut" as const,
		},
	},
};

type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	year: string;
	major: string;
	divisions: string[];
	instagram: string;
	linkedin: string;
	convince: string;
	project: string;
	portfolio: string;
	howHear: string;
	reasons: string;
	intent: string;
};

type FieldName = keyof FormData;
type ValidationRule = { required?: boolean; pattern?: RegExp; message: string };
type FormErrors = Partial<Record<FieldName, string | null>>;
type StringFieldName = Exclude<FieldName, "divisions">;
type StatusMessage = { type: "success" | "error" | "info"; text: string };

type PersistedFormState = {
	formData: FormData;
	lastSubmittedData: FormData | null;
	lastSubmissionTime: number | null;
};

const LOCAL_STORAGE_KEY = "altiora-application-form";
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

const TEXT_FIELD_NAMES: StringFieldName[] = ["firstName", "lastName", "email", "phone", "year", "major", "instagram", "linkedin", "convince", "project", "portfolio", "howHear", "reasons", "intent"];

const cloneFormData = (data: FormData): FormData => ({
	...data,
	divisions: [...data.divisions],
});

const areDivisionsEqual = (first: string[], second: string[]) => {
	if (first.length !== second.length) return false;
	const sortedFirst = [...first].sort();
	const sortedSecond = [...second].sort();
	return sortedFirst.every((value, index) => value === sortedSecond[index]);
};

const areFormDataEqual = (first: FormData, second: FormData) => {
	if (!areDivisionsEqual(first.divisions, second.divisions)) return false;
	return TEXT_FIELD_NAMES.every((field) => first[field] === second[field]);
};

const createEmptyFormData = (): FormData => ({
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	year: "",
	major: "",
	divisions: [],
	instagram: "",
	linkedin: "",
	convince: "",
	project: "",
	portfolio: "",
	howHear: "",
	reasons: "",
	intent: "",
});

const divisionOptions: { value: string; label: string }[] = [
	{ value: "engineering", label: "Engineering" },
	{ value: "developer", label: "Development" },
	{ value: "finance", label: "Finance" },
	{ value: "trader", label: "Trading" },
	{ value: "quant", label: "Quantitative Research" },
	{ value: "art", label: "Creative Arts" },
	{ value: "musician", label: "Music" },
	{ value: "cybersec", label: "Cybersecurity" },
	{ value: "business", label: "Business" },
	{ value: "fitness", label: "Fitness" },
];

const validationSchema: Record<FieldName, ValidationRule> = {
	firstName: { required: true, message: "First name is required." },
	lastName: { required: true, message: "Last name is required." },
	email: {
		required: true,
		pattern: /^\S+@\S+\.\S+$/,
		message: "Please enter a valid email address.",
	},
	phone: {
		required: true,
		pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
		message: "Please enter a valid phone number.",
	},
	year: { required: true, message: "Please select your year of study." },
	major: { required: true, message: "Major/Field of Study is required." },
	divisions: { required: true, message: "Select at least one division." },
	instagram: { required: false, message: "" },
	linkedin: {
		pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
		message: "Please enter a valid LinkedIn profile URL.",
	},
	convince: { required: true, message: "This field is required." },
	project: { required: false, message: "" },
	portfolio: { required: false, message: "" },
	howHear: { required: false, message: "" },
	reasons: { required: true, message: "This field is required." },
	intent: { required: true, message: "This field is required." },
};

const FormField = ({ id, label, children, error, required }: { id: string; label: string; children: React.ReactNode; error?: string | null; required?: boolean }) => (
	<motion.div className="relative flex flex-col w-full" variants={itemVariants}>
		<Label htmlFor={id} id={`${id}-label`} className="text-foreground/80 mb-2">
			{label} {required && <span className="text-red-500">*</span>}
		</Label>
		{children}
		{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
	</motion.div>
);

export default function ApplyPage() {
	const [formData, setFormData] = useState<FormData>(() => createEmptyFormData());
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [lastSubmittedData, setLastSubmittedData] = useState<FormData | null>(null);
	const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
	const [currentTime, setCurrentTime] = useState(Date.now());
	const initializationRef = useRef(false);

	const persistToLocalStorage = useCallback((payload: PersistedFormState) => {
		if (typeof window === "undefined") return false;
		try {
			window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
			return true;
		} catch (storageError) {
			console.error("Failed to persist application draft", storageError);
			return false;
		}
	}, []);

	useEffect(() => {
		if (typeof window === "undefined" || initializationRef.current) return;
		initializationRef.current = true;

		try {
			const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
			if (!stored) return;

			const parsed = JSON.parse(stored) as Partial<PersistedFormState> | null;
			if (!parsed) return;

			if (parsed.formData) {
				const sanitizedFormData: FormData = {
					...createEmptyFormData(),
					...parsed.formData,
					divisions: Array.isArray(parsed.formData.divisions) ? parsed.formData.divisions : [],
				};
				setFormData(sanitizedFormData);
			}

			if (parsed.lastSubmittedData) {
				const sanitizedLastSubmitted: FormData = {
					...createEmptyFormData(),
					...parsed.lastSubmittedData,
					divisions: Array.isArray(parsed.lastSubmittedData.divisions) ? parsed.lastSubmittedData.divisions : [],
				};
				setLastSubmittedData(sanitizedLastSubmitted);
				setHasSubmitted(true);
			}

			if (typeof parsed.lastSubmissionTime === "number") {
				setLastSubmissionTime(parsed.lastSubmissionTime);
			}
		} catch (storageError) {
			console.error("Failed to load saved application progress", storageError);
		}
	}, []);

	useEffect(() => {
		if (!lastSubmissionTime) return;
		setCurrentTime(Date.now());
		const interval = window.setInterval(() => setCurrentTime(Date.now()), 1000);
		return () => window.clearInterval(interval);
	}, [lastSubmissionTime]);

	const hasChangesSinceLastSubmit = useMemo(() => {
		if (!lastSubmittedData) return true;
		return !areFormDataEqual(formData, lastSubmittedData);
	}, [formData, lastSubmittedData]);

	const rateLimitRemainingSeconds = useMemo(() => {
		if (!lastSubmissionTime) return 0;
		const elapsed = currentTime - lastSubmissionTime;
		if (elapsed >= RATE_LIMIT_WINDOW_MS) return 0;
		return Math.ceil((RATE_LIMIT_WINDOW_MS - elapsed) / 1000);
	}, [currentTime, lastSubmissionTime]);

	const isRateLimited = rateLimitRemainingSeconds > 0;
	const resubmitDisabled = isSubmitting || !hasChangesSinceLastSubmit || isRateLimited;

	const handleSaveProgress = useCallback(() => {
		setIsSaving(true);
		const snapshot = cloneFormData(formData);

		const wasSaved = persistToLocalStorage({
			formData: snapshot,
			lastSubmittedData,
			lastSubmissionTime,
		});

		if (wasSaved) {
			setStatusMessage({
				type: "success",
				text: "Progress saved locally. You can return to it later on this device.",
			});
		} else {
			setStatusMessage({
				type: "error",
				text: "We could not save your progress locally. Please try again.",
			});
		}

		setIsSaving(false);
	}, [formData, lastSubmittedData, lastSubmissionTime, persistToLocalStorage]);

	const validateField = useCallback((name: FieldName, value: FormData[FieldName]) => {
		const rule = validationSchema[name];
		if (!rule) return;

		let error: string | null = null;
		const isEmpty = Array.isArray(value) ? value.length === 0 : value.trim().length === 0;
		if (rule.required && isEmpty) {
			error = rule.message;
		} else if (rule.pattern && typeof value === "string" && value && !rule.pattern.test(value)) {
			error = rule.message;
		}

		setErrors((prev) => ({ ...prev, [name]: error }));
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const field = name as StringFieldName;
		setFormData((prev) => ({ ...prev, [field]: value }));
		validateField(field, value);
	};

	const handleSelectChange = (name: StringFieldName, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
		validateField(name, value);
	};

	const handleDivisionToggle = (value: string) => {
		setFormData((prev) => {
			const alreadySelected = prev.divisions.includes(value);
			const updatedDivisions = alreadySelected ? prev.divisions.filter((division) => division !== value) : [...prev.divisions, value];
			validateField("divisions", updatedDivisions);
			return { ...prev, divisions: updatedDivisions };
		});
	};

	const validateForm = () => {
		let formIsValid = true;
		const newErrors: FormErrors = {};

		(Object.entries(validationSchema) as [FieldName, ValidationRule][]).forEach(([field, rule]) => {
			const value = formData[field];
			const isEmpty = Array.isArray(value) ? value.length === 0 : value.trim().length === 0;

			if (rule.required && isEmpty) {
				formIsValid = false;
				newErrors[field] = rule.message;
			} else if (rule.pattern && typeof value === "string" && value && !rule.pattern.test(value)) {
				formIsValid = false;
				newErrors[field] = rule.message;
			}
		});

		setErrors(newErrors);
		return formIsValid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatusMessage(null);

		if (!validateForm()) {
			setStatusMessage({ type: "error", text: "Please correct the highlighted fields before submitting." });
			return;
		}

		if (hasSubmitted && lastSubmittedData && areFormDataEqual(formData, lastSubmittedData)) {
			setStatusMessage({
				type: "info",
				text: "No changes detected. Update your application before resubmitting.",
			});
			return;
		}

		if (hasSubmitted && lastSubmissionTime) {
			const elapsed = Date.now() - lastSubmissionTime;
			if (elapsed < RATE_LIMIT_WINDOW_MS) {
				const secondsRemaining = Math.ceil((RATE_LIMIT_WINDOW_MS - elapsed) / 1000);
				setStatusMessage({
					type: "info",
					text: `Please wait ${secondsRemaining}s before updating again.`,
				});
				return;
			}
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/apply", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			type ApiResponse = { message?: string; retryAfter?: number };
			const payload: ApiResponse | null = await response.json().catch(() => null);

			if (response.ok) {
				const snapshot = cloneFormData(formData);
				const now = Date.now();

				setHasSubmitted(true);
				setLastSubmittedData(snapshot);
				setLastSubmissionTime(now);
				persistToLocalStorage({
					formData: snapshot,
					lastSubmittedData: snapshot,
					lastSubmissionTime: now,
				});

				setStatusMessage({
					type: "success",
					text: payload?.message ?? (response.status === 201 ? "Application submitted successfully!" : "Application updated successfully."),
				});
				return;
			}

			if (response.status === 409) {
				setStatusMessage({
					type: "info",
					text: payload?.message ?? "No changes detected. Update your application before resubmitting.",
				});
				return;
			}

			if (response.status === 429) {
				const retryAfterSeconds = typeof payload?.retryAfter === "number" ? payload.retryAfter : Math.ceil(RATE_LIMIT_WINDOW_MS / 1000);
				const recalculatedSubmissionTime = Date.now() - (RATE_LIMIT_WINDOW_MS - retryAfterSeconds * 1000);
				setLastSubmissionTime(recalculatedSubmissionTime);
				setStatusMessage({
					type: "info",
					text: payload?.message ?? `Please wait ${retryAfterSeconds}s before updating again.`,
				});
				return;
			}

			setStatusMessage({
				type: "error",
				text: payload?.message ?? "There was an error submitting your application. Please try again.",
			});
		} catch (error) {
			console.error("Application submission failed", error);
			setStatusMessage({ type: "error", text: "There was an unexpected error submitting your application. Please try again." });
		} finally {
			setIsSubmitting(false);
		}
	};

	const getInputClassName = (fieldName: StringFieldName) => cn({ "border-red-500": errors[fieldName] });

	const statusMessageClass = statusMessage ? (statusMessage.type === "success" ? "text-white/60" : statusMessage.type === "info" ? "text-foreground/60" : "text-red-500/75") : "";
	const showNoChangeHint = hasSubmitted && !hasChangesSinceLastSubmit;
	const showRateLimitHint = hasSubmitted && isRateLimited;

	return (
		<div className="w-full min-h-screen bg-background text-foreground pt-40">
			<main className="container mx-auto max-w-3xl px-6">
				<motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" as const, delay: 0.2 }}>
					<h1 className="font-fancy italic text-6xl md:text-8xl font-thin tracking-tighter mb-4">Join Altiora.</h1>
					<p className="font-standard text-lg md:text-xl text-foreground/80 max-w-2xl">We are looking for the ambitious, the creative, and the visionary. Tell us why you belong with us.</p>
				</motion.div>

				<motion.form onSubmit={handleSubmit} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12" variants={containerVariants} initial="hidden" animate="visible">
					<FormField id="firstName" label="First Name" required error={errors.firstName}>
						<Input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className={getInputClassName("firstName")} />
					</FormField>
					<FormField id="lastName" label="Last Name" required error={errors.lastName}>
						<Input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className={getInputClassName("lastName")} />
					</FormField>
					<FormField id="email" label="Email Address" required error={errors.email}>
						<Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={getInputClassName("email")} />
					</FormField>
					<FormField id="phone" label="Phone Number" required error={errors.phone}>
						<Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={getInputClassName("phone")} />
					</FormField>
					<FormField id="year" label="Current Year of Study" required error={errors.year}>
						<Select name="year" onValueChange={(value) => handleSelectChange("year", value)} key={formData.year || "empty"} value={formData.year || undefined}>
							<SelectTrigger id="year" className={cn("font-standard", getInputClassName("year"))}>
								<SelectValue placeholder="Select your year..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="freshman">First Year</SelectItem>
								<SelectItem value="sophomore">Second Year</SelectItem>
								<SelectItem value="junior">Third Year</SelectItem>
								<SelectItem value="senior">Fourth Year+</SelectItem>
								<SelectItem value="graduate">Graduate Student</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
					</FormField>
					<FormField id="major" label="Major / Field of Study" required error={errors.major}>
						<Input id="major" name="major" type="text" value={formData.major} onChange={handleChange} className={getInputClassName("major")} />
					</FormField>

					{/* ===== START: DIVISION SELECTOR INTEGRATION ===== */}
					<div className="md:col-span-2">
						<FormField id="divisions" label="Which divisions interest you?" required error={errors.divisions}>
							<DivisionSelector options={divisionOptions} selectedDivisions={formData.divisions} onToggleDivision={handleDivisionToggle} error={errors.divisions} />
						</FormField>
					</div>
					{/* ===== END: DIVISION SELECTOR INTEGRATION ===== */}

					<FormField id="linkedin" label="LinkedIn Profile URL" error={errors.linkedin}>
						<Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={handleChange} className={getInputClassName("linkedin")} />
					</FormField>
					<FormField id="instagram" label="Instagram Handle">
						<Input id="instagram" name="instagram" type="text" placeholder="@username" value={formData.instagram} onChange={handleChange} />
					</FormField>
					<div className="md:col-span-2">
						<FormField id="convince" label="Convince us you deserve a seat at Altiora." required error={errors.convince}>
							<Textarea id="convince" name="convince" value={formData.convince} onChange={handleChange} className={getInputClassName("convince")} />
						</FormField>
					</div>
					<div className="md:col-span-2">
						<FormField id="project" label="Tell us about a project you're working on.">
							<Textarea id="project" name="project" value={formData.project} onChange={handleChange} />
						</FormField>
					</div>
					<div className="md:col-span-2">
						<FormField id="portfolio" label="Portfolio / GitHub / Creative Record">
							<Input id="portfolio" name="portfolio" type="url" placeholder="https://..." value={formData.portfolio} onChange={handleChange} />
						</FormField>
					</div>
					<div className="md:col-span-2">
						<FormField id="howHear" label="How did you hear about us?">
							<Input id="howHear" name="howHear" type="text" value={formData.howHear} onChange={handleChange} />
						</FormField>
					</div>
					<div className="md:col-span-2">
						<FormField id="reasons" label="What are your primary reasons for wanting to join?" required error={errors.reasons}>
							<Textarea id="reasons" name="reasons" value={formData.reasons} onChange={handleChange} className={getInputClassName("reasons")} />
						</FormField>
					</div>
					<div className="md:col-span-2">
						<FormField id="intent" label="What do you hope to achieve with us?" required error={errors.intent}>
							<Textarea id="intent" name="intent" value={formData.intent} onChange={handleChange} className={getInputClassName("intent")} />
						</FormField>
					</div>

					<motion.div className="md:col-span-2 flex flex-col items-start pt-8 w-full" variants={itemVariants}>
						{hasSubmitted ? (
							<div className="w-full space-y-4">
								<div className="flex flex-col sm:flex-row gap-4 w-full">
									<button type="button" className="focus:outline-none group sm:w-auto disabled:opacity-60" onClick={handleSaveProgress} disabled={isSaving}>
										<TextScroller
											items={[
												<span className="font-standard text-2xl tracking-widest" key="save-standard">
													{isSaving ? "SAVING..." : "SAVE PROGRESS"}
												</span>,
												<span className="font-fancy italic text-3xl font-thin tracking-tighter" key="save-fancy">
													{isSaving ? "SAVING..." : "SAVE PROGRESS"}
												</span>,
											]}
											className="h-10"
											textAlign="left"
										/>
										<div className="w-full h-[1px] bg-foreground/30 group-hover:bg-foreground transition-colors duration-300" />
									</button>
									<button type="submit" className="focus:outline-none group sm:w-auto disabled:opacity-60" disabled={resubmitDisabled}>
										<TextScroller
											items={[
												<span className="font-standard text-2xl tracking-widest" key="update-standard">
													{isSubmitting ? "UPDATING..." : "UPDATE APPLICATION"}
												</span>,
												<span className="font-fancy italic text-3xl font-thin tracking-tighter" key="update-fancy">
													{isSubmitting ? "UPDATING..." : "UPDATE APPLICATION"}
												</span>,
											]}
											className="h-10"
											textAlign="left"
										/>
										<div className="w-full h-[1px] bg-foreground/30 group-hover:bg-foreground transition-colors duration-300" />
									</button>
								</div>
								{statusMessage && <p className={cn("font-standard text-sm md:text-base", statusMessageClass)}>{statusMessage.text}</p>}
								{showNoChangeHint && <p className="font-standard text-xs md:text-sm text-foreground/50">Make updates before resubmitting.</p>}
								{showRateLimitHint && <p className="font-standard text-xs md:text-sm text-foreground/50">You can resubmit in {rateLimitRemainingSeconds}s.</p>}
							</div>
						) : (
							<div className="flex flex-col items-start w-full">
								<button type="submit" className="focus:outline-none group" disabled={isSubmitting}>
									<TextScroller
										items={[
											<span className="font-standard text-2xl tracking-widest" key="submit-standard">
												{isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
											</span>,
											<span className="font-fancy italic text-3xl font-thin tracking-tighter" key="submit-fancy">
												{isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
											</span>,
										]}
										className="h-10"
										textAlign="left"
									/>
									<div className="w-full h-[1px] bg-foreground/30 group-hover:bg-foreground transition-colors duration-300" />
								</button>
								{statusMessage && <p className={cn("mt-4 font-standard text-sm md:text-base", statusMessageClass)}>{statusMessage.text}</p>}
							</div>
						)}
					</motion.div>
				</motion.form>
			</main>
			<Footer />
		</div>
	);
}
