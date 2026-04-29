"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import StudioLeftMenuContent from "./StudioLeftMenuContent";

export default function StudioLeftMenuModel() {
  const studioLeftMenuModel = useModelStore(
    (state) => state.studioLeftMenuModel,
  );
  const toggleStudioLeftMenuModel = useModelStore(
    (state) => state.toggleStudioLeftMenuModel,
  );

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleStudioLeftMenuModel();
    }
  };

  return (
    <AnimatePresence>
      {studioLeftMenuModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 flex justify-start z-50 parent p-4"
        >
          <motion.div
            initial={{ x: "-10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-10%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-62 h-full bg-white rounded-xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)]"
          >
            <StudioLeftMenuContent from="Responsive" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
