"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorPicker from "./ColorPicker";
import { useContrastStore } from "@/libs/stores/dataStore";
import { FlashMessage } from "@/utils/utils";
import ColorInput from "./ColorInput";
import { LuCopy } from "react-icons/lu";

export default function ContrastColorsWithPickerMenu({
  title,
  color,
}: {
  title: string;
  color: string;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(color);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const activeContrast = useContrastStore((state) => state.activeContrast);
  const setActiveContrast = useContrastStore((state) => state.setActiveContrast);

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

  useEffect(() => {
    if (!activeContrast) return;
    const key = title === "Foreground Color" ? "textColor" : "bgColor";
    if (activeContrast[key] === hex) return;
    setActiveContrast({
      ...activeContrast,
      [key]: hex,
    });
  }, [hex]);

  return (
    <div className="relative w-full">
      <div className="w-full flex flex-col items-start gap-3">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        <div className="w-full flex items-center justify-between border border-gray-200 p-1 rounded-lg">
          <div className="flex items-center gap-3">
            <button
              ref={buttonRef}
              className="h-8 w-8 rounded-md cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => setShowMenu((prev) => !prev)}
            ></button>
            <p className="text-sm font-semibold text-gray-900 uppercase">
              {color}
            </p>
          </div>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              await navigator.clipboard.writeText(color?.toUpperCase());
              FlashMessage("success", "Copied to the clipboard!");
            }}
            className={
              "text-gray-900 cursor-pointer h-8 w-8 rounded-md border border-white hover:border-gray-200 hover:bg-gray-100 grid place-content-center active:scale-90 transition-all"
            }
          >
            <LuCopy size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg w-full rounded-xl p-4 pb-4 z-40 absolute top-21 left-0 generalColorPicker border border-gray-200"
          >
            <ColorPicker color={color} setColor={setHex} />
            <div className="w-full mt-4">
              <ColorInput hex={color} setHex={setHex} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
