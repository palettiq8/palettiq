import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how PalettIQ collects, uses, and protects your data. No accounts required, minimal data collection, and full transparency on local storage usage.",
  alternates: {
    canonical: "https://palettiq.net/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | PalettIQ",
    description:
      "Learn how PalettIQ collects, uses, and protects your data. No accounts required, minimal data collection.",
    url: "https://palettiq.net/privacy-policy",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | PalettIQ",
    description: "Learn how PalettIQ collects, uses, and protects your data.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/privacy-policy#webpage",
        url: "https://palettiq.net/privacy-policy",
        name: "Privacy Policy | PalettIQ",
        description:
          "Learn how PalettIQ collects, uses, and protects your data. No accounts required, minimal data collection.",
        inLanguage: "en-US",
        isPartOf: {
          "@id": "https://palettiq.net/#website",
        },
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
      <div className="w-full h-max max-w-350 mx-auto py-20 max-xl:px-4 max-sm:py-10">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Privacy Policy
        </h1>
        <div className="max-w-350 mx-auto mt-20 max-sm:mt-10 p-10 max-xl:p-6 border border-gray-200 rounded-xl bg-white">
          <h2 className="text-2xl font-bold text-gray-900">
            📊 Information We Collect
          </h2>
          <div className="w-full mt-5 space-y-8">
            <p className="text-gray-800 leading-relaxed">
              At PalettIQ, we are committed to collecting the minimum amount of
              data necessary to provide a smooth and fast user experience.
            </p>
            <ol className="space-y-6 list-decimal pl-5">
              <li className="space-y-2">
                <h3 className="text-gray-900 font-bold">
                  Email Address (Optional)
                </h3>
                <p className="text-gray-800">
                  We only collect an email address when users choose to
                  subscribe to product updates or notifications. This is
                  completely optional and not required to use PalettIQ.
                </p>
              </li>
              <li className="space-y-2">
                <h3 className="text-gray-900 font-bold">
                  User-Generated Content
                </h3>
                <p className="text-gray-800">
                  We may process content that users voluntarily provide, such
                  as:
                </p>
                <ul className="list-disc pl-5 text-gray-800 space-y-1">
                  <li>Feedback messages</li>
                  <li>Bug reports</li>
                  <li>Feature requests</li>
                  <li>Published palettes (Explore section)</li>
                </ul>
                <p className="text-gray-800 mt-2">
                  This information is used solely to improve the product
                  experience.
                </p>
              </li>
            </ol>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                3. Preference Data (Local Storage)
              </h3>
              <p className="text-gray-800 leading-relaxed">
                We store certain preferences locally in your browser (not on our
                servers), such as:
              </p>
              <ul className="list-disc pl-5 text-gray-800 space-y-1">
                <li>Filters</li>
                <li>UI settings</li>
                <li>Generator preferences</li>
              </ul>
              <p className="text-gray-800">
                This data remains on your device and is not transmitted to our
                backend.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                4. Automatically Collected Information (via Hosting Providers)
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Like most modern web applications, we use third-party hosting
                services (such as Vercel or similar platforms). These services
                may automatically collect limited technical data, including:
              </p>
              <ul className="list-disc pl-5 text-gray-800 space-y-1">
                <li>IP address (for security and analytics purposes)</li>
                <li>Device type and browser information</li>
                <li>Country or region (approximate location based on IP)</li>
                <li>Access logs (for performance and security monitoring)</li>
              </ul>
              <p className="text-gray-800">
                We do not use this data to personally identify users.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                5. No Direct Personal Data Collection
              </h3>
              <p className="text-gray-800">PalettIQ does NOT collect:</p>
              <ul className="list-disc pl-5 text-gray-800 space-y-1">
                <li>Names</li>
                <li>Passwords</li>
                <li>Payment information</li>
                <li>Sensitive personal data</li>
                <li>
                  Account-related data (since we do not use an account system)
                </li>
              </ul>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            🧠 How We Use Data
          </h2>
          <div className="w-full mt-5 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              We use the limited data we collect only to improve the PalettIQ
              experience, enhance performance, and provide optional features
              like email updates.
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                1. Improving Palette Generation
              </h3>
              <p className="text-gray-700">
                We analyze how users interact with palette generation and
                exploration features to improve accuracy, creativity, and
                usability of generated color palettes.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                2. Enhancing User Experience
              </h3>
              <p className="text-gray-700">
                Preference data (such as filters, UI settings, and generator
                configurations) is used to personalize and optimize the
                experience for faster and smoother usage.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                3. Email Communications (Optional)
              </h3>
              <p className="text-gray-700">
                If you subscribe with your email, we use it only to send product
                updates, new features, or important announcements related to
                PalettIQ. You can unsubscribe anytime.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                4. Security and Performance
              </h3>
              <p className="text-gray-700">
                Automatically collected technical data (such as IP address and
                device information via hosting providers) is used to ensure
                security, prevent abuse, and improve performance.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                5. Product Improvement
              </h3>
              <p className="text-gray-700">
                Feedback, bug reports, and feature requests are used internally
                to identify issues, prioritize improvements, and shape future
                updates of PalettIQ.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                6. What We Do NOT Do
              </h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>We do not sell user data</li>
                <li>We do not use data for advertising profiling</li>
                <li>We do not track users across websites</li>
                <li>We do not collect unnecessary personal information</li>
              </ul>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            🍪 Local Storage Usage
          </h2>
          <div className="w-full mt-5 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              PalettIQ uses your browser’s local storage to save certain
              preferences and improve your experience without requiring an
              account.
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                What We Store Locally
              </h3>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Selected filters (colors, moods, industries, etc.)</li>
                <li>UI preferences and settings</li>
                <li>Palette generator configurations</li>
                <li>“Download without hex” and similar toggles</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Why We Use Local Storage
              </h3>

              <p className="text-gray-700">
                We use local storage to make PalettIQ faster, more personalized,
                and frictionless — so your preferences remain even after you
                refresh or reopen the app.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Data Ownership
              </h3>

              <p className="text-gray-700">
                All data stored in local storage remains on your device. It is
                not sent to our servers and cannot be accessed by us directly.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                User Control
              </h3>

              <p className="text-gray-700">
                You can clear or reset all locally stored data anytime by
                clearing your browser storage or using the reset preferences
                option in Settings.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            📧 Email Usage
          </h2>
          <div className="w-full mt-5 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              We use your email address only if you voluntarily subscribe to
              receive product updates or important notifications from PalettIQ.
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                What We Use Your Email For
              </h3>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Product updates and new feature announcements</li>
                <li>Important service-related notifications</li>
                <li>Occasional improvement-related communication</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                No Spam Policy
              </h3>

              <p className="text-gray-700">
                We do not send spam, promotional ads, or unrelated emails. Every
                email is strictly related to PalettIQ and its improvements.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Opt-In Only
              </h3>

              <p className="text-gray-700">
                You will only receive emails if you explicitly subscribe using
                your email address. We do not add users automatically.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Unsubscribe Anytime
              </h3>

              <p className="text-gray-700">
                You can unsubscribe at any time by contacting support. Once
                unsubscribed, your email will be removed from our update list.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            🔒 Data Sharing
          </h2>
          <div className="w-full mt-5 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              PalettIQ respects your privacy and does not sell, rent, or trade
              your personal data to any third parties.
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                No Data Selling
              </h3>

              <p className="text-gray-700">
                We do not sell user data under any circumstances. Your
                information is never used for advertising brokerage or
                commercial resale.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Limited Sharing with Trusted Services
              </h3>

              <p className="text-gray-700">
                We may share minimal technical or operational data with trusted
                third-party services only when necessary to operate PalettIQ,
                such as:
              </p>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Email delivery providers (for sending updates)</li>
                <li>
                  Hosting and infrastructure providers (e.g., Vercel or similar)
                </li>
                <li>
                  Analytics or monitoring tools for performance and stability
                </li>
              </ul>

              <p className="text-gray-700 mt-2">
                These providers are only allowed to process data on our behalf
                and are not permitted to use it for their own purposes.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                No Personal Identification
              </h3>

              <p className="text-gray-700">
                Any shared data is non-personally identifiable and is used only
                for functionality, security, and performance improvements.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Control & Transparency
              </h3>

              <p className="text-gray-700">
                We ensure that any data sharing is minimal, transparent, and
                strictly required for running the platform effectively.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            🌍 Third-Party Services
          </h2>
          <div className="w-full mt-5 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              PalettIQ uses a limited number of trusted third-party services to
              ensure the platform runs smoothly, securely, and efficiently.
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Why We Use Third-Party Services
              </h3>

              <p className="text-gray-700">
                These services help us with hosting, performance, analytics, and
                optional email communications so we can focus on building and
                improving PalettIQ.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Types of Services We May Use
              </h3>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Hosting providers (e.g., Vercel or similar platforms)</li>
                <li>Email delivery services for product updates</li>
                <li>
                  Analytics tools for performance monitoring and improvement
                </li>
                <li>Error tracking and monitoring services for stability</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Data Handling by Third Parties
              </h3>

              <p className="text-gray-700">
                These third-party services may process limited technical data
                (such as IP address, device type, or browser information) only
                to provide their services. They are not allowed to use your data
                for their own purposes.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Our Responsibility
              </h3>

              <p className="text-gray-700">
                We carefully choose trusted providers that follow strong
                security and privacy standards to ensure your data remains
                protected.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            🎨 User-Generated Content
          </h2>
          <div className="w-full mt-5 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              PalettIQ allows users to create and share content such as color
              palettes, feedback, bug reports, and feature requests. This
              content is provided voluntarily by users.
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                What Counts as User-Generated Content
              </h3>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Generated and published color palettes</li>
                <li>Feedback submissions</li>
                <li>Bug reports</li>
                <li>Feature requests</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Public Content
              </h3>

              <p className="text-gray-700">
                Palettes that are published to the Explore section may be
                publicly visible to other users. Since PalettIQ does not require
                accounts, published content is not linked to personal identity.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Responsibility of Content
              </h3>

              <p className="text-gray-700">
                Users are responsible for the content they submit. Please avoid
                including any personal, sensitive, or confidential information
                in feedback or published palettes.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Content Usage
              </h3>

              <p className="text-gray-700">
                We may use user-generated content to improve PalettIQ, enhance
                features, and showcase palettes within the platform. We do not
                claim ownership of your content, but we may display and use it
                within the service.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            🔍 Public vs Private Data
          </h2>
          <div className="w-full mt-5 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              PalettIQ is designed to give users control over what becomes
              public and what stays private. Since the platform does not use
              accounts, all data handling is based on user actions.
            </p>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Public Data
              </h3>

              <p className="text-gray-700">
                Certain content may become publicly visible when users choose to
                share or publish it.
              </p>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Published palettes in the Explore section</li>
              </ul>

              <p className="text-gray-700 mt-2">
                Public content is accessible to anyone using PalettIQ and is not
                linked to personal identity, as no account system is used.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Private Data
              </h3>

              <p className="text-gray-700">
                The following data remains private and is not publicly visible:
              </p>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Email addresses (used only for product updates)</li>
                <li>Feedback, bug reports, and feature requests</li>
                <li>Local preferences stored in your browser</li>
              </ul>

              <p className="text-gray-700 mt-2">
                This information is used internally and is never displayed
                publicly.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Important Note
              </h3>

              <p className="text-gray-700">
                Since PalettIQ does not require user accounts, we cannot link
                any data directly to an individual identity. Users should avoid
                including personal or sensitive information in any publicly
                shared content.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            🧹 Data Retention
          </h2>
          <div className="w-full mt-5 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              PalettIQ retains data only for as long as it is necessary to
              provide its features and improve the overall user experience.
              Since we do not use an account system, data retention is kept
              minimal and straightforward.
            </p>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                User-Provided Data
              </h3>
              <p className="text-gray-700">
                Feedback, bug reports, and feature requests submitted by users
                may be stored for internal review and product improvement
                purposes. This data is retained only as long as needed and may
                be deleted periodically.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Email Data
              </h3>
              <p className="text-gray-700">
                Email addresses provided for product updates are stored until
                the user requests removal or until they are no longer needed for
                communication purposes.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Public Content
              </h3>
              <p className="text-gray-700">
                Published palettes may remain publicly available in the Explore
                section unless they are removed or replaced as part of system
                updates or moderation.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Local Data (Browser Storage)
              </h3>
              <p className="text-gray-700">
                Preferences and settings stored in your browser remain on your
                device until you manually clear them or reset your preferences
                within the application.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Important Note
              </h3>

              <p className="text-gray-700">
                We aim to retain as little data as possible and do not store
                personal information beyond what is necessary to operate and
                improve PalettIQ.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            ⚙️ User Control
          </h2>
          <div className="w-full mt-5 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              PalettIQ is designed to give users full control over their data
              and preferences. Since no account system is required, most
              controls are handled directly within your browser or through
              simple actions.
            </p>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Managing Preferences
              </h3>
              <p className="text-gray-700">
                You can change or reset your preferences at any time from the
                Settings section. This includes filters, UI settings, and
                generator configurations.
              </p>
              <p className="text-gray-700">
                You can also clear your browser storage manually, which will
                remove all saved preferences instantly.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Email Control
              </h3>
              <p className="text-gray-700">
                If you have subscribed to product updates, you can request
                removal of your email at any time by contacting our support
                team. Once removed, you will no longer receive update
                notifications.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Content Control
              </h3>

              <p className="text-gray-700">
                Any content you choose to submit, such as feedback, bug reports,
                or feature requests, is voluntary. You are free to decide what
                information to share.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Important Note
              </h3>

              <p className="text-gray-700">
                Because PalettIQ does not use user accounts, we cannot directly
                associate data with a specific individual. For this reason,
                certain actions (such as editing or deleting previously
                submitted content) may not always be possible after submission.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            🚫 No Sensitive Data Collection
          </h2>
          <div className="w-full mt-5 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              PalettIQ does not collect or request any sensitive personal
              information from users.
            </p>

            <p className="text-gray-700">
              We do <strong>not</strong> collect:
            </p>

            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Passwords or login credentials</li>
              <li>Payment or billing information</li>
              <li>Government-issued identification</li>
              <li>Health, biometric, or financial data</li>
              <li>Personal identity details such as full name or address</li>
            </ul>

            <p className="text-gray-700">
              Since PalettIQ does not use an account system, there is no need to
              collect or store sensitive user data.
            </p>

            <p className="text-gray-700">
              We strongly recommend that users avoid sharing any personal or
              sensitive information in feedback messages, bug reports, or any
              publicly shared content.
            </p>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-10">
            🔄 Updates to Privacy Policy
          </h2>
          <div className="w-full mt-5 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect
              changes in our features, practices, or legal requirements.
            </p>

            <p className="text-gray-700">
              When updates are made, the revised version will be published on
              this page with an updated effective date.
            </p>

            <p className="text-gray-700">
              We encourage users to review this page periodically to stay
              informed about how their information is handled.
            </p>

            <p className="text-gray-700">
              Continued use of PalettIQ after any changes indicates your
              acceptance of the updated Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </CommonHeaderFooterSection>
  );
}
