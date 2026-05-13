"use client";

import CircleLoader from "@/components/server/CircleLoader";
import FooterSection from "@/components/server/FooterSection";
import HeaderSection from "@/components/server/HeaderSection";
import { useFetchGradientsQuery } from "@/libs/features/api/apiSlice";
import { useBrowseStore, useOtherStore } from "@/libs/stores/dataStore";
import { preferredColors } from "@/utils/Items";
import { FlashMessage, getGradientCSS } from "@/utils/utils";
import dayjs from "dayjs";
import { LuEye, LuSearch } from "react-icons/lu";
import { VirtuosoGrid } from "react-virtuoso";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import GradientMoreMenu from "@/components/client/GradientMoreMenu";
import { generatorContentHeaderItemsStyle } from "@/utils/styles/Classes";
import useModelStore from "@/libs/stores/modelStore";

dayjs.extend(relativeTime);

export default function ExploreGradientsPageClient() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filterPreferredColors = useBrowseStore(
    (state) => state.filterPreferredColors,
  );
  const setFilterPreferredColors = useBrowseStore(
    (state) => state.setFilterPreferredColors,
  );
  const browseGradientActiveType = useBrowseStore(
    (state) => state.browseGradientActiveType,
  );
  const setBrowseGradientActiveType = useBrowseStore(
    (state) => state.setBrowseGradientActiveType,
  );
  const toggleQuickViewModel = useModelStore(
    (state) => state.toggleQuickViewModel,
  );
  const setQuickViewActiveTab = useOtherStore(
    (state) => state.setQuickViewActiveTab,
  );
  const setQuickViewPalette = useOtherStore(
    (state) => state.setQuickViewPalette,
  );
  const setQuickViewActiveColor = useOtherStore(
    (state) => state.setQuickViewActiveColor,
  );
  const { data, isLoading, isFetching } = useFetchGradientsQuery({
    preferred_colors: filterPreferredColors,
    searchQuery: searchQuery,
  });
  const gradientsTypes = ["Linear", "Radial", "Conic"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="w-full h-max">
      <header className="w-full h-15 border-b border-gray-200 sticky top-0 z-30 bg-white/70 backdrop-blur-md">
        <HeaderSection />
      </header>
      <div className="w-full px-4 pt-10">
        <div className="flex items-end justify-between gap-4 max-lg:flex-col max-lg:items-start">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              Explore CSS Gradients — Linear, Radial & Conic
            </h1>
            <p className="text-sm font-semibold text-gray-600 mt-5">
              Browse thousands of beautiful CSS gradients including linear,
              radial, and conic styles. Filter by color family — copy gradient
              code instantly for UI design, branding, and digital products. Free
              on PalettIQ.
            </p>
          </div>
          <div className="flex items-center border border-gray-200 rounded-full p-1 max-lg:w-full">
            {gradientsTypes.map((_, index) => {
              return (
                <button
                  key={index}
                  aria-label={`Filter by ${_} gradient`}
                  onClick={() => setBrowseGradientActiveType(_)}
                  className={`h-10 w-full px-4 text-sm font-semibold border rounded-full ${browseGradientActiveType === _ ? "bg-gray-100 border-gray-200 text-gray900" : "bg-white border-white text-gray-900"} cursor-pointer transition-all`}
                >
                  {_}
                </button>
              );
            })}
          </div>
        </div>
        <div className="w-full pt-8 pb-5 flex items-center justify-between">
          <div className="w-max flex items-center gap-2">
            {preferredColors.map(({ id, name }) => {
              const isExist = filterPreferredColors.includes(name);
              return (
                <button
                  key={id}
                  aria-label={`Filter gradients by ${name} color`}
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
          <div className="w-70 relative max-sm:w-full">
            <input
              type="text"
              value={inputValue}
              aria-label="Search gradients by name"
              placeholder="Search gradients by name..."
              className="w-full h-10 rounded-full outline-none pl-11 pr-4 text-sm font-semibold placeholder:text-gray-500 caret-gray-500 border border-gray-200"
              onChange={(e) => setInputValue(e.target.value)}
            />

            <LuSearch
              size={18}
              className="text-gray-900 absolute top-3 left-4"
            />
          </div>
        </div>
      </div>
      {isLoading || isFetching ? (
        <div className="w-full h-120 grid place-content-center">
          <CircleLoader content="Loading..." />
        </div>
      ) : (
        <>
          {data?.length === 0 ? (
            <div className="w-full h-120 grid place-content-center">
              <div className="w-120 h-40 grid place-content-center rounded-xl border-2 border-dashed border-gray-200">
                <span className="text-md font-semibold text-gray-600">
                  No gradients found. Try a different search or filter.
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
                  const gradient = data?.[index];
                  const stops = gradient?.stops || [];
                  return (
                    <article
                      className={`bg-gray-100 p-4 w-full border rounded-xl border-gray-200`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {gradient?.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <LuEye
                            onClick={() => {
                              toggleQuickViewModel();
                              setQuickViewActiveTab("Formats");
                              const data = [...stops]
                                .sort((a, b) => a.position - b.position)
                                .map((stop) => stop.color);
                              setQuickViewPalette(data);
                              setQuickViewActiveColor(data[0]);
                            }}
                            size={17}
                            aria-label={`Quick view ${gradient?.name} gradient`}
                            className={generatorContentHeaderItemsStyle}
                          />
                          <GradientMoreMenu gradient={gradient!} />
                        </div>
                      </div>
                      <div className="flex items-center mt-3 border-2 border-white rounded-lg shadow-sm">
                        <div
                          key={index}
                          className="w-full h-50 rounded-lg"
                          style={{
                            background: getGradientCSS(
                              stops,
                              browseGradientActiveType,
                              90,
                              { shape: "circle", x: 50, y: 50 },
                              { x: 50, y: 50 },
                            ),
                          }}
                        >
                          <div className="w-full h-full flex">
                            {stops.map((stop, index) => {
                              return (
                                <div
                                  key={index}
                                  role="button"
                                  aria-label={`Copy gradient color ${stop.color.toUpperCase()}`}
                                  className="w-full h-50 group relative transition-transform cursor-pointer"
                                  onClick={async () => {
                                    await navigator.clipboard.writeText(
                                      stop.color.toUpperCase(),
                                    );
                                    FlashMessage(
                                      "success",
                                      "Copied to the clipboard!",
                                    );
                                  }}
                                >
                                  <div className="absolute top-5 left-1/2">
                                    <div className="relative -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-gray-50 text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap z-10">
                                      <span className="text-xs font-medium text-gray-50">
                                        {stop.color.toUpperCase()}
                                      </span>
                                      <div className="w-2 h-2 top-6 left-1/2 absolute rotate-45 bg-gray-900"></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
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
