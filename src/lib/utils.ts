import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import Engineering from "@/assets/divisions/engineering.jpg";
import Development from "@/assets/divisions/development.jpg";
import Finance from "@/assets/divisions/finance.jpg";
import Trading from "@/assets/divisions/trading.jpg";
import Quant from "@/assets/divisions/quant.jpg";
import Artist from "@/assets/divisions/artist.jpg";
import Musician from "@/assets/divisions/music.jpg";
import CyberSecurity from "@/assets/divisions/cybersecurity.jpg";
import Business from "@/assets/divisions/business.jpg";
import Fitness from "@/assets/divisions/fitness.jpg";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const images = [
	{ src: Engineering, tags: ["HARDWARE", "ELECTRICAL", "MECHANICAL"], alt: "engineering", link: "engineering" },
	{ src: Development, tags: ["SOFTWARE", "PROGRAMMING", "TECH"], alt: "development", link: "developer" },
	{ src: Finance, tags: ["BUSINESS", "ECONOMICS", "INVESTING"], alt: "finance", link: "finance" },
	{ src: Trading, tags: ["FINANCE", "MARKETS", "STOCKS"], alt: "trading", link: "trader" },
	{ src: Quant, tags: ["FINANCE", "DATA", "ALGORITHMS"], alt: "quant", link: "quant" },
	{ src: Artist, tags: ["CREATIVE", "VISUALS", "DESIGN"], alt: "art", link: "art" },
	{ src: Musician, tags: ["CREATIVE", "AUDIO", "PERFORMANCE"], alt: "music", link: "musician" },
	{ src: CyberSecurity, tags: ["TECH", "SECURITY", "NETWORKING"], alt: "cyber security", link: "cybersec" },
	{ src: Business, tags: ["FINANCE", "MANAGEMENT", "STRATEGY"], alt: "business", link: "business" },
	{ src: Fitness, tags: ["HEALTH", "BODY", "TRAINING"], alt: "fitness", link: "fitness" },
];
