import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About PalettIQ | Ahnaf Shahriar Muiz - Founder & Developer",
  description:
    "Learn about Ahnaf Shahriar Muiz, founder and solo developer of PalettIQ. Discover the story behind the color design platform built for designers, developers, and creative professionals worldwide.",
  keywords: [
    "about palettiq",
    "ahnaf shahriar muiz",
    "palettiq founder",
    "color design platform",
    "color tools for designers",
    "color tools for developers",
    "online color toolkit",
    "design resources",
  ],
  alternates: {
    canonical: "https://palettiq.net/about-us",
  },
  openGraph: {
    title: "About PalettIQ | Ahnaf Shahriar Muiz - Founder & Developer",
    description:
      "Learn about Ahnaf Shahriar Muiz, founder and solo developer of PalettIQ.",
    url: "https://palettiq.net/about-us",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "About PalettIQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About PalettIQ | Ahnaf Shahriar Muiz",
    description: "Learn about the founder and story behind PalettIQ.",
    images: ["/banner.png"],
  },
};

export default function page() {
  return (
    <CommonHeaderFooterSection>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ahnaf Shahriar Muiz",
            jobTitle: "Founder and Software Developer",
            description:
              "Founder and solo developer of PalettIQ, a color design platform for designers and developers.",
            image: "https://palettiq.net/me.png",
            url: "https://palettiq.net/about-us",

            sameAs: [
              "https://github.com/ahanafshahariarmuiz",
              "https://www.linkedin.com/in/ahnafshahriarmuiz/",
            ],

            nationality: "Bangladeshi",
            worksFor: {
              "@type": "Organization",
              name: "PalettIQ",
            },
          }),
        }}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "PalettIQ",
            url: "https://palettiq.net",
            logo: "https://palettiq.net/logo.png",
            founder: {
              "@type": "Person",
              name: "Ahnaf Shahriar Muiz",
            },
            description:
              "PalettIQ is a color design platform that helps designers and developers generate palettes, create gradients, check accessibility, and work with colors more efficiently.",
          }),
        }}
      />
      <main className="w-full max-w-200 mx-auto py-20">
        <div className="w-full bg-white rounded-xl border border-gray-200">
          <div className="p-4 pt-10">
            <p className="text-sm font-bold text-indigo-500 bg-indigo-50 border border-indigo-200 rounded-full px-3.5 py-1.5 w-max mx-auto text-center">
              The Story Behind PalettIQ
            </p>

            <h1 className="text-4xl font-black text-gray-900 text-center mt-6">
              Built by a Developer, <br /> For Designers & Developers.
            </h1>

            <p className="text-base font-medium text-gray-600 text-center mt-4 max-w-2xl mx-auto">
              PalettIQ is an independent, passion-driven color tool developed
              and maintained by a single developer with a vision to simplify the
              color workflow for creative professionals worldwide.
            </p>
          </div>

          <div className="w-full border-t border-gray-200 mt-14" />

          <section className="w-full mt-14 flex items-start gap-10 max-md:flex-col px-4">
            <div className="shrink-0">
              <Image
                src="/me.png"
                alt="Ahnaf Shahriar Muiz — Founder and Solo Developer of PalettIQ"
                width={160}
                height={160}
                priority
                className="rounded-full object-cover"
              />
            </div>

            <div className="w-full">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Founder & Developer
              </p>
              <h2 className="text-2xl font-black text-gray-900 mt-2">
                Ahnaf Shahriar Muiz
              </h2>
              <p className="text-sm font-semibold text-indigo-500 mt-2">
                Bangladesh 🇧🇩
              </p>

              <p className="text-base font-medium text-gray-700 mt-5 leading-relaxed">
                A multidisciplinary software developer based in Bangladesh,
                specializing in web development, mobile application development,
                and UI/UX design. With consistent self-driven development
                experience since 2020, I've built a deep understanding of what
                modern designers and developers need in their daily workflow.
              </p>

              <p className="text-base font-medium text-gray-700 mt-4 leading-relaxed">
                PalettIQ was born out of a personal necessity — a unified,
                professional-grade color tool that goes beyond simple palette
                generation. From contrast checking and gradient creation to
                image color extraction and AI-powered palettes, every feature in
                PalettIQ is designed with real-world design challenges in mind.
              </p>

              <p className="text-base font-medium text-gray-700 mt-4 leading-relaxed">
                As a solo developer, I am responsible for every aspect of
                PalettIQ — from architecture and engineering to design and
                product decisions. This focused ownership ensures that PalettIQ
                remains fast, reliable, and continuously improving based on real
                user feedback.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-gray-200 mt-14" />

          <section className="w-full mt-14 px-4">
            <h2 className="text-2xl font-black text-gray-900">My Mission</h2>
            <p className="text-base font-medium text-gray-700 mt-4 leading-relaxed max-w-3xl">
              At PalettIQ, the mission is straightforward — to provide
              designers, developers, and creative professionals with a fast,
              accessible, and comprehensive color toolkit. Whether you are
              building a brand identity, designing a mobile app, or developing a
              web product, PalettIQ is engineered to make every color decision
              easier, smarter, and more precise.
            </p>
          </section>

          <div className="w-full border-t border-gray-200 mt-14" />

          <section className="w-full mt-14 grid grid-cols-3 gap-1 max-sm:grid-cols-1 px-4">
            <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-black text-indigo-500">2020</p>
              <p className="text-sm font-semibold text-gray-600 mt-2">
                Year development journey began
              </p>
            </div>
            <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-black text-indigo-500">8+</p>
              <p className="text-sm font-semibold text-gray-600 mt-2">
                Professional color tools in one platform
              </p>
            </div>
            <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-black text-indigo-500">1</p>
              <p className="text-sm font-semibold text-gray-600 mt-2">
                Passionate solo developer behind it all
              </p>
            </div>
          </section>

          <section className="px-4 pb-4">
            <div className="w-full mt-14 bg-indigo-50 border border-indigo-200 rounded-xl p-8 text-center">
              <h2 className="text-xl font-black text-gray-900">
                Have feedback or a feature request?
              </h2>
              <p className="text-sm font-semibold text-gray-600 mt-2">
                PalettIQ is built on real user needs. Your input directly shapes
                what gets built next.
              </p>
              <Link
                href="/settings/feedback"
                className="inline-flex items-center gap-2 mt-6 h-11 px-6 bg-indigo-500 text-white text-sm font-bold rounded-full hover:bg-indigo-600 transition-all active:scale-95"
              >
                Share Your Feedback
              </Link>
            </div>
          </section>
        </div>
        <section className="sr-only">
          <h2>About PalettIQ</h2>

          <p>
            PalettIQ is a professional color design platform built for
            designers, developers, marketers, and creative professionals. The
            platform helps users generate color palettes, visualize colors in
            user interfaces, create gradients, extract colors from images, check
            accessibility contrast ratios, generate CSS shadows, and work with
            color systems more efficiently.
          </p>

          <p>
            PalettIQ was founded and developed by Ahnaf Shahriar Muiz, a
            software developer from Bangladesh. The platform was created to
            simplify color decision-making and provide a unified set of color
            tools in a single workspace.
          </p>
        </section>
      </main>
    </CommonHeaderFooterSection>
  );
}
