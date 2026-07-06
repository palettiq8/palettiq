"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import useMenuStore from "@/libs/stores/menuStore";
import ToggleButton from "../server/ToggleButton";
import { colorFamilies, preferredColors } from "@/utils/Items";
import {
  useContrastStore,
  useGeneratorStore,
  useGradientStore,
  usePickerStore,
  useVisualizerStore,
} from "@/libs/stores/dataStore";

export default function ColorPreferencesMenu({ from }: { from: string }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const colorPreferencesMenu = useMenuStore(
    (state) => state.colorPreferencesMenu,
  );
  const toggleColorPreferencesMenu = useMenuStore(
    (state) => state.toggleColorPreferencesMenu,
  );
  const defaultPreference = useGeneratorStore(
    (state) => state.defaultPreference,
  );
  const defaultContrastPreference = useContrastStore(
    (state) => state.defaultContrastPreference,
  );
  const defaultGradientPreference = useGradientStore(
    (state) => state.defaultGradientPreference,
  );
  const defaultVisualizerPreference = useVisualizerStore(
    (state) => state.defaultVisualizerPreference,
  );
  const defaultColorPreference = usePickerStore(
    (state) => state.defaultColorPreference,
  );
  const setDefaultPreference = useGeneratorStore(
    (state) => state.setDefaultPreference,
  );
  const setDefaultContrastPreference = useContrastStore(
    (state) => state.setDefaultContrastPreference,
  );
  const setDefaultGradientPreference = useGradientStore(
    (state) => state.setDefaultGradientPreference,
  );
  const setDefaultVisualizerPreference = useVisualizerStore(
    (state) => state.setDefaultVisualizerPreference,
  );
  const setDefaultColorPreference = usePickerStore(
    (state) => state.setDefaultColorPreference,
  );
  const preferredItems = useGeneratorStore((state) => state.preferredItems);
  const preferredContrastItems = useContrastStore(
    (state) => state.preferredContrastItems,
  );
  const preferredGradientItems = useGradientStore(
    (state) => state.preferredGradientItems,
  );
  const preferredVisualizerItems = useVisualizerStore(
    (state) => state.preferredVisualizerItems,
  );
  const preferredColorItems = usePickerStore(
    (state) => state.preferredColorItems,
  );
  const setPreferredItems = useGeneratorStore(
    (state) => state.setPreferredItems,
  );
  const setPreferredContrastItems = useContrastStore(
    (state) => state.setPreferredContrastItems,
  );
  const setPreferredGradientItems = useGradientStore(
    (state) => state.setPreferredGradientItems,
  );
  const setPreferredVisualizerItems = useVisualizerStore(
    (state) => state.setPreferredVisualizerItems,
  );
  const setPreferredColorItems = usePickerStore(
    (state) => state.setPreferredColorItems,
  );
  const setHslControlPanelFamilies = useGeneratorStore(
    (state) => state.setHslControlPanelFamilies,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleColorPreferencesMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        toggleColorPreferencesMenu();
      }
    }

    if (colorPreferencesMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [colorPreferencesMenu]);

  const preferenceConfig: Record<
    string,
    {
      contextLabel: string;
      isDefault: boolean;
      setDefault: () => void;
      isSelected: (name: string) => boolean;
      selectColor: (name: string) => void;
    }
  > = {
    Studio: {
      contextLabel: "Color Palette Generator",
      isDefault: defaultPreference,
      setDefault: setDefaultPreference,
      isSelected: (name) => preferredItems.includes(name),
      selectColor: (name) => {
        setPreferredItems(name);
        setHslControlPanelFamilies(name, colorFamilies[name]);
      },
    },
    Gradient: {
      contextLabel: "CSS Gradient Generator",
      isDefault: defaultGradientPreference,
      setDefault: setDefaultGradientPreference,
      isSelected: (name) => preferredGradientItems.includes(name),
      selectColor: (name) => setPreferredGradientItems(name),
    },
    Contrast: {
      contextLabel: "Color Contrast Checker",
      isDefault: defaultContrastPreference,
      setDefault: setDefaultContrastPreference,
      isSelected: (name) => preferredContrastItems.includes(name),
      selectColor: (name) => setPreferredContrastItems(name),
    },
    Picker: {
      contextLabel: "Color Picker",
      isDefault: defaultColorPreference,
      setDefault: setDefaultColorPreference,
      isSelected: (name) => preferredColorItems === name,
      selectColor: (name) => setPreferredColorItems(name),
    },
    Visualizer: {
      contextLabel: "Palette Visualizer",
      isDefault: defaultVisualizerPreference,
      setDefault: setDefaultVisualizerPreference,
      isSelected: (name) => preferredVisualizerItems.includes(name),
      selectColor: (name) => setPreferredVisualizerItems(name),
    },
  };

  const config = preferenceConfig[from] ?? preferenceConfig.Visualizer;

  return (
    <div className="relative max-lg:w-full">
      <div
        ref={buttonRef}
        onClick={() => toggleColorPreferencesMenu()}
        className="max-lg:w-full"
      >
        <Button
          variant={"outline"}
          size={"md"}
          aria-label="Open color preferences for palette generation"
          aria-expanded={colorPreferencesMenu}
          aria-haspopup="menu"
          className="max-lg:w-full max-lg:justify-between"
        >
          <span>Color Preferences</span>
          <LuChevronDown
            aria-hidden="true"
            className={`${colorPreferencesMenu ? "rotate-0" : "rotate-180"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {colorPreferencesMenu && (
          <motion.menu
            ref={menuRef}
            role="menu"
            aria-label={`Color preferences for ${config.contextLabel}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg rounded-xl z-40 absolute bottom-12 left-0 w-full"
          >
            <div className="w-full p-4.5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                All colors
              </h3>
              <ToggleButton
                isTrue={config.isDefault}
                setIsTrue={config.setDefault}
              />
            </div>
            <div className="w-full h-max flex flex-col p-2.5 max-h-100 overflow-y-auto noscrollbar">
              {preferredColors.map(({ id, name, hex }) => {
                const isExist = config.isSelected(name);
                return (
                  <button
                    key={id}
                    role="menuitem"
                    aria-label={`${isExist ? "Remove" : "Add"} ${name} color from ${config.contextLabel}`}
                    aria-pressed={isExist}
                    className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${isExist ? "text-indigo-600" : "text-gray-900"}`}
                    onClick={() => config.selectColor(name)}
                  >
                    <div className="flex items-center gap-4">
                      <LuCheck
                        size={16}
                        aria-hidden="true"
                        className={`invisible ${isExist && "visible"}`}
                      />
                      <p className="text-sm font-semibold">{name}</p>
                    </div>
                    <span
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: hex }}
                    ></span>
                  </button>
                );
              })}
            </div>
          </motion.menu>
        )}
      </AnimatePresence>
    </div>
  );
}
