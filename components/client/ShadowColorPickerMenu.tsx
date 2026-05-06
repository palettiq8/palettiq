"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorPicker from "./ColorPicker";
import ColorInput from "./ColorInput";
import { useShadowStore } from "@/libs/stores/dataStore";

export default function ShadowColorPickerMenu({
  from,
  color,
  index,
}: {
  from: string;
  color: string;
  index: number;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(color);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const updateShadow = useShadowStore((state) => state.updateShadow);
  const updateTextShadow = useShadowStore((state) => state.updateTextShadow);

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
    if (from === "Box") {
      updateShadow(index, "color", hex);
    } else if (from === "Text") {
      updateTextShadow(index, "color", hex);
    }
  }, [hex]);

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        role="button"
        aria-label={`Open color picker for ${from === "Box" ? "box" : "text"} shadow layer ${index + 1} — current color ${color.toUpperCase()}`}
        aria-expanded={showMenu}
        onClick={() => setShowMenu((prev) => !prev)}
        className="w-8 h-8 rounded-lg hover:cursor-pointer outline-2 border-2 border-gray-50"
        style={{ backgroundColor: color, outlineColor: color }}
      ></div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Color picker for ${from === "Box" ? "box" : "text"} shadow layer ${index + 1}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg w-max rounded-xl p-4 pb-4 z-40 absolute bottom-10 right-0 generalColorPicker border border-gray-200"
          >
            <ColorPicker color={hex} setColor={setHex} />
            <div className="w-full mt-4">
              <ColorInput hex={color} setHex={setHex} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
