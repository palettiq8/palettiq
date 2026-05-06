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
      className="w-full overflow-y-auto p-2 noscrollbar"
      style={{ height: "calc(100% - 128px)" }}
    >
      <div className="w-full flex flex-col gap-3.5">
        {features.map(({ id, title, desc, icon: Icon, url, bgColors }) => {
          const isPath = url === path;
          return (
            <Link
              href={url}
              key={id}
              onClick={() => {
                if (!(window.innerWidth >= 1280)) {
                  toggleStudioLeftMenuModel();
                }
              }}
              className={`w-full flex items-start flex-col gap-2 p-2 rounded-xl hover:bg-gray-100 group border active:scale-95 transition-all hover:border-gray-200 ${isPath ? "bg-gray-100 border-gray-200" : "bg-white border-white"}`}
            >
              <div
                className={`w-9 h-9 rounded-lg grid place-content-center bg-linear-to-t shrink-0 ${bgColors[0]} ${bgColors[1]}`}
              >
                <Icon size={17} className="text-gray-50" />
              </div>
              <p className="text-md font-semibold text-gray-900">{title}</p>
              <span className="text-xs font-semibold text-gray-600">
                {desc}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
