"use client";

import { useEffect } from "react";
import { useBrowseStore } from "@/libs/stores/dataStore";
import { Button } from "../Button";
import { LuArrowLeft } from "react-icons/lu";

export default function OpenOnScreenPaletteModel() {
  const openOnScreenPalette = useBrowseStore(
    (state) => state.openOnScreenPalette,
  );
  const setOpenOnScreenPalette = useBrowseStore(
    (state) => state.setOpenOnScreenPalette,
  );

  useEffect(() => {
    if (openOnScreenPalette?.length) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openOnScreenPalette]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      const key = e.key.toLowerCase();
      if (key === "escape") {
        e.preventDefault();
        setOpenOnScreenPalette(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-40">
      <div className="w-full h-screen flex relative max-lg:flex-col">
        {openOnScreenPalette?.map(({ id, color }) => (
          <div
            key={id}
            className="w-full h-screen max-lg:h-full"
            style={{ backgroundColor: color }}
          />
        ))}
        {openOnScreenPalette?.length !== 0 && (
          <Button
            onClick={() => setOpenOnScreenPalette(null)}
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
