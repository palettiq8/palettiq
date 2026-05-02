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

    if (colorPreferencesMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [colorPreferencesMenu]);

  const isTrue =
    from === "Studio"
      ? defaultPreference
      : from === "Gradient"
        ? defaultGradientPreference
        : from === "Contrast"
          ? defaultContrastPreference
          : from === "Picker"
            ? defaultColorPreference
            : defaultVisualizerPreference;

  const setIsTrue =
    from === "Studio"
      ? setDefaultPreference
      : from === "Gradient"
        ? setDefaultGradientPreference
        : from === "Contrast"
          ? setDefaultContrastPreference
          : from === "Picker"
            ? setDefaultColorPreference
            : setDefaultVisualizerPreference;

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
          className="max-lg:w-full max-lg:justify-between"
        >
          <span>Auto Color Preferences</span>
          <LuChevronDown
            className={`${colorPreferencesMenu ? "rotate-0" : "rotate-180"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {colorPreferencesMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg rounded-xl z-40 absolute bottom-12 left-0 w-full"
          >
            <div className="w-full p-4.5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Default</h3>
              <ToggleButton isTrue={isTrue} setIsTrue={setIsTrue} />
            </div>
            <div className="w-full h-max flex flex-col p-2.5 max-h-100 overflow-y-auto noscrollbar">
              {preferredColors.map(({ id, name, hex }) => {
                const isExist =
                  from === "Studio"
                    ? preferredItems.includes(name)
                    : from === "Gradient"
                      ? preferredGradientItems.includes(name)
                      : from === "Contrast"
                        ? preferredContrastItems.includes(name)
                        : from === "Picker"
                          ? preferredColorItems === name
                          : preferredVisualizerItems.includes(name);
                return (
                  <button
                    key={id}
                    className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${isExist ? "text-indigo-600" : "text-gray-900"}`}
                    onClick={() => {
                      if (from === "Studio") {
                        setPreferredItems(name);
                        setHslControlPanelFamilies(name, colorFamilies[name]);
                      } else if (from === "Gradient") {
                        setPreferredGradientItems(name);
                      } else if (from === "Contrast") {
                        setPreferredContrastItems(name);
                      } else if (from === "Picker") {
                        setPreferredColorItems(name);
                      } else {
                        setPreferredVisualizerItems(name);
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <LuCheck
                        size={16}
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
            {from === "Contrast" && (
              <div className="w-full p-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-900">
                  Select one item only.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
