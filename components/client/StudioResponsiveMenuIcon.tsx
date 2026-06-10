"use client";

import useModelStore from "@/libs/stores/modelStore";
import { LuMenu } from "react-icons/lu";

export default function StudioResponsiveMenuIcon() {
  const toggleStudioLeftMenuModel = useModelStore(
    (state) => state.toggleStudioLeftMenuModel,
  );
  return (
    <button
      aria-label="Open studio navigation menu"
      onClick={() => toggleStudioLeftMenuModel()}
      className="w-8.5 h-8.5 rounded-lg border border-gray-200 bg-gray-100 grid place-content-center cursor-pointer active:scale-95 transition-all"
    >
      <LuMenu size={16} />
    </button>
  );
}
