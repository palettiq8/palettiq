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
          className={`w-full mt-4 grid grid-cols-3 ${["Industries", "Use Cases", "Harmonies"].includes(title) && "max-sm:grid-cols-1 max-md:grid-cols-2"}`}
        >
          {items.map((item, index) => {
            const active = isActive(field, item);
            return (
              <div
                key={index}
                role="checkbox"
                aria-checked={active}
                aria-label={`Filter by ${item}`}
                onClick={() => handleToggle(field, item)}
                className={`w-max flex items-center gap-3 pl-2 pr-3 h-9 rounded-full
                hover:bg-gray-100 border cursor-pointer select-none transition-all
                ${active ? "border-gray-300 bg-gray-50" : "border-white hover:border-gray-200"}`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  readOnly
                  className="hidden"
                />
                <div
                  className={`w-4.5 h-4.5 border rounded-full flex items-center justify-center transition-all
                  ${active ? "bg-gray-900 border-gray-900" : "border-gray-400"}`}
                >
                  {active && (
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
                  {item.split("_").join(" ")}
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
          className="fixed inset-0 w-full h-screen bg-black/50 grid items-end pb-4 z-50 max-sm:px-4 parent"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filter color palettes"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="w-250 h-150 mx-auto bg-white rounded-xl shadow-2xl max-lg:w-full"
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
              <FilterSection
                title="Colors"
                items={preferredColors.map((c) => c.name)}
                field="preferred_colors"
              />
              <FilterSection
                title="Saturation Level"
                items={saturationLevels}
                field="saturation_level"
              />
              <FilterSection
                title="Brightness Level"
                items={brightnessLevels}
                field="brightness_level"
              />
              <FilterSection
                title="Moods/Emotions"
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
                title="Use Cases"
                items={useCases}
                field="usecases"
              />
            </div>
            <div className="w-full rounded-b-xl bg-white px-4 h-14 border-t border-gray-200 flex items-center justify-center">
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
