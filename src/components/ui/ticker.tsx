"use client"
import type { StaticImageData } from "next/image"
import type { AnimationPlaybackControls } from "motion"
import { Ticker } from "motion-plus/react"
import { motion, useMotionValue, animate } from "motion/react"
import { useEffect, useRef } from "react"

export interface TickerItem {
    src: string | StaticImageData
    alt: string
    link: string
}

interface AutoScrollTickerProps {
    items: TickerItem[]
    speed?: number
    ItemComponent?: React.ComponentType<{ item: TickerItem; index: number }>
}

export default function AutoScrollTicker({ 
    items, 
    speed = 50,
    ItemComponent 
}: AutoScrollTickerProps) {
    const offset = useMotionValue(0)
    const animationRef = useRef<AnimationPlaybackControls | null>(null)
    const isDragging = useRef(false)

    const loopItems = [...items, ...items]

    useEffect(() => {
        const startAnimation = () => {
            animationRef.current = animate(offset, offset.get() - 10000, {
                duration: speed,
                ease: "linear",
                repeat: Infinity,
            })
        }

        startAnimation()

        return () => {
            if (animationRef.current) {
                animationRef.current.stop()
            }
        }
    }, [offset, speed])

    const handleDragStart = () => {
        isDragging.current = true
        if (animationRef.current) {
            animationRef.current.stop()
        }
    }

    function sleep(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleDragEnd = async () => {
        isDragging.current = false
	await sleep(3000);
        animationRef.current = animate(offset, offset.get() - 10000, {
            duration: speed,
            ease: "linear",
            repeat: Infinity,
        })
    }

    const DefaultItem = ({ item, index }: { item: TickerItem; index: number }) => {
        void index
        const resolvedSrc = typeof item.src === "string" ? item.src : item.src.src
        return (
            <motion.div className="ticker-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={resolvedSrc}
                    alt={item.alt}
                    draggable={false}
                />
            </motion.div>
        )
    }

    const Component = ItemComponent || DefaultItem

    return (
        <Ticker
            drag="x"
            _dragX={offset}
            offset={offset}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            items={loopItems.map((item, index) => (
                <Component key={index} item={item} index={index} />
            ))}
            className="ticker-container"
            style={{ 
                cursor: 'grab',
                touchAction: 'none',
                userSelect: 'none'
            }}
	    overflow
        />
    )
}
