"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuArrowLeftRight,
  LuChevronDown,
  LuCircleDot,
  LuGrid2X2Plus,
  LuHistory,
  LuMaximize2,
  LuPencilLine,
  LuShrink,
} from "react-icons/lu";
import { Button } from "../Button";
import useMenuStore from "@/libs/stores/menuStore";
import useModelStore from "@/libs/stores/modelStore";
import useUiStore from "@/libs/stores/uiStore";
import {
  useBrowseStore,
  useContrastStore,
  useExtractorStore,
  useGeneratorStore,
  useGradientStore,
  useVisualizerStore,
} from "@/libs/stores/dataStore";
import { StopType } from "@/utils/Types";

export default function OpenMoreMenu({ from }: { from: string }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const openMoreMenu = useMenuStore((state) => state.openMoreMenu);
  const toggleOpenMoreMenu = useMenuStore((state) => state.toggleOpenMoreMenu);
  const toggleVisualizerPaletteHistoryModel = useModelStore(
    (state) => state.toggleVisualizerPaletteHistoryModel,
  );
  const setIsMaximizeColorPicker = useUiStore(
    (state) => state.setIsMaximizeColorPicker,
  );
  const setIsMaximizeGradient = useUiStore(
    (state) => state.setIsMaximizeGradient,
  );
  const setIsMaximizeContrast = useUiStore(
    (state) => state.setIsMaximizeContrast,
  );
  const alterContrast = useContrastStore((state) => state.alterContrast);
  const setIsMaximizeExtractor = useUiStore(
    (state) => state.setIsMaximizeExtractor,
  );
  const setIsMaximizeShadow = useUiStore((state) => state.setIsMaximizeShadow);
  const generatedVisualizerPalette = useVisualizerStore(
    (state) => state.generatedVisualizerPalette,
  );
  const addGradientStop = useGradientStore((state) => state.addGradientStop);
  const setGeneratedPalette = useGeneratorStore(
    (state) => state.setGeneratedPalette,
  );
  const pickers = useExtractorStore((state) => state.pickers);
  const gradientStops = useGradientStore((state) => state.gradientStops);
  const setViewModeGradient = useBrowseStore(
    (state) => state.setViewModeGradient,
  );

  const MENU_DATA: Record<
    string,
    { id: number; title: string; icon: any; handler: () => void }[]
  > = {
    Picker: [
      {
        id: 1,
        title: "Open on screen",
        icon: LuMaximize2,
        handler: () => setIsMaximizeColorPicker(),
      },
    ],
    Gradient: [
      {
        id: 1,
        title: "Open on generator",
        icon: LuGrid2X2Plus,
        handler: () => {
          const palette = gradientStops.map((stop, index) => ({
            id: `${index + 1}`,
            color: stop?.color,
            isLocked: false,
          }));
          setGeneratedPalette(palette);
          window.open("/studio", "_blank");
        },
      },
      {
        id: 2,
        title: "Open on screen",
        icon: LuMaximize2,
        handler: () => setIsMaximizeGradient(),
      },
      {
        id: 3,
        title: "View mode",
        icon: LuShrink,
        handler: () => setViewModeGradient(gradientStops),
      },
    ],
    Extractor: [
      {
        id: 1,
        title: "Open on screen",
        icon: LuMaximize2,
        handler: () => setIsMaximizeExtractor(),
      },
      {
        id: 2,
        title: "Edit on generator",
        icon: LuPencilLine,
        handler: () => {
          const data = pickers.map((picker, index) => ({
            id: `${index + 1}`,
            color: picker.color,
            isLocked: false,
          }));
          setGeneratedPalette(data);
          window.open("/studio", "_blank");
        },
      },
    ],
    Contrast: [
      {
        id: 1,
        title: "Alter color",
        icon: LuArrowLeftRight,
        handler: () => alterContrast(),
      },
      {
        id: 2,
        title: "Open on screen",
        icon: LuMaximize2,
        handler: () => setIsMaximizeContrast(),
      },
    ],
    Visualizer: [
      {
        id: 1,
        title: "Edit on generator",
        icon: LuPencilLine,
        handler: () => {
          setGeneratedPalette(generatedVisualizerPalette);
          window.open("/studio", "_blank");
        },
      },
      {
        id: 2,
        title: "History",
        icon: LuHistory,
        handler: () => toggleVisualizerPaletteHistoryModel(),
      },
      {
        id: 3,
        title: "Make gradient",
        icon: LuCircleDot,
        handler: () => {
          const stops: StopType[] = generatedVisualizerPalette.map(
            (palette, i) => {
              const n = generatedVisualizerPalette.length;
              return {
                id: `${i + 1}`,
                color: palette.color,
                isHide: false,
                position: Math.round((i / (n - 1)) * 100),
              };
            },
          );
          addGradientStop(stops);
          window.open("/studio/css-gradient-generator", "_blank");
        },
      },
    ],
    Shadow: [
      {
        id: 1,
        title: "Open on screen",
        icon: LuMaximize2,
        handler: () => setIsMaximizeShadow(),
      },
    ],
  };
  const activeMenuItems = MENU_DATA[from] || [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleOpenMoreMenu();
      }
    }

    if (openMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMoreMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => toggleOpenMoreMenu()}>
        <Button
          variant={"outline"}
          size={"md"}
          aria-label={`More options for ${
            from === "Picker"
              ? "Color Picker"
              : from === "Gradient"
                ? "CSS Gradient Generator"
                : from === "Contrast"
                  ? "Color Contrast Checker"
                  : from === "Extractor"
                    ? "Color Extractor"
                    : from === "Visualizer"
                      ? "Palette Visualizer"
                      : from === "Shadow"
                        ? "CSS Shadow Generator"
                        : "tool"
          }`}
          aria-expanded={openMoreMenu}
          aria-haspopup="true"
        >
          <span>More Options</span>
          <LuChevronDown
            className={`${openMoreMenu ? "rotate-0" : "rotate-180"} transition-all`}
            aria-hidden="true"
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {openMoreMenu && (
          <motion.menu
            ref={menuRef}
            aria-label={`${
              from === "Picker"
                ? "Color Picker"
                : from === "Gradient"
                  ? "CSS Gradient Generator"
                  : from === "Contrast"
                    ? "Color Contrast Checker"
                    : from === "Extractor"
                      ? "Color Extractor"
                      : from === "Visualizer"
                        ? "Palette Visualizer"
                        : from === "Shadow"
                          ? "CSS Shadow Generator"
                          : "tool"
            } actions`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg flex flex-col rounded-xl p-2.5 z-40 absolute bottom-12 left-0 w-max"
          >
            {activeMenuItems.map(({ id, title, icon: Icon, handler }) => {
              return (
                <button
                  key={id}
                  aria-label={`${title} — ${
                    from === "Picker"
                      ? "Color Picker"
                      : from === "Gradient"
                        ? "CSS Gradient Generator"
                        : from === "Contrast"
                          ? "Color Contrast Checker"
                          : from === "Extractor"
                            ? "Color Extractor"
                            : from === "Visualizer"
                              ? "Palette Visualizer"
                              : from === "Shadow"
                                ? "CSS Shadow Generator"
                                : "tool"
                  }`}
                  className="flex items-center gap-4 p-2 text-gray-900 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all"
                  onClick={() => {
                    handler();
                    toggleOpenMoreMenu();
                  }}
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
