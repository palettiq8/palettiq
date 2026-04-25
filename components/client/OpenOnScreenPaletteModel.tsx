"use client";

import { useEffect } from "react";
import { useBrowseStore } from "@/libs/stores/dataStore";

export default function OpenOnScreenPaletteModel() {
  const openOnScreenPalette = useBrowseStore(
    (state) => state.openOnScreenPalette,
  );

  useEffect(() => {
    if (openOnScreenPalette?.length) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openOnScreenPalette]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex z-40">
      {openOnScreenPalette?.map(({ id, color }) => (
        <div
          key={id}
          className="w-full h-screen"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
