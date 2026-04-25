"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { ICONBUTTONCOMMONSTYLE } from "@/utils/styles/Classes";
import { useGradientStore } from "@/libs/stores/dataStore";
import { positions } from "@/utils/Items";

export default function GradientColorPositionMenu() {
  const [openUp, setOpenUp] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const gradientColorPositionMenu = useMenuStore(
    (state) => state.gradientColorPositionMenu,
  );
  const toggleGradientColorPositionMenu = useMenuStore(
    (state) => state.toggleGradientColorPositionMenu,
  );
  const modifyActiveColor = useGradientStore(
    (state) => state.modifyActiveColor,
  );
  const updateGradientStop = useGradientStore(
    (state) => state.updateGradientStop,
  );

  useEffect(() => {
    if (gradientColorPositionMenu && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const menuHeight = 290;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
        setOpenUp(true);
      } else {
        setOpenUp(false);
      }
    }
  }, [gradientColorPositionMenu]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleGradientColorPositionMenu();
      }
    }

    if (gradientColorPositionMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [gradientColorPositionMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => toggleGradientColorPositionMenu()}>
        <button
          className={`${ICONBUTTONCOMMONSTYLE} rounded-r-full cursor-pointer hover:bg-white`}
        >
          <span className="text-sm font-medium text-gray-900">%</span>
          <LuChevronDown
            className={`${gradientColorPositionMenu ? "rotate-180" : "rotate-0"} transition-all`}
            size={16}
          />
        </button>
      </div>

      <AnimatePresence>
        {gradientColorPositionMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`bg-white shadow-lg grid grid-cols-2 gap-1 rounded-xl p-2.5 z-40 absolute ${openUp ? "bottom-11" : "top-11"} right-0 w-max border border-gray-200`}
          >
            {positions.map(({ title, value }, index) => {
              const isPos = modifyActiveColor.position === value;
              return (
                <button
                  key={index}
                  className={`p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${isPos ? "text-indigo-600" : "text-gray-900"}`}
                  onClick={() => {
                    updateGradientStop(modifyActiveColor.id, value, "position");
                  }}
                >
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
