"use client";

import { Button } from "@/components/Button";
import { BiExport } from "react-icons/bi";
import { REDOUNDOCOMMONSTYLE } from "@/utils/styles/Classes";
import { LuArrowLeft, LuHistory, LuRedo2, LuUndo2 } from "react-icons/lu";
import { Suspense, useCallback, useEffect } from "react";
import { Colord, colord, extend } from "colord";
import FormatCard from "@/components/server/FormatCard";
import ColorPickerMenu from "@/components/client/ColorPickerMenu";
import {
  FlashMessage,
  generateColorForFamily,
  generateMonochromatic,
  generateRandomColor,
} from "@/utils/utils";
import { useOtherStore, usePickerStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import ColorPreferencesMenu from "@/components/client/ColorPreferencesMenu";
import OpenMoreMenu from "@/components/client/OpenMoreMenu";
import useUiStore from "@/libs/stores/uiStore";
import { useSearchParams } from "next/navigation";
import CircleLoader from "@/components/server/CircleLoader";
import StudioResponsiveMenuIcon from "@/components/client/StudioResponsiveMenuIcon";
import PickerResponsiveMoreMenu from "@/components/client/PickerResponsiveMoreMenu";

import cmykPlugin from "colord/plugins/cmyk";
import hwbPlugin from "colord/plugins/hwb";
import labPlugin from "colord/plugins/lab";
import lchPlugin from "colord/plugins/lch";
import xyzPlugin from "colord/plugins/xyz";
import harmoniesPlugin from "colord/plugins/harmonies";
import mixPlugin from "colord/plugins/mix";

extend([
  cmykPlugin,
  hwbPlugin,
  labPlugin,
  lchPlugin,
  xyzPlugin,
  harmoniesPlugin,
  mixPlugin,
]);

const ColorManipulator = ({ items }: { items: Colord[] }) => {
  return (
    <div className="w-full flex h-35 max-lg:h-20 mt-3">
      {items.map((col, index) => {
        const color = col.toHex();
        return (
          <div
            key={index}
            role="button"
            aria-label={`Copy color ${color.toUpperCase()}`}
            className="w-full h-full first:rounded-l-lg last:rounded-r-lg relative cursor-pointer transition-transform group"
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

function PickerPage() {
  const isMaximizeColorPicker = useUiStore(
    (state) => state.isMaximizeColorPicker,
  );
  const setIsMaximizeColorPicker = useUiStore(
    (state) => state.setIsMaximizeColorPicker,
  );
  const colorPickerColor = usePickerStore((state) => state.colorPickerColor);
  const setColorHistory = usePickerStore((state) => state.setColorHistory);
  const setColorPickerColor = usePickerStore(
    (state) => state.setColorPickerColor,
  );
  const colorHistoryIndex = usePickerStore((state) => state.colorHistoryIndex);
  const colorHistory = usePickerStore((state) => state.colorHistory);
  const colorPickerUndoHandler = usePickerStore(
    (state) => state.colorPickerUndoHandler,
  );
  const colorPickerRedoHandler = usePickerStore(
    (state) => state.colorPickerRedoHandler,
  );
  const toggleColorHistoryModel = useModelStore(
    (state) => state.toggleColorHistoryModel,
  );
  const preferredColorItems = usePickerStore(
    (state) => state.preferredColorItems,
  );
  const defaultColorPreference = usePickerStore(
    (state) => state.defaultColorPreference,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);

  const mainColor = colord(colorPickerColor);

  const randomColorGenerateHandler = useCallback(() => {
    const randomColor = generateRandomColor();
    const preferredColor = generateColorForFamily(preferredColorItems);
    if (
      !preferredColorItems ||
      preferredColorItems.length === 0 ||
      !defaultColorPreference
    ) {
      setColorPickerColor(preferredColor);
      setColorHistory(preferredColor);
    } else {
      setColorPickerColor(randomColor);
      setColorHistory(randomColor);
    }
  }, [preferredColorItems, defaultColorPreference]);

  const undoHandler = useCallback(() => {
    colorPickerUndoHandler();
  }, []);

  const redoHandler = useCallback(() => {
    colorPickerRedoHandler();
  }, []);

  const hex = mainColor.toHex().toUpperCase();
  const rgb = mainColor.toRgb();
  const cmyk = mainColor.toCmyk();
  const hsl = mainColor.toHsl();
  const hsv = mainColor.toHsv();
  const hwb = mainColor.toHwb();
  const lab = mainColor.toLab();
  const lch = mainColor.toLch();
  const xyz = mainColor.toXyz();

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

  const manipulatorItems = [
    {
      id: 1,
      title: "Tints",
      items: mainColor.tints(15),
      desc: "Color tints are lighter variations created by mixing a pure hue with white, gradually increasing lightness for softer, more pastel tones. Ideal for backgrounds, hover states, and accessible UI design.",
    },
    {
      id: 2,
      title: "Shades",
      items: mainColor.shades(15),
      desc: "Color shades are darker variations created by mixing a pure hue with black, adding depth and intensity. Perfect for shadows, borders, and creating visual hierarchy in UI design and branding.",
    },
    {
      id: 3,
      title: "Tones",
      items: mainColor.tones(15),
      desc: "Color tones are muted variations created by mixing a pure hue with gray, reducing vibrancy for a more sophisticated and neutral look. Great for professional branding and minimal UI design.",
    },
  ];

  const harmonies = [
    {
      id: 1,
      title: "Analogous",
      colors: mainColor.harmonies("analogous"),
      desc: "Analogous color harmony uses colors that sit adjacent on the color wheel, creating serene and cohesive designs. This palette is widely used in nature-inspired branding and UI design for a comfortable visual experience.",
    },
    {
      id: 2,
      title: "Monochromatic",
      colors: generateMonochromatic(mainColor.toHex()),
      desc: "Monochromatic color harmony uses a single base hue extended through its tints, shades, and tones. This creates a clean, sophisticated, and unified color palette — ideal for minimal UI design and professional branding.",
    },
    {
      id: 3,
      title: "Complementary",
      colors: mainColor.harmonies("complementary"),
      desc: "Complementary color harmony pairs two opposite colors on the color wheel, like blue and orange, creating high contrast and vibrant energy. Perfect for making UI elements and call-to-action buttons stand out instantly.",
    },
    {
      id: 4,
      title: "Double Split Complementary",
      colors: mainColor.harmonies("double-split-complementary"),
      desc: "Double Split Complementary harmony uses four colors — two pairs of opposites on the color wheel. This creates a rich, diverse color palette with high contrast and vibrant energy, ideal for complex UI design systems.",
    },
    {
      id: 5,
      title: "Rectangle",
      colors: mainColor.harmonies("rectangle"),
      desc: "Rectangle color harmony uses four colors arranged as two complementary pairs on the color wheel. This creates a rich, diverse palette for UI design and branding that works best with one dominant color and accent tones.",
    },
    {
      id: 6,
      title: "Split Complementary",
      colors: mainColor.harmonies("split-complementary"),
      desc: "Split Complementary harmony uses a base color plus two colors adjacent to its complement on the color wheel. It delivers high contrast with less visual tension — a great choice for balanced, vibrant UI color palettes.",
    },
    {
      id: 7,
      title: "Tetradic",
      colors: mainColor.harmonies("tetradic"),
      desc: "Tetradic color harmony uses four colors evenly spaced on the color wheel, balancing two complementary pairs. This creates a vibrant, diverse color palette ideal for rich UI design and dynamic branding projects.",
    },
    {
      id: 8,
      title: "Triadic",
      colors: mainColor.harmonies("triadic"),
      desc: "Triadic color harmony uses three colors evenly spaced around the color wheel, forming a triangle. This high-contrast, vibrant palette remains visually balanced — perfect for energetic branding and bold UI design.",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;
      const key = e.key.toLowerCase();
      if (e.key === "Escape") {
        e.preventDefault();
        setIsMaximizeColorPicker(false);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        randomColorGenerateHandler();
      }
      if (key === "arrowleft") {
        e.preventDefault();
        undoHandler();
      }
      if (key === "arrowright") {
        e.preventDefault();
        redoHandler();
      }
      if (key === "h") {
        e.preventDefault();
        toggleColorHistoryModel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [randomColorGenerateHandler]);

  useEffect(() => {
    const currentColor = usePickerStore.getState().colorPickerColor;
    const currentHistory = usePickerStore.getState().colorHistory;

    if (!currentColor || currentColor.length === 0) {
      randomColorGenerateHandler();
    } else if (currentHistory.length === 0) {
      setColorHistory(currentColor);
    }
  }, [randomColorGenerateHandler, setColorHistory]);

  const searchParams = useSearchParams();
  const colorsParam = searchParams.get("color");
  const getColorsFromURL = (): string => {
    if (!colorsParam) return "";

    return decodeURIComponent(colorsParam);
  };

  useEffect(() => {
    if (colorsParam !== null) setColorPickerColor(getColorsFromURL());
  }, []);

  return (
    <div className="w-full h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl">
      <div className="w-full h-16 px-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden max-[1400px]:block">
            <StudioResponsiveMenuIcon />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Online Color Picker
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Button
            aria-label="View color history"
            onClick={() => toggleColorHistoryModel()}
            variant={"outline"}
            size={"md"}
            className="max-lg:hidden"
          >
            <LuHistory size={16} />
            <span>History</span>
          </Button>
          <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full max-lg:hidden">
            <Button
              aria-label="Undo color change"
              disabled={!(colorHistoryIndex > 0)}
              className={REDOUNDOCOMMONSTYLE}
              onClick={undoHandler}
              variant={"text"}
              size={"p0"}
            >
              <LuUndo2 size={16} />
            </Button>
            <span className="w-px h-4 bg-gray-200"></span>
            <Button
              aria-label="Redo color change"
              disabled={!(colorHistoryIndex < colorHistory.length - 1)}
              className={REDOUNDOCOMMONSTYLE}
              onClick={redoHandler}
              variant={"text"}
              size={"p0"}
            >
              <LuRedo2 size={16} />
            </Button>
          </div>
          <Button
            aria-label="Export color as HEX, RGB, HSL, or CSS"
            onClick={() => {
              toggleExportModel();
              setExportFrom("Color");
              setExportPalette([colorPickerColor]);
            }}
            variant={"outline"}
            size={"md"}
            className="max-lg:hidden"
          >
            <BiExport size={16} />
            <span>Export</span>
          </Button>
          <Button
            aria-label="Generate random color"
            onClick={() => randomColorGenerateHandler()}
            variant={"primary"}
            size={"md"}
            className="max-lg:hidden"
          >
            Generate Random Color
          </Button>
        </div>
        <div className="hidden max-lg:block">
          <PickerResponsiveMoreMenu />
        </div>
      </div>
      <div className={`w-full flex max-lg:flex-col h-[calc(100%-64px)]`}>
        <div className="w-full h-full max-lg:h-35 max-lg:flex-none border-r bg-gray-100 rounded-bl-xl max-lg:rounded-none max-lg:border-r-0 max-lg:border-b border-gray-200 p-4">
          <div
            className={`w-full h-full ${isMaximizeColorPicker ? "absolute top-0 left-0 rounded-none z-50" : "rounded-xl"}`}
            style={{ backgroundColor: colorPickerColor }}
          >
            <div className="w-full h-full relative">
              {isMaximizeColorPicker && (
                <Button
                  onClick={() => setIsMaximizeColorPicker()}
                  variant={"outline"}
                  size={"circle"}
                  className="absolute top-4 left-4"
                >
                  <LuArrowLeft size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-full max-lg:h-[calc(100%-140px)]">
          <div className="w-full overflow-y-scroll noscrollbar h-[calc(100%-64px)] max-lg:h-[calc(100%-112px)]">
            <div className="w-full p-4">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Formats</h3>
                <ColorPickerMenu
                  color={colorPickerColor}
                  setColor={setColorPickerColor}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 max-sm:grid-cols-1">
                {allFormatsItems.map(({ id, name, value }) => (
                  <FormatCard key={id} name={name} value={value} />
                ))}
              </div>
            </div>
            {manipulatorItems.map(({ id, title, items, desc }) => {
              return (
                <div key={id} className="w-full p-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h3>
                  <ColorManipulator items={items} />
                  <p className="text-sm font-semibold text-gray-700 mt-3 max-w-130">
                    {desc}
                  </p>
                </div>
              );
            })}
            <div className="w-full p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Color Harmonies
              </h3>
              <div className="grid grid-cols-2 gap-3 mt-3 max-lg:grid-cols-1">
                {harmonies.map(({ id, title, colors, desc }) => {
                  return (
                    <div key={id} className="w-full flex-col gap-2">
                      <h4 className="text-md font-semibold text-gray-800">
                        {title}
                      </h4>
                      <div className="flex items-center w-full mt-2">
                        {colors?.map((color, index) => {
                          const hex = colord(color).toHex();
                          return (
                            <div
                              key={index}
                              role="button"
                              aria-label={`Copy ${title} harmony color ${hex.toUpperCase()}`}
                              className="w-full h-30 max-lg:h-25 first:rounded-l-lg last:rounded-r-lg relative cursor-pointer group transition-transform"
                              style={{ backgroundColor: hex }}
                              onClick={async () => {
                                await navigator.clipboard.writeText(
                                  hex.toUpperCase(),
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
                                    {hex.toUpperCase()}
                                  </span>
                                  <div className="w-2 h-2 top-6 left-1/2 absolute rotate-45 bg-gray-900"></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mt-3 w-full">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full h-16 max-lg:h-28 border-t bg-white rounded-br-xl max-lg:rounded-bl-xl border-gray-200 flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:gap-2 p-4">
            <div className="max-lg:hidden">
              <OpenMoreMenu from="Picker" />
            </div>
            <ColorPreferencesMenu from="Picker" />
            <div className="w-full hidden max-lg:block">
              <div className="w-full flex items-center gap-2">
                <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
                  <Button
                    disabled={!(colorHistoryIndex > 0)}
                    className={REDOUNDOCOMMONSTYLE}
                    onClick={undoHandler}
                    variant={"text"}
                    size={"p0"}
                  >
                    <LuUndo2 size={16} />
                  </Button>
                  <span className="w-px h-4 bg-gray-200"></span>
                  <Button
                    disabled={!(colorHistoryIndex < colorHistory.length - 1)}
                    className={REDOUNDOCOMMONSTYLE}
                    onClick={redoHandler}
                    variant={"text"}
                    size={"p0"}
                  >
                    <LuRedo2 size={16} />
                  </Button>
                </div>
                <Button
                  onClick={() => randomColorGenerateHandler()}
                  variant={"primary"}
                  size={"md"}
                  className="w-full"
                >
                  Generate Color
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PickerPageClient() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full grid place-content-center">
          <CircleLoader content="Loading..." />
        </div>
      }
    >
      <PickerPage />
    </Suspense>
  );
}
