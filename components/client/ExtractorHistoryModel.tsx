"use client";

import { useExtractorStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuX } from "react-icons/lu";
import { useEffect, useRef } from "react";
import HistoryCard from "./HistoryCard";

export default function ExtractorHistoryModel() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const extractorHistoryModel = useModelStore(
    (state) => state.extractorHistoryModel,
  );
  const toggleExtractorHistoryModel = useModelStore(
    (state) => state.toggleExtractorHistoryModel,
  );
  const extractorHistory = useExtractorStore((state) => state.extractorHistory);
  const clearAllExtractorHistory = useExtractorStore(
    (state) => state.clearAllExtractorHistory,
  );

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleExtractorHistoryModel();
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
  }, [extractorHistoryModel, extractorHistory]);

  return (
    <AnimatePresence>
      {extractorHistoryModel && (
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
                onClick={() => toggleExtractorHistoryModel()}
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
              {extractorHistory.length === 0 ? (
                <div className="w-full h-full grid place-content-center">
                  <p className="text-sm font-medium text-gray-700">
                    No history available
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {extractorHistory.map((history, index) => (
                    <HistoryCard
                      key={index}
                      history={history}
                      index={index}
                      from="Extractor"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="w-full h-14 border-t border-gray-200 flex items-center justify-center">
              <Button
                onClick={() => clearAllExtractorHistory()}
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
