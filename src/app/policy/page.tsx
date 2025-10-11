"use client";

import { motion } from "motion/react";
import Footer from "@/components/footer";

const PolicyArticle = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
    <div className="mb-10">
        <h3 className="font-standard text-lg font-medium tracking-wide text-foreground">
            {number}. {title}
        </h3>
        <div className="mt-3 font-standard text-foreground/80 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

export default function LegalPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.4 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" as const },
        },
    };

    return (
        <div className="w-full min-h-screen bg-background text-foreground pt-40">
            <main className="container mx-auto max-w-3xl px-6">
                {/* Page Header */}
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" as const, delay: 0.2 }}>
                    <h1 className="font-fancy italic text-6xl md:text-8xl font-thin tracking-tighter mb-4">Governing Principles.</h1>
                    <p className="font-standard text-lg md:text-xl text-foreground/80 max-w-2xl">
                        Our framework for community, privacy, and conduct. Participation in Altiora constitutes agreement with these terms.
                    </p>
                </motion.div>

                {/* Quick Navigation */}
                <motion.div
                    className="mt-16 mb-20 flex items-center gap-8 border-b border-foreground/10 pb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <a href="#terms" className="font-standard tracking-widest text-sm uppercase text-foreground/60 hover:text-foreground transition-colors">
                        Terms of Service
                    </a>
                    <a href="#privacy" className="font-standard tracking-widest text-sm uppercase text-foreground/60 hover:text-foreground transition-colors">
                        Privacy Policy
                    </a>
                </motion.div>

                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    {/* ===== TERMS OF SERVICE SECTION ===== */}
                    <motion.section id="terms" className="scroll-mt-24" variants={itemVariants}>
                        <h2 className="font-standard text-4xl font-light tracking-wider text-foreground mb-3">Terms of Service</h2>
                        <p className="font-standard text-sm text-foreground/50 mb-12">
                            Effective: 9/1/2025  |  Last Updated: 9/25/2025
                        </p>

                        <PolicyArticle number={1} title="Independence and Non-Affiliation">
                            <p>Altiora is an independent, privately organized community. We are not affiliated with the University of California, Santa Cruz (UCSC), or any other educational, financial, legal, governmental, or corporate entity. Any use of geographic references is descriptive only and does not imply institutional affiliation.</p>
                        </PolicyArticle>

                        <PolicyArticle number={2} title="Membership and Eligibility">
                            <p>Membership is by invitation or approved application only. Altiora reserves the right to deny or revoke membership at its sole discretion, at any time. Members must be at least 18 years of age. Membership does not confer any ownership, employment, or agency rights in Altiora.</p>
                        </PolicyArticle>

                        <PolicyArticle number={3} title="Nature of the Community">
                            <p>Altiora is a private peer community for personal growth, entrepreneurship, and intellectual collaboration. It is not a business, financial advisor, broker, or academic institution. All programs are educational and community-based, not professional services.</p>
                        </PolicyArticle>

                        <PolicyArticle number={4} title="Privacy and Confidentiality">
                            <p>All discussions, materials, and activities within Altiora are private and confidential. Members may not share internal information without explicit permission. We collect minimal personal data for membership purposes and will not sell or disclose it except as required by law.</p>
                        </PolicyArticle>

                        <PolicyArticle number={5} title="Financial and Trading Disclaimer">
                            <p>Altiora does not provide financial, investment, or legal advice. Trading discussions are strictly hypothetical and educational. We do not act as a broker, money manager, or investment vehicle. Members are solely responsible for their own financial decisions.</p>
                        </PolicyArticle>

                        <PolicyArticle number={6} title="No Guarantees of Outcomes">
                            <p>Altiora does not guarantee personal, financial, or professional success. Participation is an opportunity for growth, not a promise of results. All activities are undertaken at the member’s own risk.</p>
                        </PolicyArticle>

                        <PolicyArticle number={7} title="Member Conduct">
                            <p>Members must conduct themselves with respect, integrity, and accountability. Harassment, discrimination, or misconduct will result in immediate removal. Members are expected to contribute meaningfully (“proof of work” principle); non-contributing members may be removed.</p>
                        </PolicyArticle>

                        <PolicyArticle number={8} title="Intellectual Property">
                            <p>The Altiora name, logo, and program materials are our exclusive property. Members may not use the Altiora brand for external projects without prior written consent. Members retain ownership of their own work but grant Altiora permission to reference publicly shared contributions.</p>
                        </PolicyArticle>

                        <PolicyArticle number={9} title="Liability and Assumption of Risk">
                            <p>By participating, you acknowledge that participation is voluntary and at your own risk. To the fullest extent permitted by law, you release Altiora, its founders, and its members from any liability for losses, damages, or consequences arising from your participation.</p>
                        </PolicyArticle>

                        <PolicyArticle number={10} title="Independence Clause">
                            <p>Altiora is a private association. No statements or actions by members may be interpreted as representing any external institution. Any resemblance to other organizations is coincidental.</p>
                        </PolicyArticle>

                        <PolicyArticle number={11} title="Amendments">
                            <p>We may update these Terms at any time. Continued participation constitutes acceptance of the most recent version.</p>
                        </PolicyArticle>

                        <PolicyArticle number={12} title="Governing Law">
                            <p>These Terms are governed by the laws of the State of California, without regard to conflict of law principles.</p>
                        </PolicyArticle>

                        <PolicyArticle number={13} title="Contact">
                            <p>For questions regarding these Terms, contact us at: <a href="mailto:hq@altiora.club" className="underline hover:text-foreground transition-colors">hq@altiora.club</a></p>
                        </PolicyArticle>
                    </motion.section>

                    {/* ===== PRIVACY POLICY SECTION ===== */}
                    <motion.section id="privacy" className="scroll-mt-24 pt-24" variants={itemVariants}>
                        <h2 className="font-standard text-4xl font-light tracking-wider text-foreground mb-3">Privacy Policy</h2>
                        <p className="font-standard text-sm text-foreground/50 mb-12">
                            Effective: 9/1/2025  |  Last Updated: 9/29/2025
                        </p>

                        <PolicyArticle number={1} title="Information We Collect">
                            <p>We may collect Personal Information you provide (name, email, application responses), Usage Information (IP address, browser), and Voluntary Submissions (projects, proof of work). We do not knowingly collect data from individuals under 13.</p>
                        </PolicyArticle>

                        <PolicyArticle number={2} title="How We Use Your Information">
                            <p>We use your information to evaluate applications, manage community communications, improve our services, and enforce our Terms. We do not sell your personal information.</p>
                        </PolicyArticle>

                        <PolicyArticle number={3} title="How We Share Your Information">
                            <p>We do not share your personal information with third parties except with your consent, when required by law, or with service providers bound by confidentiality who assist in our operations.</p>
                        </PolicyArticle>

                        <PolicyArticle number={4} title="Data Security">
                            <p>We take reasonable measures to protect your data, but no online system is 100% secure. Participation and data submission are at your own risk.</p>
                        </PolicyArticle>

                        <PolicyArticle number={5} title="Your Rights">
                            <p>Depending on your jurisdiction, you may have the right to access, correct, or request the deletion of your personal information. To exercise these rights, contact us at the address below.</p>
                        </PolicyArticle>

                        <PolicyArticle number={6} title="Data Retention">
                            <p>We retain personal data only as long as necessary to fulfill our community purposes or as required by law. Members may request data deletion at any time.</p>
                        </PolicyArticle>

                        <PolicyArticle number={7} title="International Visitors">
                            <p>If you access Altiora from outside the United States, you acknowledge that your information may be transferred to and stored in the U.S.</p>
                        </PolicyArticle>

                        <PolicyArticle number={8} title="Third-Party Links">
                            <p>Our website may link to external sites. We are not responsible for their privacy practices.</p>
                        </PolicyArticle>

                        <PolicyArticle number={9} title="Updates to This Policy">
                            <p>We may update this Policy periodically. Continued participation after changes are posted indicates acceptance.</p>
                        </PolicyArticle>
                        
                        <PolicyArticle number={10} title="Contact Us">
                            <p>For privacy-related inquiries, contact us at: <a href="mailto:hq@altiora.club" className="underline hover:text-foreground transition-colors">hq@altiora.club</a></p>
                        </PolicyArticle>

                    </motion.section>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
