"use client";

import CircleLoader from "@/components/server/CircleLoader";
import FooterSection from "@/components/server/FooterSection";
import HeaderSection from "@/components/server/HeaderSection";
import { useFetchColorsQuery } from "@/libs/features/api/apiSlice";
import dayjs from "dayjs";
import { LuSearch } from "react-icons/lu";
import { VirtuosoGrid } from "react-virtuoso";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { checkIsLight, FlashMessage } from "@/utils/utils";

dayjs.extend(relativeTime);

export default function ExploreColorsPageClient() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isFetching } = useFetchColorsQuery({
    searchQuery: searchQuery,
  });

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
      <div className="w-full px-4 pt-10 pb-5 flex items-end justify-between gap-5 max-lg:flex-col">
        <div className="w-full">
          <h1 className="text-5xl font-bold text-gray-900">
            Explore Color Shades & Scales Online
          </h1>
          <p className="text-sm font-semibold text-gray-600 mt-5">
            Browse 32 curated color scales with complete shade systems from 100
            to 900. Copy HEX codes instantly for UI design, branding, and
            digital products — all free on PalettIQ.
          </p>
        </div>
        <div className="w-70 relative shrink-0 max-lg:w-full">
          <input
            type="text"
            value={inputValue}
            aria-label="Search colors by name"
            placeholder="Search colors by name..."
            className="w-full h-10 rounded-full outline-none pl-11 pr-4 text-sm font-semibold placeholder:text-gray-500 caret-gray-500 border border-gray-200"
            onChange={(e) => setInputValue(e.target.value)}
          />

          <LuSearch size={18} className="text-gray-900 absolute top-3 left-4" />
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
                  No colors found. Try a different search term.
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <VirtuosoGrid
                useWindowScroll
                data={data}
                listClassName="grid grid-cols-1 gap-1 px-4 max-lg:gap-4"
                itemContent={(index, color) => {
                  return (
                    <article
                      key={index}
                      className="flex items-center gap-3 max-lg:flex-col max-lg:items-start"
                    >
                      <h3 className="text-sm font-semibold text-gray-900 w-25 max-lg:w-max">
                        {color.name}
                      </h3>
                      <div key={index} className="w-full flex">
                        {color.shades.map((hex, index) => {
                          const isLight = checkIsLight(hex);
                          return (
                            <div
                              key={index}
                              role="button"
                              aria-label={`Copy ${hex.toUpperCase()} — ${color.name} shade ${(index + 1) * 100}`}
                              className="w-full cursor-pointer h-30 first:rounded-l-xl last:rounded-r-xl text-gray-50 flex items-center justify-center pl-4 group relative transition-transform"
                              style={{ backgroundColor: hex }}
                              onClick={async () => {
                                await navigator.clipboard.writeText(
                                  hex.toUpperCase(),
                                );
                                FlashMessage(
                                  "success",
                                  "Copied to the clipboard!",
                                );
                              }}
                            >
                              <span
                                className={`text-sm max-lg:hidden font-semibold absolute bottom-3 left-4 ${isLight ? "text-gray-900" : "text-gray-50"}`}
                              >
                                {(index + 1) * 100}
                              </span>
                              <div className="absolute top-5 left-1/2">
                                <div className="relative -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-gray-50 text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap z-10">
                                  <span className="text-xs font-medium text-gray-50">
                                    {hex.toUpperCase()}
                                  </span>
                                  <div className="w-2 h-2 top-6 left-1/2 absolute rotate-45 bg-gray-900"></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
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
