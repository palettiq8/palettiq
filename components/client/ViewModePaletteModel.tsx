"use client";

import { useEffect } from "react";
import { useBrowseStore } from "@/libs/stores/dataStore";

export default function ViewModePaletteModel() {
  const viewModePalette = useBrowseStore((state) => state.viewModePalette);

  useEffect(() => {
    if (viewModePalette?.length) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewModePalette]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex gap-3 max-lg:flex-col max-lg:p-10 z-40 p-25 bg-gray-900">
      {viewModePalette?.map(({ id, color }) => (
        <div
          key={id}
          className="w-full h-full rounded-full rotate-6 max-lg:rotate-0"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
