"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { generatorContentHeaderItemsStyle } from "@/utils/styles/Classes";
import { pickerResponsiveMoreMenuItems } from "@/utils/Items";
import useModelStore from "@/libs/stores/modelStore";
import useUiStore from "@/libs/stores/uiStore";
import { useOtherStore, usePickerStore } from "@/libs/stores/dataStore";

export default function PickerResponsiveMoreMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const pickerResponsiveMoreMenu = useMenuStore(
    (state) => state.pickerResponsiveMoreMenu,
  );
  const togglePickerResponsiveMoreMenu = useMenuStore(
    (state) => state.togglePickerResponsiveMoreMenu,
  );
  const toggleColorHistoryModel = useModelStore(
    (state) => state.toggleColorHistoryModel,
  );
  const setIsMaximizeColorPicker = useUiStore(
    (state) => state.setIsMaximizeColorPicker,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
  const colorPickerColor = usePickerStore((state) => state.colorPickerColor);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        togglePickerResponsiveMoreMenu();
      }
    }

    if (pickerResponsiveMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pickerResponsiveMoreMenu]);

  const handler = (title: string) => {
    togglePickerResponsiveMoreMenu();
    if (title === "History") {
      toggleColorHistoryModel();
    } else if (title === "Open on screen") {
      setIsMaximizeColorPicker();
    } else if (title === "Export") {
      toggleExportModel();
      setExportFrom("Color");
      setExportPalette([colorPickerColor]);
    }
  };

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        aria-label="More options for color picker"
        onClick={() => togglePickerResponsiveMoreMenu()}
      >
        <LuEllipsisVertical
          size={17}
          aria-hidden="true"
          className={`${generatorContentHeaderItemsStyle}`}
        />
      </div>

      <AnimatePresence>
        {pickerResponsiveMoreMenu && (
          <motion.menu
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl flex flex-col p-2.5 z-40 absolute 
            top-8 right-0 w-max"
          >
            {pickerResponsiveMoreMenuItems.map(({ id, title, icon: Icon }) => {
              return (
                <button
                  key={id}
                  aria-label={`${title} — Color Picker`}
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
