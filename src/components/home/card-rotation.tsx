"use client"

import Image from "next/image";
import { images } from "@/lib/utils";
import ImageHover from "@/components/ui/imagehover";
import CursorBadge from "@/components/ui/cursorbadge";
import AutoScrollTicker from "@/components/ui/ticker";

function TickerImageItem({ item, index }: { item: any; index: number }) {
    return (
        <ImageHover 
            link={`/${item.link}`} 
            blank={true} 
            src={item.src} 
            alt={item.alt} 
            priority={index < 4} 
            className="w-full h-full object-cover" 
        />
    );
}

export default function CardRotation() {
    return (
        <div className="flex flex-col text-center">
            <h1 className="italic font-standard font-normal tracking-wider mt-24">
                A PRIVATE MASTERMIND FOR THE AMBITIOUS AT UC SANTA CRUZ.
            </h1>
            <CursorBadge>
                <div 
                    className="flex" 
                    style={{ transform: "perspective(1200px) rotateX(20deg) rotateY(20deg)" }}
                >
                    <AutoScrollTicker 
                        items={images}
                        speed={120}
                        ItemComponent={TickerImageItem}
                    />
                </div>
            </CursorBadge>
            <style jsx>{`
                :global(.ticker-container) {
                    cursor: grab;
                }
                :global(.ticker-container:active) {
                    cursor: grabbing;
                }
            `}</style>
        </div>
    );
}
