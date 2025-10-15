"use client";

import { motion } from "motion/react";

import Footer from "@/components/footer";

export default function About() {
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
						<span className="font-standard font-semibold tracking-tighter text-6xl md:text-7xl xl:text-8xl select-none pr-1">ABOUT US</span>
					</motion.div>
				</div>
			</div>
			<div className="w-screen h-screen flex flex-col justify-center font-standard text-center tracking-tight gap-24">
				<div className="mb-10 flex flex-col gap-4">
					<h1 className="text-2xl font-semibold">VISION</h1>
					<div className="uppercase flex flex-col text-center gap-8 tracking-wider">
						<p className="uppercase font-semibold px-24">
							Altiora exists to bridge the gap of <span className="font-semibold italic">ambition.</span>
						</p>
						<div className="px-8 text-sm md:text-base">
							<p>
								As fellow students, and as in life; we believe the company <br className="hidden sm:block" />
								you keep determines whether you improve or decay.
							</p>
						</div>
						<p className="px-8 text-sm md:text-base">
							By definition, <span className="italic">if</span> you are in the top 5%,
							<br />
							95% of encounters will not be enough.
						</p>
						<p className="px-8 text-sm md:text-base">We are a concentration of that 5%.</p>
						<div className="px-8 text-sm md:text-base">
							<p>a circle of builders, traders, and leaders</p>
							<p>who compound through proof of work.</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
