"use client";

import { Button } from "@/components/Button";
import { BiExport } from "react-icons/bi";
import { REDOUNDOCOMMONSTYLE } from "@/utils/styles/Classes";
import { LuHistory, LuRedo2, LuUndo2 } from "react-icons/lu";
import { Suspense, useCallback, useEffect } from "react";
import { Colord, colord } from "colord";
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

const ColorManipulator = ({ items }: { items: Colord[] }) => {
  return (
    <div className="w-full flex h-35 max-lg:h-20 mt-3">
      {items.map((col, index) => {
        const color = col.toHex();
        return (
          <div
            key={index}
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
      desc: "A tint is a lighter version of a color created by mixing a pure hue with white, increasing its lightness while reducing its saturation.",
    },
    {
      id: 2,
      title: "Shades",
      items: mainColor.shades(15),
      desc: "A shade is a darker version of a color created by mixing a pure hue with black, decreasing its lightness to create depth and intensity.",
    },
    {
      id: 3,
      title: "Tones",
      items: mainColor.tones(15),
      desc: "A tone is a muted version of a color created by mixing a pure hue with gray, reducing vibrancy to create a more neutral look.",
    },
  ];

  const harmonies = [
    {
      id: 1,
      title: "Analogous",
      colors: mainColor.harmonies("analogous"),
      desc: "Analogous colors sit next to each other on the color wheel. This harmony creates serene, comfortable designs often found in nature, offering a pleasing and cohesive visual experience.",
    },
    {
      id: 2,
      title: "Monochromatic",
      colors: generateMonochromatic(mainColor.toHex()),
      desc: "Monochromatic colors are derived from a single base hue and extended using its shades, tones, and tints. This harmony creates a clean, sophisticated, and unified look that is easy on the eyes, offering a sense of order and professional consistency throughout a design.",
    },
    {
      id: 3,
      title: "Complementary",
      colors: mainColor.harmonies("complementary"),
      desc: "Complementary colors are opposites on the wheel, like blue and orange. This pair creates high contrast and vibrant energy, making specific UI elements pop and stand out instantly.",
    },
    {
      id: 4,
      title: "Double Split Complementary",
      colors: mainColor.harmonies("double-split-complementary"),
      desc: "This complex harmony uses two pairs of opposites, forming a rectangle on the wheel. It offers rich, diverse color options while maintaining balance through high-contrast pairings and vibrant energy.",
    },
    {
      id: 5,
      title: "Rectangle",
      colors: mainColor.harmonies("rectangle"),
      desc: "The Rectangle harmony uses four colors arranged in two complementary pairs. This creates a rich, diverse palette that works best when one color is dominant and others act as accents.",
    },
    {
      id: 6,
      title: "Split Complementary",
      colors: mainColor.harmonies("split-complementary"),
      desc: "This harmony uses a base color plus the two colors adjacent to its complement. It offers high contrast like a complementary scheme but with much less visual tension.",
    },
    {
      id: 7,
      title: "Tetradic",
      colors: mainColor.harmonies("tetradic"),
      desc: "The Tetradic harmony uses four colors forming a square on the wheel. It balances two complementary pairs, offering a vibrant, diverse palette that works best with one dominant color.",
    },
    {
      id: 8,
      title: "Triadic",
      colors: mainColor.harmonies("triadic"),
      desc: "The Triadic harmony uses three colors evenly spaced around the wheel, forming a triangle. This creates a high-contrast, vibrant palette that remains balanced and visually stable in designs.",
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
        setIsMaximizeColorPicker();
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
          <div className="hidden max-xl:block">
            <StudioResponsiveMenuIcon />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Picker</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button
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
      <div
        className="w-full flex max-lg:flex-col"
        style={{ height: "calc(100% - 64px)" }}
      >
        <div className="w-full max-lg:h-35 max-lg:flex-none border-r bg-gray-100 rounded-bl-xl max-lg:rounded-none max-lg:border-r-0 max-lg:border-b border-gray-200 p-4">
          <div
            className={`w-full h-full p-4 ${isMaximizeColorPicker ? "absolute top-0 left-0 rounded-none z-50" : "rounded-xl"}`}
            style={{ backgroundColor: colorPickerColor }}
          ></div>
        </div>
        <div className="w-full h-full max-lg:h-[calc(100%-140px)]">
          <div className="w-full overflow-y-scroll noscrollbar h-[calc(100%-64px)] max-lg:h-[calc(100%-112px)]">
            <div className="w-full p-4">
              <div className="w-full flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Formats</h2>
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
                  <h2 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h2>
                  <ColorManipulator items={items} />
                  <p className="text-sm font-semibold text-gray-700 mt-3 max-w-130">
                    {desc}
                  </p>
                </div>
              );
            })}
            <div className="w-full p-4">
              <h2 className="text-xl font-semibold text-gray-900">Harmonies</h2>
              <div className="grid grid-cols-2 gap-3 mt-3 max-lg:grid-cols-1">
                {harmonies.map(({ id, title, colors, desc }) => {
                  return (
                    <div key={id} className="w-full flex-col gap-2">
                      <p className="text-md font-semibold text-gray-800">
                        {title}
                      </p>
                      <div className="flex items-center w-full mt-2">
                        {colors?.map((color, index) => {
                          const hex = colord(color).toHex();
                          return (
                            <div
                              key={index}
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

export default function page() {
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
