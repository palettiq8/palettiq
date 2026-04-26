"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { generatorContentHeaderItemsStyle } from "@/utils/styles/Classes";
import { generatorContentHeaderMoreItems } from "@/utils/Items";
import { StopType } from "@/utils/Types";
import {
  useBrowseStore,
  useGeneratorStore,
  useGradientStore,
  useOtherStore,
  useVisualizerStore,
} from "@/libs/stores/dataStore";
import { FlashMessage } from "@/utils/utils";
import useModelStore from "@/libs/stores/modelStore";
import useUiStore from "@/libs/stores/uiStore";

export default function GeneratorMoreMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const generatorMoreMenu = useMenuStore((state) => state.generatorMoreMenu);
  const toggleGeneratorMoreMenu = useMenuStore(
    (state) => state.toggleGeneratorMoreMenu,
  );
  const generatedPalette = useGeneratorStore((state) => state.generatedPalette);
  const addGradientStop = useGradientStore((state) => state.addGradientStop);
  const setGeneratedVisualizerPalette = useVisualizerStore(
    (state) => state.setGeneratedVisualizerPalette,
  );
  const togglePaletteHistoryModel = useModelStore(
    (state) => state.togglePaletteHistoryModel,
  );
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
  const toggleGeneratorMaximize = useUiStore(
    (state) => state.toggleGeneratorMaximize,
  );
  const setViewModePalette = useBrowseStore(
    (state) => state.setViewModePalette,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
    const toggleAddToCommunityModel = useModelStore(
    (state) => state.toggleAddToCommunityModel,
  );
  [
    "#da9180",
    "#f5bfa5",
    "#2459b3",
    "#4b4b6d",
    "#82696e",
    "#f87557",
    "#b8a4af",
    "#d36a3a",
  ];
  const data = generatedPalette.map((palette) => palette.color);
  const handler = async (title: string) => {
    toggleGeneratorMoreMenu();
    if (title === "Copy") {
      await navigator.clipboard.writeText(
        `[${generatedPalette.map((color) => `"${color.color}"`)}]`,
      );
      FlashMessage("success", "Copied to the clipboard!");
    } else if (title === "History") {
      togglePaletteHistoryModel();
    } else if (title === "Harmonies") {
      toggleQuickViewModel();
      setQuickViewActiveTab("Harmonies");
      setQuickViewPalette(data);
      setQuickViewActiveColor(data[0]);
    } else if (title === "View mode") {
      setViewModePalette(generatedPalette);
    } else if (title === "Quick view") {
      toggleQuickViewModel();
      setQuickViewActiveTab("Formats");
      setQuickViewPalette(data);
      setQuickViewActiveColor(data[0]);
    } else if (title === "Make gradient") {
      const stops: StopType[] = generatedPalette.map((palette, i) => {
        const n = generatedPalette.length;
        return {
          id: `${i + 1}`,
          color: palette.color,
          isHide: false,
          position: Math.round((i / (n - 1)) * 100),
        };
      });
      addGradientStop(stops);
      window.open("/studio/gradient", "_blank");
    } else if (title === "Open on screen") {
      toggleGeneratorMaximize();
    } else if (title === "Add to community") {
toggleAddToCommunityModel();
    } else if (title === "Visualize the palette") {
      setGeneratedVisualizerPalette(generatedPalette);
      window.open("/studio/visualizer", "_blank");
    } else if (title === "Export") {
      toggleExportModel();
      setExportFrom("Palette");
      setExportPalette(generatedPalette.map((palette) => palette.color));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setViewModePalette(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleGeneratorMoreMenu();
      }
    }

    if (generatorMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [generatorMoreMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => toggleGeneratorMoreMenu()}>
        <LuEllipsisVertical
          size={17}
          className={generatorContentHeaderItemsStyle}
        />
      </div>

      <AnimatePresence>
        {generatorMoreMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl flex flex-col p-2.5 z-40 absolute 
            top-8 lg:left-0 w-max max-lg:right-0"
          >
            {generatorContentHeaderMoreItems.map(
              ({ id, title, icon: Icon }) => {
                return (
                  <div
                    key={id}
                    className={`w-full ${["Quick view", "Open on screen", "Harmonies", "History", "Export", "Add to community"].includes(title) && "hidden max-lg:block"}`}
                  >
                    <button
                      onClick={() => handler(title)}
                      className={`w-full flex items-center gap-4 p-2 text-gray-900 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all`}
                    >
                      <Icon size={16} />
                      <p className="text-sm font-semibold">{title}</p>
                    </button>
                  </div>
                );
              },
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
