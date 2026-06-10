"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { gradientResponsiveMoreMenuItems } from "@/utils/Items";
import useModelStore from "@/libs/stores/modelStore";
import useUiStore from "@/libs/stores/uiStore";
import { useGradientStore, useOtherStore } from "@/libs/stores/dataStore";
import { getGradientCSS } from "@/utils/utils";

export default function GradientResponsiveMoreMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const gradientResponsiveMoreMenu = useMenuStore(
    (state) => state.gradientResponsiveMoreMenu,
  );
  const toggleGradientResponsiveMoreMenu = useMenuStore(
    (state) => state.toggleGradientResponsiveMoreMenu,
  );
  const toggleGradientHistoryModel = useModelStore(
    (state) => state.toggleGradientHistoryModel,
  );
  const setIsMaximizeGradient = useUiStore(
    (state) => state.setIsMaximizeGradient,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
  const setGradientExport = useOtherStore((state) => state.setGradientExport);
  const gradientStops = useGradientStore((state) => state.gradientStops);
  const activeGradientType = useGradientStore(
    (state) => state.activeGradientType,
  );
  const gradientRotationValue = useGradientStore(
    (state) => state.gradientRotationValue,
  );
  const activeRadial = useGradientStore((state) => state.activeRadial);
  const activeConic = useGradientStore((state) => state.activeConic);
  const toggleQuickViewModel = useModelStore(
    (state) => state.toggleQuickViewModel,
  );
  const setQuickViewActiveTab = useOtherStore(
    (state) => state.setQuickViewActiveTab,
  );
  const setQuickViewPalette = useOtherStore(
    (state) => state.setQuickViewPalette,
  );
  const setQuickViewActiveColor = useOtherStore(
    (state) => state.setQuickViewActiveColor,
  );

  const handler = (title: string) => {
    toggleGradientResponsiveMoreMenu();
    if (title === "History") {
      toggleGradientHistoryModel();
    } else if (title === "Quick view") {
      toggleQuickViewModel();
      setQuickViewActiveTab("Formats");
      const data = gradientStops
        .sort((a, b) => a.position - b.position)
        .map((stop) => stop.color);
      setQuickViewPalette(data);
      setQuickViewActiveColor(data[0]);
    } else if (title === "Open on screen") {
      setIsMaximizeGradient();
    } else if (title === "Export") {
      toggleExportModel();
      setExportFrom("Gradient");
      setExportPalette(gradientStops.map((stop) => stop.color));
      setGradientExport(
        `background: ${getGradientCSS(
          gradientStops,
          activeGradientType,
          gradientRotationValue,
          activeRadial,
          activeConic,
        )};`,
      );
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
        toggleGradientResponsiveMoreMenu();
      }
    }

    if (gradientResponsiveMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [gradientResponsiveMoreMenu]);

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        onClick={() => toggleGradientResponsiveMoreMenu()}
        aria-label="More options for CSS Gradient Generator"
      >
        <LuEllipsisVertical
          size={17}
          aria-hidden="true"
          className={`text-gray-900 hover:scale-110 cursor-pointer active:scale-90 transition-all`}
        />
      </div>

      <AnimatePresence>
        {gradientResponsiveMoreMenu && (
          <motion.menu
            ref={menuRef}
            aria-label="CSS Gradient Generator actions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl flex flex-col p-2.5 z-40 absolute 
            top-8 right-0 w-max"
          >
            {gradientResponsiveMoreMenuItems.map(
              ({ id, title, icon: Icon }) => {
                return (
                  <button
                    key={id}
                    aria-hidden="true"
                    aria-label={`${title} — CSS Gradient Generator`}
                    className={`w-full flex items-center gap-4 p-2 text-gray-900 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all`}
                    onClick={() => handler(title)}
                  >
                    <Icon size={16} />
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
