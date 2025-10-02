import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import SmoothScroll from "@/components/smooth-scroll";
import NoFocusGate from "@/components/nofocusgate";

import Navbar from "@/components/navbar";

export const metadata: Metadata = {
	title: "Altiora UCSC",
	description: "The exclusive society for UCSC’s future founders, leaders, and visionaries.",
};

const standard = localFont({
	src: [
		{
			path: "../assets/Instrument_Sans/InstrumentSans-VariableFont_wdth,wght.ttf",
			style: "normal",
			weight: "100 900",
		},
		{
			path: "../assets/Instrument_Sans/InstrumentSans-Italic-VariableFont_wdth,wght.ttf",
			style: "italic",
			weight: "100 900",
		},
	],
	variable: "--font-instrumentsans",
	display: "swap",
});

const fancy = localFont({
	src: [
		{ path: "../assets/Instrument_Serif/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" },
		{ path: "../assets/Instrument_Serif/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
	],
	variable: "--font-instrumentserif",
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`dark ${standard.variable} ${fancy.variable}`} suppressHydrationWarning>
			<body className="antialiased">
				<Navbar />
				<SmoothScroll>
					<NoFocusGate />
					{children}
				</SmoothScroll>
			</body>
		</html>
	);
}
