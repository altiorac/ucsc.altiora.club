import Image from "next/image";
import Default from "@/assets/defaultprofile.jpg";
import Link from "next/link";

export default function TeamPage() {
	const people = [
		{
			name: "Horden Huang",
			role: "FOUNDER / CATALYST TRADER / WRITER",
			site: "https://horden.net/",
			image: null,
		},
		{
			name: "Keith Zerboni",
			role: "OPERATIONS",
			site: "",
			image: null,
		},
		{
			name: "Everest Ruan",
			role: "NARRATIVE",
			site: "",
			image: null,
		},
		{
			name: "Oskar Wasserman",
			role: "ONBOARDING / GAME DEV / ARTIST",
			site: "",
			image: null,
		},
		{
			name: "UNSETTLED",
			role: "MARKETING",
			site: "",
			image: null,
		},
	];

	return (
		<div className="w-screen flex flex-col items-center">
			<div className="text-center mb-24">
				<h1 className="uppercase text-2xl font-semibold mb-4">MEET THE TEAM</h1>
				<p className="uppercase text-sm md:text-lg font-extralight">
					Each with a different path, <br className="block md:hidden" />
					aligned by a common pursuit.
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 mt-12">
				{people.map((person) => (
					<Link href={person.site} key={person.name} className="flex flex-col items-center text-center">
						<Image src={person.image || Default} alt={person.name} width={450} height={450} className="rounded-full object-cover mb-4" />
						<h2 className="text-lg font-semibold uppercase">{person.name}</h2>
						<p className="text-sm font-light uppercase tracking-wider">{person.role}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
