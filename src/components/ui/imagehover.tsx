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
}: {
  src: string | StaticImageData;
  alt: string;
  link: string;
  className?: string;
  priority?: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  
  return (
    <Link
      href={link}
      data-cursor-hover // This attribute triggers the cursor badge
      className="w-[475px] h-[675px] overflow-hidden mx-[5px] relative cursor-pointer block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        className={`w-full h-full object-cover transition-all duration-300 ${
          hovering ? "brightness-50" : "brightness-100"
        } ${className}`}
      />
      <div
        className={`font-standard font-semibold uppercase absolute inset-0 flex items-center justify-center text-white text-2xl font-bold transition-opacity duration-300 ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
      >
        {alt}
      </div>
    </Link>
  );
}
