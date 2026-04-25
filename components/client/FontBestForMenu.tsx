"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { Button } from "../Button";
import { fontBestForItems } from "@/utils/Items";
import { useBrowseStore } from "@/libs/stores/dataStore";

export default function FontBestForMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const fontBestForMenu = useMenuStore((state) => state.fontBestForMenu);
  const toggleFontBestForMenu = useMenuStore(
    (state) => state.toggleFontBestForMenu,
  );
  const fontBestForSelectedItems = useBrowseStore(
    (state) => state.fontBestForSelectedItems,
  );
  const setFontBestForSelectedItems = useBrowseStore(
    (state) => state.setFontBestForSelectedItems,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleFontBestForMenu();
      }
    }

    if (fontBestForMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [fontBestForMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => toggleFontBestForMenu()}>
        <Button variant={"outline"} size={"md"}>
          <span>Best For</span>
          <LuChevronDown
            className={`${fontBestForMenu ? "rotate-180" : "rotate-0"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {fontBestForMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl z-40 absolute 
            top-11 right-0 w-200 h-max flex flex-wrap gap-3 p-4"
          >
            {fontBestForItems.map((_, index) => {
              const isExist = fontBestForSelectedItems.includes(_);
              return (
                <button
                  key={index}
                  onClick={() => setFontBestForSelectedItems(_)}
                  className={`w-max px-4 h-10 border rounded-full cursor-pointer transition-all ${isExist ? "text-orange-600 border-orange-200 bg-orange-50" : "text-gray-900 bg-gray-50 border-gray-200"}`}
                >
                  <span className="text-md font-semibold">{_}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
