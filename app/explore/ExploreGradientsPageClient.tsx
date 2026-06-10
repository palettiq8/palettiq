"use client";

import CircleLoader from "@/components/server/CircleLoader";
import FooterSection from "@/components/server/FooterSection";
import HeaderSection from "@/components/server/HeaderSection";
import { useFetchGradientsQuery } from "@/libs/features/api/apiSlice";
import { useBrowseStore, useOtherStore } from "@/libs/stores/dataStore";
import { preferredColors } from "@/utils/Items";
import {
  filtersToGradientSlug,
  FlashMessage,
  getGradientCSS,
} from "@/utils/utils";
import { LuEye, LuSearch } from "react-icons/lu";
import { VirtuosoGrid } from "react-virtuoso";
import { useEffect, useState } from "react";
import GradientMoreMenu from "@/components/client/GradientMoreMenu";
import useModelStore from "@/libs/stores/modelStore";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  activeColors?: string[];
  titleLabel?: string;
};

export default function ExploreGradientsPageClient({
  activeColors = [],
  titleLabel,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
  const router = useRouter();

  const { data, isLoading, isFetching } = useFetchGradientsQuery({
    preferred_colors: activeColors,
    searchQuery: searchQuery,
  });

  const gradientsTypes = ["Linear", "Radial", "Conic"];

  function handleColorToggle(name: string) {
    const updated = activeColors.includes(name)
      ? activeColors.filter((v) => v !== name)
      : [...activeColors, name];

    const slug = filtersToGradientSlug(updated);
    if (slug) {
      router.replace(`/explore/gradients/${slug}`, { scroll: false });
    } else {
      router.replace("/explore/gradients", { scroll: false });
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="w-full h-max graydotbg">
      <header className="w-full h-15 border-b border-gray-200 sticky top-0 z-30 bg-white/70 backdrop-blur-md">
        <HeaderSection />
      </header>
      <section className="w-full px-4 pt-10">
        <div className="flex items-end justify-between gap-4 max-lg:flex-col max-lg:items-start">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              {titleLabel
                ? `${titleLabel} CSS Gradients`
                : "Explore CSS Gradients — Linear, Radial & Conic"}
            </h1>
            <p className="text-sm font-semibold text-gray-600 mt-5">
              {titleLabel
                ? `Browse curated ${titleLabel.toLowerCase()} CSS gradients for websites, mobile apps, branding, dashboards, landing pages, and digital products. Copy CSS gradient code instantly and discover professional gradient color combinations for modern UI design.`
                : `Browse thousands of beautiful CSS gradients including linear, radial, and conic styles. Filter by color family — copy gradient code instantly for UI design, branding, and digital products. Free on PalettIQ.`}
            </p>
          </div>
          <div className="flex items-center border border-gray-200 rounded-full p-1 max-lg:w-full bg-white">
            {gradientsTypes.map((type, index) => (
              <button
                key={index}
                aria-label={`Filter by ${type} gradient`}
                aria-pressed={browseGradientActiveType === type}
                onClick={() => setBrowseGradientActiveType(type)}
                className={`h-10 w-full px-4 text-sm font-semibold border rounded-full ${browseGradientActiveType === type ? "bg-gray-100 border-gray-200 text-gray900" : "bg-white border-white text-gray-900"} cursor-pointer transition-all`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full pt-8 pb-5 flex items-center justify-between">
          <div className="w-max flex items-center gap-2">
            {preferredColors.map(({ id, name }) => {
              const isActive = activeColors.includes(name);
              return (
                <button
                  key={id}
                  aria-label={`Filter gradients by ${name} color`}
                  aria-pressed={isActive}
                  onClick={() => handleColorToggle(name)}
                  className={`w-max px-5 rounded-full h-10 ${isActive ? "bg-gray-900 text-gray-50 border-gray-900" : "bg-white text-gray-900 border-gray-200 hover:bg-gray-900 hover:text-gray-50"} text-sm font-semibold border hover:cursor-pointer transition-all ${["Brown", "Pink"].includes(name) && "max-[1760px]:hidden"} ${["Purple", "Violet"].includes(name) && "max-[1570px]:hidden"} ${["Indigo", "Blue", "Cyan"].includes(name) && "max-2xl:hidden"} ${["Green", "Lime", "Yellow"].includes(name) && "max-xl:hidden"} ${["Orange", "Red", "Gray"].includes(name) && "max-lg:hidden"} ${["White", "Black"].includes(name) && "max-sm:hidden"}`}
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
              autoComplete="off"
              name="gradient-search"
              className="w-full h-10 rounded-full outline-none bg-white pl-11 pr-4 text-sm font-semibold placeholder:text-gray-500 caret-gray-500 border border-gray-200 focus:border-gray-300 transition-all"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <LuSearch
              size={18}
              className="text-gray-900 absolute top-3 left-4"
            />
          </div>
        </div>
      </section>
      {isLoading || isFetching ? (
        <div className="w-full h-120 grid place-content-center">
          <CircleLoader content="Loading..." />
        </div>
      ) : (
        <>
          {data?.length === 0 ? (
            <div className="w-full h-120 grid place-content-center">
              <div className="w-120 h-40 grid place-content-center bg-white rounded-xl border border-gray-100">
                <span className="text-md font-semibold text-gray-600">
                  No gradients found. Try a different search or filter.
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full px-4 pb-4">
              <VirtuosoGrid
                useWindowScroll
                totalCount={data?.length || 0}
                listClassName="grid grid-cols-4 gap-1 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
                itemContent={(index) => {
                  const gradient = data?.[index];
                  const stops = gradient?.stops || [];
                  return (
                    <article
                      key={gradient?.id || index}
                      className="p-4 w-full rounded-xl relative"
                    >
                      <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: getGradientCSS(
                            stops,
                            "Linear",
                            90,
                            { shape: "circle", x: 50, y: 50 },
                            { x: 50, y: 50 },
                          ),
                          opacity: 0.2,
                        }}
                      />
                      <div className="flex items-center justify-between relative">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {gradient?.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Button
                            variant={"secondary"}
                            size={"circle"}
                            className="border-none hover:bg-gray-50"
                          >
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
                              size={16}
                              aria-label={`Quick view ${gradient?.name} gradient`}
                            />
                          </Button>

                          <GradientMoreMenu gradient={gradient!} />
                        </div>
                      </div>
                      <div className="flex items-center mt-3 border-2 border-white rounded-lg shadow-sm">
                        <div
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
                            {stops.map((stop, index) => (
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
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                }}
              />
              <div className="max-w-lg mx-auto mt-4 text-center">
                <div className="inline-flex flex-col items-center gap-4 p-6 border border-gray-200 rounded-2xl bg-white">
                  <span className="text-4xl">😒</span>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-semibold text-gray-700">
                      Still not satisfied?
                    </p>
                    <p className="text-xs text-gray-400 font-medium max-w-50">
                      Generate gradients tailored to your brand, UI, and vision.
                    </p>
                  </div>
                  <Link
                    href="/studio/css-gradient-generator"
                    target="_blank"
                    aria-label="Open CSS Gradient Generator"
                  >
                    <Button variant="primary" size="md">
                      Generate New Gradient →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div className="w-full border-t bg-white border-gray-200">
        <FooterSection />
      </div>
      <section className="sr-only">
        <h2>
          {titleLabel
            ? `${titleLabel} CSS Gradients`
            : "Explore Free CSS Gradients"}
        </h2>

        <p>
          {titleLabel
            ? `Explore curated ${titleLabel.toLowerCase()} CSS gradients for websites, mobile applications, dashboards, SaaS products, landing pages, branding projects, and modern user interfaces.`
            : "Browse thousands of CSS gradients including linear gradients, radial gradients, and conic gradients for websites, mobile applications, dashboards, landing pages, SaaS products, branding projects, and user interfaces."}
        </p>

        <p>
          {titleLabel
            ? `Discover professional ${titleLabel.toLowerCase()} gradient color combinations and copy CSS gradient code instantly for web design, app design, design systems, marketing assets, and digital products.`
            : "Discover gradient color combinations across red, orange, yellow, green, cyan, blue, indigo, violet, purple, pink, brown, gray, black, and white color families."}
        </p>

        <p>
          {titleLabel
            ? `PalettIQ provides free access to ${titleLabel.toLowerCase()} gradients for designers, developers, startups, agencies, and creative professionals looking for modern visual inspiration.`
            : "Copy gradient colors instantly and find modern gradient inspirations for design systems, digital products, marketing assets, and creative projects. PalettIQ provides free access to curated CSS gradient collections."}
        </p>

        <p>
          {titleLabel
            ? `Browse ${titleLabel.toLowerCase()} gradient ideas for branding, ecommerce stores, fintech products, educational platforms, healthcare applications, marketing websites, and creative design workflows.`
            : "Explore free gradient collections for branding, websites, mobile apps, dashboards, presentations, social media graphics, and digital experiences."}
        </p>
      </section>
    </div>
  );
}
