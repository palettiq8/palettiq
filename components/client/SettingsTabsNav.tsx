"use client";

import { settingsMenuItems } from "@/utils/Items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsTabsNav() {
  const path = usePathname();

  return (
    <div className="w-full flex items-center gap-6.5 border-b border-gray-200 px-4 pt-4">
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
  );
}
