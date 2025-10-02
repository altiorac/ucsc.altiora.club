"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import CursorBadge from "@/components/ui/cursorbadge";

import Collective from "@/assets/altioracollectivecropped.png";
import Growth from "@/assets/altioragrowth.png";
import Trading from "@/assets/altioratrading.png";
import Venture from "@/assets/altioraventure.jpg";

export default function ProgramList() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const programs = [
		{ title: "collective", tags: ["SOCIAL"], image: Collective },
		{ title: "venture", tags: ["BUSINESS"], image: Venture },
		{ title: "growth", tags: ["MIND", "BODY", "SOUL"], image: Growth },
		{ title: "trading", tags: ["FINANCE"], image: Trading },
	];

	return (
		<CursorBadge>
			<div className="w-screen min-h-screen flex flex-col justify-center items-center bg-black text-white px-12 cursor-pointer">
				<div className="w-full font-standard">
					{programs.map(({ title, tags, image }, index) => (
						<Link href={`/programs/${title}`} key={title}>
							<motion.div onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className="group relative flex justify-between items-center py-10 border-b border-neutral-800 overflow-hidden mt-16">
								<div>
									<h1 className="text-2xl font-semibold uppercase">{title}</h1>
									<div className="flex gap-4 mt-2">
										{tags.map((tag) => (
											<p key={tag} className="text-sm text-neutral-400 uppercase">
												{tag}
											</p>
										))}
									</div>
								</div>

								<AnimatePresence>
									{hoveredIndex === index && (
										<motion.div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" initial={{ y: 200 }} animate={{ y: 40 }} exit={{ y: 200 }} transition={{ type: "spring", stiffness: 250, damping: 70 }}>
											<Image src={image} alt={title} className="object-cover h-[200px] w-auto rounded-md" />
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</div>
			</div>
		</CursorBadge>
	);
}
