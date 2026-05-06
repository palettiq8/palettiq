"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGradientStore } from "@/libs/stores/dataStore";
import ColorPicker from "./ColorPicker";
import { checkIsLight, FlashMessage } from "@/utils/utils";
import ColorInput from "./ColorInput";
import { BUTTONCOMMONSTYLE } from "@/utils/styles/Classes";
import GradientStopMoreMenu from "./GradientStopMoreMenu";
import { LuCopy } from "react-icons/lu";

export default function GradientStopWithMenu({
  id,
  color,
  isHide,
  position,
}: {
  id: string;
  color: string;
  isHide: boolean;
  position: number;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(color);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modifyActiveColor = useGradientStore(
    (state) => state.modifyActiveColor,
  );
  const setModifyActiveColor = useGradientStore(
    (state) => state.setModifyActiveColor,
  );
  const gradientStops = useGradientStore((state) => state.gradientStops);
  const updateGradientStop = useGradientStore(
    (state) => state.updateGradientStop,
  );

  const isLight = checkIsLight(color);

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
    updateGradientStop(id, hex, "color");
  }, [hex]);

  return (
    <div className="relative">
      <div
        aria-label={`Gradient stop at ${position}% — color ${color.toUpperCase()}`}
        onClick={() => {
          setModifyActiveColor({
            id,
            color,
            isHide,
            position,
          });
        }}
        className="w-full border border-gray-200 p-1 rounded-lg flex items-center justify-between hover:cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <button
            ref={buttonRef}
            disabled={isHide}
            aria-label={`Open color picker for gradient stop ${color.toUpperCase()}`}
            className={`w-8 h-8 rounded-md grid place-content-center hover:cursor-pointer ${isHide && "opacity-30"} disabled:cursor-not-allowed`}
            style={{ backgroundColor: color }}
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            {modifyActiveColor?.id === id && (
              <span
                className={`w-2 h-2 rounded-full ${isLight ? "bg-gray-900" : "bg-gray-50"}`}
              ></span>
            )}
          </button>
          <span
            className={`text-sm font-semibold uppercase ${isHide ? "text-gray-400 cursor-not-allowed" : "text-gray-900"}`}
          >
            {color}
          </span>
        </div>
        <div className="flex items-center">
          <button
            aria-label={`Copy gradient stop color ${color.toUpperCase()}`}
            onClick={async (e) => {
              e.stopPropagation();
              await navigator.clipboard.writeText(color.toUpperCase());
              FlashMessage("success", "Copied to the clipboard!");
            }}
            disabled={isHide}
            className={`${BUTTONCOMMONSTYLE} ${isHide && "opacity-30"} disabled:cursor-not-allowed`}
          >
            <LuCopy size={16} aria-hidden="true" />
          </button>
          {!(gradientStops.length <= 2) && (
            <GradientStopMoreMenu id={id} isHide={isHide} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-label={`Color picker for gradient stop ${color.toUpperCase()}`}
            aria-modal="true"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg w-full rounded-xl p-4 pb-4 z-40 absolute top-12 left-0 generalColorPicker border border-gray-200"
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
