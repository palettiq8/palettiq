"use client";

import useModelStore from "@/libs/stores/modelStore";
import { features } from "@/utils/Items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StudioLeftMenuContainer() {
  const path = usePathname();
  const toggleStudioLeftMenuModel = useModelStore(
    (state) => state.toggleStudioLeftMenuModel,
  );
  return (
    <div
      className="w-full overflow-y-auto px-3"
      style={{ height: "calc(100% - 128px)" }}
    >
      <div className="w-full flex flex-col gap-3.5 mt-3">
        {features.map(({ id, title, icon: Icon, url, bgColors }) => {
          const isPath = url === path;
          return (
            <Link
              href={url}
              key={id}
              onClick={() => toggleStudioLeftMenuModel()}
              className={`w-full flex items-center gap-4 p-1 rounded-xl hover:bg-gray-50 group border active:scale-95 transition-all hover:border-gray-200 ${isPath ? "bg-gray-50 border-gray-200" : "bg-white border-white"}`}
            >
              <div
                className={`w-9 h-9 rounded-lg grid place-content-center bg-linear-to-t ${bgColors[0]} ${bgColors[1]}`}
              >
                <Icon size={17} className="text-gray-50" />
              </div>
              <p className="text-md font-semibold text-gray-900">{title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
