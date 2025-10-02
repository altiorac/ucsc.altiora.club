import TextScroller from "@/components/ui/textscroll";

export default function About() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center text-center items-center mt-28 cursor-default">
            <div className="uppercase font-standard tracking-3 mb-20">
                <h1 className="text-2xl font-semibold -tracking-1">A CIRCLE ABOVE THE REST.</h1>
                <br />
                <div className="font-[50] scale-x-105">
                    <p className="mb-1">We are a curated circle of Students who sharpen</p>
                    <p>each other through countless disciplines.</p>
                    <br />
                    <p>We don’t measure by GPA.</p>
                    <br />
                    <p>We measure by grit, results, and character.</p>
                </div>
            </div>

            <div className="flex mt-30 gap-6 -ml-4">
                <div className="rounded-full transition-colors">
                    <TextScroller href="/programs" items={[<span className="py-0.5 px-4">PROGRAMS</span>, <span className="py-0.5 px-4">PROGRAMS</span>]} interaction="hover" className="text-base tracking-tighter uppercase h-8 bg-neutral-900 rounded-full font-standard" textAlign="center" />
                </div>
                <div className="transition-colors">
                    <TextScroller href="/apply" items={[<span>APPLY</span>, <span>APPLY</span>]} interaction="hover" className="text-base tracking-tighter uppercase h-8 font-standard" textAlign="center" />
                </div>
            </div>
        </div>
    );
}
