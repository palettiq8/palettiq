"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuX } from "react-icons/lu";
import {
  brightnessLevels,
  colorHarmonies,
  industries,
  modes,
  moods,
  preferredColors,
  saturationLevels,
  useCases,
} from "@/utils/Items";
import { useBrowseStore } from "@/libs/stores/dataStore";

export default function PalettesFilterModel() {
  const filterIndustries = useBrowseStore((state) => state.filterIndustries);
  const setFilterIndustries = useBrowseStore(
    (state) => state.setFilterIndustries,
  );
  const filterPreferredColors = useBrowseStore(
    (state) => state.filterPreferredColors,
  );
  const setFilterPreferredColors = useBrowseStore(
    (state) => state.setFilterPreferredColors,
  );
  const filterMoods = useBrowseStore((state) => state.filterMoods);
  const setFilterMoods = useBrowseStore((state) => state.setFilterMoods);
  const filterBrightnessLevels = useBrowseStore(
    (state) => state.filterBrightnessLevels,
  );
  const setFilterBrightnessLevels = useBrowseStore(
    (state) => state.setFilterBrightnessLevels,
  );
  const filterSaturationLevels = useBrowseStore(
    (state) => state.filterSaturationLevels,
  );
  const setFilterSaturationLevels = useBrowseStore(
    (state) => state.setFilterSaturationLevels,
  );
  const filterModes = useBrowseStore((state) => state.filterModes);
  const setFilterModes = useBrowseStore((state) => state.setFilterModes);
  const filterUsecases = useBrowseStore((state) => state.filterUsecases);
  const setFilterUsecases = useBrowseStore((state) => state.setFilterUsecases);
  const filterHarmonies = useBrowseStore((state) => state.filterHarmonies);
  const setFilterHarmonies = useBrowseStore(
    (state) => state.setFilterHarmonies,
  );
  const clearAllPaletteFiltersItems = useBrowseStore(
    (state) => state.clearAllPaletteFiltersItems,
  );

  const palettesFilterModel = useModelStore(
    (state) => state.palettesFilterModel,
  );
  const togglePalettesFilterModel = useModelStore(
    (state) => state.togglePalettesFilterModel,
  );
  const setPalettesPage = useBrowseStore((state) => state.setPalettesPage);

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      togglePalettesFilterModel();
    }
  };

  const FilterSection = ({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) => {
    const filterSetterMap: Record<string, (value: string[]) => void> = {
      Industries: setFilterIndustries,
      Colors: setFilterPreferredColors,
      "Moods/Emotions": setFilterMoods,
      "Brightness Level": setFilterBrightnessLevels,
      "Saturation Level": setFilterSaturationLevels,
      Modes: setFilterModes,
      "Use Cases": setFilterUsecases,
      Harmonies: setFilterHarmonies,
    };

    const filterStateMap: Record<string, string[]> = {
      Industries: filterIndustries,
      Colors: filterPreferredColors,
      "Moods/Emotions": filterMoods,
      "Brightness Level": filterBrightnessLevels,
      "Saturation Level": filterSaturationLevels,
      Modes: filterModes,
      "Use Cases": filterUsecases,
      Harmonies: filterHarmonies,
    };

    const selectedItems = filterStateMap[title] || [];

    const handleToggle = (value: string) => {
      setPalettesPage(0);
      const setter = filterSetterMap[title];
      if (!setter) return;

      const current = selectedItems;

      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      setter(updated);
    };

    return (
      <div className="w-full">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

        <div
          role="group"
          aria-label={`Filter by ${title}`}
          className={`w-full mt-4 grid grid-cols-2 ${["Industries", "Use Cases", "Harmonies"].includes(title) && "max-sm:grid-cols-1"}`}
        >
          {items.map((item, index) => {
            const checked = selectedItems.includes(item);
            return (
              <div
                key={index}
                role="checkbox"
                aria-checked={checked}
                aria-label={`Filter by ${item}`}
                onClick={() => handleToggle(item)}
                className="w-max flex items-center gap-3 pl-2 pr-3 h-9 rounded-full 
                hover:bg-gray-100 border border-white hover:border-gray-200 
                cursor-pointer select-none transition-all"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="hidden"
                />
                <div
                  className={`w-4.5 h-4.5 border rounded-full flex items-center justify-center transition-all
                  ${checked ? "bg-gray-900 border-gray-900" : "border-gray-400"}`}
                >
                  {checked && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {palettesFilterModel && (
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
            aria-label="Filter color palettes"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-150 h-190 bg-white rounded-xl shadow-2xl max-sm:w-full max-sm:h-150"
          >
            <div className="w-full h-14 px-4 rounded-t-xl bg-white border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-md font-semibold text-gray-900">Filter By</h2>
              <Button
                onClick={() => togglePalettesFilterModel()}
                variant={"outline"}
                size={"circle"}
                aria-label="Close filter panel"
              >
                <LuX size={18} />
              </Button>
            </div>
            <div
              className="w-full overflow-y-auto noscrollbar p-4 flex flex-col gap-6"
              style={{ height: "calc(100% - 112px)" }}
            >
              <FilterSection title="Industries" items={industries} />
              <FilterSection
                title="Colors"
                items={preferredColors.map((color) => color.name)}
              />
              <FilterSection title="Moods/Emotions" items={moods} />
              <FilterSection
                title="Brightness Level"
                items={brightnessLevels}
              />
              <FilterSection
                title="Saturation Level"
                items={saturationLevels}
              />
              <FilterSection title="Modes" items={modes} />
              <FilterSection title="Use Cases" items={useCases} />
              <FilterSection
                title="Harmonies"
                items={colorHarmonies.map((harmony) => harmony.title)}
              />
            </div>
            <div className="w-full rounded-b-xl bg-white px-4 h-14 border-t border-gray-200 flex items-center justify-center">
              <Button
                onClick={() => clearAllPaletteFiltersItems()}
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
