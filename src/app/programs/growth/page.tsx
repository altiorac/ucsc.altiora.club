"use client"

import ProgramPage from "@/components/programs/programpage";
import Trading from "@/assets/altioratrading.png";
import { useEffect } from "react"

export default function Growth() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <ProgramPage
                title="GROWTH"
                description={
                    <div className="flex flex-col gap-2 tracking-wider font-thin">
                        <p>Improvement is dedicated to the only</p>
                        <p>project that compounds forever, yourself.</p>
                    </div>
                }
                content={
                    <div className="flex flex-col gap-6 tracking-wider font-thin">
                        <p>
                            Physically, mentally, and emotionally, we train <span className="italic">body, mind, and soul</span>.
                        </p>
                        <p>Afterall, they serve as the foundation for everything we do.</p>
                        <p>
                            We engineer discipline, bring blind spots to light, and break through
                            <br />
                            plateaus.
                        </p>
                        <br />
                        <p className="mt-8">
                            The goal? <span className="italic font-semibold">To become someone worth knowing.</span>
                        </p>
                    </div>
                }
                next="trading"
                image={Trading}
            />
        </div>
    );
}
