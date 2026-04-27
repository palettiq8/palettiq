"use client";

import { useGradientStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuCheck, LuX } from "react-icons/lu";
import { useEffect, useRef } from "react";
import { getGradientCSS } from "@/utils/utils";

export default function GradientHistoryModel() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const gradientHistoryModel = useModelStore(
    (state) => state.gradientHistoryModel,
  );
  const toggleGradientHistoryModel = useModelStore(
    (state) => state.toggleGradientHistoryModel,
  );
  const gradientStops = useGradientStore((state) => state.gradientStops);
  const gradientHistory = useGradientStore((state) => state.gradientHistory);
  const clearAllGradientHistory = useGradientStore(
    (state) => state.clearAllGradientHistory,
  );
  const activeGradientType = useGradientStore(
    (state) => state.activeGradientType,
  );
  const gradientRotationValue = useGradientStore(
    (state) => state.gradientRotationValue,
  );
  const activeRadial = useGradientStore((state) => state.activeRadial);
  const activeConic = useGradientStore((state) => state.activeConic);
  const addGradientStop = useGradientStore((state) => state.addGradientStop);

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleGradientHistoryModel();
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
  }, [gradientHistoryModel, gradientHistory]);

  return (
    <AnimatePresence>
      {gradientHistoryModel && (
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
                onClick={() => toggleGradientHistoryModel()}
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
              {gradientHistory.length === 0 ? (
                <div className="w-full h-full grid place-content-center">
                  <p className="text-sm font-medium text-gray-700">
                    No history available
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                  {gradientHistory.map((stops, index) => {
                    const isActiveGradient = gradientStops.every(
                      (stop, i) =>
                        stop.color === gradientHistory[index]?.[i]?.color,
                    );
                    return (
                      <div className="w-full" key={index}>
                        <div
                          onClick={() => {
                            addGradientStop(stops);
                          }}
                          className="w-full h-30 relative cursor-pointer border-2 border-white rounded-lg shadow-sm"
                          style={{
                            background: getGradientCSS(
                              stops,
                              activeGradientType,
                              gradientRotationValue,
                              activeRadial,
                              activeConic,
                            ),
                          }}
                        >
                          {isActiveGradient && (
                            <div className="w-full h-full absolute bg-black/40 rounded-lg grid place-content-center">
                              <LuCheck className="text-gray-50" size={20} />
                            </div>
                          )}
                        </div>
                        <div className="w-full flex items-center justify-between mt-2 px-1">
                          <p className="text-sm font-semibold text-gray-900 hover:cursor-pointer">
                            {`Gradient ${index + 1}`}
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
                onClick={() => clearAllGradientHistory()}
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
