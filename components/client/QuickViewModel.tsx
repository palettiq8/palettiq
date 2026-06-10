"use client";

import { useState } from "react";
import { useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { quickViewTabItems } from "@/utils/Items";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck } from "react-icons/lu";
import { Colord, colord, extend } from "colord";
import cmykPlugin from "colord/plugins/cmyk";
import hwbPlugin from "colord/plugins/hwb";
import labPlugin from "colord/plugins/lab";
import lchPlugin from "colord/plugins/lch";
import xyzPlugin from "colord/plugins/xyz";
import FormatCard from "../server/FormatCard";
import mixPlugin from "colord/plugins/mix";
import harmoniesPlugin, { HarmonyType } from "colord/plugins/harmonies";
import HarmoniesMenu from "./HarmoniesMenu";
import { FlashMessage, generateMonochromatic } from "@/utils/utils";

extend([cmykPlugin]);
extend([hwbPlugin]);
extend([labPlugin]);
extend([lchPlugin]);
extend([xyzPlugin]);
extend([mixPlugin]);
extend([harmoniesPlugin]);

const ColorManipulator = ({ items, tab }: { items: Colord[]; tab: string }) => {
  return (
    <div className="w-full p-3 flex h-80">
      {items.map((col, index) => {
        const color = col.toHex();
        return (
          <div
            role="button"
            aria-label={`Copy ${tab} color ${color.toUpperCase()}`}
            key={index}
            className="w-full h-full first:rounded-l-lg last:rounded-r-lg group relative transition-transform cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={async () => {
              await navigator.clipboard.writeText(color.toUpperCase());
              FlashMessage("success", "Copied to the clipboard!");
            }}
          >
            <div className="absolute top-5 left-1/2">
              <div className="relative -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-gray-50 text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap z-10">
                <span className="text-xs font-medium text-gray-50">
                  {color.toUpperCase()}
                </span>
                <div className="w-2 h-2 top-6 left-1/2 absolute rotate-45 bg-gray-900"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function QuickViewModel() {
  const [activeHarmony, setActiveHarmony] = useState<string>("analogous");
  const [harmonyTitle, setHarmonyTitle] = useState("Analogous");
  const quickViewModel = useModelStore((state) => state.quickViewModel);
  const toggleQuickViewModel = useModelStore(
    (state) => state.toggleQuickViewModel,
  );
  const quickViewPalette = useOtherStore((state) => state.quickViewPalette);
  const quickViewActiveTab = useOtherStore((state) => state.quickViewActiveTab);
  const setQuickViewActiveTab = useOtherStore(
    (state) => state.setQuickViewActiveTab,
  );
  const quickViewActiveColor = useOtherStore(
    (state) => state.quickViewActiveColor,
  );
  const setQuickViewActiveColor = useOtherStore(
    (state) => state.setQuickViewActiveColor,
  );

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleQuickViewModel();
    }
  };

  const color = colord(quickViewActiveColor);
  const isLightActiveColor = color.isLight();

  const hex = color.toHex().toUpperCase();
  const rgb = color.toRgb();
  const cmyk = color.toCmyk();
  const hsl = color.toHsl();
  const hsv = color.toHsv();
  const hwb = color.toHwb();
  const lab = color.toLab();
  const lch = color.toLch();
  const xyz = color.toXyz();

  const allFormatsItems = [
    { id: 1, name: "HEX", value: `${hex}` },
    { id: 2, name: "RGB", value: `${rgb.r}, ${rgb.g}, ${rgb.b}` },
    { id: 3, name: "RGBA", value: `${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a}` },
    {
      id: 4,
      name: "CMYK",
      value: `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`,
    },
    { id: 5, name: "HSL", value: `${hsl.h}, ${hsl.s}, ${hsl.l}` },
    { id: 6, name: "HSV", value: `${hsv.h}, ${hsv.s}, ${hsv.v}` },
    { id: 7, name: "HWB", value: `${hwb.h}, ${hwb.w}, ${hwb.b}` },
    { id: 8, name: "LAB", value: `${lab.l}, ${lab.a}, ${lab.b}` },
    { id: 9, name: "LCH", value: `${lch.l}, ${lch.c}, ${lch.h}` },
    { id: 10, name: "XYZ", value: `${xyz.x}, ${xyz.y}, ${xyz.z}` },
  ];

  return (
    <AnimatePresence>
      {quickViewModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 z-50 grid items-end max-sm:px-4 parent pb-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick view color formats and harmonies"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="w-150 mx-auto bg-white rounded-xl shadow-2xl max-sm:w-full"
          >
            <div className="w-full h-30 border-b border-gray-200 flex p-3">
              {quickViewPalette.map((_, index) => {
                return (
                  <button
                    key={index}
                    aria-label={`Select color ${_} for quick view`}
                    aria-pressed={quickViewActiveColor === _}
                    onClick={() => setQuickViewActiveColor(_)}
                    className={`w-full h-full hover:cursor-pointer grid place-content-center first:rounded-l-xl last:rounded-r-xl ${isLightActiveColor ? "text-gray-900" : "text-gray-50"}`}
                    style={{ backgroundColor: _ }}
                  >
                    {quickViewActiveColor === _ && <LuCheck size={20} />}
                  </button>
                );
              })}
            </div>
            <div className="w-full h-max">
              {quickViewActiveTab === "Formats" && (
                <div className="w-full p-3 grid grid-cols-2 gap-3 max-sm:grid-cols-1 max-sm:max-h-100 max-sm:overflow-y-auto">
                  {allFormatsItems.map(({ id, name, value }) => (
                    <FormatCard key={id} name={name} value={value} />
                  ))}
                </div>
              )}
              {quickViewActiveTab === "Tints" && (
                <ColorManipulator items={color.tints(10)} tab="Tints" />
              )}
              {quickViewActiveTab === "Shades" && (
                <ColorManipulator items={color.shades(10)} tab="Shades" />
              )}
              {quickViewActiveTab === "Tones" && (
                <ColorManipulator items={color.tones(10)} tab="Tones" />
              )}
              {quickViewActiveTab === "Harmonies" && (
                <div className="w-full h-max p-3">
                  <div className="w-full flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {harmonyTitle.split("_").join(" ")}
                    </h3>
                    <HarmoniesMenu
                      activeHarmony={activeHarmony}
                      setActiveHarmony={setActiveHarmony}
                      setHarmonyTitle={setHarmonyTitle}
                    />
                  </div>
                  <div className="w-full h-80 mt-3 flex">
                    {harmonyTitle === "Monochromatic" ? (
                      <>
                        {generateMonochromatic(hex).map((_, index) => {
                          return (
                            <div
                              key={index}
                              role="button"
                              aria-label={`Copy monochromatic color ${_.toUpperCase()}`}
                              className="w-full h-full first:rounded-l-lg last:rounded-r-lg cursor-pointer group relative transition-transform"
                              style={{ backgroundColor: _ }}
                              onClick={async () => {
                                await navigator.clipboard.writeText(
                                  _.toUpperCase(),
                                );
                                FlashMessage(
                                  "success",
                                  "Copied to the clipboard!",
                                );
                              }}
                            >
                              <div className="absolute top-5 left-1/2">
                                <div className="relative -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-gray-50 text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap z-10">
                                  <span className="text-xs font-medium text-gray-50">
                                    {_.toUpperCase()}
                                  </span>
                                  <div className="w-2 h-2 top-6 left-1/2 absolute rotate-45 bg-gray-900"></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {color
                          .harmonies(activeHarmony as HarmonyType)
                          .map((c, _) => {
                            return (
                              <div
                                key={_}
                                role="button"
                                aria-label={`Copy ${harmonyTitle} harmony color ${c.toHex().toUpperCase()}`}
                                className="w-full h-full first:rounded-l-lg last:rounded-r-lg cursor-pointer group relative transition-transform"
                                style={{ backgroundColor: c.toHex() }}
                                onClick={async () => {
                                  await navigator.clipboard.writeText(
                                    c.toHex().toUpperCase(),
                                  );
                                  FlashMessage(
                                    "success",
                                    "Copied to the clipboard!",
                                  );
                                }}
                              >
                                <div className="absolute top-5 left-1/2">
                                  <div className="relative -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-gray-50 text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap z-10">
                                    <span className="text-xs font-medium text-gray-50">
                                      {c.toHex().toUpperCase()}
                                    </span>
                                    <div className="w-2 h-2 top-6 left-1/2 absolute rotate-45 bg-gray-900"></div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full border-t border-gray-200 p-3 grid grid-cols-5 max-sm:grid-cols-3 gap-1 bg-gray-100 rounded-b-xl">
              {quickViewTabItems.map(({ id, title }) => {
                return (
                  <button
                    key={id}
                    aria-label={`Switch to ${title} tab`}
                    aria-pressed={title === quickViewActiveTab}
                    onClick={() => setQuickViewActiveTab(title)}
                    className={`${title === quickViewActiveTab ? "bg-gray-900 text-gray-50" : "text-gray-900 hover:bg-white"} text-center w-full h-12 rounded-full hover:cursor-pointer transition-all text-sm font-semibold`}
                  >
                    {title}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
