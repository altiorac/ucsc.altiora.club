import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import SmoothScroll from "@/components/smooth-scroll";
import NoFocusGate from "@/components/nofocusgate";
import Navbar from "@/components/navbar";
import Script from "next/script";

const siteUrl = "https://altiora.club";
const orgName = "Altiora UCSC";
const siteName = "Altiora UCSC";
const siteTagline = "The exclusive society for UCSC’s future founders, leaders, and visionaries.";

const standard = localFont({
    src: [
        {
            path: "../assets/Instrument_Sans/InstrumentSans-VariableFont_wdth,wght.ttf",
            style: "normal",
            weight: "100 900",
        },
        {
            path: "../assets/Instrument_Sans/InstrumentSans-Italic-VariableFont_wdth,wght.ttf",
            style: "italic",
            weight: "100 900",
        },
    ],
    variable: "--font-instrumentsans",
    display: "swap",
});

const fancy = localFont({
    src: [
        { path: "../assets/Instrument_Serif/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" },
        { path: "../assets/Instrument_Serif/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
    ],
    variable: "--font-instrumentserif",
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0b0b0f" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    title: {
        default: siteName,
        template: `%s • ${siteName}`,
    },
    description: siteTagline,
    keywords: ["Altiora", "UCSC", "altiora club", "ucsc finance club", "ucsc fitness club", "ucsc engineering clubs", "ucsc stem clubs", "ucsc art clubs", "ucsc music clubs", "ucsc day trading clubs", "ucsc entrepreneurship", "ucsc club catalogue"],
    authors: [{ name: orgName, url: siteUrl }],
    creator: orgName,
    publisher: orgName,
    referrer: "origin-when-cross-origin",
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
        },
    },
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/",
        },
    },
    openGraph: {
        type: "website",
        url: siteUrl,
        title: siteName,
        siteName,
        description: siteTagline,
        locale: "en_US",
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: `${siteName} — ${siteTagline}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteName,
        description: siteTagline,
        creator: "@justin06lee",
        site: "@justin06lee",
        images: ["/og.png"],
    },
    category: "education",
    icons: {
        icon: [{ url: "/favicon.ico" }, { url: "/favicon.ico", sizes: "32x32" }, { url: "/favicon.ico", sizes: "16x16" }],
        apple: [{ url: "./favicon.ico", sizes: "180x180" }],
        shortcut: ["./favicon.ico"],
        other: [{ rel: "mask-icon", url: "./favicon.ico", color: "#0b0b0f" }],
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: siteName,
    },
    appLinks: {
        web: {
            url: siteUrl,
            should_fallback: true,
        },
    },
    other: {
        "color-scheme": "light dark",
    },
};

function StructuredData() {
    const orgLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: orgName,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        sameAs: ["https://www.instagram.com/altiorac"],
        department: [
            { "@type": "Organization", name: "Development Division" },
            { "@type": "Organization", name: "Engineering Division" },
            { "@type": "Organization", name: "Finance Division" },
            { "@type": "Organization", name: "Trading Division" },
            { "@type": "Organization", name: "Art Division" },
            { "@type": "Organization", name: "Music Division" },
            { "@type": "Organization", name: "Fitness Division" },
            { "@type": "Organization", name: "Quant Division" },
            { "@type": "Organization", name: "Cyber Security Division" },
            { "@type": "Organization", name: "Business Division" },
        ],
    };

    const siteLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/search?q={query}`,
            "query-input": "required name=query",
        },
    };

    return (
        <>
            <Script id="ld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
            <Script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
        </>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" dir="ltr" className={`dark ${standard.variable} ${fancy.variable}`} suppressHydrationWarning>
            <head>
                <StructuredData />
            </head>
            <body className="antialiased min-h-screen">
                <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-black/80 focus:text-white focus:px-3 focus:py-2">
                    Skip to content
                </a>

                <Navbar />
                <SmoothScroll>
                    <NoFocusGate />
                    <main id="main" role="main">
                        {children}
                    </main>
                </SmoothScroll>
            </body>
        </html>
    );
}
