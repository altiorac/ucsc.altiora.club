import Hero from "@/components/home/hero";
import CardRotation from "@/components/home/card-rotation";
import About from "@/components/home/about";
import FAQ from "@/components/home/faq";
import Footer from "@/components/footer";
import Line from "@/components/home/line";

export default function Home() {
	return (
		<div>
			<main>
				<Hero />
				<CardRotation />
				<About />
				<FAQ />
			</main>
			<Line />
			<footer>
				<Footer />
			</footer>
		</div>
	);
}
