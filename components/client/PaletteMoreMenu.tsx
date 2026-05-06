"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import { Button } from "../Button";
import { paletteMoreItems } from "@/utils/Items";
import { PublishedPaletteType, StopType } from "@/utils/Types";
import { FlashMessage } from "@/utils/utils";
import useModelStore from "@/libs/stores/modelStore";
import {
  useBrowseStore,
  useGeneratorStore,
  useGradientStore,
  useOtherStore,
  useVisualizerStore,
} from "@/libs/stores/dataStore";

export default function PaletteMoreMenu({
  palette,
}: {
  palette: PublishedPaletteType;
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
  const togglePaletteViewDetailsModel = useModelStore(
    (state) => state.togglePaletteViewDetailsModel,
  );
  const setPaletteViewDetailsItem = useBrowseStore(
    (state) => state.setPaletteViewDetailsItem,
  );
  const setGeneratedPalette = useGeneratorStore(
    (state) => state.setGeneratedPalette,
  );
  const addGradientStop = useGradientStore((state) => state.addGradientStop);
  const setOpenOnScreenPalette = useBrowseStore(
    (state) => state.setOpenOnScreenPalette,
  );
  const setViewModePalette = useBrowseStore(
    (state) => state.setViewModePalette,
  );
  const setGeneratedVisualizerPalette = useVisualizerStore(
    (state) => state.setGeneratedVisualizerPalette,
  );
  const setFilterPreferredColors = useBrowseStore(
    (state) => state.setFilterPreferredColors,
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

  const colorsFromPalettes =
    palette?.colors?.map(({ color }: any) => color) || [];

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        onClick={() => {
          setShowMenu((prev) => !prev);
        }}
        aria-label={`More options for ${palette?.name} palette`}
      >
        <Button
          variant={"secondary"}
          size={"circle"}
          className="hover:bg-white"
          aria-expanded={showMenu}
          aria-haspopup="true"
        >
          <LuEllipsisVertical size={16} />
        </Button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.menu
            ref={menuRef}
            aria-label={`Actions for ${palette?.name} palette`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg rounded-xl flex flex-col p-2.5 z-40 absolute top-9 right-0 w-max overflow-y-auto"
          >
            {paletteMoreItems.map(({ id, title, icon: Icon }) => {
              return (
                <button
                  key={id}
                  aria-label={`${title} ${palette?.name} color palette`}
                  className="flex items-center p-2 gap-3 rounded-lg transition-all hover:bg-gray-100 border border-white hover:border-gray-200 hover:cursor-pointer select-none text-gray-900"
                  onClick={async () => {
                    setShowMenu(false);
                    if (title === "Copy") {
                      await navigator.clipboard.writeText(
                        `[${palette.colors.map((color) => `"${color.color}"`)}]`,
                      );
                      FlashMessage("success", "Copied to the clipboard!");
                    } else if (title === "Quick view") {
                      toggleQuickViewModel();
                      setQuickViewActiveTab("Formats");
                      setQuickViewPalette(colorsFromPalettes);
                      setQuickViewActiveColor(colorsFromPalettes[0]);
                    } else if (title === "View details") {
                      togglePaletteViewDetailsModel();
                      setPaletteViewDetailsItem(palette);
                    } else if (title === "Edit on generator") {
                      setGeneratedPalette(palette?.colors);
                      window.open("/studio", "_blank");
                    } else if (title === "Make gradient") {
                      const stops: StopType[] = palette?.colors?.map((_, i) => {
                        const n = palette?.colors?.length;
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
                      setOpenOnScreenPalette(palette?.colors);
                    } else if (title === "View mode") {
                      setViewModePalette(palette?.colors);
                    } else if (title === "Visualize the palette") {
                      setGeneratedVisualizerPalette(palette?.colors);
                      window.open("/studio/visualizer", "_blank");
                    } else if (title === "Explore similar") {
                      setFilterPreferredColors(palette?.preferred_colors);
                    } else if (title === "Export") {
                      toggleExportModel();
                      setExportFrom("Palette");
                      setExportPalette(
                        palette?.colors?.map((palette) => palette.color),
                      );
                    }
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
