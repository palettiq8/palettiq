"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { ICONBUTTONCOMMONSTYLE } from "@/utils/styles/Classes";
import { useGradientStore } from "@/libs/stores/dataStore";
import { degrees } from "@/utils/Items";

export default function GradientColorRotationMenu() {
  const [openUp, setOpenUp] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const gradientColorRotationMenu = useMenuStore(
    (state) => state.gradientColorRotationMenu,
  );
  const toggleGradientColorRotationMenu = useMenuStore(
    (state) => state.toggleGradientColorRotationMenu,
  );
  const gradientRotationValue = useGradientStore(
    (state) => state.gradientRotationValue,
  );
  const setGradientRotationValue = useGradientStore(
    (state) => state.setGradientRotationValue,
  );

  useEffect(() => {
    if (gradientColorRotationMenu && buttonRef.current) {
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
  }, [gradientColorRotationMenu]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleGradientColorRotationMenu();
      }
    }

    if (gradientColorRotationMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [gradientColorRotationMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => toggleGradientColorRotationMenu()}>
        <button
          className={`${ICONBUTTONCOMMONSTYLE} rounded-r-full cursor-pointer hover:bg-white`}
        >
          <span className="text-sm font-medium text-gray-900">Deg</span>
          <LuChevronDown
            className={`${gradientColorRotationMenu ? "rotate-180" : "rotate-0"} transition-all`}
            size={16}
          />
        </button>
      </div>

      <AnimatePresence>
        {gradientColorRotationMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`bg-white shadow-lg grid grid-cols-3 gap-1 rounded-xl p-2.5 z-40 absolute ${openUp ? "bottom-11" : "top-11"} right-0 w-max border border-gray-200`}
          >
            {degrees.map(({ title, value }, index) => {
              const isRotation = gradientRotationValue === value;
              return (
                <button
                  key={index}
                  className={`p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${isRotation ? "text-indigo-600" : "text-gray-900"}`}
                  onClick={() => setGradientRotationValue(value)}
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
