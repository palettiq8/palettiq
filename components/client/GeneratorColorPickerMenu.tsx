"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuDisc } from "react-icons/lu";
import { Button } from "../Button";
import ColorPicker from "./ColorPicker";
import { useGeneratorStore } from "@/libs/stores/dataStore";
import { colord } from "colord";
import ColorInput from "./ColorInput";

export default function GeneratorColorPickerMenu({
  index,
  color,
  isLightStyle,
}: {
  index: number;
  color: string;
  isLightStyle: boolean;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [openLeft, setOpenLeft] = useState<boolean>(false);
  const [openBottom, setOpenBottom] = useState<boolean>(false);
  const [hex, setHex] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const updateGeneratedPalette = useGeneratorStore(
    (state) => state.updateGeneratedPalette,
  );

  const applyClickHandler = useCallback(() => {
    updateGeneratedPalette(index, hex);
    setShowMenu(false);
  }, [hex]);

  useEffect(() => {
    if (showMenu && buttonRef.current) {
      const MENU_WIDTH = 292;
      const MENU_HEIGHT = 360;
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.left;
      const spaceTop = window.innerHeight - rect.bottom;

      if (spaceRight < MENU_WIDTH) {
        setOpenLeft(true);
      } else {
        setOpenLeft(false);
      }

      if (spaceTop > MENU_HEIGHT) {
        setOpenBottom(true);
      } else {
        setOpenBottom(false);
      }
    }

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

  const isValidColor = (value: string) => colord(value).isValid();

  useEffect(() => {
    setHex(color);
  }, [color]);

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu((prev) => !prev);
        }}
      >
        <button
          className={`h-10 w-10 cursor-pointer active:scale-90 transition-all rounded-full grid place-content-center ${isLightStyle ? "bg-black/10 text-gray-900" : "bg-gray-50/10 text-gray-50"}`}
        >
          <LuDisc size={18} />
        </button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`bg-white shadow-lg rounded-xl w-max h-max p-4 z-40 absolute ${openBottom ? "top-12" : "bottom-12"} ${openLeft ? "right-0" : "left-0"} generalColorPicker`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ColorPicker color={hex} setColor={setHex} />
            <div className="w-full flex flex-col gap-2 mt-4">
              <ColorInput hex={hex} setHex={setHex} />
              <div className="w-full flex items-center gap-2">
                <div className="flex w-full">
                  <div
                    className={`w-full h-10 grid place-content-center rounded-l-lg border-y border-l border-gray-200`}
                    style={{ backgroundColor: color }}
                    onClick={() => setHex(color)}
                  >
                    <LuCheck className="text-gray-50" size={16} />
                  </div>
                  <div
                    className="w-full h-10 rounded-r-lg border border-gray-200"
                    style={{
                      backgroundColor: isValidColor(hex) ? hex : "#fff",
                    }}
                  ></div>
                </div>
                <Button
                  onClick={applyClickHandler}
                  variant={"outline"}
                  size={"md"}
                  disabled={!isValidColor(hex)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
