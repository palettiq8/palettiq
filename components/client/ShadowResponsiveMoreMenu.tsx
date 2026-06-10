"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { shadowResponsiveMoreMenuItems } from "@/utils/Items";
import useUiStore from "@/libs/stores/uiStore";
import useModelStore from "@/libs/stores/modelStore";
import { useOtherStore, useShadowStore } from "@/libs/stores/dataStore";

export default function ShadowResponsiveMoreMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const shadowResponsiveMoreMenu = useMenuStore(
    (state) => state.shadowResponsiveMoreMenu,
  );
  const toggleShadowResponsiveMoreMenu = useMenuStore(
    (state) => state.toggleShadowResponsiveMoreMenu,
  );
  const setIsMaximizeShadow = useUiStore((state) => state.setIsMaximizeShadow);
  const toggleExportShadowModel = useModelStore(
    (state) => state.toggleExportShadowModel,
  );
  const setExportBoxShadow = useOtherStore((state) => state.setExportBoxShadow);
  const setExportTextShadow = useOtherStore(
    (state) => state.setExportTextShadow,
  );
  const shadows = useShadowStore((state) => state.shadows);
  const textShadows = useShadowStore((state) => state.textShadows);

  const handler = (title: string) => {
    toggleShadowResponsiveMoreMenu();
    if (title === "Open on screen") {
      setIsMaximizeShadow();
    } else if (title === "Export") {
      toggleExportShadowModel();
      setExportBoxShadow(shadows);
      setExportTextShadow(textShadows);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleShadowResponsiveMoreMenu();
      }
    }

    if (shadowResponsiveMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shadowResponsiveMoreMenu]);

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        aria-label="More options for CSS Shadow Generator"
        onClick={() => toggleShadowResponsiveMoreMenu()}
      >
        <LuEllipsisVertical
          size={17}
          aria-hidden="true"
          className={`text-gray-900 hover:scale-110 cursor-pointer active:scale-90 transition-all`}
        />
      </div>

      <AnimatePresence>
        {shadowResponsiveMoreMenu && (
          <motion.menu
            ref={menuRef}
            aria-label="CSS Shadow Generator actions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl flex flex-col p-2.5 z-40 absolute 
            top-8 right-0 w-max"
          >
            {shadowResponsiveMoreMenuItems.map(({ id, title, icon: Icon }) => {
              return (
                <button
                  key={id}
                  aria-label={`${title} — CSS Shadow Generator`}
                  className={`w-full flex items-center gap-4 p-2 text-gray-900 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all`}
                  onClick={() => handler(title)}
                >
                  <Icon size={16} aria-hidden="true" />
                  <p className="text-sm font-semibold">{title}</p>
                </button>
              );
            })}
          </motion.menu>
        )}
      </AnimatePresence>
    </div>
  );
}
