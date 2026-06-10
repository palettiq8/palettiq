"use client";

import {
  LuColumns3,
  LuEye,
  LuMaximize2,
  LuRows3,
  LuBlend,
  LuHistory,
} from "react-icons/lu";
import GeneratorMoreMenu from "./GeneratorMoreMenu";
import useModelStore from "@/libs/stores/modelStore";
import useUiStore from "@/libs/stores/uiStore";
import { useGeneratorStore, useOtherStore } from "@/libs/stores/dataStore";

export default function GeneratorContentHeaderIconItems() {
  const toggleQuickViewModel = useModelStore(
    (state) => state.toggleQuickViewModel,
  );
  const toggleGeneratorMaximize = useUiStore(
    (state) => state.toggleGeneratorMaximize,
  );
  const isHorizontalPalette = useUiStore((state) => state.isHorizontalPalette);
  const setIsHorizontalPalette = useUiStore(
    (state) => state.setIsHorizontalPalette,
  );
  const setQuickViewActiveTab = useOtherStore(
    (state) => state.setQuickViewActiveTab,
  );
  const generatedPalette = useGeneratorStore((state) => state.generatedPalette);
  const setQuickViewPalette = useOtherStore(
    (state) => state.setQuickViewPalette,
  );
  const setQuickViewActiveColor = useOtherStore(
    (state) => state.setQuickViewActiveColor,
  );
  const togglePaletteHistoryModel = useModelStore(
    (state) => state.togglePaletteHistoryModel,
  );
  const data = generatedPalette.map((palette) => palette.color);

  const handler = () => setIsHorizontalPalette();

  return (
    <>
      <button className="w-8.5 h-8.5 cursor-pointer max-lg:hidden rounded-full hover:bg-white border border-gray-100 hover:border-gray-200 grid place-content-center">
        <LuEye
          role="button"
          aria-label="Quick view color palette formats"
          onClick={() => {
            toggleQuickViewModel();
            setQuickViewActiveTab("Formats");
            setQuickViewPalette(data);
            setQuickViewActiveColor(data[0]);
          }}
          size={16}
          className={`text-gray-900`}
        />
      </button>
      <button className="w-8.5 h-8.5 cursor-pointer max-lg:hidden rounded-full hover:bg-white border border-gray-100 hover:border-gray-200 grid place-content-center">
        <LuMaximize2
          role="button"
          aria-label="Maximize color palette generator"
          onClick={() => toggleGeneratorMaximize()}
          size={16}
          className={`text-gray-900`}
        />
      </button>
      {isHorizontalPalette ? (
        <button className="w-8.5 h-8.5 cursor-pointer max-lg:hidden rounded-full hover:bg-white border border-gray-100 hover:border-gray-200 grid place-content-center">
          <LuColumns3
            role="button"
            aria-label="Switch to vertical palette layout"
            onClick={handler}
            size={16}
            className={`text-gray-900`}
          />
        </button>
      ) : (
        <button className="w-8.5 h-8.5 cursor-pointer max-lg:hidden rounded-full hover:bg-white border border-gray-100 hover:border-gray-200 grid place-content-center">
          <LuRows3
            role="button"
            aria-label="Switch to horizontal palette layout"
            onClick={handler}
            size={16}
            className={`text-gray-900`}
          />
        </button>
      )}
      <button className="w-8.5 h-8.5 cursor-pointer max-lg:hidden rounded-full hover:bg-white border border-gray-100 hover:border-gray-200 grid place-content-center">
        <LuBlend
          role="button"
          aria-label="View color harmony suggestions"
          onClick={() => {
            toggleQuickViewModel();
            setQuickViewActiveTab("Harmonies");
            setQuickViewPalette(data);
            setQuickViewActiveColor(data[0]);
          }}
          size={16}
          className={`text-gray-900`}
        />
      </button>
      <button className="w-8.5 h-8.5 cursor-pointer max-lg:hidden rounded-full hover:bg-white border border-gray-100 hover:border-gray-200 grid place-content-center">
        <LuHistory
          role="button"
          aria-label="View palette generation history"
          onClick={() => {
            togglePaletteHistoryModel();
          }}
          size={16}
          className={`text-gray-900`}
        />
      </button>
      <GeneratorMoreMenu />
    </>
  );
}
