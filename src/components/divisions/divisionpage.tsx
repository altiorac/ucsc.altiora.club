"use client";

import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import CursorBadge from "@/components/ui/cursorbadge";
import type { ReactNode } from "react";

export default function DivisionPage({ title, description, content, next, image }: { title: string; description: ReactNode; content: ReactNode; next: string; image: StaticImageData }) {
    const nextProjectSlug = next.toLowerCase().replace(/\s+/g, '-');

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
                            ease: "easeOut" as const,
                        }}
                    >
                        <span className="font-standard font-semibold tracking-tighter text-6xl md:text-7xl xl:text-8xl select-none pr-1">{title}</span>
                    </motion.div>
                </div>
            </div>
            <div className="w-screen h-screen flex flex-col justify-center font-standard text-center tracking-tight gap-24">
                <div className="mb-10 flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">DESCRIPTION</h1>
                    <div className="uppercase">{description}</div>
                </div>
                <div className="mt-10 flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">CONTENT</h1>
                    <div className="uppercase">{content}</div>
                </div>
            </div>
            <div className="w-screen h-screen flex flex-col justify-center text-center items-center">
                <CursorBadge>
                    <Link href={`/divisions/${nextProjectSlug}`}>
                        <div className="cursor-pointer">
                            <h1 className="uppercase text-2xl font-semibold">NEXT PROJECT</h1>
                            <h1 className="uppercase text-8xl font-bold my-4">{next}</h1>
                            <div className="relative w-[700px] h-[500px] overflow-hidden bg-gray-200 mt-10">
                                <Image src={image} alt={title} fill className="object-cover object-right" />
                            </div>
                        </div>
                    </Link>
                </CursorBadge>
            </div>
        </div>
    );
}
