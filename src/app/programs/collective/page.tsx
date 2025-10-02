
import ProgramPage from "@/components/programs/programpage";

import Venture from "@/assets/altioraventure.jpg"

export default function Collective() {
    return (
        <div>
            <ProgramPage
                title="COLLECTIVE"
                description={
                    <div className="flex flex-col gap-2 tracking-wider font-thin">
                        <p>Within these walls, Ambition and Intellect combines</p>
                        <p>into something greater than the sum of its parts.</p>
                    </div>
                }
                content={
                    <div className="flex flex-col gap-6 tracking-wider font-thin">
                        <p>The Collective is the antidote to casual networking.</p>
                        <p className="font-semibold text-lg">No small talk. No theory without action.</p>
                        <p>We create <span className="font-semibold text-lg">pressure</span>.</p>
                        <p>Pressure to think bigger, act faster, and become <span className="italic">better</span>.</p>
                        <p>When you sit across from fellow students who demand more, you rise.</p>
                    </div>
                }
                next="venture"
                image={Venture}
            />
        </div>
    );
}
