"use client";

import { useGeneratorStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuX } from "react-icons/lu";
import { FlashMessage } from "@/utils/utils";

export default function PickedPalettesForPublishedModel() {
  const pickedPalettesForPublishedModel = useModelStore(
    (state) => state.pickedPalettesForPublishedModel,
  );
  const togglePickedPalettesForPublishedModel = useModelStore(
    (state) => state.togglePickedPalettesForPublishedModel,
  );
  const pickedPalettesForPublished = useGeneratorStore(
    (state) => state.pickedPalettesForPublished,
  );
  const setPickedPalettesForPublished = useGeneratorStore(
    (state) => state.setPickedPalettesForPublished,
  );
  const clearPickedPalettesForPublished = useGeneratorStore(
    (state) => state.clearPickedPalettesForPublished,
  );

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      togglePickedPalettesForPublishedModel();
    }
  };

  return (
    <AnimatePresence>
      {pickedPalettesForPublishedModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 flex justify-end z-50 parent p-4"
        >
          <motion.div
            initial={{ x: "10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "10%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-200 h-full bg-white rounded-xl shadow-2xl"
          >
            <div className="w-full h-14 px-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-md font-semibold text-gray-900">
                Picked Palettes for Published
              </p>
              <Button
                onClick={() => togglePickedPalettesForPublishedModel()}
                variant={"outline"}
                size={"circle"}
              >
                <LuX size={18} />
              </Button>
            </div>
            <div
              className="w-full p-4 overflow-y-auto"
              style={{ height: "calc(100% - 112px)" }}
            >
              {pickedPalettesForPublished.length === 0 ? (
                <div className="w-full h-full grid place-content-center">
                  <p className="text-sm font-medium text-gray-700">
                    No picked palettes available
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                  {pickedPalettesForPublished.map((_, index) => {
                    return (
                      <div key={index} className="w-full">
                        <div
                          onClick={() => setPickedPalettesForPublished(_)}
                          className="w-full flex active:scale-95 transition-all overflow-hidden cursor-pointer relative border-2 border-white rounded-lg shadow-sm"
                        >
                          {_.map(({ color }, index) => {
                            return (
                              <div
                                key={index}
                                className="w-full h-20"
                                style={{ backgroundColor: color }}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="w-full h-14 border-t border-gray-200 flex items-center justify-between px-4">
              <Button
                onClick={() => clearPickedPalettesForPublished()}
                variant={"distrcutiveText"}
                size={"p0"}
              >
                Clear all
              </Button>
              <Button
                variant={"primary"}
                size={"md"}
                onClick={() => {
                  const normalized = pickedPalettesForPublished.map((palette) =>
                    palette.map((color, index) => ({
                      ...color,
                      id: String(index + 1),
                    })),
                  );
                  navigator.clipboard.writeText(
                    JSON.stringify(normalized, null, 2),
                  );
                  FlashMessage("success", "Palettes copied to the clipboard!");
                }}
              >
                Copy
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
