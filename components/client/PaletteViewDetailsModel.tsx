"use client";

import { useBrowseStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { FlashMessage, nameToSlug } from "@/utils/utils";
import { LuCopy, LuFileText } from "react-icons/lu";
import { preferredColors } from "@/utils/Items";
import Link from "next/link";

export default function PaletteViewDetailsModel() {
  const paletteViewDetailsModel = useModelStore(
    (state) => state.paletteViewDetailsModel,
  );
  const togglePaletteViewDetailsModel = useModelStore(
    (state) => state.togglePaletteViewDetailsModel,
  );
  const paletteViewDetailsItem = useBrowseStore(
    (state) => state.paletteViewDetailsItem,
  );
  const setPaletteViewDetailsItem = useBrowseStore(
    (state) => state.setPaletteViewDetailsItem,
  );
  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      togglePaletteViewDetailsModel();
      setPaletteViewDetailsItem(null);
    }
  };

  return (
    <AnimatePresence>
      {paletteViewDetailsModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 grid place-content-center z-50 p-4 max-sm:p-0 parent"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`View details for ${paletteViewDetailsItem?.name} color palette`}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-125 max-w-full max-h-[85vh] mx-auto bg-white rounded-xl shadow-2xl relative flex flex-col overflow-hidden max-sm:w-full max-sm:max-h-full max-sm:h-full max-sm:rounded-none"
          >
            <div className="w-full shrink-0 h-40 max-lg:h-32 bg-gray-100 rounded-t-xl p-3 border-b border-gray-200">
              <div className="border-2 w-full h-full flex border-white rounded-lg overflow-hidden">
                {paletteViewDetailsItem?.colors?.map(({ id, color }) => (
                  <div
                    key={id}
                    aria-label={`Palette color ${color}`}
                    className="flex-1 min-w-6 h-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="w-full flex-1 min-h-0 overflow-y-auto noscrollbar pb-3">
              <div className="w-full flex flex-wrap items-start justify-between gap-3 mt-3 px-3">
                <div className="w-max flex flex-col items-start gap-2">
                  <span className="text-xs font-semibold text-gray-500">
                    Palette name
                  </span>
                  <Link
                    href={`/palettes/${paletteViewDetailsItem?.id}-${nameToSlug(paletteViewDetailsItem?.name ?? "")}`}
                    className="text-xl font-semibold text-gray-900 hover:underline decoration-gray-500 underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded"
                    onClick={() => togglePaletteViewDetailsModel()}
                  >
                    {paletteViewDetailsItem?.name}
                  </Link>
                </div>
                <Button
                  aria-label={`Copy all colors from ${paletteViewDetailsItem?.name} palette`}
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `[${paletteViewDetailsItem?.colors?.map((color) => `"${color.color}"`)}]`,
                    );
                    FlashMessage("success", "Copied to the clipboard!");
                  }}
                  variant={"outline"}
                  size={"md"}
                >
                  <LuCopy size={16} />
                  <span>Copy</span>
                </Button>
              </div>

              <div className="w-full mt-3 flex items-start gap-3 px-3">
                <LuFileText
                  size={16}
                  className="shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-gray-700 leading-relaxed">
                  {paletteViewDetailsItem?.description}
                </p>
              </div>

              <div className="w-full mt-4 px-3">
                <h3 className="text-xs font-semibold text-gray-500">
                  Preferred colors
                </h3>
                <div className="flex items-center gap-2 flex-wrap mt-3">
                  {paletteViewDetailsItem?.preferred_colors
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
                        <p className="text-sm font-semibold text-gray-900">
                          {color?.name}
                        </p>
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
