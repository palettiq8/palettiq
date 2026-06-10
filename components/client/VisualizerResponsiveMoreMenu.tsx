"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { visualizerResponsiveMoreMenuItems } from "@/utils/Items";
import useModelStore from "@/libs/stores/modelStore";
import {
  useGeneratorStore,
  useGradientStore,
  useOtherStore,
  useVisualizerStore,
} from "@/libs/stores/dataStore";
import { StopType } from "@/utils/Types";

export default function VisualizerResponsiveMoreMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const visualizerResponsiveMoreMenu = useMenuStore(
    (state) => state.visualizerResponsiveMoreMenu,
  );
  const toggleVisualizerResponsiveMoreMenu = useMenuStore(
    (state) => state.toggleVisualizerResponsiveMoreMenu,
  );
  const toggleVisualizerPaletteHistoryModel = useModelStore(
    (state) => state.toggleVisualizerPaletteHistoryModel,
  );
  const setQuickViewActiveTab = useOtherStore(
    (state) => state.setQuickViewActiveTab,
  );
  const setQuickViewPalette = useOtherStore(
    (state) => state.setQuickViewPalette,
  );
  const toggleQuickViewModel = useModelStore(
    (state) => state.toggleQuickViewModel,
  );
  const setQuickViewActiveColor = useOtherStore(
    (state) => state.setQuickViewActiveColor,
  );
  const generatedVisualizerPalette = useVisualizerStore(
    (state) => state.generatedVisualizerPalette,
  );
  const setGeneratedPalette = useGeneratorStore(
    (state) => state.setGeneratedPalette,
  );
  const addGradientStop = useGradientStore((state) => state.addGradientStop);
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
  const visualizerPaletteColorShuffler = useVisualizerStore(
    (state) => state.visualizerPaletteColorShuffler,
  );
  const toggleVisualizerResponsiveTempletesModel = useModelStore(
    (state) => state.toggleVisualizerResponsiveTempletesModel,
  );
  const setActiveVisualizerMaximize = useVisualizerStore(
    (state) => state.setActiveVisualizerMaximize,
  );

  const handler = (title: string) => {
    if (title !== "Shuffle palette") toggleVisualizerResponsiveMoreMenu();
    if (title === "History") {
      toggleVisualizerPaletteHistoryModel();
    } else if (title === "Quick view") {
      toggleQuickViewModel();
      setQuickViewActiveTab("Formats");
      const data = generatedVisualizerPalette.map((palette) => palette.color);
      setQuickViewPalette(data);
      setQuickViewActiveColor(data[0]);
    } else if (title === "Shuffle palette") {
      visualizerPaletteColorShuffler();
    } else if (title === "Edit on generator") {
      setGeneratedPalette(generatedVisualizerPalette);
      window.open("/studio", "_blank");
    } else if (title === "Open on screen") {
      setActiveVisualizerMaximize();
    } else if (title === "Make gradient") {
      const stops: StopType[] = generatedVisualizerPalette.map((palette, i) => {
        const n = generatedVisualizerPalette.length;
        return {
          id: `${i + 1}`,
          color: palette.color,
          isHide: false,
          position: Math.round((i / (n - 1)) * 100),
        };
      });
      addGradientStop(stops);
      window.open("/studio/css-gradient-generator", "_blank");
    } else if (title === "Templetes") {
      toggleVisualizerResponsiveTempletesModel();
    } else if (title === "Export") {
      toggleExportModel();
      setExportFrom("Palette");
      setExportPalette(
        generatedVisualizerPalette.map((palette) => palette.color),
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
        toggleVisualizerResponsiveMoreMenu();
      }
    }

    if (visualizerResponsiveMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visualizerResponsiveMoreMenu]);

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        onClick={() => toggleVisualizerResponsiveMoreMenu()}
        aria-label="More options for Color Palette Visualizer"
      >
        <button
          className={`w-8.5 h-8.5 cursor-pointer rounded-full border grid place-content-center ${visualizerResponsiveMoreMenu ? "bg-gray-100 border-gray-200" : "border-white"}`}
        >
          <LuEllipsisVertical
            size={17}
            aria-hidden="true"
            className="text-gray-900"
          />
        </button>
      </div>

      <AnimatePresence>
        {visualizerResponsiveMoreMenu && (
          <motion.menu
            ref={menuRef}
            aria-label="Color Palette Visualizer actions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl flex flex-col p-2.5 z-40 absolute 
            top-10 right-0 w-max"
          >
            {visualizerResponsiveMoreMenuItems.map(
              ({ id, title, icon: Icon }) => {
                return (
                  <div
                    key={id}
                    className={`w-full ${title === "Templetes" && "hidden max-lg:block"}`}
                  >
                    <button
                      aria-label={`${title} — Color Palette Visualizer`}
                      className={`w-full flex items-center gap-4 p-2 text-gray-900 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all`}
                      onClick={() => handler(title)}
                    >
                      <Icon size={16} aria-hidden="true" />
                      <p className="text-sm font-semibold">{title}</p>
                    </button>
                  </div>
                );
              },
            )}
          </motion.menu>
        )}
      </AnimatePresence>
    </div>
  );
}
