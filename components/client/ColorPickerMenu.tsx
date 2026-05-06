"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMenuStore from "@/libs/stores/menuStore";
import { LuX } from "react-icons/lu";
import ColorPicker from "./ColorPicker";
import ColorInput from "./ColorInput";

export default function ColorPickerMenu({
  color,
  setColor,
}: {
  color: string;
  setColor: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const pickerColorPickerMenu = useMenuStore(
    (state) => state.pickerColorPickerMenu,
  );
  const togglePickerColorPickerMenu = useMenuStore(
    (state) => state.togglePickerColorPickerMenu,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        togglePickerColorPickerMenu();
      }
    }

    if (pickerColorPickerMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pickerColorPickerMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => togglePickerColorPickerMenu()}>
        <button
          aria-label={`Current color ${color} — Click to open color picker`}
          className={`bg-gray-50 border border-gray-200 text-gray-900 text-sm font-semibold uppercase px-4 h-10 rounded-full cursor-pointer select-none active:scale-90 transition-all`}
        >
          {color}
        </button>
      </div>
      <AnimatePresence>
        {pickerColorPickerMenu && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-label="Color picker — Select a custom color"
            aria-modal="true"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg w-max rounded-xl p-4 pb-4 z-40 absolute top-11 right-0 generalColorPicker border border-gray-200"
          >
            <div className="w-full flex items-center justify-between mb-4">
              <h3 className="text-md font-semibold text-gray-900">
                Color Picker
              </h3>
              <button
                onClick={() => togglePickerColorPickerMenu()}
                aria-label="Close color picker"
                className="w-7 h-7 rounded-md grid place-content-center bg-gray-100 transition-all border border-gray-200 cursor-pointer hover:bg-white"
              >
                <LuX size={16} aria-hidden="true" />
              </button>
            </div>
            <ColorPicker color={color} setColor={setColor} />
            <div className="w-full mt-4">
              <ColorInput hex={color} setHex={setColor} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
