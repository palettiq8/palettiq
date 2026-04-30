"use client";

import CircleLoader from "@/components/server/CircleLoader";
import FooterSection from "@/components/server/FooterSection";
import HeaderSection from "@/components/server/HeaderSection";
import { useFetchFontsQuery } from "@/libs/features/api/apiSlice";
import { useBrowseStore } from "@/libs/stores/dataStore";
import { fontsDisplay } from "@/utils/Items";
import dayjs from "dayjs";
import { LuDownload, LuSearch } from "react-icons/lu";
import { VirtuosoGrid } from "react-virtuoso";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import FontBestForMenu from "@/components/client/FontBestForMenu";
import Link from "next/link";
import { Button } from "@/components/Button";

dayjs.extend(relativeTime);

export default function page() {
  const [fontSizes, setFontSizes] = useState<Record<string, number>>({});
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const fontBestForSelectedItems = useBrowseStore(
    (state) => state.fontBestForSelectedItems,
  );
  const fontActiveCategory = useBrowseStore(
    (state) => state.fontActiveCategory,
  );
  const setFontActiveCategory = useBrowseStore(
    (state) => state.setFontActiveCategory,
  );
  const { data, isLoading, isFetching } = useFetchFontsQuery({
    category: fontActiveCategory,
    keywords: fontBestForSelectedItems,
    searchQuery: searchQuery,
  });

  const min = 20;
  const max = 150;

  useEffect(() => {
    if (data) {
      const initialSizes: Record<string, number> = {};
      data.forEach((font) => {
        initialSizes[font.id] = 100;
      });
      setFontSizes(initialSizes);
    }
  }, [data]);

  useEffect(() => {
    data?.forEach((font) => {
      const fontFace = new FontFace(font.family, `url(${font.file})`);
      fontFace.load().then(() => document.fonts.add(fontFace));
    });
  }, [data]);

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
        <h1 className="text-5xl font-bold text-gray-900">
          Premium Fonts Collection!
        </h1>
        <p className="text-sm font-semibold text-gray-600 mt-5">
          Carefully selected fonts to enhance typography, branding, and visual
          experiences.
        </p>
        <div className="w-full pt-8 pb-5 flex items-center justify-between">
          <div className="w-max flex items-center gap-2">
            {fontsDisplay.map(({ id, title, count }) => {
              return (
                <button
                  key={id}
                  className={`${title === fontActiveCategory ? "bg-gray-900 text-gray-50" : "bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-gray-50"} h-10 px-5 text-sm font-semibold rounded-full cursor-pointer transition-all flex items-center gap-1.5 border border-gray-200 ${["Script", "Handwritten"].includes(title) && "max-xl:hidden"} ${["Display", "Slab", "Serif", "Sans", "All"].includes(title) && "max-lg:hidden"}`}
                  onClick={() => {
                    setFontActiveCategory(title);
                  }}
                >
                  <span>{title}</span>
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 max-lg:w-full">
            <div className="w-70 relative max-lg:w-full">
              <input
                type="text"
                value={inputValue}
                placeholder={"Search by name..."}
                className="w-full h-10 rounded-full outline-none pl-11 pr-4 text-sm font-semibold placeholder:text-gray-500 caret-gray-500 border border-gray-200"
                onChange={(e) => setInputValue(e.target.value)}
              />

              <LuSearch
                size={18}
                className="text-gray-900 absolute top-3 left-4"
              />
            </div>
            <FontBestForMenu />
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
                  No fonts found.
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <VirtuosoGrid
                useWindowScroll
                totalCount={data?.length || 0}
                listClassName="grid grid-cols-1 gap-1 px-4"
                itemContent={(index) => {
                  const font = data?.[index];
                  if (!font) return null;
                  return (
                    <div
                      key={font?.id}
                      className={`w-full rounded-xl p-5 h-74 max-lg:h-max bg-gray-100 flex flex-col items-start justify-between border border-gray-200`}
                    >
                      <div className="w-full flex items-start justify-between max-lg:items-center max-lg:justify-center">
                        <h2
                          style={{
                            fontFamily: font?.family,
                            fontSize: `clamp(${fontSizes[font?.id] * 0.5}px, ${fontSizes[font?.id] * 0.15}vw, ${fontSizes[font?.id]}px)`,
                            lineHeight: 1.3,
                          }}
                          className="text-center"
                        >
                          {font?.family}
                        </h2>
                        <Link
                          href={font?.download}
                          download
                          className="max-lg:hidden"
                        >
                          <Button variant={"outline"} size={"md"}>
                            <LuDownload size={16} />
                            <span>Download</span>
                          </Button>
                        </Link>
                      </div>
                      <div className="mt-6 w-full flex items-center justify-between max-lg:hidden">
                        <div className="flex items-center gap-12">
                          <p className="text-sm font-semibold text-gray-900">
                            {font?.category?.join(", ")}
                          </p>
                          <div className="flex items-center gap-2">
                            {font?.keywords?.map((_, index) => {
                              const isExist =
                                fontBestForSelectedItems.includes(_);
                              return (
                                <p
                                  key={index}
                                  className={`text-md text-sm h-8 px-3 rounded-full place-content-center border ${isExist ? "bg-orange-50 text-orange-600 border-orange-600" : "bg-white border-gray-200 text-gray-900"} font-semibold`}
                                >
                                  {_}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 max-xl:hidden">
                          <input
                            type="range"
                            min={min}
                            max={max}
                            step={1}
                            value={fontSizes[font?.id] ?? 100}
                            className="w-72 h-1.5 rounded-full appearance-none cursor-pointer"
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              setFontSizes((prev) => ({
                                ...prev,
                                [font?.id]: val,
                              }));
                            }}
                            style={{
                              background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((fontSizes[font?.id] - min) / (max - min)) * 100}%, #e5e7eb ${((fontSizes[font?.id] - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
                            }}
                          />
                          <p className="w-10 text-end text-sm font-semibold text-gray-900">{`${fontSizes[font?.id]}px`}</p>
                        </div>
                      </div>
                    </div>
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
