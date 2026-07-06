import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import SettingsTabsNav from "@/components/client/SettingsTabsNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  robots: {
    index: false,
    follow: true,
  },
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <CommonHeaderFooterSection>
      <div className="w-full min-h-120 h-max max-w-200 mx-auto py-20 max-sm:py-10 max-lg:px-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Settings
        </h1>
        <div className="bg-white border border-gray-200 mt-20 rounded-xl">
          <SettingsTabsNav />
          <div className="w-full h-max rounded-xl mt-10 p-4">{children}</div>
        </div>
      </div>
    </CommonHeaderFooterSection>
  );
}
