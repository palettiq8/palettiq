"use client";

import { Button } from "@/components/Button";
import FooterSection from "@/components/server/FooterSection";
import HeaderSection from "@/components/server/HeaderSection";
import { useFetchPalettesQuery } from "@/libs/features/api/apiSlice";
import { useBrowseStore, useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { preferredColors } from "@/utils/Items";
import { LuSearch, LuSettings2 } from "react-icons/lu";
import { VirtuosoGrid } from "react-virtuoso";
import PaletteCard from "@/components/client/PaletteCard";
import PaletteSkeleton from "@/components/server/PaletteSkeleton";
import { useEffect } from "react";

export default function page() {
  const paletteSearchQuery = useOtherStore((state) => state.paletteSearchQuery);
  const setPaletteSearchQuery = useOtherStore(
    (state) => state.setPaletteSearchQuery,
  );
  const filterIndustries = useBrowseStore((state) => state.filterIndustries);
  const filterPreferredColors = useBrowseStore(
    (state) => state.filterPreferredColors,
  );
  const filterMoods = useBrowseStore((state) => state.filterMoods);
  const filterBrightnessLevels = useBrowseStore(
    (state) => state.filterBrightnessLevels,
  );
  const filterSaturationLevels = useBrowseStore(
    (state) => state.filterSaturationLevels,
  );
  const filterModes = useBrowseStore((state) => state.filterModes);
  const filterUsecases = useBrowseStore((state) => state.filterUsecases);
  const filterHarmonies = useBrowseStore((state) => state.filterHarmonies);
  const setFilterPreferredColors = useBrowseStore(
    (state) => state.setFilterPreferredColors,
  );
  const togglePalettesFilterModel = useModelStore(
    (state) => state.togglePalettesFilterModel,
  );
  const setOpenOnScreenPalette = useBrowseStore(
    (state) => state.setOpenOnScreenPalette,
  );
  const setViewModePalette = useBrowseStore(
    (state) => state.setViewModePalette,
  );
  const { data, isLoading, isFetching } = useFetchPalettesQuery({
    industries: filterIndustries,
    preferred_colors: filterPreferredColors,
    moods: filterMoods,
    brightness_level: filterBrightnessLevels,
    saturation_level: filterSaturationLevels,
    modes: filterModes,
    usecases: filterUsecases,
    harmonies: filterHarmonies,
    searchQuery: paletteSearchQuery,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpenOnScreenPalette(null);
        setViewModePalette(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full h-max">
      <header className="w-full h-15 border-b border-gray-200 sticky top-0 z-30 bg-white/70 backdrop-blur-md">
        <HeaderSection />
      </header>
      <div className="w-full px-4 pt-10">
        <h1 className="text-5xl font-bold text-gray-900">
          Awesome Color Palettes!
        </h1>
        <p className="text-sm font-semibold text-gray-600 mt-5">
          Explore a curated collection of professional color palettes designed
          for visual harmony and seamless design integration.
        </p>
        <div className="w-full pt-8 pb-5 flex items-center justify-between">
          <div className="w-max flex items-center gap-2 max-lg:hidden">
            {preferredColors.map(({ id, name }) => {
              const isExist = filterPreferredColors.includes(name);
              return (
                <button
                  key={id}
                  onClick={() => {
                    const updated = filterPreferredColors.includes(name)
                      ? filterPreferredColors.filter((item) => item !== name)
                      : [...filterPreferredColors, name];
                    setFilterPreferredColors(updated);
                  }}
                  className={`w-max px-5 rounded-full h-10 ${isExist ? "bg-gray-900 text-gray-50 border-gray-900" : "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-900 hover:text-gray-50"} text-sm font-semibold border hover:cursor-pointer transition-all ${["Brown", "Pink"].includes(name) && "max-[1760px]:hidden"} ${["Purple", "Violet"].includes(name) && "max-[1570px]:hidden"} ${["Indigo", "Blue", "Cyan"].includes(name) && "max-2xl:hidden"} ${["Green", "Lime", "Yellow"].includes(name) && "max-xl:hidden"} ${["Orange", "Red", "Gray"].includes(name) && "max-lg:hidden"} ${["White", "Black"].includes(name) && "max-sm:hidden"}`}
                >
                  {name}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 max-lg:w-full max-lg:flex-row-reverse max-lg:justify-between">
            <div className="w-70 relative max-lg:w-60">
              <input
                type="text"
                value={paletteSearchQuery}
                placeholder={"Search by name..."}
                className="w-full h-10 rounded-full outline-none pl-11 pr-4 text-sm font-semibold placeholder:text-gray-500 caret-gray-500 border border-gray-200"
                onChange={(e) => setPaletteSearchQuery(e.target.value)}
              />

              <LuSearch
                size={18}
                className="text-gray-900 absolute top-3 left-4"
              />
            </div>
            <Button
              onClick={() => togglePalettesFilterModel()}
              variant={"outline"}
              size={"md"}
            >
              <LuSettings2 size={16} />
              <span>Filters</span>
            </Button>
          </div>
        </div>
      </div>
      {isLoading || isFetching ? (
        <div className="w-full grid grid-cols-4 gap-1 px-4 min-h-180 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <PaletteSkeleton count={12} />
        </div>
      ) : (
        <>
          {data?.length === 0 ? (
            <div className="w-full h-120 grid place-content-center">
              <div className="w-120 h-40 grid place-content-center rounded-xl border-2 border-dashed border-gray-200">
                <span className="text-md font-semibold text-gray-600">
                  No palettes found.
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <VirtuosoGrid
                useWindowScroll
                totalCount={data?.length || 0}
                listClassName="grid grid-cols-4 gap-1 px-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
                itemContent={(index) => {
                  const palette = data?.[index];
                  return <PaletteCard palette={palette!} />;
                }}
                components={{
                  Footer: () => {
                    return (
                      <div className="w-full border-t border-gray-200 mt-4">
                        <FooterSection />
                      </div>
                    );
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
