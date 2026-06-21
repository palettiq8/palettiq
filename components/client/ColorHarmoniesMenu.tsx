"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import { colorHarmonies } from "@/utils/Items";
import useMenuStore from "@/libs/stores/menuStore";
import ToggleButton from "../server/ToggleButton";
import { useGeneratorStore, useVisualizerStore } from "@/libs/stores/dataStore";

export default function ColorHarmoniesMenu({ from }: { from: string }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const colorHarmoniesMenu = useMenuStore((state) => state.colorHarmoniesMenu);
  const toggleColorHarmoniesMenu = useMenuStore(
    (state) => state.toggleColorHarmoniesMenu,
  );
  const generatorColorHarmony = useGeneratorStore(
    (state) => state.generatorColorHarmony,
  );
  const setGeneratorColorHarmony = useGeneratorStore(
    (state) => state.setGeneratorColorHarmony,
  );
  const visualizerColorHarmony = useVisualizerStore(
    (state) => state.visualizerColorHarmony,
  );
  const setVisualizerColorHarmony = useVisualizerStore(
    (state) => state.setVisualizerColorHarmony,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleColorHarmoniesMenu();
      }
    }

    if (colorHarmoniesMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [colorHarmoniesMenu]);

  const isTrue =
    from === "Generator"
      ? generatorColorHarmony === null
      : visualizerColorHarmony === null;

  return (
    <div className="relative max-lg:w-full">
      <div
        ref={buttonRef}
        onClick={() => toggleColorHarmoniesMenu()}
        className="max-lg:w-full"
      >
        <Button
          variant={"outline"}
          size={"md"}
          className="max-lg:w-full max-lg:justify-between"
        >
          <span>Color Harmonies</span>
          <LuChevronDown
            className={`${colorHarmoniesMenu ? "rotate-0" : "rotate-180"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {colorHarmoniesMenu && (
          <motion.menu
            ref={menuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg rounded-xl z-40 absolute bottom-12 left-0 w-max max-lg:w-full"
          >
            <div className="w-full p-4.5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                All harmonies
              </h3>
              <ToggleButton isTrue={isTrue} setIsTrue={() => {}} />
            </div>
            <div className="w-full h-max flex flex-col p-2.5 max-h-100 overflow-y-auto noscrollbar">
              {colorHarmonies.map((item, index) => {
                const harmony = item?.title?.split("_").join(" ");
                const isActiveHarmony =
                  from === "Generator"
                    ? generatorColorHarmony === item.harmony
                    : visualizerColorHarmony === item.harmony;
                return (
                  <button
                    key={index}
                    onClick={() =>
                      from === "Generator"
                        ? setGeneratorColorHarmony(item.harmony)
                        : setVisualizerColorHarmony(item.harmony)
                    }
                    className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${isActiveHarmony ? "text-indigo-600" : "text-gray-900"}`}
                  >
                    <LuCheck
                      size={16}
                      className={`invisible ${isActiveHarmony && "visible"}`}
                    />
                    <p className="text-sm font-semibold">{harmony}</p>
                  </button>
                );
              })}
            </div>
          </motion.menu>
        )}
      </AnimatePresence>
    </div>
  );
}
