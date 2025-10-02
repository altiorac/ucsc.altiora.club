import ProgramPage from "@/components/programs/programpage";

import Growth from "@/assets/altioragrowth.png";

export default function Venture() {
	return (
		<div>
			<ProgramPage
				title="VENTURE"
				description={
					<div className="flex flex-col gap-2 tracking-wider font-thin">
						<p>Venture are builders, traders, and leaders</p>
						<p>who treat campus as their playground.</p>
					</div>
				}
				content={
					<div className="flex flex-col gap-6 tracking-wider font-thin">
						<p>
							Napoleon famously said: <span className="italic">“One sound idea is all that one needs to achieve
							<br />
							success.”</span>
						</p>
						<p>
							We are here to aid that journey, members commit to transforming at
							<br />
							least one idea into a working venture each quarter.
						</p>
						<p className="mt-16">
							You’ll leave with lessons, winners, stories, and a stack of undeniable
							<br />
							<span className="font-semibold text-lg">evidence</span>.
						</p>
						<p>Not just bullet points on a résumé.</p>
						<p className="mt-12 italic">Alone, you may go fast. Together, we go further.</p>
					</div>
				}
				next="growth"
				image={Growth}
			/>
		</div>
	);
}
