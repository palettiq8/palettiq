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
          className="fixed inset-0 w-full h-screen bg-black/50 grid items-end z-50 max-sm:px-4 parent pb-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`View details for ${paletteViewDetailsItem?.name} color palette`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="w-125 h-max mx-auto bg-white rounded-xl shadow-2xl relative overflow-y-auto noscrollbar pb-3 max-sm:w-full"
          >
            <div className="w-full h-40 max-lg:h-35 bg-gray-100 rounded-t-lg sticky top-0 p-3 border-b border-gray-200">
              <div className="border-2 w-full h-full flex border-white rounded-lg">
                {paletteViewDetailsItem?.colors?.map(({ id, color }) => {
                  return (
                    <div
                      key={id}
                      aria-label={`Palette color ${color}`}
                      className="w-full h-full first:rounded-l-lg last:rounded-r-lg"
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-3 px-3">
              <div className="w-max flex flex-col items-start gap-2">
                <span className="text-xs font-semibold text-gray-500">
                  Palette Name
                </span>
                <Link
                  href={`/palettes/${paletteViewDetailsItem?.id}-${nameToSlug(paletteViewDetailsItem?.name ?? "")}`}
                  className="text-xl font-semibold text-gray-900 hover:underline decoration-gray-500 underline-offset-4 cursor-pointer"
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
              <LuFileText size={16} className="shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-gray-700 leading-relaxed">
                {paletteViewDetailsItem?.description}
              </p>
            </div>
            <div className="w-full mt-4 px-3">
              <h3 className="text-xs font-semibold text-gray-500">
                Preferred Colors
              </h3>
              <div className="flex items-center gap-2 flex-wrap mt-3">
                {paletteViewDetailsItem?.preferred_colors
                  ?.map((color) =>
                    preferredColors.find((_) => _.name === color),
                  )
                  .filter(Boolean)
                  .map((color, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-full pl-1 py-1 pr-2"
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color?.hex }}
                        ></div>
                        <p className="text-sm font-semibold text-gray-900">
                          {color?.name}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
