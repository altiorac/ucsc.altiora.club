"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TextScroller from "@/components/ui/textscroll";
import Footer from "@/components/footer";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const FormField = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
    <motion.div className="relative flex flex-col w-full" variants={itemVariants}>
        <Label htmlFor={id} className="text-foreground/80 mb-2">
            {label}
        </Label>
        {children}
    </motion.div>
);

export default function ApplyPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        year: "",
        major: "",
        instagram: "",
        linkedin: "",
        convince: "",
        project: "",
        portfolio: "",
        howHear: "",
        reasons: "",
        intent: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <div className="w-full min-h-screen bg-background text-foreground pt-40">
            <main className="container mx-auto max-w-3xl px-6">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}>
                    <h1 className="font-fancy italic text-6xl md:text-8xl font-thin tracking-tighter mb-4">Join Altiora.</h1>
                    <p className="font-standard text-lg md:text-xl text-foreground/80 max-w-2xl">We are looking for the ambitious, the creative, and the visionary. Tell us why you belong with us.</p>
                </motion.div>

                <motion.form onSubmit={handleSubmit} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12" variants={containerVariants} initial="hidden" animate="visible">
                    <FormField id="firstName" label="First Name">
                        <Input id="firstName" name="firstName" type="text" required />
                    </FormField>
                    <FormField id="lastName" label="Last Name">
                        <Input id="lastName" name="lastName" type="text" required />
                    </FormField>
                    <FormField id="email" label="Email Address">
                        <Input id="email" name="email" type="email" required />
                    </FormField>
                    <FormField id="phone" label="Phone Number">
                        <Input id="phone" name="phone" type="tel" />
                    </FormField>

                    <FormField id="year" label="Current Year of Study">
                        <Select name="year">
                            <SelectTrigger id="year" className="font-standard">
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
                    <FormField id="major" label="Major / Field of Study">
                        <Input id="major" name="major" type="text" />
                    </FormField>
                    <FormField id="linkedin" label="LinkedIn Profile URL">
                        <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." />
                    </FormField>
                    <FormField id="instagram" label="Instagram Handle">
                        <Input id="instagram" name="instagram" type="text" placeholder="@username" />
                    </FormField>

                    <div className="md:col-span-2">
                        <FormField id="convince" label="Convince us you deserve a seat at Altiora.">
                            <Textarea id="convince" name="convince" required />
                        </FormField>
                    </div>
                    <div className="md:col-span-2">
                        <FormField id="project" label="Tell us about a project you're working on.">
                            <Textarea id="project" name="project" required />
                        </FormField>
                    </div>
                    <div className="md:col-span-2">
                        <FormField id="portfolio" label="Portfolio / GitHub / Creative Record">
                            <Input id="portfolio" name="portfolio" type="url" placeholder="https://..." required />
                        </FormField>
                    </div>
                    <div className="md:col-span-2">
                        <FormField id="howHear" label="How did you hear about us?">
                            <Input id="howHear" name="howHear" type="text" />
                        </FormField>
                    </div>
                    <div className="md:col-span-2">
                        <FormField id="reasons" label="What are your primary reasons for wanting to join?">
                            <Textarea id="reasons" name="reasons" />
                        </FormField>
                    </div>
                    <div className="md:col-span-2">
                        <FormField id="intent" label="What do you hope to achieve with us?">
                            <Textarea id="intent" name="intent" />
                        </FormField>
                    </div>

                    <motion.div className="md:col-span-2 flex justify-start pt-8" variants={itemVariants}>
                        <button type="submit" className="focus:outline-none group">
                            <TextScroller items={[<span className="font-standard text-2xl tracking-widest">SUBMIT APPLICATION</span>, <span className="font-fancy italic text-3xl font-thin tracking-tighter">SUBMIT APPLICATION</span>]} className="h-10" textAlign="left" />
                            <div className="w-full h-[1px] bg-foreground/30 group-hover:bg-foreground transition-colors duration-300" />
                        </button>
                    </motion.div>
                </motion.form>
            </main>
            <Footer />
        </div>
    );
}
