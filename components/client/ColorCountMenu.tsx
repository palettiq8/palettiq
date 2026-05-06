"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import useMenuStore from "@/libs/stores/menuStore";
import { useGeneratorStore, useVisualizerStore } from "@/libs/stores/dataStore";

export default function ColorCountMenu({ from }: { from: string }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const colorCountMenu = useMenuStore((state) => state.colorCountMenu);
  const toggleColorCountMenu = useMenuStore(
    (state) => state.toggleColorCountMenu,
  );
  const colorCount = useGeneratorStore((state) => state.colorCount);
  const setColorCount = useGeneratorStore((state) => state.setColorCount);
  const visualizerColorCount = useVisualizerStore(
    (state) => state.visualizerColorCount,
  );
  const setVisualizerColorCount = useVisualizerStore(
    (state) => state.setVisualizerColorCount,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleColorCountMenu();
      }
    }

    if (colorCountMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [colorCountMenu]);

  return (
    <div className="relative max-lg:w-full">
      <div
        ref={buttonRef}
        onClick={() => toggleColorCountMenu()}
        className="max-lg:w-full"
      >
        <Button
          variant={"outline"}
          size={"md"}
          aria-label={`Select number of colors for ${from === "Generator" ? "Color Palette Generator" : "Palette Visualizer"}`}
          aria-expanded={colorCountMenu}
          aria-haspopup="true"
          className="max-lg:w-full max-lg:justify-between"
        >
          <span>Color Count</span>
          <LuChevronDown
            className={`${colorCountMenu ? "rotate-0" : "rotate-180"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {colorCountMenu && (
          <motion.menu
            ref={menuRef}
            aria-label="Color count options"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg flex flex-col rounded-xl p-2.5 z-40 absolute bottom-12 left-0 w-full"
          >
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((count, index) => {
              const isCount =
                from === "Generator"
                  ? colorCount === count
                  : visualizerColorCount === count;
              return (
                <button
                  key={index}
                  aria-label={`Generate palette with ${count} colors`}
                  aria-pressed={isCount}
                  className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${isCount ? "text-indigo-600" : "text-gray-900"}`}
                  onClick={() => {
                    from === "Generator"
                      ? setColorCount(count)
                      : setVisualizerColorCount(count);
                  }}
                >
                  <LuCheck
                    size={16}
                    aria-hidden="true"
                    className={`invisible ${isCount && "visible"}`}
                  />
                  <p className="text-sm font-semibold">{`${count} Colors`}</p>
                </button>
              );
            })}
          </motion.menu>
        )}
      </AnimatePresence>
    </div>
  );
}
