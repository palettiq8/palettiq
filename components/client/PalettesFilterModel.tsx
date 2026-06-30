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
import { usePathname, useRouter } from "next/navigation";
import { filtersToSlug, slugToFilters } from "@/utils/utils";
import { PaletteFilters } from "@/utils/Types";

export default function PalettesFilterModel() {
  const palettesFilterModel = useModelStore(
    (state) => state.palettesFilterModel,
  );
  const togglePalettesFilterModel = useModelStore(
    (state) => state.togglePalettesFilterModel,
  );
  const pathname = usePathname();
  const router = useRouter();

  const currentFilters: PaletteFilters = (() => {
    const match = pathname.match(/^\/explore\/palettes\/(.+)$/);
    if (match) return slugToFilters(match[1]);
    return {};
  })();

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      togglePalettesFilterModel();
    }
  };

  function handleToggle(field: keyof PaletteFilters, value: string) {
    const current = currentFilters[field] ?? [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const newFilters: PaletteFilters = { ...currentFilters, [field]: updated };
    const slug = filtersToSlug(newFilters);

    if (slug) {
      router.replace(`/explore/palettes/${slug}`, { scroll: false });
    } else {
      router.replace("/explore/palettes", { scroll: false });
    }
  }

  function isActive(field: keyof PaletteFilters, value: string): boolean {
    return (currentFilters[field] ?? []).includes(value);
  }

  const FilterSection = ({
    title,
    items,
    field,
  }: {
    title: string;
    items: string[];
    field: keyof PaletteFilters;
  }) => {
    return (
      <div className="w-full">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div
          role="group"
          aria-label={`Filter by ${title}`}
          className={`w-full mt-4 grid grid-cols-2 gap-2 ${!["Colors", "Saturation level", "Brightness level", "Moods/emotions", "Modes"].includes(title) && "max-sm:grid-cols-1"}`}
        >
          {items.map((item, index) => {
            const active = isActive(field, item);
            return (
              <button
                key={index}
                type="button"
                role="checkbox"
                aria-checked={active}
                aria-label={`Filter by ${item}`}
                onClick={() => handleToggle(field, item)}
                className={`w-max flex items-center gap-3 py-1 pl-1 pr-3 rounded-full
                hover:bg-gray-100 border cursor-pointer select-none transition-all
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                ${active ? "border-gray-300 bg-gray-50" : "border-white hover:border-gray-200"}`}
              >
                <div
                  className={`w-4.5 h-4.5 shrink-0 border rounded-full flex items-center justify-center transition-all
                  ${active ? "bg-gray-900 border-gray-900" : "border-gray-400"}`}
                >
                  {active && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {item.split("_").join(" ")}
                </span>
              </button>
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
          className="fixed inset-0 w-full h-screen bg-black/50 flex items-center justify-center z-50 p-4 max-sm:p-0 parent"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filter color palettes"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-125 max-w-full h-150 max-h-[90vh] flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden max-sm:rounded-none max-sm:w-full max-sm:h-full max-sm:max-h-full"
          >
            <div className="w-full shrink-0 h-14 px-4 bg-white border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-md font-semibold text-gray-900">Filter by</h2>
              <Button
                onClick={() => togglePalettesFilterModel()}
                variant={"outline"}
                size={"circle"}
                aria-label="Close filter panel"
              >
                <LuX size={18} />
              </Button>
            </div>

            <div className="w-full flex-1 min-h-0 overflow-y-auto noscrollbar p-4 flex flex-col gap-6">
              <FilterSection
                title="Colors"
                items={preferredColors.map((c) => c.name)}
                field="preferred_colors"
              />
              <FilterSection
                title="Saturation level"
                items={saturationLevels}
                field="saturation_level"
              />
              <FilterSection
                title="Brightness level"
                items={brightnessLevels}
                field="brightness_level"
              />
              <FilterSection
                title="Moods/emotions"
                items={moods}
                field="moods"
              />
              <FilterSection
                title="Harmonies"
                items={colorHarmonies.map((h) => h.title)}
                field="harmonies"
              />
              <FilterSection title="Modes" items={modes} field="modes" />
              <FilterSection
                title="Industries"
                items={industries}
                field="industries"
              />
              <FilterSection
                title="Use cases"
                items={useCases}
                field="usecases"
              />
            </div>

            <div className="w-full shrink-0 bg-white px-4 h-14 border-t border-gray-200 flex items-center justify-center">
              <Button
                variant={"distrcutiveText"}
                size={"p0"}
                onClick={() => {
                  router.replace("/explore/palettes", { scroll: false });
                  togglePalettesFilterModel();
                }}
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
