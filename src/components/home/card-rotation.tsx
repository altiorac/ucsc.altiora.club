import Image from "next/image";
import { useMemo } from "react";

import Collective from "@/assets/altioracollective.png";
import Growth from "@/assets/altioragrowth.png";
import Trading from "@/assets/altioratrading.png";
import Venture from "@/assets/altioraventure.jpg";

import ImageHover from "@/components/ui/imagehover";
import CursorBadge from "@/components/ui/cursorbadge";

export default function CardRotation() {
    const images = useMemo(
        () => [
            { src: Collective, alt: "collective" },
            { src: Growth, alt: "growth" },
            { src: Trading, alt: "trading" },
            { src: Venture, alt: "venture" },
        ],
        []
    );

    const loopImages = useMemo(() => images.concat(images), [images]);

    return (
        <div className="flex flex-col text-center">
            <h1 className="italic font-standard font-normal tracking-wider mt-24">A PRIVATE MASTERMIND FOR THE AMBITIOUS AT UC SANTA CRUZ.</h1>
            <CursorBadge>
                <div className="flex" style={{ transform: "perspective(1200px) rotateX(20deg) rotateY(20deg)" }}>
                    <div className="animate-altiora-ticker flex">
                        {loopImages.map((img, i) => (
                            <div key={i}>
                                <ImageHover link={`programs/${img.alt}`} src={img.src} alt={img.alt} priority={i < 4} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </CursorBadge>
        </div>
    );
}
