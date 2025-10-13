import TextScroller from "@/components/ui/textscroll";

export default function About() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center text-center items-center mt-80 cursor-default">
            <div className="uppercase font-standard tracking-3 mb-10">
                <h1 className="text-2xl font-semibold -tracking-1">A CIRCLE ABOVE THE REST.</h1>
                <br />
                <div className="font-[50] scale-x-105">
                    <p className="mb-1">Altiora isn&apos;t a club; It&apos;s a curated collective of</p>
                    <p>high-end thinkers and those who get things done.</p>
                    <br />
                    <p>We accept less than 5% of applicants</p>
                    <p>because we know quality outlives quantity.</p>
                    <br />
                    <p>We don&apos;t accept bloated Résumés.</p>
                    <br />
                    <p>We accept by evidence of Obsession and Excellence.</p>
                </div>
            </div>

            <div className="flex mt-30 gap-6 -ml-4">
                <div className="rounded-full transition-colors">
                    <TextScroller href="/divisions" items={[<span key="divisions-primary" className="py-0.5 px-4">DIVISIONS</span>, <span key="divisions-hover" className="py-0.5 px-4">DIVISIONS</span>]} interaction="hover" className="text-base tracking-tighter uppercase h-8 bg-neutral-900 rounded-full font-standard" textAlign="center" />
                </div>
                <div className="transition-colors">
                    <TextScroller href="/apply" items={[<span key="about-apply-primary">APPLY</span>, <span key="about-apply-hover">APPLY</span>]} interaction="hover" className="text-base tracking-tighter uppercase h-8 font-standard" textAlign="center" />
                </div>
            </div>
        </div>
    );
}
