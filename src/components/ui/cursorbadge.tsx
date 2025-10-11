// components/HoverFollowView.tsx
"use client";

import React, { useRef, useState, MouseEvent } from "react";

interface CursorBadge {
	children: React.ReactNode;
	className?: string;
}

const HoverFollowView: React.FC<CursorBadge> = ({ children, className = "" }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		const rect = containerRef.current?.getBoundingClientRect();
		if (rect) {
			setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
		}
	};

	const { x, y } = position;

	return (
		<div ref={containerRef} onMouseMove={handleMouseMove} className={`group relative ${className}`}>
			{children}
			<div
				style={{
					transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
				}}
				className={`font-standard font-thin text-sm absolute bg-[#00000022]  -top-10 left-10 flex items-center justify-center px-3 py-1 rounded-full text-white backdrop-blur-sm border border-[0.5px] border-[#27272755] pointer-events-none opacity-0 group-hover:opacity-100 transition-transform duration-400 ease-out transition-opacity ease-out
        `}
			>
				VIEW
			</div>
		</div>
	);
};

export default HoverFollowView;
