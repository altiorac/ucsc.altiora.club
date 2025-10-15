
"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ImageHover({
  src,
  alt,
  link,
  className = "",
  priority = false,
  blank = false,
}: {
  src: string | StaticImageData;
  alt: string;
  link: string;
  className?: string;
  priority?: boolean;
  blank?: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const distance = Math.sqrt(
      Math.pow(e.clientX - dragStart.x, 2) + Math.pow(e.clientY - dragStart.y, 2)
    );
    if (distance > 5) {
      setIsDragging(true);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };
  
  return (
    <Link
      href={`https://${link}.altiora.club`}
      target={blank ? "_blank" : ""}
      data-cursor-hover
      className="w-[475px] h-[675px] overflow-hidden mx-[5px] relative cursor-pointer block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        draggable={false}
        className={`w-full h-full object-cover transition-all duration-300 select-none pointer-events-none ${
          hovering ? "brightness-50" : "brightness-75"
        } ${className}`}
      />
      <div
        className={`font-standard font-semibold uppercase absolute inset-0 flex items-center justify-center text-white text-2xl font-bold transition-opacity duration-300 pointer-events-none ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
      >
        {alt}
      </div>
    </Link>
  );
}
