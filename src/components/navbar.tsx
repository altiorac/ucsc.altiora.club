"use client";

import Image from "next/image";
import altiora from "@/assets/altiora2.png";
import altiora2 from "@/assets/altiora3.png";
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import TextScroller from "@/components/ui/textscroll";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const MENU_ITEMS = [
    { label: "HOME", path: "/" },
    { label: "TALENT", path: "/talent" },
    { label: "PROGRAMS", path: "/programs" },
    { label: "ABOUT US", path: "/about" },
    { label: "CONTACT", path: "/contact" },
    { label: "APPLY", path: "/apply" },
] as const;

const ANIMATION_CONFIG = {
    navbar: {
        initial: { y: -10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 1, ease: "easeOut", delay: 0.5 },
    },
    overlay: {
        transition: { duration: 0.5, ease: "easeOut" },
    },
    menuItem: {
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                y: { delay: 0.02 * i, duration: 0.8 + 0.1 * i, ease: "easeOut" },
                opacity: { duration: 0 },
            },
        }),
        closed: {
            y: 200,
            opacity: 0,
            transition: {
                y: { duration: 0, delay: 0.5 },
                opacity: { duration: 1 },
            },
        },
    },
    burger: {
        transition: { ease: "easeOut", duration: 0.25 },
    },
};

interface MenuItemProps {
    label: string;
    path: string;
    marginClass: string;
    index: number;
    isOpen: boolean;
    isHovered: boolean;
    onHover: (label: string) => void;
    onLeave: () => void;
    onLinkClick: () => void;
}

const MenuItem = ({ label, path, marginClass, index, isOpen, isHovered, onHover, onLeave, onLinkClick }: MenuItemProps) => {
    const isLargeScreen = useMediaQuery("(min-width: 1024px)");
    const textAlignValue = isLargeScreen ? "left" : "center";

    return (
        <div className="h-fit w-full overflow-hidden">
            <motion.div className="flex flex-col justify-center" custom={index} variants={ANIMATION_CONFIG.menuItem} initial="closed" animate={isOpen ? "open" : "closed"}>
                <TextScroller href={path} activeIndex={isHovered ? 1 : 0} className="h-20 pr-2" textAlign={textAlignValue} items={[<span className="font-standard">{label}</span>, <span className={`font-fancy italic tracking-tighter font-thin`}>{label}</span>]} onMouseEnter={() => onHover(label)} onMouseLeave={onLeave} onClick={onLinkClick} />
            </motion.div>
        </div>
    );
};

interface BurgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const BurgerButton = ({ isOpen, onClick }: BurgerButtonProps) => (
    <button aria-expanded={isOpen} aria-label={isOpen ? "Close menu" : "Open menu"} onClick={onClick} tabIndex={0} className="relative h-6 w-10 cursor-pointer">
        <motion.span
            className="absolute left-0 h-[1px] w-10 bg-foreground origin-center"
            style={{ top: "50%" }}
            initial={{ y: "calc(-50% - 4.5px)" }}
            animate={{
                y: isOpen ? "-50%" : "calc(-50% - 4.5px)",
                rotate: isOpen ? 45 : 0,
            }}
            transition={ANIMATION_CONFIG.burger.transition}
        />
        <motion.span
            className="absolute left-0 h-[1px] w-10 bg-foreground origin-center"
            style={{ top: "50%" }}
            initial={{ y: "calc(-50% + 4.5px)" }}
            animate={{
                y: isOpen ? "-50%" : "calc(-50% + 4.5px)",
                rotate: isOpen ? -45 : 0,
            }}
            transition={ANIMATION_CONFIG.burger.transition}
        />
    </button>
);

export default function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const [hoveredLabel, setHoveredLabel] = useState("");

    const allLabels = useMemo(() => MENU_ITEMS.map((item) => item.label), []);
    const hoveredIndex = useMemo(() => allLabels.indexOf(hoveredLabel), [allLabels, hoveredLabel]);

    const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);
    const handleHover = useCallback((label: string) => setHoveredLabel(label), []);
    const handleLeave = useCallback(() => setHoveredLabel(""), []);

    return (
        <motion.div {...ANIMATION_CONFIG.navbar} className="fixed top-0 left-0 w-full z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={ANIMATION_CONFIG.overlay.transition} className="bg-background h-screen w-screen fixed inset-0">
                        <div className="h-full flex flex-col justify-center items-center lg:h-fit lg:absolute lg:left-5 lg:bottom-5 text-6xl lg:text-7xl font-semibold select-none tracking-tighter">
                            <div className="flex flex-col">
                                {MENU_ITEMS.map((item, i) => (
                                    <MenuItem key={item.label} {...item} index={i} isOpen={isOpen} isHovered={hoveredLabel === item.label} onHover={handleHover} onLeave={handleLeave} onLinkClick={() => setOpen(false)} />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 w-screen h-screen">
                            <div />
                            <div className="lg:w-full lg:flex lg:flex-col lg:justify-center lg:items-center hidden">
                                <Image src={altiora2} alt="Altiora logo" width={900} height={900} className="max-w-[100%] h-auto" priority />
                                <motion.div animate={{ opacity: hoveredIndex !== -1 ? 1 : 0 }} transition={{ duration: 0.3 }} className="xl:-mt-30 -mt-15">
                                    <TextScroller items={allLabels} activeIndex={hoveredIndex} className="h-10 font-standard text-2xl tracking-widest uppercase" textAlign="center" transition={{ ease: "easeInOut", duration: 0.5 }} />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 flex justify-between background p-3 w-full">
                <Link className="pt-6 pl-7 select-none rounded" href="/" aria-label="Home">
                    <Image src={altiora} alt="Altiora" width={42} height={42} priority />
                </Link>

                <div className="flex w-fit pt-7 pr-2 gap-2 select-none items-center">
                    <TextScroller activeIndex={isOpen ? 1 : 0} items={[<span>MENU</span>, <span>CLOSE</span>]} interaction="click" onClick={toggleMenu} className="h-6 font-standard font-light md:block! hidden! tracking-tight" textAlign="right" />
                    <BurgerButton isOpen={isOpen} onClick={toggleMenu} />
                </div>
            </div>
        </motion.div>
    );
}
