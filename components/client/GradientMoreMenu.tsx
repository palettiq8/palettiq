"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import { Button } from "../Button";
import { gradientMoreItems } from "@/utils/Items";
import { FlashMessage, getGradientCSS } from "@/utils/utils";
import { GradientType } from "@/utils/Types";
import { useBrowseStore, useGeneratorStore, useGradientStore, useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";

export default function GradientMoreMenu({
  gradient
}: {
  gradient: GradientType
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const browseGradientActiveType = useBrowseStore(
    (state) => state.browseGradientActiveType,
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
  const toggleGradientViewDetailsModel = useModelStore(
    (state) => state.toggleGradientViewDetailsModel,
  );
  const setBrowseGradients = useBrowseStore((state) => state.setBrowseGradients);
  const addGradientStop = useGradientStore((state) => state.addGradientStop);
  const setGeneratedPalette = useGeneratorStore((state) => state.setGeneratedPalette);
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
  const setGradientExport = useOtherStore((state) => state.setGradientExport);
  const setOpenOnScreenGradient = useBrowseStore((state) => state.setOpenOnScreenGradient);
  const setViewModeGradient = useBrowseStore((state) => state.setViewModeGradient);

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

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        onClick={() => {
          setShowMenu((prev) => !prev);
          setBrowseGradients(gradient);
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
            className="bg-white shadow-lg rounded-xl flex flex-col p-2.5 z-40 absolute top-9 right-0 w-max"
          >
            {gradientMoreItems.map(({ id, title, icon: Icon }) => {
              return (
                <button
                  key={id}
                  onClick={async () => {
                    try {
                      setShowMenu(false);
                      if (title === "Copy CSS") {
                        await navigator.clipboard.writeText(
                          `background: ${getGradientCSS(
                            gradient?.stops,
                            browseGradientActiveType,
                            90,
                            { shape: "circle", x: 50, y: 50 },
                            { x: 50, y: 50 },
                          )};`,
                        );
                        FlashMessage("success", "Copied to the clipboard!");
                      } else if (title === "Quick view") {
                        toggleQuickViewModel();
                        setQuickViewActiveTab("Formats");
                        const data = [...gradient?.stops]
                          .sort((a, b) => a.position - b.position)
                          .map((stop) => stop.color);
                        setQuickViewPalette(data);
                        setQuickViewActiveColor(data[0]);
                      } else if (title === "View details") {
                        toggleGradientViewDetailsModel();
                      } else if (title === "Open on gradient") {
                        addGradientStop(gradient?.stops);
                        window.open("/studio/gradient", "_blank");
                      } else if (title === "Open on generator") {
                        const palette = gradient?.stops?.map((stop, index) => ({
                          id: `${index + 1}`,
                          color: stop?.color,
                          isLocked: false
                        }))
                        setGeneratedPalette(palette);
                        window.open("/studio", "_blank");
                      } else if (title === "Open on screen") {
                        setOpenOnScreenGradient(gradient?.stops);
                      } else if (title === "View mode") {
                        setViewModeGradient(gradient?.stops);
                      } else if (title === "Export") {
                        toggleExportModel();
                        setExportFrom("Browse-Gradient");
                        setExportPalette(gradient?.stops?.map((stop) => stop.color));
                        setGradientExport(
                          `background: ${getGradientCSS(
                            gradient?.stops,
                            browseGradientActiveType,
                            90,
                            { shape: "circle", x: 50, y: 50 },
                            { x: 50, y: 50 },
                          )};`,
                        );
                      }
                    } catch (error: any) {
                      FlashMessage("error", "Something went to wrong!")
                    }
                  }}
                  className="flex items-center p-2 gap-3 rounded-lg transition-all hover:bg-gray-100 border border-white hover:border-gray-200 hover:cursor-pointer select-none text-gray-900"
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
