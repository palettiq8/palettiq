"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import {
  useAiStore,
  useBrowseStore,
  useContrastStore,
  useExtractorStore,
  useGeneratorStore,
  useGradientStore,
  useOtherStore,
  usePickerStore,
  useShadowStore,
  useVisualizerStore,
} from "@/libs/stores/dataStore";
import { FlashMessage } from "@/utils/utils";

export default function ResetPreferencesModel() {
  const resetPreferencesModel = useModelStore(
    (state) => state.resetPreferencesModel,
  );
  const toggleResetPreferencesModel = useModelStore(
    (state) => state.toggleResetPreferencesModel,
  );
  // reset all states for preferences
  const setColorCount = useGeneratorStore((state) => state.setColorCount);
  const clearPreferredItems = useGeneratorStore(
    (state) => state.clearPreferredItems,
  );
  const clearAllAiItems = useAiStore((state) => state.clearAllAiItems);
  const clearPreferredColorItems = usePickerStore(
    (state) => state.clearPreferredColorItems,
  );
  const clearPreferredGradientItems = useGradientStore(
    (state) => state.clearPreferredGradientItems,
  );
  const setExtractorPickerCount = useExtractorStore(
    (state) => state.setExtractorPickerCount,
  );
  const clearPreferredContrastItems = useContrastStore(
    (state) => state.clearPreferredContrastItems,
  );
  const setComplementaryMode = useContrastStore(
    (state) => state.setComplementaryMode,
  );
  const setVisualizerColorCount = useVisualizerStore(
    (state) => state.setVisualizerColorCount,
  );
  const clearPreferredVisualizerItems = useVisualizerStore(
    (state) => state.clearPreferredVisualizerItems,
  );
  const setCurrentTemplateId = useVisualizerStore(
    (state) => state.setCurrentTemplateId,
  );
  const setActiveShadowTab = useShadowStore(
    (state) => state.setActiveShadowTab,
  );
  const setActiveShadowViewer = useShadowStore(
    (state) => state.setActiveShadowViewer,
  );
  const setActiveTextShadowViewer = useShadowStore(
    (state) => state.setActiveTextShadowViewer,
  );
  const setBrowseGradientActiveType = useBrowseStore(
    (state) => state.setBrowseGradientActiveType,
  );
  const clearAllPaletteFiltersItems = useBrowseStore(
    (state) => state.clearAllPaletteFiltersItems,
  );
  const setPalettesPage = useBrowseStore((state) => state.setPalettesPage);
  const setSearchPalettesQuery = useBrowseStore(
    (state) => state.setSearchPalettesQuery,
  );
  const setSearchColorsQuery = useBrowseStore(
    (state) => state.setSearchColorsQuery,
  );
  const setSearchGradientsQuery = useBrowseStore(
    (state) => state.setSearchGradientsQuery,
  );
  const setSearchFontsQuery = useBrowseStore(
    (state) => state.setSearchFontsQuery,
  );
  const setExplorePaletteView = useOtherStore(
    (state) => state.setExplorePaletteView,
  );
  const setDownloadPngWithoutHexTrue = useOtherStore(
    (state) => state.setDownloadPngWithoutHexTrue,
  );
  const clearFontBestForSelectedItems = useBrowseStore(
    (state) => state.clearFontBestForSelectedItems,
  );
  const setFontActiveCategory = useBrowseStore(
    (state) => state.setFontActiveCategory,
  );

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleResetPreferencesModel();
    }
  };

  return (
    <AnimatePresence>
      {resetPreferencesModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 grid place-content-center z-50 max-sm:block max-sm:px-4 parent"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-100 bg-white rounded-xl max-sm:w-full shadow-2xl flex flex-col items-center justify-center gap-1 p-4"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">
              Reset All Preferences
            </h2>
            <p className="text-sm font-semibold text-gray-600 text-center mt-4">
              This will remove all your saved preferences and restore default
              settings. This action cannot be undone.
            </p>
            <div className="w-full flex items-center gap-2 mt-5">
              <Button
                onClick={() => toggleResetPreferencesModel()}
                variant={"outline"}
                size={"lg"}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                variant={"primary"}
                size={"lg"}
                className="w-full bg-red-500 hover:bg-red-600"
                onClick={() => {
                  setColorCount(5);
                  clearPreferredItems();
                  clearAllAiItems();
                  clearPreferredColorItems();
                  clearPreferredGradientItems();
                  setExtractorPickerCount(5);
                  clearPreferredContrastItems();
                  setComplementaryMode();
                  setVisualizerColorCount(5);
                  clearPreferredVisualizerItems();
                  setCurrentTemplateId(0);
                  setActiveShadowTab("Box Shadow");
                  setActiveShadowViewer("Container View");
                  setActiveTextShadowViewer("Container View");
                  setBrowseGradientActiveType("Linear");
                  clearAllPaletteFiltersItems();
                  setPalettesPage(0);
                  setSearchPalettesQuery("");
                  setSearchColorsQuery("");
                  setSearchGradientsQuery("");
                  setSearchFontsQuery("");
                  setExplorePaletteView("Vertical");
                  setDownloadPngWithoutHexTrue();
                  clearFontBestForSelectedItems();
                  setFontActiveCategory("All");

                  toggleResetPreferencesModel();
                  FlashMessage("success", "Reset to default successfully.");
                }}
              >
                Yes, Reset
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
