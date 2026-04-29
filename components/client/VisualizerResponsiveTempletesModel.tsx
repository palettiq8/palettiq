"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuX } from "react-icons/lu";
import { visualizers } from "@/utils/Items";
import { useVisualizerStore } from "@/libs/stores/dataStore";

export default function VisualizerResponsiveTempletesModel() {
  const visualizerResponsiveTempletesModel = useModelStore(
    (state) => state.visualizerResponsiveTempletesModel,
  );
  const toggleVisualizerResponsiveTempletesModel = useModelStore(
    (state) => state.toggleVisualizerResponsiveTempletesModel,
  );
  const generatedVisualizerPalette = useVisualizerStore(
    (state) => state.generatedVisualizerPalette,
  );
  const setCurrentTemplateId = useVisualizerStore(
    (state) => state.setCurrentTemplateId,
  );

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleVisualizerResponsiveTempletesModel();
    }
  };

  return (
    <AnimatePresence>
      {visualizerResponsiveTempletesModel && (
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
              <p className="text-md font-semibold text-gray-900">Templetes</p>
              <Button
                onClick={() => toggleVisualizerResponsiveTempletesModel()}
                variant={"outline"}
                size={"circle"}
              >
                <LuX size={18} />
              </Button>
            </div>
            <div
              className="w-full p-4 overflow-y-auto grid grid-cols-2 gap-4 max-sm:grid-cols-1"
              style={{ height: "calc(100% - 56px)" }}
            >
              {visualizers.map((Component, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentTemplateId(index);
                      toggleVisualizerResponsiveTempletesModel();
                    }}
                    className="bg-gray-100 p-3 flex items-center justify-center rounded-lg"
                  >
                    <Component palette={generatedVisualizerPalette} />
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
