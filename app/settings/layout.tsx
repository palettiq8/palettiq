"use client";

import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import { settingsMenuItems } from "@/utils/Items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <CommonHeaderFooterSection>
      <div className="w-full min-h-120 h-max max-w-230 mx-auto py-20                  ">
        <h1 className="text-4xl font-bold text-gray-900 text-center">Settings</h1>
        <div className="w-full flex gap-6 mt-12 border-b border-gray-200">
          {settingsMenuItems.map(({ id, title, url }) => {
            return (
              <Link
                key={id}
                href={url}
                className={`text-sm font-semibold pb-2.5 border-b-2 ${path === url ? "border-gray-900 text-gray-900" : "border-white text-gray-500"}`}
              >
                {title}
              </Link>
            );
          })}
        </div>
        <div className="w-full h-max rounded-xl mt-10">{children}</div>
      </div>
    </CommonHeaderFooterSection>
  );
}
