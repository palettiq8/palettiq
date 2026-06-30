"use client";

import { useState } from "react";
import { useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { quickViewTabItems } from "@/utils/Items";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuX } from "react-icons/lu";
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
import { Button } from "../Button";

extend([cmykPlugin]);
extend([hwbPlugin]);
extend([labPlugin]);
extend([lchPlugin]);
extend([xyzPlugin]);
extend([mixPlugin]);
extend([harmoniesPlugin]);

const SwatchTile = ({ hex, label }: { hex: string; label: string }) => {
  return (
    <button
      type="button"
      aria-label={`Copy ${label} ${hex.toUpperCase()}`}
      className="relative flex-1 h-full group cursor-pointer transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
      style={{ backgroundColor: hex }}
      onClick={async () => {
        await navigator.clipboard.writeText(hex.toUpperCase());
        FlashMessage("success", "Copied to the clipboard!");
      }}
    >
      <span className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity bg-gray-900 text-gray-50 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap z-10">
        {hex.toUpperCase()}
      </span>
    </button>
  );
};

const ColorManipulator = ({ items, tab }: { items: Colord[]; tab: string }) => {
  return (
    <div className="w-full h-70 max-sm:h-full flex max-sm:flex-col bg-gray-200 rounded-lg overflow-hidden">
      {items.map((col, index) => (
        <SwatchTile key={index} hex={col.toHex()} label={tab} />
      ))}
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
          className="fixed inset-0 w-full h-screen bg-black/50 z-50 flex items-center justify-center p-4 max-sm:p-0 parent"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick view color formats and harmonies"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-150 max-w-full max-h-[85vh] flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden max-sm:w-full max-sm:h-full max-sm:max-h-full max-sm:rounded-none"
          >
            <div className="w-full h-14 shrink-0 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-3">
              <h3 className="text-md font-semibold text-gray-900">
                Quick view
              </h3>
              <Button
                aria-label="Close quick view"
                onClick={() => toggleQuickViewModel()}
                variant={"outline"}
                size={"circle"}
              >
                <LuX size={18} />
              </Button>
            </div>

            <div className="w-full shrink-0 flex h-25 p-3 overflow-x-auto">
              {quickViewPalette.map((c, index) => {
                const isActive = quickViewActiveColor === c;
                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Select color ${c}`}
                    aria-pressed={isActive}
                    onClick={() => setQuickViewActiveColor(c)}
                    className={`w-full h-full hover:cursor-pointer grid place-content-center first:rounded-l-lg last:rounded-r-lg ${isLightActiveColor ? "text-gray-900" : "text-gray-50"}`}
                    style={{ backgroundColor: c }}
                  >
                    {isActive && <LuCheck size={18} />}
                  </button>
                );
              })}
            </div>

            <div className="w-full flex-1 min-h-0 overflow-y-auto px-3 pb-4">
              {quickViewActiveTab === "Formats" && (
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                  {allFormatsItems.map(({ id, name, value }) => (
                    <FormatCard key={id} name={name} value={value} />
                  ))}
                </div>
              )}

              {quickViewActiveTab === "Tints" && (
                <ColorManipulator items={color.tints(10)} tab="tint" />
              )}
              {quickViewActiveTab === "Shades" && (
                <ColorManipulator items={color.shades(10)} tab="shade" />
              )}
              {quickViewActiveTab === "Tones" && (
                <ColorManipulator items={color.tones(10)} tab="tone" />
              )}

              {quickViewActiveTab === "Harmonies" && (
                <div className="w-full flex flex-col h-90 max-sm:h-full">
                  <div className="w-full flex items-center justify-between pb-3 shrink-0">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {harmonyTitle.split("_").join(" ")}
                    </h3>
                    <HarmoniesMenu
                      activeHarmony={activeHarmony}
                      setActiveHarmony={setActiveHarmony}
                      setHarmonyTitle={setHarmonyTitle}
                    />
                  </div>
                  <div className="w-full flex-1 flex max-sm:flex-col bg-gray-200 rounded-lg overflow-hidden">
                    {harmonyTitle === "Monochromatic"
                      ? generateMonochromatic(hex).map((c, index) => (
                          <SwatchTile
                            key={index}
                            hex={c}
                            label="monochromatic color"
                          />
                        ))
                      : color
                          .harmonies(activeHarmony as HarmonyType)
                          .map((c, index) => (
                            <SwatchTile
                              key={index}
                              hex={c.toHex()}
                              label={`${harmonyTitle} harmony color`}
                            />
                          ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full shrink-0 border-t border-gray-200 bg-gray-50 p-3 flex gap-1 overflow-x-auto">
              {quickViewTabItems.map(({ id, title }) => {
                const isActive = title === quickViewActiveTab;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-label={`Switch to ${title} tab`}
                    aria-pressed={isActive}
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
