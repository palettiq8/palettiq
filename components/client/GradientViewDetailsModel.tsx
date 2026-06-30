"use client";

import { useBrowseStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { FlashMessage, getGradientCSS } from "@/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuCopy, LuFileText } from "react-icons/lu";
import { preferredColors } from "@/utils/Items";

export default function GradientViewDetailsModel() {
  const gradientViewDetailsModel = useModelStore(
    (state) => state.gradientViewDetailsModel,
  );
  const toggleGradientViewDetailsModel = useModelStore(
    (state) => state.toggleGradientViewDetailsModel,
  );
  const browseGradients = useBrowseStore((state) => state.browseGradients);
  const setBrowseGradients = useBrowseStore(
    (state) => state.setBrowseGradients,
  );
  const browseGradientActiveType = useBrowseStore(
    (state) => state.browseGradientActiveType,
  );
  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleGradientViewDetailsModel();
      setBrowseGradients(null);
    }
  };

  const gradientCSS = getGradientCSS(
    browseGradients?.stops!,
    browseGradientActiveType,
    90,
    { shape: "circle", x: 50, y: 50 },
    { x: 50, y: 50 },
  );

  return (
    <AnimatePresence>
      {gradientViewDetailsModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 flex items-center justify-center z-50 p-4 max-sm:p-0 parent"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`View details for ${browseGradients?.name} gradient`}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-125 max-w-full max-h-[85vh] mx-auto bg-white rounded-xl shadow-2xl relative flex flex-col overflow-hidden max-sm:w-full max-sm:rounded-none"
          >
            <div className="w-full shrink-0 p-3 bg-gray-100 border-b border-gray-200">
              <div className="w-full h-44 max-sm:h-36 rounded-lg border-2 border-white shadow-sm overflow-hidden">
                <div
                  className="w-full h-full"
                  style={{ background: gradientCSS }}
                />
              </div>
            </div>
            <div className="w-full flex-1 min-h-0 overflow-y-auto noscrollbar">
              <div className="w-full flex flex-wrap items-start justify-between gap-3 p-3">
                <div className="w-max flex flex-col items-start gap-2">
                  <h3 className="text-xs font-semibold text-gray-500">
                    Gradient name
                  </h3>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {browseGradients?.name}
                  </h2>
                </div>
                <Button
                  aria-label={`Copy all colors from ${browseGradients?.name} palette`}
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `background: ${gradientCSS};`,
                    );
                    FlashMessage("success", "Copied to the clipboard!");
                  }}
                  variant={"outline"}
                  size={"md"}
                >
                  <LuCopy size={16} aria-hidden="true" />
                  <span>Copy</span>
                </Button>
              </div>

              <div className="w-full flex items-start gap-3 px-3">
                <LuFileText
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 mt-0.5"
                />
                <p className="text-sm font-medium text-gray-700">
                  {browseGradients?.description}
                </p>
              </div>

              <div className="w-full p-3 mt-4">
                <h3 className="text-xs font-semibold text-gray-500">
                  Parent colors
                </h3>
                <div className="flex items-center gap-2 flex-wrap mt-3">
                  {browseGradients?.parent_colors
                    ?.map((color) =>
                      preferredColors.find((_) => _.name === color),
                    )
                    .filter(Boolean)
                    .map((color, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-full pl-1 py-1 pr-2"
                      >
                        <div
                          className="w-4 h-4 rounded-full shrink-0"
                          style={{ backgroundColor: color?.hex }}
                        />
                        <span className="text-sm font-semibold text-gray-900">
                          {color?.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
