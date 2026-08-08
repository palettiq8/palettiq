import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/client/BackButon";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Tutorials",
  title:
    "CSS Box-Shadow Generator: How to Create Depth Without Overdoing It",
  description:
    "How to use CSS box-shadow to create real depth instead of a harsh drop shadow — layered shadows, shadow color, elevation systems, and a practical process.",
  keywords: [
    "css box shadow generator",
    "css box shadow tutorial",
    "layered box shadow",
    "subtle box shadow css",
    "elevation shadow css",
    "material design shadow",
    "box shadow best practices",
    "css depth design",
    "box shadow color",
    "multiple box shadows css",
  ],
  alternates: {
    canonical:
      "https://palettiq.net/blog/css-box-shadow-generator-how-to-create-depth-without-overdoing-it",
  },
  openGraph: {
    title:
      "CSS Box-Shadow Generator: How to Create Depth Without Overdoing It | PalettIQ",
    description:
      "Why most box-shadows look heavy and fake, how layered shadows and shadow color actually create realistic depth, and a practical process for getting it right.",
    url: "https://palettiq.net/blog/css-box-shadow-generator-how-to-create-depth-without-overdoing-it",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-07-14T00:00:00.000Z",
    authors: ["PalettIQ Team"],
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "CSS Box-Shadow Generator: How to Create Depth Without Overdoing It",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "CSS Box-Shadow Generator: How to Create Depth Without Overdoing It | PalettIQ",
    description:
      "How to build CSS box-shadows that create real depth instead of a heavy, fake-looking drop shadow.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

const blogFAQQuestions = [
  {
    title: "Why does my box-shadow look fake or too heavy?",
    content:
      "Almost always one of two reasons: a single shadow trying to do too much (too much blur and spread in one layer instead of splitting it into two subtler layers), or a shadow color that's pure black instead of a dark, slightly tinted version of the background.",
  },
  {
    title: "What's a layered shadow, and why does it look more realistic?",
    content:
      "It's two or more box-shadow values stacked on the same element, usually one tight, low-opacity shadow close to the edge and one softer, more spread-out shadow further away. Real-world shadows behave this way too, so stacking two shadows tends to read as more natural than one shadow trying to fake both effects at once.",
  },
  {
    title: "Should shadow color always be black?",
    content:
      "No, and this is one of the biggest upgrades most box-shadows are missing. Pure black shadows often look muddy or artificial. Using a dark, desaturated version of the element's own background color, or the page's dominant color, tends to look more grounded and less like a generic default.",
  },
  {
    title: "How many elevation levels do I actually need?",
    content:
      "Most interfaces get by fine with 3 to 4 levels — something like resting, hovered, raised (like a dropdown or modal), and maybe one for a floating action element. More than that usually adds complexity without a visible difference to users.",
  },
  {
    title: "Is it bad to put a shadow on every card or element?",
    content:
      "It dilutes the effect. If everything has a shadow, nothing reads as elevated above anything else. Shadows work best when they're reserved for elements that are meaningfully different in depth — a modal over a page, a dropdown over a list — not applied uniformly out of habit.",
  },
];

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id":
          "https://palettiq.net/blog/css-box-shadow-generator-how-to-create-depth-without-overdoing-it#article",
        headline:
          "CSS box-shadow generator: how to create depth without overdoing it",
        description:
          "How to use CSS box-shadow to create real depth instead of a harsh drop shadow — layered shadows, shadow color, elevation systems, and a practical process.",
        image: "https://palettiq.net/banner.webp",
        datePublished: "2026-07-14T00:00:00.000Z",
        dateModified: "2026-07-14T00:00:00.000Z",
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
            "https://palettiq.net/blog/css-box-shadow-generator-how-to-create-depth-without-overdoing-it",
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://palettiq.net/blog/css-box-shadow-generator-how-to-create-depth-without-overdoing-it#faqpage",
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
          "https://palettiq.net/blog/css-box-shadow-generator-how-to-create-depth-without-overdoing-it#breadcrumb",
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
            name: "CSS box-shadow generator: how to create depth without overdoing it",
            item: "https://palettiq.net/blog/css-box-shadow-generator-how-to-create-depth-without-overdoing-it",
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
            Published on 14 July, 2026 . By PalettIQ Team
          </h4>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 leading-12">
            CSS box-shadow generator: how to create depth without overdoing it
          </h1>

          <div className="w-full bg-white rounded-xl border border-gray-200 mt-6 p-8 max-sm:p-5">
            <article className="max-w-none">
              <p className="text-lg text-gray-600 leading-8">
                A card with a heavy gray blob sitting under it doesn't
                look elevated, it looks like someone dragged the default
                box-shadow value in from a tutorial and never touched it
                again. Real depth in an interface is subtle almost to the
                point of being invisible until you compare it against a
                flat element side by side. Here's the difference between a
                shadow that reads as "designed" and one that reads as
                "default," and how to actually build the former.
              </p>

              <section id="why-shadows-look-fake" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Why most box-shadows look heavy or fake
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Two habits cause almost every bad shadow. The first is
                  using pure black at a high opacity — real shadows are
                  never actually black, they're a darker, desaturated
                  version of whatever's around them, so pure black reads as
                  artificial the moment you look closely. The second is
                  trying to get the whole effect out of a single shadow
                  layer, cranking up blur and spread until it "looks
                  right," which tends to produce something soft and
                  smeared instead of something that reads as a real object
                  sitting above a surface.
                </p>
              </section>

              <section id="anatomy-of-box-shadow" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  What each part of box-shadow actually controls
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  <code className="text-sm bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">
                    box-shadow: 0px 4px 8px rgba(0,0,0,0.15);
                  </code>{" "}
                  breaks down into offset-x, offset-y, blur radius, spread
                  radius, and color. Offset-y is usually the one that
                  matters most for realism — a shadow directly behind an
                  element (0px offset) looks like a glow, not elevation; a
                  shadow pushed downward implies a light source above and
                  reads as an object actually lifted off the surface.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  Blur radius controls how soft the edge is — larger blur
                  values suit elements that are meant to feel "higher up,"
                  since real shadows get softer the further the object is
                  from the surface. Spread radius expands or shrinks the
                  shadow's size independent of blur, and it's the one most
                  people leave at zero, which is usually the right call —
                  a small negative spread is more often useful than a
                  positive one, since it keeps a soft shadow from bleeding
                  too far past the element's edges.
                </p>
              </section>

              <section id="layered-shadows" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Layering shadows instead of relying on one
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  CSS lets you stack multiple shadows on the same element,
                  comma-separated, and this is the single biggest upgrade
                  from "generic drop shadow" to "actually looks elevated."
                  A typical layered approach uses one tight, low-blur,
                  low-opacity shadow close to the element for edge
                  definition, and a second, softer, more spread-out, even
                  lower-opacity shadow further away to suggest ambient
                  depth:
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  <code className="text-sm bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded block whitespace-pre-wrap">
                    box-shadow: 0px 1px 2px rgba(0,0,0,0.08), 0px 8px 24px
                    rgba(0,0,0,0.06);
                  </code>
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  Neither layer alone would look particularly convincing.
                  Together, they mimic how real shadows actually behave —
                  a sharper contact shadow right at the base, and a diffuse
                  ambient shadow spreading outward.
                </p>
              </section>

              <section id="shadow-color" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Shadow color matters more than people think
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Instead of defaulting to black, try a dark, desaturated
                  version of the background color the element sits on, or
                  a dark tint of the page's dominant color. A card sitting
                  on a warm off-white background looks noticeably more
                  cohesive with a warm dark-brown shadow than a flat black
                  one — it reads as light interacting with the actual
                  surface instead of a generic overlay dropped on top.
                </p>
              </section>

              <section id="elevation-system" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Building an elevation system instead of one-off shadows
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Rather than inventing a new shadow value every time
                  something needs to look "raised," define a small set of
                  elevation levels once and reuse them consistently — a
                  resting state for cards sitting flat on the page, a
                  slightly raised state for hover, a stronger shadow for
                  genuinely floating elements like dropdowns and popovers,
                  and the strongest for modals sitting above everything
                  else. Each level up the scale typically increases both
                  the offset and the blur, keeping the direction and
                  general feel consistent while the intensity scales with
                  how "high" the element is meant to feel.
                </p>
              </section>

              <section id="building-one" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Building and exporting one without guessing at values
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Tuning offset, blur, spread, and color by hand and
                  refreshing a browser tab repeatedly gets tedious fast.{" "}
                  <Link
                    href="https://www.palettiq.net/studio/css-shadow-generator"
                    className="text-gray-900 font-semibold underline underline-offset-2 hover:text-gray-600"
                  >
                    PalettIQ's CSS shadow generator
                  </Link>{" "}
                  lets you adjust each value with a live preview, stack
                  multiple shadow layers, and set the shadow color
                  directly, then export the finished CSS once it actually
                  looks right instead of iterating blindly in your
                  stylesheet.
                </p>
              </section>

              <section id="common-mistakes" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  What to avoid
                </h2>
                <ul className="mt-4 space-y-3 list-disc list-inside">
                  <li className="text-gray-600 leading-7">
                    Using the same heavy shadow on every element regardless
                    of how elevated it's actually meant to feel.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Defaulting to pure black at a high opacity instead of a
                    dark, tinted, low-opacity color.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Applying shadows to everything on the page, which
                    flattens the whole point of using them to signal
                    hierarchy in the first place.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Skipping the offset entirely and centering the shadow
                    directly behind the element, which reads as a glow
                    rather than elevation.
                  </li>
                </ul>
              </section>

              <section id="faq" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Questions that come up building these
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
                  Depth should be felt, not noticed
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  The best box-shadows are the ones nobody consciously
                  registers — they just make a card feel like it's
                  genuinely sitting above the page instead of pasted onto
                  it. That effect comes from restraint: low opacity,
                  layered shadows instead of one heavy one, a tinted color
                  instead of flat black, and shadows reserved for elements
                  that actually need to feel elevated rather than applied
                  everywhere out of habit.
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
                href: "#why-shadows-look-fake",
                label: "Why Shadows Look Fake",
              },
              {
                href: "#anatomy-of-box-shadow",
                label: "Anatomy of box-shadow",
              },
              { href: "#layered-shadows", label: "Layering Shadows" },
              { href: "#shadow-color", label: "Shadow Color Matters" },
              {
                href: "#elevation-system",
                label: "Building an Elevation System",
              },
              {
                href: "#building-one",
                label: "Building One Without Guessing",
              },
              { href: "#common-mistakes", label: "What to Avoid" },
              { href: "#faq", label: "FAQ" },
              {
                href: "#conclusion",
                label: "Depth Should Be Felt, Not Noticed",
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