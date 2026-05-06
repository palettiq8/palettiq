"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorInput from "./ColorInput";
import { HexAlphaColorPicker } from "react-colorful";
import { useVisualizerStore } from "@/libs/stores/dataStore";

export default function VisualizerColorPickerMenu({
  index,
  color,
}: {
  index: number;
  color: string;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [hex, setHex] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const updateVisualizerPalette = useVisualizerStore(
    (state) => state.updateVisualizerPalette,
  );

  const mouseUpHandler = () => {
    updateVisualizerPalette(index, hex, true);
  };

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
    setHex(color);
  }, [color]);

  return (
    <div className="relative w-full h-full bg-transparent">
      <div
        className="w-full h-full bg-transparent"
        ref={buttonRef}
        role="button"
        aria-label={`Open color picker for palette color ${color.toUpperCase()}`}
        aria-expanded={showMenu}
        onClick={() => setShowMenu((prev) => !prev)}
      ></div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Color picker for visualizer palette color ${color.toUpperCase()}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`bg-white shadow-lg rounded-xl w-72 h-max p-4 z-40 absolute bottom-11 right-0 generalColorPicker`}
          >
            <HexAlphaColorPicker
              color={hex}
              onChange={(newColor) => {
                setHex(newColor);
                updateVisualizerPalette(index, newColor, false);
              }}
              onMouseUp={mouseUpHandler}
            />
            <div className="w-full mt-4">
              <ColorInput hex={hex} setHex={setHex} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
