"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuArrowUpRight, LuCloudUpload, LuShuffle, LuX } from "react-icons/lu";
import { useBrowseStore, useVisualizerStore } from "@/libs/stores/dataStore";
import { visualizers } from "@/utils/Items";
import { PaletteColor } from "@/utils/Types";
import { useEffect, useState } from "react";
import VisualizeSVG from "../visualizers/VisualizeSVG";

export default function PaletteQuickVisualizerModel() {
  const paletteQuickVisualizerModel = useModelStore(
    (state) => state.paletteQuickVisualizerModel,
  );
  const togglePaletteQuickVisualizerModel = useModelStore(
    (state) => state.togglePaletteQuickVisualizerModel,
  );
  const quickVisualizerPalette = useBrowseStore(
    (state) => state.quickVisualizerPalette,
  );
  const [shuffledPalette, setShuffledPalette] = useState<PaletteColor[]>(
    quickVisualizerPalette as PaletteColor[],
  );
  const setQuickVisualizerPalette = useBrowseStore(
    (state) => state.setQuickVisualizerPalette,
  );
  const setGeneratedVisualizerPalette = useVisualizerStore(
    (state) => state.setGeneratedVisualizerPalette,
  );
  const uploadedSVGString = useVisualizerStore((s) => s.uploadedSVGString);

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      togglePaletteQuickVisualizerModel();
      setQuickVisualizerPalette(null);
    }
  };

  useEffect(() => {
    setShuffledPalette(quickVisualizerPalette as PaletteColor[]);
  }, [quickVisualizerPalette]);

  return (
    <AnimatePresence>
      {paletteQuickVisualizerModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 flex items-center justify-center z-50 p-4 max-sm:p-0 parent"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Visualize color palettes quick"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-250 max-w-full h-190 max-h-full flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden max-lg:rounded-none max-sm:w-full max-sm:h-full"
          >
            <div className="w-full shrink-0 flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-white border-b border-gray-200">
              <h2 className="text-md font-semibold text-gray-900">
                Quick visualize
              </h2>
              <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between">
                <Button
                  aria-label="Upload your own SVG to visualize with the current palette"
                  variant={"outline"}
                  size={"md"}
                  onClick={() => {
                    localStorage.setItem("open-svg-upload-modal", "true");
                    window.open("/studio/color-palette-visualizer", "_blank");
                  }}
                  className="max-sm:flex-1"
                >
                  <LuCloudUpload size={16} />
                  <span className="max-[360px]:hidden">Upload SVG</span>
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant={"outline"}
                    size={"circle"}
                    aria-label="Shuffle visualizer palette colors"
                    onClick={() => {
                      setShuffledPalette((prev) =>
                        [...prev].sort(() => Math.random() - 0.5),
                      );
                    }}
                  >
                    <LuShuffle size={16} />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"circle"}
                    aria-label="Open on visualizer"
                    onClick={() => {
                      setGeneratedVisualizerPalette(
                        quickVisualizerPalette as PaletteColor[],
                      );
                      window.open("/studio/color-palette-visualizer", "_blank");
                    }}
                  >
                    <LuArrowUpRight size={16} />
                  </Button>
                  <Button
                    onClick={() => {
                      togglePaletteQuickVisualizerModel();
                      setQuickVisualizerPalette(null);
                    }}
                    variant={"outline"}
                    size={"circle"}
                    aria-label="Close quick visualizer panel"
                  >
                    <LuX size={18} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full flex-1 min-h-0 overflow-y-auto noscrollbar p-4 grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-3 content-start">
              {visualizers.map((Component, index) => {
                if (!uploadedSVGString && Component === VisualizeSVG)
                  return null;
                return (
                  <div
                    aria-label={`Preview color palette on UI template ${index + 1}`}
                    key={index}
                    className="bg-gray-100 border border-gray-200 p-3 flex items-center justify-center rounded-lg aspect-square"
                  >
                    <Component palette={shuffledPalette} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
