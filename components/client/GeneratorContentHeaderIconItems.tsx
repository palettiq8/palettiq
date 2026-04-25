"use client";

import { generatorContentHeaderItemsStyle } from "@/utils/styles/Classes";
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
      <LuEye
        onClick={() => {
          toggleQuickViewModel();
          setQuickViewActiveTab("Formats");
          setQuickViewPalette(data);
          setQuickViewActiveColor(data[0]);
        }}
        size={17}
        className={generatorContentHeaderItemsStyle}
      />
      <LuMaximize2
        onClick={() => toggleGeneratorMaximize()}
        size={17}
        className={generatorContentHeaderItemsStyle}
      />
      {isHorizontalPalette ? (
        <LuColumns3
          onClick={handler}
          size={17}
          className={generatorContentHeaderItemsStyle}
        />
      ) : (
        <LuRows3
          onClick={handler}
          size={17}
          className={generatorContentHeaderItemsStyle}
        />
      )}
      <LuBlend
        onClick={() => {
          toggleQuickViewModel();
          setQuickViewActiveTab("Harmonies");
          setQuickViewPalette(data);
          setQuickViewActiveColor(data[0]);
        }}
        size={17}
        className={generatorContentHeaderItemsStyle}
      />
      <LuHistory
        onClick={() => {
          togglePaletteHistoryModel();
        }}
        size={17}
        className={generatorContentHeaderItemsStyle}
      />
      <GeneratorMoreMenu />
    </>
  );
}
