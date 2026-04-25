"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import { useOtherStore } from "@/libs/stores/dataStore";

export default function ExplorePaletteViewMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const explorePaletteView = useOtherStore((state) => state.explorePaletteView);
  const setExplorePaletteView = useOtherStore(
    (state) => state.setExplorePaletteView,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => setShowMenu((prev) => !prev)}>
        <Button variant={"outline"} size={"md"}>
          <span>{explorePaletteView}</span>
          <LuChevronDown
            className={`${showMenu ? "rotate-180" : "rotate-0"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg flex flex-col rounded-xl p-2.5 z-40 absolute top-10 right-0 w-40"
          >
            {["Vertical", "Horizontal"].map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setShowMenu(false);
                    setExplorePaletteView(item);
                  }}
                  className="w-full text-sm font-semibold flex items-center justify-between p-2 gap-3 rounded-lg transition-all hover:bg-gray-100 border border-white hover:border-gray-200 hover:cursor-pointer select-none text-gray-900"
                >
                  {item}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
