"use client";

import {
  useExtractorStore,
  useGeneratorStore,
  useVisualizerStore,
} from "@/libs/stores/dataStore";
import { PaletteColor, Picker } from "@/utils/Types";
import { LuCheck } from "react-icons/lu";

export default function HistoryCard({
  history,
  index,
  from,
}: {
  history: PaletteColor[] | Picker[];
  index: number;
  from: string;
}) {
  const generatedPalette = useGeneratorStore((state) => state.generatedPalette);
  const generatedVisualizerPalette = useVisualizerStore(
    (state) => state.generatedVisualizerPalette,
  );
  const pickers = useExtractorStore((state) => state.pickers);
  const setGeneratedPalette = useGeneratorStore(
    (state) => state.setGeneratedPalette,
  );
  const setGeneratedVisualizerPalette = useVisualizerStore(
    (state) => state.setGeneratedVisualizerPalette,
  );
  const setPickers = useExtractorStore((state) => state.setPickers);
  const setHistoryIndex = useGeneratorStore((state) => state.setHistoryIndex);
  const setVisualizerHistoryIndex = useVisualizerStore(
    (state) => state.setVisualizerHistoryIndex,
  );
  const setExtractorHistoryIndex = useExtractorStore(
    (state) => state.setExtractorHistoryIndex,
  );

  const isActivePalette =
    from === "Generator"
      ? generatedPalette.length === history.length &&
        generatedPalette.every(
          (item, index) => item.color === history[index].color,
        )
      : from === "Visualizer"
        ? generatedVisualizerPalette.length === history.length &&
          generatedVisualizerPalette.every(
            (item, index) => item.color === history[index].color,
          )
        : pickers.length === history.length &&
          pickers.every((item, index) => item.color === history[index].color);

  return (
    <div className="w-full">
      <div
        onClick={() => {
          if (from === "Generator") {
            setGeneratedPalette(history as PaletteColor[]);
            setHistoryIndex(index);
          } else if (from === "Visualizer") {
            setGeneratedVisualizerPalette(history as PaletteColor[]);
            setVisualizerHistoryIndex(index);
          } else {
            setPickers(history as Picker[]);
            setExtractorHistoryIndex(index);
          }
        }}
        className="w-full flex active:scale-95 transition-all overflow-hidden cursor-pointer relative border-2 border-white rounded-lg shadow-sm"
      >
        {history.map(({ color }, index) => {
          return (
            <div
              key={index}
              className="w-full h-20"
              style={{ backgroundColor: color }}
            ></div>
          );
        })}
        {isActivePalette && (
          <div className="w-full h-full absolute bg-black/40 rounded-lg grid place-content-center">
            <LuCheck className="text-gray-50" size={20} />
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-between mt-2 px-1">
        <p className="text-sm font-semibold text-gray-900 hover:cursor-pointer">
          {`Palette ${index + 1}`}
        </p>
      </div>
    </div>
  );
}
