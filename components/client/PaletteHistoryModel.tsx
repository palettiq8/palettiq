"use client";

import { useGeneratorStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuX } from "react-icons/lu";
import HistoryCard from "./HistoryCard";
import { useEffect, useRef } from "react";

export default function PaletteHistoryModel() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const paletteHistoryModel = useModelStore(
    (state) => state.paletteHistoryModel,
  );
  const togglePaletteHistoryModel = useModelStore(
    (state) => state.togglePaletteHistoryModel,
  );
  const paletteHistory = useGeneratorStore((state) => state.paletteHistory);
  const clearAllHistory = useGeneratorStore((state) => state.clearAllHistory);

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      togglePaletteHistoryModel();
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
  }, [paletteHistoryModel, paletteHistory]);

  return (
    <AnimatePresence>
      {paletteHistoryModel && (
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
                onClick={() => togglePaletteHistoryModel()}
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
              {paletteHistory.length === 0 ? (
                <div className="w-full h-full grid place-content-center">
                  <p className="text-sm font-medium text-gray-700">
                    No history available
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {paletteHistory.map((history, index) => (
                    <HistoryCard
                      key={index}
                      history={history}
                      index={index}
                      from="Generator"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="w-full h-14 border-t border-gray-200 flex items-center justify-center">
              <Button
                onClick={() => clearAllHistory()}
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
