"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// NOTE: To use `font-standard` and `font-fancy`, you must define them
// in your `tailwind.config.js` file.

const faqItems = [
    {
        id: 0,
        question: "Is there a cost to join?",
        answer: "There is no fee. The price is contribution and proof of work. Those who do not build, do not stay.",
    },
    {
        id: 1,
        question: "How do i join?",
        answer: "Apply. If selected, you will be invited to an interview or private event.",
    },
    {
        id: 2,
        question: "What if I'm rejected?",
        answer: "Rejection is not the end. Prove your growth, reapply next quarter, and show us you belong.",
    },
];

const AccordionItem = ({ item, expanded, setExpanded }: { item: (typeof faqItems)[0]; expanded: number | null; setExpanded: (id: number | null) => void }) => {
    const isOpen = item.id === expanded;

    return (
        <div className="bg-[#121214] rounded-xl border border-black/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05),_inset_0_-1px_1px_0_rgba(0,0,0,0.3)]">
            <motion.header initial={false} onClick={() => setExpanded(isOpen ? null : item.id)} className="w-full p-4 text-left text-sm text-gray-300 cursor-pointer">
                <span className="font-standard">{item.question}</span>
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <p className="px-4 pb-4 text-sm text-gray-500 font-standard text-left">{item.answer}</p>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

const Faq = () => {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <section className="bg-black min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(ellipse_at_bottom,rgba(29,78,216,0.05)_0%,transparent_70%),radial-gradient(ellipse_at_bottom,_#0A0A10_0%,_#000_70%)]">
            <div className="w-full max-w-lg text-center">
                <h1 className="text-4xl md:text-3xl text-white mb-6 flex justify-center items-baseline gap-3">
                    <span className="font-standard font-normal">Frequently</span>
                    <span className="font-fancy italic font-normal text-gray-300">Asked</span>
                </h1>

                <p className="font-standard text-sm font-light tracking-[0.2em] text-gray-400 uppercase mb-8">About</p>

                <div className="space-y-3">
                    {faqItems.map((item) => (
                        <AccordionItem key={item.id} item={item} expanded={expanded} setExpanded={setExpanded} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
