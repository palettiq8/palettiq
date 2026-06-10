"use client";

import { Button } from "@/components/Button";
import FooterSection from "@/components/server/FooterSection";
import HeaderSection from "@/components/server/HeaderSection";
import { useFetchPalettesQuery } from "@/libs/features/api/apiSlice";
import { useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { preferredColors } from "@/utils/Items";
import { LuSearch, LuSettings2 } from "react-icons/lu";
import { VirtuosoGrid } from "react-virtuoso";
import PaletteCard from "@/components/client/PaletteCard";
import { useEffect, useState } from "react";
import CircleLoader from "@/components/server/CircleLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { filtersToSlug } from "@/utils/utils";
import { useBrowseStore } from "@/libs/stores/dataStore";
import { PaletteFilters } from "@/utils/Types";

type Props = {
  filters?: PaletteFilters;
  titleLabel?: string;
};

export default function ExplorePalettesPageClient({
  filters = {},
  titleLabel,
}: Props) {
  const paletteSearchQuery = useOtherStore((state) => state.paletteSearchQuery);
  const setPaletteSearchQuery = useOtherStore(
    (state) => state.setPaletteSearchQuery,
  );
  const [inputValue, setInputValue] = useState(paletteSearchQuery);
  const togglePalettesFilterModel = useModelStore(
    (state) => state.togglePalettesFilterModel,
  );
  const setOpenOnScreenPalette = useBrowseStore(
    (state) => state.setOpenOnScreenPalette,
  );
  const setViewModePalette = useBrowseStore(
    (state) => state.setViewModePalette,
  );
  const router = useRouter();

  const { data, isLoading, isFetching } = useFetchPalettesQuery({
    industries: filters.industries ?? [],
    preferred_colors: filters.preferred_colors ?? [],
    moods: filters.moods ?? [],
    brightness_level: filters.brightness_level ?? [],
    saturation_level: filters.saturation_level ?? [],
    modes: filters.modes ?? [],
    usecases: filters.usecases ?? [],
    harmonies: filters.harmonies ?? [],
    searchQuery: paletteSearchQuery,
  });

  function handleColorToggle(name: string) {
    const current = filters.preferred_colors ?? [];
    const updated = current.includes(name)
      ? current.filter((v) => v !== name)
      : [...current, name];

    const newFilters: PaletteFilters = {
      ...filters,
      preferred_colors: updated,
    };
    const slug = filtersToSlug(newFilters);

    if (slug) {
      router.replace(`/explore/palettes/${slug}`, { scroll: false });
    } else {
      router.replace("/explore/palettes", { scroll: false });
    }
  }

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaletteSearchQuery(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="w-full h-max graydotbg">
      <header className="w-full h-15 border-b border-gray-200 sticky top-0 z-30 bg-white/70 backdrop-blur-md">
        <HeaderSection />
      </header>
      <section
        className="w-full px-4 pt-10"
        aria-label="Explore color palettes"
      >
        <h1 className="text-5xl font-bold text-gray-900">
          {titleLabel
            ? `${titleLabel} Color Palettes`
            : "Explore Free Color Palettes for Designers & Developers"}
        </h1>
        <p className="text-sm font-semibold text-gray-600 mt-5">
          {titleLabel
            ? `Explore curated ${titleLabel.toLowerCase()} color palettes for branding, UI design, websites, mobile apps, dashboards, and digital products. Copy HEX, RGB, and HSL color codes instantly on PalettIQ.`
            : `Browse thousands of curated color palettes for branding, UI design, and digital products. Filter by mood, industry, color family, and style — then copy HEX, RGB, and HSL codes instantly. All free on PalettIQ.`}
        </p>
        <div className="w-full pt-8 pb-5 flex items-center justify-between">
          <div className="w-max flex items-center gap-2 max-lg:hidden">
            {preferredColors.map(({ id, name }) => {
              const isActive = (filters.preferred_colors ?? []).includes(name);
              return (
                <button
                  key={id}
                  aria-label={`Filter palettes by ${name} color`}
                  aria-pressed={isActive}
                  onClick={() => handleColorToggle(name)}
                  className={`w-max px-5 rounded-full h-10 ${isActive ? "bg-gray-900 text-gray-50 border-gray-900" : "bg-white text-gray-900 border-gray-200 hover:bg-gray-900 hover:text-gray-50"} text-sm font-semibold border hover:cursor-pointer transition-all ${["Brown", "Pink"].includes(name) && "max-[1760px]:hidden"} ${["Purple", "Violet"].includes(name) && "max-[1570px]:hidden"} ${["Indigo", "Blue", "Cyan"].includes(name) && "max-2xl:hidden"} ${["Green", "Lime", "Yellow"].includes(name) && "max-xl:hidden"} ${["Orange", "Red", "Gray"].includes(name) && "max-lg:hidden"} ${["White", "Black"].includes(name) && "max-sm:hidden"}`}
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
                value={inputValue}
                aria-label="Search color palettes by name"
                placeholder="Search color palettes by name..."
                autoComplete="off"
                name="palette-search"
                className="w-full h-10 rounded-full bg-white outline-none pl-11 pr-4 text-sm font-semibold placeholder:text-gray-500 caret-gray-500 border border-gray-200 focus:border-gray-300 transition-all"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <LuSearch
                size={18}
                aria-hidden="true"
                className="text-gray-900 absolute top-3 left-4"
              />
            </div>
            <Button
              aria-label="Filter color palettes by mood, industry, and style"
              onClick={() => togglePalettesFilterModel()}
              variant={"outline"}
              size={"md"}
            >
              <LuSettings2 size={16} />
              <span>Filters</span>
            </Button>
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
              <div className="w-120 h-40 grid place-content-center rounded-xl border bg-white border-gray-100">
                <span className="text-md font-semibold text-gray-600">
                  No color palettes found. Try a different search or filter.
                </span>
              </div>
            </div>
          ) : (
            <section className="w-full px-4 pb-4" aria-label="Palette library">
              <VirtuosoGrid
                useWindowScroll
                totalCount={data?.length || 0}
                listClassName="grid grid-cols-3 gap-1 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
                itemContent={(index) => {
                  const palette = data?.[index];
                  return <PaletteCard palette={palette!} />;
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
                      Generate palettes tailored to your brand, UI, and vision.
                    </p>
                  </div>
                  <Link
                    href="/studio"
                    target="_blank"
                    aria-label="Generate a new custom color palette"
                  >
                    <Button variant="primary" size="md">
                      Generate New Palette →
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </>
      )}
      <div className="w-full border-t bg-white border-gray-200">
        <FooterSection />
      </div>
      <section className="sr-only">
        <h2>
          {titleLabel
            ? `${titleLabel} Color Palettes`
            : "Explore Free Color Palettes"}
        </h2>

        <p>
          {titleLabel
            ? `Browse curated ${titleLabel.toLowerCase()} color palettes for branding, UI design, websites, mobile applications, dashboards, SaaS products, landing pages, and digital products.`
            : `Browse thousands of curated color palettes for branding, UI design, websites, mobile applications, dashboards, SaaS products, marketing materials, and creative projects.`}
        </p>

        <p>
          Discover professional color combinations, color harmony systems,
          balanced palettes, and modern color inspirations for designers,
          developers, product teams, and creative professionals.
        </p>

        <p>
          Copy HEX, RGB, and HSL color values instantly and use them in design
          systems, user interfaces, brand identities, mobile apps, ecommerce
          websites, marketing campaigns, and digital products.
        </p>

        <p>
          PalettIQ helps designers and developers discover modern color palettes
          for startups, SaaS products, fintech platforms, healthcare products,
          educational platforms, ecommerce stores, creative agencies, and
          technology brands.
        </p>

        {titleLabel && (
          <p>
            Explore {titleLabel.toLowerCase()} color palette ideas, inspiration,
            color combinations, and professional palette collections for modern
            branding and user interface design.
          </p>
        )}
      </section>
    </div>
  );
}
