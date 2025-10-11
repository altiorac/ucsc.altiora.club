import TextScroller from "@/components/ui/textscroll"

export default function Footer() {
	return (
		<div className="h-80 flex flex-col justify-center">
			<div className="flex justify-between">
				<TextScroller items={[<span key="copyright-primary">© UCSC ALTIORA CLUB</span>, <span key="copyright-hover">© UCSC ALTIORA CLUB</span>]} interaction="hover" className="text-base tracking-tighter uppercase h-8 font-standard ml-8" textAlign="center" />
				<TextScroller href="/apply" items={[<span key="apply-primary">APPLY</span>, <span key="apply-hover">APPLY</span>]} interaction="hover" className="text-base tracking-tighter uppercase h-8 font-standard mr-8" textAlign="center" />
			</div>
		</div>
	);
}
