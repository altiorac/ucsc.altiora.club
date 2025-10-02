"use client";
import { motion } from "motion/react";
import Footer from "@/components/footer";

export default function Contact() {
    return (
        <div>
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <div className="relative inline-block w-fit overflow-hidden font-semibold">
                    <motion.div
                        initial={{
                            y: 200,
                        }}
                        animate={{
                            y: 0,
                        }}
                        transition={{
                            duration: 1.25,
                            delay: 0.5,
                            ease: "easeOut",
                        }}
                    >
                        <span className="font-standard font-semibold tracking-tight text-6xl md:text-7xl xl:text-8xl select-none">HIT US.</span>
                    </motion.div>
                </div>
                <div className="relative inline-block w-fit overflow-hidden font-semibold">
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1.25,
                            delay: 1.5,
                            ease: "easeOut",
                        }}
                    >
                        <div className="mt-60 font-standard text-center uppercase">
                            <h2 className="text-lg tracking-widest font-thin scale-y-95">We’re just a message away.</h2>
                            <p className="text-lg tracking-widest font-thin scale-y-95 mt-4">HQ@altiora.club</p>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
