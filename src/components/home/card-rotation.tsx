import Image from "next/image";
import { useMemo } from "react";

import { images } from "@/lib/utils";

import ImageHover from "@/components/ui/imagehover";
import CursorBadge from "@/components/ui/cursorbadge";

export default function CardRotation() {
    const loopImages = useMemo(() => images.concat(images), [images]);

    return (
        <div className="flex flex-col text-center">
            <h1 className="italic font-standard font-normal tracking-wider mt-24">A PRIVATE MASTERMIND FOR THE AMBITIOUS AT UC SANTA CRUZ.</h1>
            <CursorBadge>
                <div className="flex" style={{ transform: "perspective(1200px) rotateX(20deg) rotateY(20deg)" }}>
                    <div className="animate-altiora-ticker flex">
                        {loopImages.map((img, i) => (
                            <div key={i}>
                                <ImageHover link={`https://${img.link}.altiora.club`} blank={true} src={img.src} alt={img.alt} priority={i < 4} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </CursorBadge>
        </div>
    );
}
