"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import useMenuStore from "@/libs/stores/menuStore";
import { useGeneratorStore } from "@/libs/stores/dataStore";
import { paletteStylesItems } from "@/utils/Items";

export default function PaletteStylesMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const paletteStylesMenu = useMenuStore((state) => state.paletteStylesMenu);
  const togglePaletteStylesMenu = useMenuStore(
    (state) => state.togglePaletteStylesMenu,
  );
  const paletteStyle = useGeneratorStore((state) => state.paletteStyle);
  const setPaletteStyle = useGeneratorStore((state) => state.setPaletteStyle);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        togglePaletteStylesMenu();
      }
    }

    if (paletteStylesMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [paletteStylesMenu]);

  return (
    <div className="relative max-lg:w-full">
      <div
        ref={buttonRef}
        onClick={() => togglePaletteStylesMenu()}
        className="max-lg:w-full"
      >
        <Button
          variant={"outline"}
          size={"md"}
          className="max-lg:w-full max-lg:justify-between"
        >
          <span>Palette Styles</span>
          <LuChevronDown
            className={`${paletteStylesMenu ? "rotate-0" : "rotate-180"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {paletteStylesMenu && (
          <motion.menu
            ref={menuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg flex flex-col rounded-xl p-2.5 z-40 absolute bottom-12 left-0 w-full"
          >
            {paletteStylesItems.map((style, index) => {
              const isStyle = style === paletteStyle;
              return (
                <button
                  key={index}
                  onClick={() => setPaletteStyle(style)}
                  className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${isStyle ? "text-indigo-600" : "text-gray-900"}`}
                >
                  <LuCheck
                    size={16}
                    className={`invisible ${isStyle && "visible"}`}
                  />
                  <p className="text-sm font-semibold">{style}</p>
                </button>
              );
            })}
          </motion.menu>
        )}
      </AnimatePresence>
    </div>
  );
}
