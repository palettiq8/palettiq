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
  const toggleSVGUploadModel = useModelStore(
    (state) => state.toggleSVGUploadModel,
  );

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
          className="fixed inset-0 w-full h-screen bg-black/50 grid items-end pb-4 z-50 max-xl:px-4 parent"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Visualize color palettes quick"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="w-250 h-190 mx-auto bg-white rounded-xl shadow-2xl max-lg:w-full"
          >
            <div className="w-full h-14 px-4 rounded-t-xl bg-white border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-md font-semibold text-gray-900">
                Quick Visualize
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  aria-label="Upload your own SVG to visualize with the current palette"
                  variant={"outline"}
                  size={"md"}
                  onClick={() => {
                    localStorage.setItem("open-svg-upload-modal", "true");
                    window.open("/studio/color-palette-visualizer", "_blank");
                  }}
                  className="max-sm:hidden"
                >
                  <LuCloudUpload size={16} />
                  <span>Upload SVG</span>
                </Button>
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
            <div
              className="w-full overflow-y-auto noscrollbar rounded-b-xl p-4 grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-1"
              style={{ height: "calc(100% - 56px)" }}
            >
              {visualizers.map((Component, index) => {
                if (!uploadedSVGString && Component === VisualizeSVG)
                  return null;
                return (
                  <div
                    aria-label={`Preview color palette on UI template ${index + 1}`}
                    key={index}
                    className={`bg-gray-100 border border-gray-200 p-3 flex items-center justify-center rounded-lg`}
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
