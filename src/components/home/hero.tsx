"use client";

import { motion } from "motion/react";

export default function hero() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center text-center items-center -mt-4 md:mt-0">
            <div className="flex md:flex-row flex-col gap-2">
                <div className="relative inline-block w-fit overflow-hidden font-semibold scale-95 md:scale-110 xl:scale-105 md:mr-2 md:pr-4">
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
                        <span className="font-standard font-semibold tracking-tighter text-6xl md:text-7xl xl:text-8xl select-none md:scale-x-95">ALTIORA</span>
                    </motion.div>
                </div>
                <div className="relative inline-block overflow-hidden scale-95 md:scale-110 xl:scale-105">
                    <motion.div
                        initial={{
                            y: 200,
                        }}
                        animate={{
                            y: 0,
                        }}
                        transition={{
                            duration: 1.25,
                            delay: 0.8,
                            ease: "easeOut",
                        }}
                        className="font-fancy font-normal tracking-tighter italic text-6xl md:text-7xl xl:text-8xl select-none md:px-2"
                    >
                        UCSC
                    </motion.div>
                </div>
                <div className="relative inline-block overflow-hidden">
                    <motion.div
                        initial={{
                            y: 200,
                        }}
                        animate={{
                            y: 0,
                        }}
                        transition={{
                            duration: 1.25,
                            delay: 1.1,
                            ease: "easeOut",
                        }}
                        className="font-standard font-thin md:ml-8 md:mt-2 xl:mt-4 scale-y-85 select-none"
                    >
                        {"LATIN: \"HIGHER\""}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
