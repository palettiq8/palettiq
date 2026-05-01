"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import { Button } from "../Button";
import { aiPaletteMoreItems } from "@/utils/Items";
import { FlashMessage } from "@/utils/utils";
import { PaletteColor, StopType } from "@/utils/Types";
import useModelStore from "@/libs/stores/modelStore";
import {
  useBrowseStore,
  useGeneratorStore,
  useGradientStore,
  useOtherStore,
  useVisualizerStore,
} from "@/libs/stores/dataStore";

export default function AiPaletteMoreMenu({
  palette,
}: {
  palette: PaletteColor[];
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
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
  const setGeneratedPalette = useGeneratorStore(
    (state) => state.setGeneratedPalette,
  );
  const addGradientStop = useGradientStore((state) => state.addGradientStop);
  const setViewModePalette = useBrowseStore(
    (state) => state.setViewModePalette,
  );
  const setOpenOnScreenPalette = useBrowseStore(
    (state) => state.setOpenOnScreenPalette,
  );
  const setAddToCommunityPalette = useOtherStore(
    (state) => state.setAddToCommunityPalette,
  );
  const toggleAddToCommunityModel = useModelStore(
    (state) => state.toggleAddToCommunityModel,
  );
  const setGeneratedVisualizerPalette = useVisualizerStore(
    (state) => state.setGeneratedVisualizerPalette,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);

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

  const data = palette.map((_) => _.color);

  const handler = async (title: string) => {
    setShowMenu(false);
    try {
      if (title === "Copy") {
        await navigator.clipboard.writeText(
          `[${palette.map((color) => `"${color.color}"`)}]`,
        );
        FlashMessage("success", "Copied to the clipboard!");
      } else if (title === "Quick view") {
        toggleQuickViewModel();
        setQuickViewActiveTab("Formats");
        setQuickViewPalette(data);
        setQuickViewActiveColor(data[0]);
      } else if (title === "Edit on generator") {
        setGeneratedPalette(palette);
        window.open("/studio", "_blank");
      } else if (title === "Make gradient") {
        const stops: StopType[] = palette.map((_, i) => {
          const n = palette.length;
          return {
            id: `${i + 1}`,
            color: _.color,
            isHide: false,
            position: Math.round((i / (n - 1)) * 100),
          };
        });
        addGradientStop(stops);
        window.open("/studio/gradient", "_blank");
      } else if (title === "Open on screen") {
        setOpenOnScreenPalette(palette);
      } else if (title === "View mode") {
        setViewModePalette(palette);
      } else if (title === "Add to community") {
        toggleAddToCommunityModel();
        setAddToCommunityPalette(palette);
      } else if (title === "Visualize the palette") {
        setGeneratedVisualizerPalette(palette);
        window.open("/studio/visualizer", "_blank");
      } else if (title === "Export") {
        toggleExportModel();
        setExportFrom("Palette");
        setExportPalette(data);
      }
    } catch (error: any) {
      FlashMessage("error", error?.message);
    }
  };

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        onClick={() => {
          setShowMenu((prev) => !prev);
        }}
      >
        <Button
          variant={"secondary"}
          size={"circle"}
          className="hover:bg-white"
        >
          <LuEllipsisVertical size={16} />
        </Button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg rounded-xl flex flex-col p-2.5 z-40 absolute top-9 right-0 w-max overflow-y-auto"
          >
            {aiPaletteMoreItems.map(({ id, title, icon: Icon }) => {
              return (
                <button
                  key={id}
                  className="flex items-center p-2 gap-3 rounded-lg transition-all hover:bg-gray-100 border border-white hover:border-gray-200 hover:cursor-pointer select-none text-gray-900"
                  onClick={() => handler(title)}
                >
                  <Icon size={16} />
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
