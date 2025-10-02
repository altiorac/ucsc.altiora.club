
import ProgramPage from "@/components/programs/programpage";

import Collective from "@/assets/altioracollectivecropped.png"

export default function Trading() {
    return (
        <div>
            <ProgramPage
                title="TRADING"
                description={
                    <div className="flex flex-col gap-2 tracking-wider font-thin">
                        <p>Requirement - Pattern Day Trader approved.</p>
                    </div>
                }
                content={
                    <div className="flex flex-col gap-6 tracking-wider font-thin">
                        <p>For those who <span className="font-semibold font-lg">wake up</span> before the markets.</p>
                        <p>Extensive knowledge within a specific sector preferred:</p>
                        <p>Whether in biotech catalysts, sector rotations, or emerging<br />technologies.</p>
                        <p className="mt-20">Altiora does not provide financial advice, investment management, or<br />brokerage services.</p>
                        <p>All trading discussions are strictly educational, and members are solely<br />responsible for their own financial decisions.</p>
                    </div>
                }
                next="collective"
                image={Collective}
            />
        </div>
    );
}
