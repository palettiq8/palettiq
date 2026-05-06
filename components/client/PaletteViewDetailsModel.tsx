"use client";

import { useBrowseStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { FlashMessage } from "@/utils/utils";
import { LuCopy, LuFileText } from "react-icons/lu";
import { generatorContentHeaderItemsStyle } from "@/utils/styles/Classes";
import { preferredColors } from "@/utils/Items";

const ItemSection = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <div className="w-full mt-4 px-3">
      <h3 className="text-xs font-semibold text-gray-500">{title}</h3>
      <div className="flex items-center gap-2 flex-wrap mt-3">
        {items?.map((_, index) => {
          return (
            <div
              key={index}
              className="px-2 py-1 border border-gray-200 bg-gray-50 rounded-full"
            >
              <p className="text-sm font-semibold text-gray-900">{_}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
          className="fixed inset-0 w-full h-screen bg-black/50 grid place-content-center z-50 max-sm:block max-sm:px-4 parent"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`View details for ${paletteViewDetailsItem?.name} color palette`}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-125 h-180 max-lg:h-140 max-lg:w-100 bg-white rounded-xl shadow-2xl relative overflow-y-auto noscrollbar pb-3 max-sm:w-full max-sm:h-150"
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
                <h2 className="text-xl font-semibold text-gray-900">
                  {paletteViewDetailsItem?.name}
                </h2>
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
                <LuCopy
                  size={16}
                  aria-hidden="true"
                  className={generatorContentHeaderItemsStyle}
                />
                <span>Copy</span>
              </Button>
            </div>
            <div className="w-full mt-3 flex items-start gap-3 px-3">
              <LuFileText size={16} className="shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-gray-700">
                {paletteViewDetailsItem?.description}
              </p>
            </div>
            <div className="w-full mt-4 px-4">
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
            <ItemSection
              title="Industries"
              items={paletteViewDetailsItem?.industries!}
            />
            <ItemSection title="Moods" items={paletteViewDetailsItem?.moods!} />
            <ItemSection
              title="Brightness Level"
              items={paletteViewDetailsItem?.brightness_level!}
            />
            <ItemSection
              title="Saturation Level"
              items={paletteViewDetailsItem?.saturation_level!}
            />
            <ItemSection title="Modes" items={paletteViewDetailsItem?.modes!} />
            <ItemSection
              title="Usecases"
              items={paletteViewDetailsItem?.usecases!}
            />
            <ItemSection
              title="Harmonies"
              items={paletteViewDetailsItem?.harmonies!}
            />
            <ItemSection title="Tags" items={paletteViewDetailsItem?.tags!} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
