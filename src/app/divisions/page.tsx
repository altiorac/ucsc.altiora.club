"use client";

import DivisionList from "@/components/divisions/divisionslist";
import { motion } from "motion/react";
import Footer from "@/components/footer";

export default function Divisions() {
	return (
		<div>
			<main>
				<div className="w-screen h-screen flex flex-col justify-center items-center text-center gap-8">
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
							<span className="font-standard font-semibold tracking-tighter text-6xl md:text-7xl xl:text-8xl select-none pr-1">DIVISIONS</span>
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
								delay: 0.8,
								ease: "easeOut",
							}}
							className="font-standard font-thin tracking-wider uppercase text-xs md:text-sm xl:text-base px-20"
						>
							Each division is designed to sharpen ambition, create leverage, and provide experiences.
						</motion.div>
					</div>
				</div>
				<DivisionList />
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}
