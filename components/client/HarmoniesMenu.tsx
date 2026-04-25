"use client";

import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import useMenuStore from "@/libs/stores/menuStore";
import { colorHarmonies } from "@/utils/Items";

export default function HarmoniesMenu({
  activeHarmony,
  setActiveHarmony,
  setHarmonyTitle,
}: {
  activeHarmony: string;
  setActiveHarmony: Dispatch<SetStateAction<string>>;
  setHarmonyTitle: Dispatch<SetStateAction<string>>;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const harmonyMenu = useMenuStore((state) => state.harmonyMenu);
  const toggleHarmonyMenu = useMenuStore((state) => state.toggleHarmonyMenu);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleHarmonyMenu();
      }
    }

    if (harmonyMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [harmonyMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => toggleHarmonyMenu()}>
        <Button variant={"outline"} size={"md"}>
          <span>Harmonies</span>
          <LuChevronDown
            className={`${harmonyMenu ? "rotate-180" : "rotate-0"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {harmonyMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg flex flex-col rounded-xl p-2.5 z-40 absolute top-11 right-0 w-max"
          >
            {colorHarmonies.map(({ id, title, harmony }) => {
              const isHarmony = activeHarmony === harmony;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveHarmony(harmony);
                    toggleHarmonyMenu();
                    setHarmonyTitle(title);
                  }}
                  className={`w-full p-2 rounded-lg border border-white hover:bg-gray-100 hover:border-gray-200 ${isHarmony ? "text-indigo-600" : "text-gray-900"} flex items-center gap-4 cursor-pointer transition-all `}
                >
                  <LuCheck
                    size={18}
                    className={`invisible ${isHarmony && "visible"}`}
                  />
                  <p className="text-sm font-semibold">{title}</p>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
