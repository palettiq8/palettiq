import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import type { Metadata } from "next";
import BackButton from "@/components/client/BackButon";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Fundamentals",
  title: "Color Theory Basics: A Beginner's Guide for Designers & Developers",
  description:
    "Learn color theory fundamentals — the color wheel, RGB/HEX/HSL models, color harmony schemes, accessibility, and how to build a palette step by step.",
  keywords: [
    "color theory basics",
    "color theory for beginners",
    "color theory for designers",
    "color theory for developers",
    "color wheel explained",
    "color harmony schemes",
    "complementary colors",
    "analogous color scheme",
    "triadic color scheme",
    "rgb hex hsl color models",
    "color psychology in design",
    "color contrast accessibility",
    "wcag color contrast",
    "how to build a color palette",
    "color theory in branding",
    "ui color theory",
  ],
  alternates: {
    canonical:
      "https://palettiq.net/blog/color-theory-basics-a-beginners-guide-for-designers-and-developers",
  },
  openGraph: {
    title:
      "Color Theory Basics: A Beginner's Guide for Designers & Developers | PalettIQ",
    description:
      "A complete, beginner-friendly guide to color theory — the color wheel, color models, harmony schemes, psychology, accessibility, and a step-by-step palette-building process.",
    url: "https://palettiq.net/blog/color-theory-basics-a-beginners-guide-for-designers-and-developers",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-07-19T00:00:00.000Z",
    authors: ["PalettIQ Team"],
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Color Theory Basics: A Beginner's Guide for Designers and Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Color Theory Basics: A Beginner's Guide for Designers & Developers | PalettIQ",
    description:
      "Learn the color wheel, color models, harmony schemes, psychology, and accessibility — with a step-by-step guide to building your own palette.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

const blogFAQQuestions = [
  {
    title: "Do I really need to know color theory to design well?",
    content:
      "Not strictly, some people have a good enough eye to skip it. But most of us don't, and color theory is basically a shortcut — it turns 'does this look right' into 'does this follow a relationship that reliably works,' which is a lot faster than guessing.",
  },
  {
    title: "What's the fastest way to pick a color scheme if I'm in a hurry?",
    content:
      "Pick one color you already like, then generate an analogous or complementary scheme from it instead of choosing every color individually. It's faster and the result is almost always more cohesive than hand-picking.",
  },
  {
    title: "Is HSL actually better than HEX, or is that just a developer thing?",
    content:
      "It depends what you're doing. For storing a static brand color, HEX is fine and shorter. For anything you need to lighten, darken, or generate variations of, HSL is genuinely easier to work with because you're only changing one number at a time.",
  },
  {
    title: "How strict do I need to be about the 4.5:1 contrast ratio?",
    content:
      "For body text, treat it as a hard minimum, not a suggestion — people with low vision genuinely can't read text that fails it. For large decorative text, 3:1 is the accepted floor, but more contrast rarely hurts.",
  },
  {
    title: "What's actually the difference between a color scheme and a color palette?",
    content:
      "A scheme is the relationship — complementary, analogous, whatever angle you're using. A palette is the finished result: the real HEX or HSL values you end up shipping. People use the words interchangeably, but a scheme is the rule and a palette is the output.",
  },
  {
    title: "Is there a rule for how many colors is too many?",
    content:
      "Not a hard number, but a useful test: if you can't explain what job each color is doing, you probably have too many. Most working palettes land on 2-4 core colors plus a neutral scale, and that's usually enough for anything short of a full illustration.",
  },
  {
    title: "Why do so many apps end up looking the same shade of blue?",
    content:
      "Mostly convention, not lack of imagination. Blue tests well for trust and calm, so an enormous number of products converge on it, especially anything handling money or data. It's a safe choice precisely because it's been tested by everyone before you.",
  },
];

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id":
          "https://palettiq.net/blog/color-theory-basics-a-beginners-guide-for-designers-and-developers#article",
        headline:
          "Color theory basics: a beginner's guide for designers and developers",
        description:
          "Learn color theory fundamentals — the color wheel, RGB/HEX/HSL models, color harmony schemes, accessibility, and how to build a palette step by step.",
        image: "https://palettiq.net/banner.webp",
        datePublished: "2026-07-19T00:00:00.000Z",
        dateModified: "2026-07-19T00:00:00.000Z",
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
            "https://palettiq.net/blog/color-theory-basics-a-beginners-guide-for-designers-and-developers",
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://palettiq.net/blog/color-theory-basics-a-beginners-guide-for-designers-and-developers#faqpage",
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
          "https://palettiq.net/blog/color-theory-basics-a-beginners-guide-for-designers-and-developers#breadcrumb",
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
            name: "Color theory basics: a beginner's guide for designers and developers",
            item: "https://palettiq.net/blog/color-theory-basics-a-beginners-guide-for-designers-and-developers",
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
            Published on 19 July, 2026 . By PalettIQ Team
          </h4>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 leading-12">
            Color theory basics: a beginner's guide for designers and developers
          </h1>

          <div className="w-full bg-white rounded-xl border border-gray-200 mt-6 p-8 max-sm:p-5">
            <article className="max-w-none">
              <p className="text-lg text-gray-600 leading-8">
                Most people can tell when a color combination feels off, but
                they can't say why. That gap — knowing something looks wrong
                without knowing how to fix it — is usually a color theory
                gap, not a taste problem. The good news is you don't need
                years of art school for this. A handful of ideas cover
                almost everything: how the color wheel is organized, what
                RGB, HEX, and HSL actually are, why certain color pairings
                work, and how to keep your choices readable for everyone.
                That's what this guide walks through.
              </p>

              <section id="what-is-color-theory" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  So what is color theory, actually?
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Strip away the jargon and it's just a set of observations
                  about how colors behave next to each other — which
                  combinations create tension, which ones calm down, and
                  why. Some of it comes from physics (how light mixes),
                  some from psychology (how our brains react to certain
                  hues), and a good chunk of it is just centuries of artists
                  and designers noticing patterns and writing them down.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  If you're a developer more than a designer, don't skip
                  this section thinking it's not for you. Every dark mode
                  toggle, every disabled button state, every accessible
                  color pairing you've implemented was someone applying
                  color theory, whether they called it that or not.
                </p>
              </section>

              <section id="color-wheel" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  The color wheel, and why it's still relevant
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Isaac Newton put the first version of this together back
                  in 1666, arranging colors in a circle based on how they
                  relate to each other. It sounds almost too simple to still
                  matter 350 years later, but it does — every "this pairs
                  well with that" rule you'll read about later in this
                  article comes from a fixed position on that same wheel.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  The wheel is built in layers. Primary colors — red, blue,
                  yellow — can't be mixed from anything else; they're the
                  starting point. Secondary colors (green, orange, purple)
                  come from mixing two primaries. Tertiary colors, like
                  red-orange or blue-green, come from mixing a primary with
                  its neighboring secondary. That's the full 12-color wheel
                  most palette tools are built on.
                </p>
              </section>

              <section id="color-models" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  RGB, HEX, HSL — same colors, different jobs
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  If you've written any CSS at all, you've used at least two
                  of these without thinking about it. They're not
                  competing formats — they're the same underlying colors,
                  just written in ways that suit different situations.
                </p>
                <p className="text-gray-600 leading-7 mt-2">
                  <span className="font-semibold text-gray-900">RGB</span>{" "}
                  is how screens physically work — red, green, and blue
                  light combined, each on a 0-255 scale. Pull a color value
                  straight from an image or a canvas and it usually comes
                  out as RGB, because that's what the pixels actually are.
                </p>
                <p className="text-gray-600 leading-7 mt-2">
                  <span className="font-semibold text-gray-900">HEX</span>{" "}
                  is the same RGB numbers, just rewritten in base-16 and
                  squeezed into a six-character string like{" "}
                  <code className="text-sm bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">
                    #2563EB
                  </code>
                  . It's short, it's what most design tools default to, and
                  it's genuinely useless to read at a glance — nobody can
                  look at that string and know if it's a light blue or a
                  dark one.
                </p>
                <p className="text-gray-600 leading-7 mt-2">
                  <span className="font-semibold text-gray-900">HSL</span>{" "}
                  is the one that actually maps to how people describe
                  color. Hue is the color itself, 0 to 360 degrees around
                  the wheel. Saturation is how intense it is. Lightness is
                  how close it sits to black or white. Written out, it
                  looks like{" "}
                  <code className="text-sm bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">
                    hsl(221, 83%, 53%)
                  </code>
                  . The reason this matters more than it sounds: if you
                  need a darker version of a button for its hover state,
                  you just drop the lightness number. No guessing, no
                  re-picking a new color from scratch.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  There's also CMYK, but that one's for print, not screens —
                  it's how ink subtracts light from white paper instead of
                  adding it, which is why colors can shift when a design
                  goes from Figma to a printed business card.
                </p>
              </section>

              <section id="tints-shades-tones" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Tints, shades, tones — and why one hue isn't enough
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  A single color rarely does the whole job. You need lighter
                  and darker versions of it for hover states, backgrounds,
                  borders, disabled buttons — and there's specific
                  vocabulary for how you get there. Add white and you get a{" "}
                  <span className="font-semibold text-gray-900">tint</span>{" "}
                  (pink is a tint of red). Add black and you get a{" "}
                  <span className="font-semibold text-gray-900">shade</span>{" "}
                  (maroon is a shade of red). Add gray and you get a{" "}
                  <span className="font-semibold text-gray-900">tone</span> —
                  same hue, just muted.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  This is why design systems like Tailwind or Material
                  Design ship each color as 5 to 10 steps instead of one flat
                  value. It's not decoration — it's the practical answer to
                  "what color is this button when it's disabled."
                </p>
              </section>

              <section id="color-harmony" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Color harmony: the actual formulas behind "these colors
                  work"
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  This is the part that turns color theory from trivia into
                  something you can actually use. Every pleasing color
                  combination you've ever seen follows one of a handful of
                  fixed relationships on the wheel — not random taste, an
                  actual angle.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  <span className="font-semibold text-gray-900">
                    Complementary
                  </span>{" "}
                  colors sit directly opposite each other, 180° apart —
                  blue and orange is the classic pair. Strong contrast,
                  great for a CTA button, exhausting if you use both at
                  equal strength across a whole page.{" "}
                  <span className="font-semibold text-gray-900">
                    Analogous
                  </span>{" "}
                  colors sit next to each other, roughly 30° apart, and
                  they're the safest choice when you want something calm
                  and cohesive rather than attention-grabbing.{" "}
                  <span className="font-semibold text-gray-900">
                    Triadic
                  </span>{" "}
                  spaces three colors 120° apart for something vibrant but
                  balanced, as long as you let one of the three actually
                  lead. <span className="font-semibold text-gray-900">
                    Split-complementary
                  </span>{" "}
                  softens a complementary pair by using the two colors next
                  to the complement instead of the complement itself — good
                  middle ground if straight complementary feels too harsh.{" "}
                  <span className="font-semibold text-gray-900">
                    Tetradic
                  </span>{" "}
                  uses two complementary pairs at once, which gives you the
                  most range and also the most ways to make a mess if
                  nothing's dominant. And{" "}
                  <span className="font-semibold text-gray-900">
                    monochromatic
                  </span>{" "}
                  just varies one hue's lightness and saturation — it's
                  nearly impossible to get wrong, though it won't win any
                  awards for excitement either.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  You can absolutely plot these angles by hand on a wheel.
                  Most people don't, because a harmony-based generator does
                  the same math in about two seconds — you pick a base color
                  and a scheme type, and it hands you the rest.
                </p>
              </section>

              <section id="build-a-palette" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Turning theory into an actual palette
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Knowing the rules and applying them under a deadline are
                  two different skills. Here's roughly the order most people
                  end up following, whether they realize it or not:
                </p>
                <ol className="mt-4 space-y-3 list-decimal list-inside">
                  <li className="text-gray-600 leading-7">
                    Pick one base color that actually represents the brand
                    or the mood, not just whatever you like this week.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Choose a harmony — calm and cohesive, or bold and
                    high-contrast — and generate the rest of the colors from
                    that base.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Add neutrals. Grays and off-whites will end up covering
                    more surface area than any bright color you picked.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Expand each core color into a tint/shade scale so you
                    have hover states and dark mode covered before you need
                    them, not after.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Run every text-and-background pairing through a
                    contrast checker. This step gets skipped constantly and
                    it shouldn't.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Put it on an actual button, card, or nav bar before
                    calling it done — colors read differently in context
                    than they do as isolated swatches.
                  </li>
                </ol>
              </section>

              <section id="warm-vs-cool" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Warm and cool: the quickest mood lever you have
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Reds, oranges, and yellows read as warm — energetic,
                  urgent, appetite-triggering, which is exactly why fast
                  food and entertainment brands lean on them. Blues,
                  greens, and purples read as cool — calmer, more
                  trustworthy, which is why finance and healthcare products
                  rarely stray far from them. Neither is objectively
                  "better." They're just different levers, and most
                  well-designed interfaces use mostly one temperature with
                  a touch of the other for contrast.
                </p>
              </section>

              <section id="color-psychology" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  What individual colors tend to signal
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Treat this as a loose starting point, not gospel — culture
                  and context change these associations more than most
                  "color meaning" charts admit.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 pr-4 text-sm font-semibold text-gray-900">
                          Color
                        </th>
                        <th className="py-2 text-sm font-semibold text-gray-900">
                          Common Associations
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 text-gray-600">Red</td>
                        <td className="py-2 text-gray-600">
                          Urgency, passion, appetite
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 text-gray-600">Blue</td>
                        <td className="py-2 text-gray-600">
                          Trust, calm, professionalism
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 text-gray-600">Yellow</td>
                        <td className="py-2 text-gray-600">
                          Optimism, attention, caution
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 text-gray-600">Green</td>
                        <td className="py-2 text-gray-600">
                          Growth, health, success
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 text-gray-600">Purple</td>
                        <td className="py-2 text-gray-600">
                          Luxury, creativity
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-gray-600">
                          Black / Gray
                        </td>
                        <td className="py-2 text-gray-600">
                          Elegance, minimalism
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="color-in-ui-ux" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Putting this to work in an actual interface
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Theory is nice, but a UI lives or dies on a few practical
                  rules. The 60-30-10 split — 60% neutral, 30% secondary,
                  10% accent — is a cliché at this point because it works.
                  Pick one color and make it exclusively the "click here"
                  color; the moment three different elements are competing
                  in the same bright shade, none of them win. And build the
                  full range from the start — the disabled state, the hover
                  state, and dark mode all need their own values, and it's
                  a lot less painful to plan for that up front than to
                  retrofit it later.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  Semantic color conventions matter more than people give
                  them credit for, too. Red means error, green means
                  success, yellow means warning — this isn't creative
                  territory. Users have learned these associations from
                  every other product they've ever used, and breaking the
                  pattern just to be different tends to confuse rather than
                  impress. Save the creative color decisions for your brand
                  identity, not your error states.
                </p>
              </section>

              <section id="color-in-branding" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Why every fintech app looks kind of the same
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Notice how most banking apps land somewhere in blue, most
                  food delivery apps land somewhere in red or orange, and
                  most wellness brands land somewhere in green? That's not
                  laziness, it's color psychology playing out at industry
                  scale. Blue signals safety with money. Warm tones
                  stimulate appetite. Green signals health and balance.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  You can break the convention on purpose and stand out —
                  plenty of brands have — but it only works when the rest of
                  the brand's design language backs it up. Doing it by
                  accident just reads as inconsistent.
                </p>
              </section>

              <section id="color-accessibility" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Accessibility isn't optional, even if it feels like a
                  checkbox
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  WCAG sets minimum contrast ratios for a reason: 4.5:1 for
                  normal body text, 3:1 for large text (18px+ bold or 24px+
                  regular), and 7:1 if you're aiming for the stricter AAA
                  level. Around 1 in 12 men have some form of color vision
                  deficiency, so relying on color alone to communicate
                  something — "click the green button" — quietly excludes a
                  meaningful chunk of your users. Pair color with an icon or
                  a label, and actually run your text-background pairs
                  through a checker before shipping, not after someone
                  complains.
                </p>
              </section>

              <section id="color-tools" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  You don't have to do any of this math by hand
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Everything above is genuinely useful to understand, but
                  in practice, nobody's plotting angles on a wheel with a
                  protractor. Palette generators calculate harmony
                  relationships instantly, gradient tools handle CSS output
                  without manual stop-tuning, and contrast checkers validate
                  WCAG compliance in one click.{" "}
                  <span className="font-semibold text-gray-900">
                    PalettIQ
                  </span>{" "}
                  bundles all of that together — it's free, and it's built
                  around exactly the workflow described in this guide: pick
                  a base color, generate a harmony, fine-tune it in HSL,
                  check the contrast, export the CSS.
                </p>
              </section>

              <section id="common-mistakes" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Mistakes worth watching for
                </h2>
                <ul className="mt-4 space-y-3 list-disc list-inside">
                  <li className="text-gray-600 leading-7">
                    Reaching for a brand-new color every time something
                    "feels off," instead of adjusting the lightness or
                    saturation of a color you already have.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Trusting your eye over an actual contrast check — a
                    palette can look great and still fail accessibility.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Treating dark mode as an afterthought instead of
                    planning tints and shades for both themes from day one.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Assuming a palette that looks right on your monitor will
                    look identical everywhere — it won't, so check on a
                    couple of different screens before finalizing anything.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Piling on saturated colors because each one looked fine
                    individually, without stepping back to see how they
                    compete once they're all on the same screen.
                  </li>
                  <li className="text-gray-600 leading-7">
                    Picking a palette purely because you like it personally,
                    without checking whether it actually fits the mood the
                    project is supposed to communicate.
                  </li>
                </ul>
              </section>

              <section id="quick-reference" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Terms you'll keep running into
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  A few words get thrown around constantly in color
                  discussions without much explanation, so here's what they
                  actually mean, in the order you'd probably run into them.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  <span className="font-semibold text-gray-900">Hue</span>{" "}
                  is the color itself — its position on the wheel, 0 to
                  360 degrees, independent of how light or intense it is.{" "}
                  <span className="font-semibold text-gray-900">
                    Saturation
                  </span>{" "}
                  is intensity — a low-saturation red looks washed out and
                  dusty, a high-saturation one looks almost neon.{" "}
                  <span className="font-semibold text-gray-900">
                    Lightness
                  </span>{" "}
                  (sometimes called value) is how close a color sits to
                  black or white, and it's the single most useful thing to
                  adjust when you need a hover state or a background tint.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  <span className="font-semibold text-gray-900">
                    Contrast
                  </span>{" "}
                  is the measurable difference between two colors, usually
                  expressed as a ratio, and it's what accessibility
                  standards are actually checking, not how "different" two
                  colors look to your eye.{" "}
                  <span className="font-semibold text-gray-900">
                    Color harmony
                  </span>{" "}
                  is the umbrella term for any of those fixed wheel
                  relationships — complementary, analogous, and the rest —
                  that reliably produce combinations people find pleasing
                  rather than jarring.
                </p>
              </section>

              <section id="faq" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  A few things people usually ask
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
                  Where to go from here
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  None of this needs to be memorized. Once you've picked a
                  base color and a harmony type a couple of times, the
                  pattern sticks, and "why doesn't this look right" stops
                  being a mystery. Start with one project, one base color,
                  one harmony — build it, check the contrast, and see how
                  much less guessing is involved than you expected.
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
                href: "#what-is-color-theory",
                label: "So What Is Color Theory?",
              },
              { href: "#color-wheel", label: "The Color Wheel" },
              {
                href: "#color-models",
                label: "RGB, HEX, HSL Explained",
              },
              {
                href: "#tints-shades-tones",
                label: "Tints, Shades & Tones",
              },
              { href: "#color-harmony", label: "Color Harmony" },
              {
                href: "#build-a-palette",
                label: "Building an Actual Palette",
              },
              { href: "#warm-vs-cool", label: "Warm vs. Cool" },
              { href: "#color-psychology", label: "Color Psychology" },
              { href: "#color-in-ui-ux", label: "Color in UI" },
              {
                href: "#color-in-branding",
                label: "Color in Branding",
              },
              {
                href: "#color-accessibility",
                label: "Accessibility",
              },
              { href: "#color-tools", label: "Tools That Help" },
              { href: "#common-mistakes", label: "Common Mistakes" },
              {
                href: "#quick-reference",
                label: "Quick Reference",
              },
              { href: "#faq", label: "FAQ" },
              { href: "#conclusion", label: "Where to Go From Here" },
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