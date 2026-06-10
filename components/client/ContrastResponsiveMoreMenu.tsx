"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { contrastResponsiveMoreMenuItems } from "@/utils/Items";
import useModelStore from "@/libs/stores/modelStore";
import { useContrastStore, useOtherStore } from "@/libs/stores/dataStore";
import useUiStore from "@/libs/stores/uiStore";

export default function ContrastResponsiveMoreMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const contrastResponsiveMoreMenu = useMenuStore(
    (state) => state.contrastResponsiveMoreMenu,
  );
  const toggleContrastResponsiveMoreMenu = useMenuStore(
    (state) => state.toggleContrastResponsiveMoreMenu,
  );
  const toggleContrastHistoryModel = useModelStore(
    (state) => state.toggleContrastHistoryModel,
  );
  const alterContrast = useContrastStore((state) => state.alterContrast);
  const setIsMaximizeContrast = useUiStore(
    (state) => state.setIsMaximizeContrast,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
  const activeContrast = useContrastStore((state) => state.activeContrast);
  const textColor = activeContrast ? activeContrast.textColor : "";
  const bgColor = activeContrast ? activeContrast.bgColor : "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleContrastResponsiveMoreMenu();
      }
    }

    if (contrastResponsiveMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contrastResponsiveMoreMenu]);

  const handler = (title: string) => {
    if (title !== "Alter color") toggleContrastResponsiveMoreMenu();
    if (title === "History") {
      toggleContrastHistoryModel();
    } else if (title === "Alter color") {
      alterContrast();
    } else if (title === "Open on screen") {
      setIsMaximizeContrast();
    } else if (title === "Export") {
      toggleExportModel();
      setExportFrom("Palette");
      setExportPalette([textColor, bgColor]);
    }
  };

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        onClick={() => toggleContrastResponsiveMoreMenu()}
        aria-label="More options for Color Contrast Checker"
      >
        <LuEllipsisVertical
          size={17}
          aria-hidden="true"
          className={`text-gray-900 hover:scale-110 cursor-pointer active:scale-90 transition-all`}
        />
      </div>

      <AnimatePresence>
        {contrastResponsiveMoreMenu && (
          <motion.menu
            ref={menuRef}
            aria-label="Color Contrast Checker actions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl flex flex-col p-2.5 z-40 absolute 
            top-8 right-0 w-max"
          >
            {contrastResponsiveMoreMenuItems.map(
              ({ id, title, icon: Icon }) => {
                return (
                  <button
                    key={id}
                    aria-label={`${title} — Color Contrast Checker`}
                    className={`w-full flex items-center gap-4 p-2 text-gray-900 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all`}
                    onClick={() => handler(title)}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <p className="text-sm font-semibold">{title}</p>
                  </button>
                );
              },
            )}
          </motion.menu>
        )}
      </AnimatePresence>
    </div>
  );
}
