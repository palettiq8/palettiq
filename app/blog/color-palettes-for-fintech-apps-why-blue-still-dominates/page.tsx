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
  title: "Color Palettes for Fintech Apps: Why Blue Still Dominates",
  description:
    "Eight real fintech color palettes examined — why blue remains the dominant choice in finance, what makes one blue read as trustworthy over another, and when breaking convention actually works.",
  keywords: [
    "fintech color palette",
    "fintech app colors",
    "why is fintech blue",
    "banking app color scheme",
    "finance app color palette",
    "trust colors in design",
    "fintech branding colors",
    "blue in finance branding",
    "fintech ui color examples",
    "color psychology finance",
  ],
  alternates: {
    canonical:
      "https://palettiq.net/blog/color-palettes-for-fintech-apps-why-blue-still-dominates",
  },
  openGraph: {
    title:
      "Color Palettes for Fintech Apps: Why Blue Still Dominates | PalettIQ",
    description:
      "Eight real fintech palettes examined in depth — why blue dominates finance, what separates a good fintech blue from a generic one, and when it's worth breaking convention.",
    url: "https://palettiq.net/blog/color-palettes-for-fintech-apps-why-blue-still-dominates",
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
        alt: "Color Palettes for Fintech Apps: Why Blue Still Dominates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Color Palettes for Fintech Apps: Why Blue Still Dominates | PalettIQ",
    description:
      "Why blue dominates fintech branding, and eight real palettes examined for what actually makes each one work.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

const blogFAQQuestions = [
  {
    title: "Is blue actually required for a fintech app to feel trustworthy?",
    content:
      "No, but it's the lowest-risk choice, which is exactly why so many teams default to it. Trust can be built through other means — clean typography, clear data presentation, a strong track record — but color is the fastest signal a user processes before any of that, and blue has the deepest existing association with financial safety.",
  },
  {
    title: "Why do so many banks specifically use dark navy instead of bright blue?",
    content:
      "Darker, less saturated blues tend to read as more serious and established, while brighter, more saturated blues read as more energetic and consumer-friendly. Traditional banks lean dark and conservative because their positioning depends on stability; newer fintech apps often lean brighter because they're competing on approachability instead.",
  },
  {
    title: "Is it risky for a new fintech startup to avoid blue entirely?",
    content:
      "It's a real trade-off, not a simple risk. Avoiding blue means giving up an easy trust shortcut, but it also means standing out in a category where most competitors look similar. It tends to work best for products targeting a specific, well-defined audience rather than trying to appeal to the broadest possible user base.",
  },
  {
    title: "What's the difference between a 'safe' fintech blue and a 'generic' one?",
    content:
      "A safe blue is deliberately chosen and paired with a considered supporting palette; a generic one is whatever blue a template or component library shipped with by default. The difference usually shows up in the supporting neutrals and accent color, not the blue itself, since generic implementations rarely put thought into anything beyond the primary hue.",
  },
  {
    title: "Does red ever make sense in a fintech product?",
    content:
      "Yes, though it's a narrower use case. Red carries urgency and energy, which can work for trading platforms or products built around fast-moving, high-stakes decisions, but it fights against the calm, stable feeling most everyday banking and personal finance products are trying to create.",
  },
  {
    title: "How do I know if my fintech palette is too close to a competitor's?",
    content:
      "If someone could recolor your competitor's screenshot and mistake it for yours, that's a real signal. It's less about the exact hue and more about the overall composition, saturation level, and how the accent color is used, so check the whole palette relationship, not just whether you're both using blue.",
  },
  {
    title: "Does a fintech palette need to work in dark mode too?",
    content:
      "Increasingly, yes, especially for consumer-facing products. A palette that only looks trustworthy on a white background needs a separate pass for dark mode — deep navy blues in particular can lose contrast and start to feel murky against a dark background unless the whole scale is deliberately re-tuned rather than just inverted.",
  },
];

const palettes = [
  {
    name: "Deep Blue Scale",
    slug: "https://www.palettiq.net/palettes/1-deep-blue-scale",
    colors: ["#03045E", "#023E8A", "#0077B6", "#00B4D8", "#90E0EF"],
    useCase: "Core banking apps and payment platforms",
    note: "This is the most literal version of 'fintech blue' on this list — a single hue taken all the way from near-black navy down to a light, almost sky-toned cyan. It's a monochromatic palette in the truest sense, and that restraint is exactly what makes it read as serious. Nothing here is competing with the blue for attention, which is precisely the point for a product where the actual data, not the branding, needs to be the star.",
  },
  {
    name: "Corporate Trust",
    slug: "https://www.palettiq.net/palettes/50-corporate-trust",
    colors: ["#1A2238", "#2D3E50", "#546E7A", "#B0BEC5", "#FFFFFF"],
    useCase: "Enterprise fintech, B2B payment infrastructure",
    note: "Notice this one barely reads as 'blue' at first glance — it's closer to a blue-gray scale, desaturated almost to the point of feeling neutral. That's a deliberate move for enterprise-facing products, where the buyer is a finance or ops team evaluating vendors on stability and seriousness, not a consumer being sold on friendliness. The near-white at one end and near-black at the other give it enough range to function as a full UI system, not just a marketing palette.",
  },
  {
    name: "Nordic Breeze",
    slug: "https://www.palettiq.net/palettes/93-nordic-breeze",
    colors: ["#1D3557", "#457B9D", "#A8DADC", "#F1FAEE", "#E63946"],
    useCase: "Consumer banking and budgeting apps",
    note: "This is where the pattern gets interesting — four calm, cool blues and a single sharp red dropped in at the end. That red isn't a mistake or a competing signal, it's the whole strategy: reserve every warm, high-energy color for the one thing that actually needs urgency, like a spending alert or an overdue payment, while everything else stays calm and trustworthy. It's a genuinely smart approach for personal finance products, where you want most of the interface to feel safe but specific moments to actually grab attention.",
  },
  {
    name: "Crimson Horizon",
    slug: "https://www.palettiq.net/palettes/61-crimson-horizon",
    colors: ["#780000", "#C1121F", "#FDF0D5", "#003049", "#669BBC"],
    useCase: "Trading platforms and high-frequency financial tools",
    note: "The clearest exception on this list, and worth studying specifically because it works. Deep crimson and bright red take the lead here, with the blue pushed to a supporting role instead of dominating. This makes sense once you consider the audience: traders live inside red and green all day already, tracking gains and losses, and a palette that leans into that energy rather than fighting it can feel more native to the product than a calm banking blue would. This is a case where breaking the dominant convention isn't rebellion for its own sake, it's matching the actual emotional register of the use case.",
  },
  {
    name: "Periwinkle Frost",
    slug: "https://www.palettiq.net/palettes/102-periwinkle-frost",
    colors: ["#22223B", "#4A4E69", "#9A8C98", "#C9BBCF", "#E5E5E5"],
    useCase: "Budgeting apps and consumer fintech targeting younger users",
    note: "Technically a blue-purple palette, but it reads softer and more approachable than anything else on this list, largely because of that dusty mauve sitting in the middle. This is closer to what a lot of newer, Gen Z and millennial-targeted fintech products have been drifting toward — enough blue-family DNA to still feel financially credible, but warmed up just enough to avoid feeling like a legacy institution. It's a good example of bending the convention slightly rather than breaking it outright.",
  },
  {
    name: "Indigo Calm",
    slug: "https://www.palettiq.net/palettes/150-indigo-calm",
    colors: ["#1A1060", "#2D2088", "#5048C8", "#A09AE8", "#EEF0FF"],
    useCase: "Investment and wealth management platforms",
    note: "Indigo sits at the boundary between blue's trustworthiness and purple's premium, forward-looking association, and this palette leans into exactly that overlap. It suits investment products particularly well, where the brand needs to say both 'we're safe with your money' and 'we're sophisticated enough to grow it,' two messages a plain blue alone doesn't quite cover on its own.",
  },
  {
    name: "Nordic Frost",
    slug: "https://www.palettiq.net/palettes/58-nordic-frost",
    colors: ["#004A7C", "#74B9FF", "#D9E3F0", "#616161", "#FFFFFF"],
    useCase: "Neobanks and mobile-first banking apps",
    note: "Brighter and airier than Deep Blue Scale or Corporate Trust, this palette trades some of that heavier, institutional weight for something that feels more like a modern app than a legacy bank. The pale blue-gray background and generous white space give it a lightness that suits mobile-first products competing on ease of use rather than decades of brand history — a newer bank has to earn trust through the product experience itself, and a heavier, darker palette can actually work against that if it makes the app feel slower or more bureaucratic than it is.",
  },
  {
    name: "Forest Ledger",
    slug: "https://www.palettiq.net/palettes/559-forest-ledger",
    colors: ["#143109", "#AAAE7F", "#D0D6B3", "#F7F7F7", "#EFEFEF"],
    useCase: "Sustainable investing and green finance products",
    note: "The other genuine departure from blue on this list, and it works for a specific, narrow reason: green already carries a financial meaning independent of nature and sustainability — it's the color of growth, gains, and positive numbers on every trading screen ever built. A green-led fintech palette gets to borrow that existing financial association while also signaling an ESG or sustainability angle, which is a harder message to send convincingly through blue alone.",
  },
];

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id":
          "https://palettiq.net/blog/color-palettes-for-fintech-apps-why-blue-still-dominates#article",
        headline:
          "Color palettes for fintech apps: why blue still dominates",
        description:
          "Eight real fintech color palettes examined — why blue remains the dominant choice in finance, what makes one blue read as trustworthy over another, and when breaking convention actually works.",
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
            "https://palettiq.net/blog/color-palettes-for-fintech-apps-why-blue-still-dominates",
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://palettiq.net/blog/color-palettes-for-fintech-apps-why-blue-still-dominates#faqpage",
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
          "https://palettiq.net/blog/color-palettes-for-fintech-apps-why-blue-still-dominates#breadcrumb",
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
            name: "Color palettes for fintech apps: why blue still dominates",
            item: "https://palettiq.net/blog/color-palettes-for-fintech-apps-why-blue-still-dominates",
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
            Color palettes for fintech apps: why blue still dominates
          </h1>

          <div className="w-full bg-white rounded-xl border border-gray-200 mt-6 p-8 max-sm:p-5">
            <article className="max-w-none">
              <p className="text-lg text-gray-600 leading-8">
                Open ten fintech apps and count how many use some shade of
                blue as their primary color. It'll be most of them, and
                that's not a coincidence or a failure of imagination — it's
                one of the most consistent, deliberate color decisions in
                the entire software industry. This isn't really an article
                about "the best fintech colors." It's about why one color
                has held this much territory for this long, what separates
                a genuinely well-executed fintech blue from a lazy one, and
                the specific, narrow situations where a team is right to
                break from it entirely.
              </p>

              <section id="why-blue-dominates" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Why blue took over finance in the first place
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  The association didn't start with software. Traditional
                  banks were using deep blues and navy in their branding
                  decades before the first fintech app existed, and that
                  history matters more than most modern product teams give
                  it credit for. Blue is consistently the color people
                  associate with stability, calm, and trust across
                  cross-cultural studies, and finance is an industry where
                  trust isn't a nice-to-have brand attribute, it's the
                  entire product. Nobody hands a stranger their money
                  because the interface looked exciting.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  There's also a psychological angle specific to the color
                  itself: blue is one of the few colors with almost no
                  negative associations across most contexts. Red carries
                  danger and urgency. Yellow carries caution. Green is
                  mostly positive but gets tangled up with "go" and
                  "money" in ways that can feel presumptuous before a user
                  has actually made any money. Blue mostly just sits there,
                  calm and unthreatening, which is exactly the emotional
                  register you want someone in when they're looking at
                  their account balance or entering a card number.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  And then there's the network effect, which is arguably
                  the strongest force at this point: once enough major
                  banks and fintech products used blue, it stopped being
                  just "a trustworthy color" and became "the color
                  financial products are supposed to be." A new fintech
                  startup choosing blue isn't just picking a color with
                  good individual psychology, it's opting into an entire
                  category convention that users have been trained on for
                  years. Deviating from it means doing extra work to earn
                  the trust that blue hands you for free.
                </p>
              </section>

              <section id="not-all-blue-equal" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Not every fintech blue is doing the same job
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  This is the part that gets flattened in most "use blue
                  for finance" advice, and it's the actual difference
                  between a considered palette and a generic one. A deep,
                  desaturated navy communicates something meaningfully
                  different from a bright, saturated cyan, even though
                  both are technically "blue." Darker, lower-saturation
                  blues read as established, serious, and a little
                  conservative — the kind of blue you'd expect from a bank
                  that's been operating for a hundred years. Brighter,
                  more saturated blues read as energetic and modern,
                  closer to what a consumer-facing neobank trying to feel
                  approachable and fast would reach for.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  The supporting palette matters just as much as the blue
                  itself. A blue paired with warm neutrals feels friendlier
                  than the same blue paired with cool grays. A blue with a
                  single, carefully placed accent color feels more
                  intentional than a blue with three or four competing
                  bright colors scattered across the interface. This is
                  why two products can both be "blue fintech apps" and
                  still feel completely different to use — the hue is
                  doing maybe a third of the actual communication work, and
                  everything around it is doing the rest.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  There's a version of this that shows up constantly in
                  practice: a founder or design lead picks "a nice blue"
                  without articulating which of these registers they
                  actually want, and the resulting palette ends up
                  communicating something slightly off from the product's
                  real positioning — a serious enterprise tool that
                  accidentally looks playful, or a friendly consumer app
                  that accidentally looks cold and institutional. Getting
                  specific about warmth, saturation, and darkness before
                  picking a single hex value solves most of this before it
                  becomes a problem someone has to notice and fix later.
                </p>
              </section>

              <section id="the-palettes" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Eight real palettes, examined
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Six of the eight below lean into blue in different ways —
                  worth comparing side by side to see how much range
                  actually exists inside "fintech blue" once you look
                  closely. The other two step outside it entirely, and
                  they're included specifically because they show what it
                  takes to make that departure work rather than just look
                  like an accident.
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
                  <p className="text-gray-600 leading-7 mt-2">
                    {palette.note}
                  </p>
                  <Link
                    href={palette.slug}
                    className="inline-block text-sm text-gray-900 font-semibold underline underline-offset-2 hover:text-gray-600 mt-3"
                  >
                    View the full {palette.name} palette
                  </Link>
                </section>
              ))}

              <section id="the-sameness-problem" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  The cost of everyone making the same safe choice
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  There's a real trade-off hiding inside all of this that
                  doesn't get talked about enough. Blue's dominance solves
                  the trust problem efficiently, but it creates a second
                  problem in its place: differentiation. When most of a
                  category converges on the same hue family, the actual
                  work of standing out shifts entirely onto the supporting
                  palette, the typography, and the product experience,
                  because the primary color stopped being a distinguishing
                  factor the moment everyone adopted it.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  This is why the strongest palettes on this list aren't
                  the ones that use blue "correctly" in some textbook
                  sense, they're the ones where the supporting colors and
                  overall composition do real work. Nordic Breeze's single
                  red accent against four calm blues is a more
                  distinguishing decision than the exact shade of blue it
                  starts with. Corporate Trust's near-neutral, barely-blue
                  restraint says more about the product's positioning than
                  a brighter, more literal blue would. The hue gets you in
                  the door; everything built around it is what actually
                  makes a fintech product's color identity memorable
                  rather than interchangeable.
                </p>
              </section>

              <section id="saturation-and-lightness" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  What saturation and lightness are actually communicating
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Looking at these palettes through an HSL lens instead of
                  just "which blue" makes the differences much clearer.
                  Deep Blue Scale and Corporate Trust both sit at fairly
                  low-to-moderate saturation, which is what gives them
                  that composed, institutional feeling — high-saturation
                  colors read as energetic and demand attention, and
                  attention-demanding isn't the goal when someone's
                  checking their account balance. Nordic Frost, by
                  contrast, pushes lightness up considerably across its
                  blue range, which is what makes it feel airier and more
                  approachable than its darker counterparts despite using
                  a similar hue family.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  The exceptions prove this same rule from the other
                  direction. Crimson Horizon's reds sit at genuinely high
                  saturation, which is exactly why they read as urgent
                  rather than calm — lowering that saturation even
                  slightly would soften the palette into something closer
                  to a lifestyle brand than a trading tool. Forest
                  Ledger's olive-greens, meanwhile, stay relatively muted
                  and paired with warm neutrals rather than pure white,
                  which keeps the "sustainable" association feeling earthy
                  and grounded instead of loud. In every case here, the
                  hue picks the category, but saturation and lightness
                  decide how loudly or quietly that category gets
                  expressed.
                </p>
              </section>

              <section id="when-to-break-convention" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  When it's actually right to skip blue
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Crimson Horizon and Forest Ledger aren't outliers because
                  someone got bored of blue — they work because the
                  product context genuinely called for something else.
                  That's the pattern worth internalizing rather than "blue
                  is safe, everything else is risky." A trading platform
                  built around fast, high-stakes decisions has a
                  legitimate reason to borrow red's urgency instead of
                  fighting it with a calming blue that doesn't match how
                  the product actually feels to use. A sustainable
                  investing product has a legitimate reason to reach for
                  green, which already does double duty as both a
                  sustainability signal and a financial-growth signal.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  The failure mode isn't choosing a non-blue color, it's
                  choosing one without a specific reason tied to the actual
                  product and audience. Blue's dominance in fintech exists
                  because it's the correct default for the broadest set of
                  financial products — savings, everyday banking, general
                  personal finance — where calm and trust are the primary
                  jobs the color needs to do. The exceptions earn their
                  place by serving a narrower, more specific emotional
                  register that blue doesn't cover as well.
                </p>
              </section>

              <section id="picking-for-your-product" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  A quick way to sanity-check your own choice
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Before locking in a fintech palette, it's worth asking a
                  few honest questions instead of just picking whatever
                  blue felt closest to "professional" in a color picker.
                  What's the single emotion this product needs a user to
                  feel in the first five seconds — calm, urgency,
                  ambition, safety? Does the audience skew toward an
                  established, risk-averse buyer, or a younger user who
                  already associates traditional bank branding with
                  something slow and outdated? And honestly, would a
                  screenshot of this product be distinguishable from three
                  competitors if you stripped the logo out?
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  Most of the time, the honest answers point back toward
                  some version of blue, just not necessarily the generic
                  default version. The real differentiation in fintech
                  color usually comes from the supporting palette, the
                  saturation level, and how disciplined the accent color
                  usage is, not from abandoning the hue that's earned its
                  place for good reason.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  It's also worth testing the palette against your actual
                  product screens, not just a marketing landing page. A
                  blue that looks composed and trustworthy in a hero
                  section can behave very differently once it's spread
                  across a dense dashboard full of numbers, charts, and
                  transaction lists. Finance products tend to be
                  data-heavy by nature, and a color that reads as calm in
                  isolation can start to feel flat or even slightly
                  depressing once it's the dominant tone across a screen
                  someone stares at for ten minutes while reconciling
                  their spending. This is usually where the neutral scale
                  matters more than the brand blue itself — a well-built
                  gray scale sitting underneath the blue is what keeps a
                  data-dense fintech interface feeling clear rather than
                  monotonous.
                </p>
              </section>

              <section id="faq" className="mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900">
                  Questions worth answering before you commit to a palette
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
                  Blue earned its place, it wasn't just inherited
                </h2>
                <p className="text-gray-600 leading-7 mt-4">
                  Blue's dominance in fintech isn't a failure of
                  imagination across an entire industry, even though it
                  can look that way from the outside. It's the accumulated
                  result of decades of a color doing its job better than
                  the alternatives for the specific emotional problem
                  finance products need to solve: get a stranger to trust
                  you with their money in the first few seconds of looking
                  at a screen. The teams that break from it successfully
                  aren't rejecting that logic, they're applying the same
                  logic to a narrower, different emotional problem their
                  specific product actually has.
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  If you're building something in this space, the useful
                  question isn't "should I use blue." It's "what does this
                  specific product need a user to feel in the first five
                  seconds, and which of these eight approaches actually
                  gets them there."
                </p>
                <p className="text-gray-600 leading-7 mt-4">
                  Whichever direction that answer points, the color itself
                  is only ever the opening move. Every palette on this
                  list still has to earn its trust the same way the rest
                  of the product does — through clear data, honest
                  copy, and an interface that doesn't make someone work to
                  understand where their own money is going. Blue gets you
                  a faster first impression. It doesn't get you out of
                  building the rest of it well.
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
                href: "#why-blue-dominates",
                label: "Why Blue Took Over Finance",
              },
              {
                href: "#not-all-blue-equal",
                label: "Not Every Blue Is the Same",
              },
              { href: "#the-palettes", label: "Eight Real Palettes" },
              ...palettes.map((palette, index) => ({
                href: `#palette-${index + 1}`,
                label: `${index + 1}. ${palette.name}`,
              })),
              {
                href: "#the-sameness-problem",
                label: "The Sameness Problem",
              },
              {
                href: "#saturation-and-lightness",
                label: "Saturation & Lightness",
              },
              {
                href: "#when-to-break-convention",
                label: "When to Skip Blue",
              },
              {
                href: "#picking-for-your-product",
                label: "A Quick Sanity Check",
              },
              { href: "#faq", label: "FAQ" },
              {
                href: "#conclusion",
                label: "Blue Earned Its Place",
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