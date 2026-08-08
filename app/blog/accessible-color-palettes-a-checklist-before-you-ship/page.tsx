import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import type { Metadata } from "next";
import BackButton from "@/components/client/BackButon";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Accessibility",
  title: "Accessible Color Palettes: A Checklist Before You Ship",
  description:
    "A practical, run-through-it-once checklist for shipping accessible color palettes — contrast, color-blind safety, dark mode, and the tests that actually catch problems.",
  keywords: [
    "accessible color palette checklist",
    "color accessibility checklist",
    "wcag color checklist",
    "accessible color palette",
    "color contrast checklist",
    "color blind safe checklist",
    "accessibility audit colors",
    "dark mode accessibility",
    "accessible design system colors",
    "pre launch accessibility check",
  ],
  alternates: {
    canonical:
      "https://palettiq.net/blog/accessible-color-palettes-a-checklist-before-you-ship",
  },
  openGraph: {
    title: "Accessible Color Palettes: A Checklist Before You Ship | PalettIQ",
    description:
      "A practical checklist to run through before shipping any palette — contrast ratios, color-blind safety, dark mode, and how to actually test each one.",
    url: "https://palettiq.net/blog/accessible-color-palettes-a-checklist-before-you-ship",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-07-16T00:00:00.000Z",
    authors: ["PalettIQ Team"],
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Accessible Color Palettes: A Checklist Before You Ship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessible Color Palettes: A Checklist Before You Ship | PalettIQ",
    description:
      "A practical, run-through-it-once checklist for shipping accessible color palettes.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

const blogFAQQuestions = [
  {
    title:
      "How long does a full accessibility pass on a palette actually take?",
    content:
      "For a small palette (2-4 core colors plus neutrals), the full checklist below usually takes 20-30 minutes once you know what you're checking for. The five-minute version at the top catches most of the serious issues if that's all the time you have.",
  },
  {
    title: "Do I need to redo this every time I add a new color?",
    content:
      "Not the whole checklist, just the parts specific to that color: its contrast against the backgrounds and text it'll actually sit near, and a quick color-blind simulator pass if it's replacing or sitting next to an existing semantic color.",
  },
  {
    title: "What if my brand colors just don't pass, and I can't change them?",
    content:
      "You almost never need to change the brand color itself, just where and how it's used. Reserve it for large elements or accents that only need 3:1, and use a passing variant of it for anything that needs to hit the stricter text ratios.",
  },
  {
    title:
      "Is this checklist enough, or do I need a full accessibility audit too?",
    content:
      "This covers color specifically, which is one real slice of accessibility, not the whole picture. Screen reader support, keyboard navigation, and focus states are separate concerns this checklist doesn't touch, so treat it as one part of a broader accessibility pass, not a replacement for one.",
  },
];

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id":
          "https://palettiq.net/blog/accessible-color-palettes-a-checklist-before-you-ship#article",
        headline: "Accessible color palettes: a checklist before you ship",
        description:
          "A practical, run-through-it-once checklist for shipping accessible color palettes — contrast, color-blind safety, dark mode, and the tests that actually catch problems.",
        image: "https://palettiq.net/banner.webp",
        datePublished: "2026-07-16T00:00:00.000Z",
        dateModified: "2026-07-16T00:00:00.000Z",
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
            "https://palettiq.net/blog/accessible-color-palettes-a-checklist-before-you-ship",
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://palettiq.net/blog/accessible-color-palettes-a-checklist-before-you-ship#faqpage",
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
          "https://palettiq.net/blog/accessible-color-palettes-a-checklist-before-you-ship#breadcrumb",
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
            name: "Accessible color palettes: a checklist before you ship",
            item: "https://palettiq.net/blog/accessible-color-palettes-a-checklist-before-you-ship",
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
            Published on 16 July, 2026 . By PalettIQ Team
          </h4>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 leading-12">
            Accessible color palettes: a checklist before you ship
          </h1>

          <div className="w-full bg-white rounded-xl border border-gray-200 mt-6 p-8 max-sm:p-5">
            <article className="max-w-none">
              <p className="text-lg text-gray-600 leading-8">
                Most accessibility problems in a color palette don't show up
                until someone actually goes looking for them — which is usually
                right before launch, or worse, right after. This is the list
                worth running through before either happens. It's not a deep
                dive into the reasoning behind each rule — that's covered
                elsewhere — this is the practical, check-it-and-move-on version
                for when you're actually shipping something.
              </p>

              <section
                id="the-five-minute-version"
                className="mt-10 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  If you only have five minutes
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Run your primary text-on-background pairing through a contrast
                  checker and confirm it clears 4.5:1. Check that no two
                  semantically different states — error versus success, active
                  versus inactive — rely on color as the only differentiator.
                  Then glance at your interface in grayscale for ten seconds; if
                  two things you need to tell apart become the same shade of
                  gray, that's your biggest problem, fix that one first. Those
                  three checks alone catch the majority of real-world failures.
                </p>
              </section>

              <section id="contrast-checklist" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">Contrast</h2>
                <ul className="mt-4 space-y-3">
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Body text hits 4.5:1
                    </span>{" "}
                    against its background — this is the one people remember,
                    but it's worth explicitly confirming rather than assuming.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Large text hits at least 3:1
                    </span>{" "}
                    — 18pt regular or 14pt bold and up counts as large; if
                    you're not sure a heading qualifies, check its actual
                    computed size rather than guessing from how it looks.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Button borders and form field outlines hit 3:1
                    </span>{" "}
                    against their surrounding color — this one gets missed
                    constantly because it's easy to only think about text.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Placeholder text and disabled states
                    </span>{" "}
                    are checked separately — they're often deliberately muted,
                    but "muted" and "fails contrast entirely" aren't the same
                    thing, and it's easy to cross that line without noticing.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Text over images or gradients
                    </span>{" "}
                    is checked at its worst-case point, not its best — contrast
                    against a gradient needs to hold up at the lightest part of
                    that gradient, not just the average.
                  </li>
                </ul>
              </section>

              <section
                id="beyond-color-checklist"
                className="mt-10 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  Beyond color alone
                </h2>
                <ul className="mt-4 space-y-3">
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Every error/success/warning state pairs color with an icon
                      or label
                    </span>{" "}
                    — not just a colored border or dot, actual text or
                    iconography that survives if the color itself gets misread.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Links are distinguishable by more than color
                    </span>{" "}
                    — underline, weight change, or both, especially for links
                    sitting inline inside body text.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Charts and graphs don't rely purely on a color legend
                    </span>{" "}
                    — direct labeling, pattern fills, or line-style variation
                    should carry the same information the colors do.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Red/green pairs have been tested for color-blind confusion
                    </span>{" "}
                    specifically — run a simulator over any red/green pairing
                    that's carrying real meaning, since it's the single most
                    common failure pattern.
                  </li>
                </ul>
              </section>

              <section id="dark-mode-checklist" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Dark mode, if you have it
                </h2>
                <ul className="mt-4 space-y-3">
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Contrast is re-checked independently
                    </span>{" "}
                    for dark mode — a pairing that passes in light mode doesn't
                    automatically pass once the background flips, and it needs
                    its own separate check.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Pure black backgrounds are avoided
                    </span>{" "}
                    where possible — very dark gray tends to reduce eye strain
                    and glare compared to true black, without sacrificing the
                    contrast benefit.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Brand colors are desaturated slightly for dark backgrounds
                    </span>{" "}
                    — fully saturated colors tend to vibrate uncomfortably
                    against dark backgrounds in a way they don't against light
                    ones.
                  </li>
                </ul>
              </section>

              <section id="testing-checklist" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Actually testing it
                </h2>
                <ul className="mt-4 space-y-3">
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Run a contrast checker on every text/background pair
                    </span>{" "}
                    that appears more than once in the interface, not just the
                    obvious ones.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Run a color-blindness simulator
                    </span>{" "}
                    over your key screens — dashboards, forms, and anything with
                    status indicators or charts get priority.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      View the design in grayscale
                    </span>{" "}
                    as a quick sanity check — anything that becomes
                    indistinguishable is worth a second look regardless of what
                    the simulator says.
                  </li>
                  <li className="text-gray-600 leading-7">
                    <span className="font-semibold text-gray-900">
                      Test on an actual low-end or older screen
                    </span>{" "}
                    if you can — colors that look fine on a calibrated design
                    monitor sometimes wash out noticeably on cheaper or older
                    displays.
                  </li>
                </ul>
              </section>

              <section
                id="why-this-gets-skipped"
                className="mt-10 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  Why this list gets skipped even when everyone agrees it
                  matters
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Not because people don't care, usually just because it gets
                  treated as a final QA step instead of part of picking the
                  palette in the first place. By the time contrast gets checked,
                  the colors are already locked into a hundred components, and
                  fixing a failing pairing means touching all of them instead of
                  adjusting one value before anything got built on top of it.
                  Running through this list while a palette is still being
                  decided, rather than after it's already shipped everywhere, is
                  the actual difference between a five-minute fix and a
                  multi-day one.
                </p>
              </section>

              <section id="faq" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Questions people ask about running this
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
                  Print this, or just bookmark it
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  None of these checks take long individually — the whole list
                  together is maybe half an hour the first time you run through
                  it properly, and closer to five minutes once it's a habit
                  instead of a novelty. The cost of skipping it isn't paid by
                  you, it's paid by whoever hits the broken pairing after
                  launch, which is exactly why it's worth doing before shipping
                  rather than after.
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
                href: "#the-five-minute-version",
                label: "The Five-Minute Version",
              },
              { href: "#contrast-checklist", label: "Contrast" },
              {
                href: "#beyond-color-checklist",
                label: "Beyond Color Alone",
              },
              { href: "#dark-mode-checklist", label: "Dark Mode" },
              { href: "#testing-checklist", label: "Actually Testing It" },
              {
                href: "#why-this-gets-skipped",
                label: "Why This Gets Skipped",
              },
              { href: "#faq", label: "FAQ" },
              {
                href: "#conclusion",
                label: "Print This or Bookmark It",
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
