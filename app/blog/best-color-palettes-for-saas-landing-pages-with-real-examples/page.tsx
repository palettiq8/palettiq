import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/client/BackButon";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Case studies",
  title: "Best Color Palettes for SaaS Landing Pages (With Real Examples)",
  description:
    "Eight real color palettes broken down for SaaS landing pages — what mood each one sets, which product categories it suits, and why it actually works.",
  keywords: [
    "saas landing page color palette",
    "best colors for saas website",
    "saas color scheme examples",
    "b2b saas color palette",
    "landing page color inspiration",
    "saas brand color examples",
    "color palette for tech startup",
    "software landing page colors",
  ],
  alternates: {
    canonical:
      "https://palettiq.net/blog/best-color-palettes-for-saas-landing-pages-with-real-examples",
  },
  openGraph: {
    title:
      "Best Color Palettes for SaaS Landing Pages (With Real Examples) | PalettIQ",
    description:
      "Eight real palettes broken down for SaaS landing pages, with the specific mood, product category, and reasoning behind each one.",
    url: "https://palettiq.net/blog/best-color-palettes-for-saas-landing-pages-with-real-examples",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-07-12T00:00:00.000Z",
    authors: ["PalettIQ Team"],
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Best Color Palettes for SaaS Landing Pages (With Real Examples)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Best Color Palettes for SaaS Landing Pages (With Real Examples) | PalettIQ",
    description:
      "Eight real color palettes broken down for SaaS landing pages, with the reasoning behind each one.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

const blogFAQQuestions = [
  {
    title: "Do all SaaS landing pages need to use blue?",
    content:
      "No, that's just the safest, most overused default. Blue works well for trust-heavy categories like fintech and security, but plenty of the palettes below prove that warmer or more distinctive combinations can work just as well, sometimes better, for categories where standing out matters more than blending in.",
  },
  {
    title: "How many colors should a SaaS landing page actually use?",
    content:
      "The five-color palettes below are a good source range, but a shipped landing page usually narrows that down to one dominant color, one or two supporting colors, one accent for CTAs, and a neutral scale — not all five used with equal weight everywhere.",
  },
  {
    title:
      "Can a dark, moody palette work for a SaaS product, or is that too risky?",
    content:
      "It can work well, especially for premium, developer-focused, or creative tooling products where a lighter, more corporate palette would undersell the product. It's riskier for a broad consumer SaaS audience, where lighter and more approachable tends to convert better.",
  },
  {
    title:
      "Should my landing page palette match my product's actual UI colors?",
    content:
      "They should feel related, but they don't need to be identical. A landing page often has more room for personality and warmth than a working product interface, which usually needs a more restrained, functional palette for daily use.",
  },
];

const palettes = [
  {
    name: "Hearth Meridian",
    slug: "https://www.palettiq.net/palettes/638-hearth-meridian",
    colors: ["#6F7A82", "#C0AE95", "#EDD8B4", "#DD7637", "#DA4740"],
    useCase: "Home services, real estate, or hospitality SaaS",
    note: "A cool slate gray grounds this one, but the warm terracotta and rust accent carry all the personality. It reads as approachable and grounded rather than corporate, which suits products selling to small businesses or non-technical buyers who'd bounce off a colder, more typical SaaS blue.",
  },
  {
    name: "Earthen Velvet",
    slug: "https://www.palettiq.net/palettes/636-earthen-velvet",
    colors: ["#B6BE8C", "#E8CB9F", "#CDAB87", "#483A4D", "#3F233E"],
    useCase: "Sustainability, wellness, or agtech SaaS",
    note: "Olive and tan carry the sustainability association without leaning on the obvious bright green cliché, and the deep plum gives it enough weight to still feel like serious software rather than a lifestyle brand. Works well anywhere the product needs to feel considered and a little less corporate.",
  },
  {
    name: "Blush Gradient",
    slug: "https://www.palettiq.net/palettes/606-blush-gradient",
    colors: ["#5D2A42", "#FB6376", "#FCB1A6", "#FFDCCC", "#FFF9EC"],
    useCase: "Consumer-facing, creator, or beauty-adjacent SaaS",
    note: "This is a genuine outlier on this list, and that's the point — most SaaS palettes default to cool and safe, and this one is warm, soft, and unmistakably not enterprise software. It fits products targeting creators, consumers, or beauty and lifestyle brands where blending in with typical B2B SaaS design would actively hurt conversion.",
  },
  {
    name: "Deep Compass",
    slug: "https://www.palettiq.net/palettes/590-deep-compass",
    colors: ["#033F63", "#28666E", "#7C9885", "#B5B682", "#FEDC97"],
    useCase: "Analytics, productivity, or project management SaaS",
    note: "Deep navy through teal into sage reads as calm and analytical without feeling cold, and the warm mustard accent gives CTAs somewhere to stand out against an otherwise cool palette. This is close to the 'safe, professional, still has personality' zone most B2B SaaS products are actually trying to hit.",
  },
  {
    name: "Fair Isle Knit",
    slug: "https://www.palettiq.net/palettes/460-fair-isle-knit",
    colors: ["#1A1830", "#4A2A10", "#A87858", "#B08888", "#F0E8D8"],
    useCase: "Premium, editorial, or fintech SaaS",
    note: "Near-black navy paired with warm browns and dusty mauve feels expensive and considered rather than loud. This suits products that need to signal premium positioning fast — think wealth management tools or high-end creative software — where a bright, energetic palette would undersell the price point.",
  },
  {
    name: "Kodachrome",
    slug: "https://www.palettiq.net/palettes/419-kodachrome",
    colors: ["#1A3838", "#2A6060", "#C07030", "#D89858", "#F4ECD8"],
    useCase: "Creative tools, media, or developer-facing SaaS",
    note: "Deep teal against warm burnt orange is a genuinely underused pairing in SaaS, and it has a retro-modern feel that suits products wanting to look distinct from the standard blue-and-white template. Works particularly well for tools aimed at designers or developers, an audience that tends to notice and appreciate a less default palette.",
  },
  {
    name: "Amethyst Dusk",
    slug: "https://www.palettiq.net/palettes/81-amethyst-dusk",
    colors: ["#1A1423", "#372549", "#77447B", "#B58DB6", "#EAE2B7"],
    useCase: "AI, creative, or next-gen tooling SaaS",
    note: "Purple has become shorthand for 'AI product' over the past few years for a reason — it reads as forward-looking without the coldness of blue. This specific palette leans dark and moody rather than bright and playful, which suits products positioning themselves as powerful and serious rather than fun and casual.",
  },
  {
    name: "Midnight Emerald",
    slug: "https://www.palettiq.net/palettes/62-midnight-emerald",
    colors: ["#0B2B26", "#163832", "#235952", "#A68966", "#E1D89F"],
    useCase: "Finance, security, or enterprise SaaS",
    note: "Deep forest green paired with warm bronze feels stable and a little exclusive, closer to a private bank's branding than a typical startup. Good fit for products where the sales motion depends on projecting stability and trust to a more senior, less trend-sensitive buyer.",
  },
];

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id":
          "https://palettiq.net/blog/best-color-palettes-for-saas-landing-pages-with-real-examples#article",
        headline:
          "Best color palettes for SaaS landing pages (with real examples)",
        description:
          "Eight real color palettes broken down for SaaS landing pages — what mood each one sets, which product categories it suits, and why it actually works.",
        image: "https://palettiq.net/banner.webp",
        datePublished: "2026-07-12T00:00:00.000Z",
        dateModified: "2026-07-12T00:00:00.000Z",
        author: {
          "@type": "Organization",
          name: "PalettIQ Team",
          url: "https://palettiq.net",
        },
        publisher: {
          "@id": "https://palettiq.net/#organization",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://palettiq.net/blog/best-color-palettes-for-saas-landing-pages-with-real-examples",
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://palettiq.net/blog/best-color-palettes-for-saas-landing-pages-with-real-examples#faqpage",
        mainEntity: blogFAQQuestions.map((q) => ({
          "@type": "Question",
          name: q.title,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.content,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://palettiq.net/blog/best-color-palettes-for-saas-landing-pages-with-real-examples#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://palettiq.net",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://palettiq.net/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Best color palettes for SaaS landing pages (with real examples)",
            item: "https://palettiq.net/blog/best-color-palettes-for-saas-landing-pages-with-real-examples",
          },
        ],
      },
    ],
  };

  return (
    <CommonHeaderFooterSection>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="w-full h-max max-w-350 mx-auto py-20 max-xl:px-4 max-sm:py-10 flex gap-6 max-lg:flex-col">
        <div className="w-full">
          <BackButton />
          <h4 className="text-sm mt-6 font-semibold text-gray-500">
            Published on 12 July, 2026 . By PalettIQ Team
          </h4>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 leading-12">
            Best color palettes for SaaS landing pages (with real examples)
          </h1>

          <div className="w-full bg-white rounded-xl border border-gray-200 mt-6 p-8 max-sm:p-5">
            <article className="max-w-none">
              <p className="text-lg text-gray-600 leading-8">
                Almost every SaaS landing page defaults to the same palette:
                white background, a shade of blue, maybe a gradient accent. It's
                safe, and it's also exactly why so many of these pages blur
                together. The eight palettes below aren't generic
                inspiration-board filler — each one is broken down for what it
                actually communicates and which kind of product it genuinely
                fits, not just "this looks nice."
              </p>

              <section id="what-makes-it-work" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  What actually makes a SaaS palette work
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Before the examples: a landing page palette has one job the
                  product's internal UI doesn't have to worry about as much — it
                  needs to earn trust and communicate positioning in the first
                  few seconds, before anyone's read a word of copy. That's why
                  category convention exists at all. Blue signals safety with
                  data. Green signals growth or sustainability. Purple has
                  drifted toward "AI and next-gen." None of these are rules, but
                  breaking one on purpose reads very differently than breaking
                  one by accident.
                </p>
              </section>

              {palettes.map((palette, index) => (
                <section
                  key={palette.slug}
                  id={`palette-${index + 1}`}
                  className="mt-10 scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-gray-900">
                    {index + 1}. {palette.name}
                  </h2>
                  <div className="mt-4 flex w-full h-30 rounded-lg overflow-hidden border border-gray-200">
                    {palette.colors.map((color) => (
                      <div
                        key={color}
                        className="flex-1 h-full"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mt-3">
                    Best for: {palette.useCase}
                  </p>
                  <p className="text-gray-600 leading-7 mt-2">{palette.note}</p>
                  <Link
                    href={palette.slug}
                    className="inline-block text-sm text-gray-900 font-semibold underline underline-offset-2 hover:text-gray-600 mt-3"
                  >
                    View the full {palette.name} palette
                  </Link>
                </section>
              ))}

              <section
                id="patterns-across-these"
                className="mt-10 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  What these eight actually have in common
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  None of these are pure single-hue palettes, and none of them
                  are loud rainbow combinations either. Every one pairs a
                  deeper, more saturated anchor color with warmer or lighter
                  supporting tones, which is a pattern worth noticing — a SaaS
                  palette that works usually has both a color doing the "serious
                  software" job and a color doing the "human, not sterile" job
                  at the same time. Pages that only have one or the other tend
                  to feel either flat and forgettable or unserious for the
                  product they're selling.
                </p>
              </section>

              <section id="faq" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Questions worth answering before you pick one
                </h2>
                <div className="mt-4 space-y-6">
                  {blogFAQQuestions.map((faq) => (
                    <div key={faq.title}>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {faq.title}
                      </h3>
                      <p className="text-gray-600 leading-7 mt-2">
                        {faq.content}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="conclusion" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Pick the mood first, the palette second
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  The fastest way to misuse any of these eight is picking one
                  because it looks good in isolation rather than because it
                  matches what the product actually needs to communicate. Decide
                  whether you're selling trust, warmth, premium positioning, or
                  energy first — then pick from whichever of these palettes
                  actually backs that up, instead of the other way around.
                </p>
              </section>
            </article>
          </div>
        </div>

        <div className="w-90 max-lg:w-full sticky top-20 shrink-0 p-4 h-max max-lg:static">
          <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wide">
            Contents
          </h3>
          <nav className="mt-4 space-y-1">
            {[
              {
                href: "#what-makes-it-work",
                label: "What Makes a SaaS Palette Work",
              },
              ...palettes.map((palette, index) => ({
                href: `#palette-${index + 1}`,
                label: `${index + 1}. ${palette.name}`,
              })),
              {
                href: "#patterns-across-these",
                label: "What They Have in Common",
              },
              { href: "#faq", label: "FAQ" },
              {
                href: "#conclusion",
                label: "Mood First, Palette Second",
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-sm text-gray-600 hover:text-gray-900 py-1.5 border-l-2 border-gray-100 hover:border-gray-900 pl-3 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </CommonHeaderFooterSection>
  );
}
