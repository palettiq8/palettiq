"use client";

import { usePickerStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuCheck, LuX } from "react-icons/lu";
import { useCallback, useEffect, useRef } from "react";
import { copyTextHandlerOnly } from "@/utils/utils";

export default function ColorHistoryModel() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const colorHistoryModel = useModelStore((state) => state.colorHistoryModel);
  const toggleColorHistoryModel = useModelStore(
    (state) => state.toggleColorHistoryModel,
  );
  const colorHistory = usePickerStore((state) => state.colorHistory);
  const setColorHistoryIndex = usePickerStore(
    (state) => state.setColorHistoryIndex,
  );
  const clearAllColorHistory = usePickerStore(
    (state) => state.clearAllColorHistory,
  );
  const colorPickerColor = usePickerStore((state) => state.colorPickerColor);
  const setColorPickerColor = usePickerStore(
    (state) => state.setColorPickerColor,
  );

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleColorHistoryModel();
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
  }, [colorHistoryModel, colorHistory]);

  const copyHandler = useCallback(copyTextHandlerOnly, []);

  return (
    <AnimatePresence>
      {colorHistoryModel && (
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
                onClick={() => toggleColorHistoryModel()}
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
              {colorHistory.length === 0 ? (
                <div className="w-full h-full grid place-content-center">
                  <p className="text-sm font-medium text-gray-700">
                    No history available
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                  {colorHistory.map((_, index) => {
                    return (
                      <div className="w-full" key={index}>
                        <div
                          onClick={() => {
                            setColorPickerColor(_);
                            setColorHistoryIndex(index);
                          }}
                          className="w-full border-2 border-white rounded-lg shadow-sm h-30 relative cursor-pointer active:scale-95 transition-all"
                          style={{ backgroundColor: _ }}
                        >
                          {colorPickerColor === _ && (
                            <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/40 grid place-content-center">
                              <LuCheck className="text-gray-50" size={20} />
                            </div>
                          )}
                        </div>
                        <div className="w-full flex items-center justify-between mt-2 px-2">
                          <p
                            onClick={() => copyHandler(_)}
                            className="uppercase text-sm font-semibold text-gray-900 hover:cursor-pointer"
                          >
                            {_}
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
                onClick={() => clearAllColorHistory()}
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
