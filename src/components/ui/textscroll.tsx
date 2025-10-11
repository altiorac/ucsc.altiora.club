"use client";
import * as React from "react";
import { motion, Transition } from "motion/react";
import Link from "next/link";

type TextAlign = "left" | "center" | "right";

interface TextScrollerProps {
    items: React.ReactNode[];
    activeIndex?: number;
    interaction?: "hover" | "click";
    href?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    textAlign?: TextAlign;
    className?: string;
    transition?: Transition;
}

export default function TextScroller({
    items,
    activeIndex,
    interaction = "hover",
    href,
    onClick,
    onMouseEnter,
    onMouseLeave,
    textAlign = "center",
    className = "",
    transition = { type: "spring", stiffness: 400, damping: 40 },
}: TextScrollerProps) {
    const isControlled = activeIndex !== undefined;
    const [internalIndex, setInternalIndex] = React.useState(0);
    const [measuredHeight, setMeasuredHeight] = React.useState<number | null>(null);
    const containerRef = React.useRef<HTMLDivElement & HTMLAnchorElement>(null);

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.getBoundingClientRect().height;
            if (height > 0) {
                setMeasuredHeight(height);
            }
        }
    }, [items, className]);

    const currentIndex = isControlled ? activeIndex ?? 0 : internalIndex;

    const handleClick = () => {
        if (!isControlled && interaction === "click") {
            setInternalIndex((prev) => (prev + 1) % items.length);
        }
        onClick?.();
    };

    const handleMouseEnter = () => {
        if (!isControlled && interaction === "hover") {
            setInternalIndex(1);
        }
        onMouseEnter?.();
    };

    const handleMouseLeave = () => {
        if (!isControlled && interaction === "hover") {
            setInternalIndex(0);
        }
        onMouseLeave?.();
    };

    const eventProps = {
        onMouseEnter: (onMouseEnter || (!isControlled && interaction === "hover")) ? handleMouseEnter : undefined,
        onMouseLeave: (onMouseLeave || (!isControlled && interaction === "hover")) ? handleMouseLeave : undefined,
        onClick: handleClick,
    };

    const alignmentClass = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    }[textAlign];

    const visibility: React.CSSProperties["visibility"] = measuredHeight === null ? "hidden" : "visible";

    const commonProps = {
        ref: containerRef,
        ...eventProps,
        className: `relative inline-block overflow-hidden ${href ? '' : 'cursor-pointer'} ${className}`,
        style: {
            visibility,
        },
    };

    const content = (
        <motion.div
            animate={{ y: measuredHeight !== null ? -currentIndex * measuredHeight : 0 }}
            transition={transition}
            className="flex flex-col"
        >
            {items.map((item, i) => (
                <div
                    key={i}
                    data-item
                    className={`flex w-full items-center ${alignmentClass}`}
                    style={{
                        height: measuredHeight ? `${measuredHeight}px` : 'auto',
                        flexShrink: 0,
                    }}
                    aria-hidden={i !== currentIndex}
                >
                    {item}
                </div>
            ))}
        </motion.div>
    );

    if (href) {
        return (
            <Link {...commonProps} href={href}>
                {content}
            </Link>
        );
    }

    return <div {...commonProps}>{content}</div>;
}
