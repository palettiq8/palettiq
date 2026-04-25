"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuBookmark, LuCheck, LuStar, LuX } from "react-icons/lu";
import { useEffect, useRef } from "react";
import { generatorContentHeaderItemsStyle } from "@/utils/styles/Classes";
import { useContrastStore } from "@/libs/stores/dataStore";

export default function ContrastHistoryModel() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const contrastHistoryModel = useModelStore(
    (state) => state.contrastHistoryModel,
  );
  const toggleContrastHistoryModel = useModelStore(
    (state) => state.toggleContrastHistoryModel,
  );
  const contrastHistory = useContrastStore((state) => state.contrastHistory);
  const setContrastHistoryIndex = useContrastStore(
    (state) => state.setContrastHistoryIndex,
  );
  const clearAllContrastHistory = useContrastStore(
    (state) => state.clearAllContrastHistory,
  );
  const activeContrast = useContrastStore((state) => state.activeContrast);
  const setActiveContrast = useContrastStore(
    (state) => state.setActiveContrast,
  );

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleContrastHistoryModel();
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [contrastHistoryModel, contrastHistory]);

  return (
    <AnimatePresence>
      {contrastHistoryModel && (
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
              <p className="text-md font-semibold text-gray-900">History</p>
              <Button
                onClick={() => toggleContrastHistoryModel()}
                variant={"outline"}
                size={"circle"}
              >
                <LuX size={18} />
              </Button>
            </div>
            <div
              ref={scrollContainerRef}
              className="w-full p-4 overflow-y-auto"
              style={{ height: "calc(100% - 112px)" }}
            >
              {contrastHistory.length === 0 ? (
                <div className="w-full h-full grid place-content-center">
                  <p className="text-sm font-medium text-gray-700">
                    No history available
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {contrastHistory.map((contrast, index) => {
                    const isActiveContrast =
                      activeContrast?.bgColor === contrast.bgColor &&
                      activeContrast.textColor === contrast.textColor;
                    return (
                      <div className="w-full" key={index}>
                        <div
                          onClick={() => {
                            setActiveContrast(contrast);
                            setContrastHistoryIndex(index);
                          }}
                          className="w-full flex items-center cursor-pointer relative border-2 border-white rounded-lg shadow-sm"
                        >
                          <div
                            className="w-full h-30 rounded-l-lg"
                            style={{ backgroundColor: contrast.bgColor }}
                          ></div>
                          <div
                            className="w-full h-30 rounded-r-lg"
                            style={{ backgroundColor: contrast.textColor }}
                          ></div>
                          {isActiveContrast && (
                            <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/40 grid place-content-center">
                              <LuCheck className="text-gray-50" size={20} />
                            </div>
                          )}
                        </div>
                        <div className="w-full flex items-center justify-between mt-2 px-2">
                          <p className="text-sm font-semibold text-gray-900 hover:cursor-pointer">
                            {`Pair ${index + 1}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="w-full h-14 border-t border-gray-200 flex items-center justify-center">
              <Button
                onClick={() => clearAllContrastHistory()}
                variant={"distrcutiveText"}
                size={"p0"}
              >
                Clear all
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
