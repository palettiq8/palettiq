"use client";

import { useEffect } from "react";
import { useBrowseStore } from "@/libs/stores/dataStore";
import { Button } from "../Button";
import { LuArrowLeft } from "react-icons/lu";

export default function ViewModePaletteModel() {
  const viewModePalette = useBrowseStore((state) => state.viewModePalette);
  const setViewModePalette = useBrowseStore(
    (state) => state.setViewModePalette,
  );

  useEffect(() => {
    if (viewModePalette?.length) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewModePalette]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-gray-900 z-40">
      <div className="w-full h-screen flex gap-3 max-lg:flex-col max-lg:p-10 p-25 relative">
        {viewModePalette?.map(({ id, color }) => (
          <div
            key={id}
            className="w-full h-full rounded-full rotate-6 max-lg:rotate-0"
            style={{ backgroundColor: color }}
          />
        ))}
        {viewModePalette?.length !== 0 && (
          <Button
            onClick={() => setViewModePalette(null)}
            variant={"outline"}
            size={"circle"}
            className="absolute top-4 left-4"
          >
            <LuArrowLeft size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
