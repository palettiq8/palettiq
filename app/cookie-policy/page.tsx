import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";

export default function page() {
  return (
    <CommonHeaderFooterSection>
      <div className="w-full h-max max-w-350 mx-auto py-20 max-xl:px-4 max-sm:py-10">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Cookie Policy
        </h1>
        <div className="max-w-350 mx-auto mt-20 max-sm:mt-10 p-10 max-xl:p-6 border border-gray-200 rounded-xl bg-white">
          <div className="w-full mt-5 space-y-8">
            <p className="text-gray-800 leading-relaxed">
              This section explains how PalettIQ handles cookies and similar
              technologies.
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                1. Cookie Usage (Current Status)
              </h3>
              <p className="text-gray-800 leading-relaxed">
                PalettIQ currently does not use cookies or any tracking
                technologies to store personal data or monitor user activity.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                2. Purpose of Cookies (Future Use)
              </h3>
              <p className="text-gray-800 leading-relaxed">
                If cookies are introduced in the future, they will only be used
                to improve performance, enhance user experience, and support
                platform features such as preferences or analytics.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                3. User Control Over Cookies
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Users will have full control over cookies through their browser
                settings and will be able to manage or disable them at any time
                if such features are implemented.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CommonHeaderFooterSection>
  );
}
