"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import { BUTTONCOMMONSTYLE } from "@/utils/styles/Classes";
import { useGradientStore } from "@/libs/stores/dataStore";
import { gradientStopMoreMenuItems } from "@/utils/Items";

export default function GradientStopMoreMenu({
  id,
  isHide,
}: {
  id: string;
  isHide: boolean;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const gradientStops = useGradientStore((state) => state.gradientStops);
  const removeGradientStop = useGradientStore((state) => state.removeGradientStop);
  const updateGradientStop = useGradientStore((state) => state.updateGradientStop);

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

  const handler = (itemId: number) => {
    setShowMenu(false);
    if (itemId === 1) {
      updateGradientStop(id, !isHide, "isHide");
    } else if (itemId === 2) {
      removeGradientStop(id);
    }
  };

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => setShowMenu((prev) => !prev)}>
        <button className={BUTTONCOMMONSTYLE}>
          <LuEllipsisVertical size={16} />
        </button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl flex flex-col p-2.5 z-40 absolute 
            top-10 -right-1 w-max"
          >
            {gradientStopMoreMenuItems
              .slice(0, gradientStops.length <= 2 ? 1 : 2)
              .map(({ id, title, icon: Icon }) => {
                return (
                  <button
                    key={id}
                    onClick={() => handler(id)}
                    className={`flex items-center gap-4 p-2 rounded-lg border bg-white border-white cursor-pointer transition-all ${title === "Remove stop" ? "text-red-600 hover:bg-red-50 hover:border-red-200" : "text-gray-900 hover:bg-gray-100 hover:border-gray-200"}`}
                  >
                    <Icon size={16} />
                    <span className={`text-sm font-semibold`}>{title}</span>
                  </button>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
