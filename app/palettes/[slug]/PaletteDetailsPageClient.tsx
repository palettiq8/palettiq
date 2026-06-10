"use client";

import {
  useFetchPaletteByIdQuery,
  useFetchSimilarPalettesQuery,
} from "@/libs/features/api/apiSlice";
import CircleLoader from "@/components/server/CircleLoader";
import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import { preferredColors } from "@/utils/Items";
import { FlashMessage } from "@/utils/utils";
import Link from "next/link";
import { Button } from "@/components/Button";
import { BiExport } from "react-icons/bi";
import useModelStore from "@/libs/stores/modelStore";
import { useOtherStore } from "@/libs/stores/dataStore";
import { LuCopy, LuEye } from "react-icons/lu";
import PaletteDetailsMenu from "@/components/client/PaletteDetailsMenu";
import { useState } from "react";
import PaletteCard from "@/components/client/PaletteCard";

const TagSection = ({
  title,
  items,
  renderItem,
}: {
  title: string;
  items: string[] | undefined;
  renderItem?: (item: string, i: number) => React.ReactNode;
}) => {
  if (!items?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h2 className="text-xs font-semibold text-gray-500 mb-3">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) =>
          renderItem ? (
            renderItem(item, i)
          ) : (
            <span
              key={i}
              className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-gray-900"
            >
              {item.replace(/_/g, " ")}
            </span>
          ),
        )}
      </div>
    </div>
  );
};

type Props = {
  id: number;
};

export default function PaletteDetailsPageClient({ id }: Props) {
  const [similarWith, setSimilarWith] = useState("Similar with Harmonies");
  const { data, isLoading, isFetching } = useFetchPaletteByIdQuery(
    { id },
    { skip: !id },
  );

  const similarFieldMap: Record<string, { field: string; values: string[] }> = {
    "Similar with Preferred Colors": {
      field: "preferred_colors",
      values: data?.preferred_colors ?? [],
    },
    "Similar with Saturation Level": {
      field: "saturation_level",
      values: data?.saturation_level ?? [],
    },
    "Similar with Brightness Level": {
      field: "brightness_level",
      values: data?.brightness_level ?? [],
    },
    "Similar with Moods/Emotions": {
      field: "moods",
      values: data?.moods ?? [],
    },
    "Similar with Harmonies": {
      field: "harmonies",
      values: data?.harmonies ?? [],
    },
    "Similar with Modes": {
      field: "modes",
      values: data?.modes ?? [],
    },
    "Similar with Industries": {
      field: "industries",
      values: data?.industries ?? [],
    },
    "Similar with Use Cases": {
      field: "usecases",
      values: data?.usecases ?? [],
    },
  };

  const activeField = similarFieldMap[similarWith];

  const {
    data: similarData,
    isLoading: similarLoading,
    isFetching: similarFetching,
  } = useFetchSimilarPalettesQuery(
    {
      field: activeField?.field ?? "preferred_colors",
      values: activeField?.values ?? [],
      excludeId: id,
    },
    { skip: !data || !activeField?.values?.length },
  );

  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
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

  return (
    <CommonHeaderFooterSection>
      <div className="w-full h-max max-w-350 mx-auto py-20 max-2xl:px-4 max-sm:py-10">
        {isLoading || isFetching ? (
          <div className="w-full h-120 grid place-content-center">
            <CircleLoader content="Loading..." />
          </div>
        ) : (
          <>
            {!data ? (
              <div className="w-full h-120 grid place-content-center">
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="text-5xl">🎨</span>
                  <div className="flex flex-col items-center gap-1">
                    <h2 className="text-xl font-bold text-gray-900">
                      Palette not found
                    </h2>
                    <p className="text-sm font-medium text-gray-500 max-w-72">
                      This palette may have been removed or the link is
                      incorrect.
                    </p>
                  </div>
                  <Link href="/explore/palettes">
                    <Button variant="outline" size="md">
                      Browse all palettes →
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <section className="w-full flex flex-col gap-4">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {data.name}
                    </h1>
                    <div className="flex items-center gap-4">
                      <LuEye
                        role="button"
                        aria-label="Quick view color palette"
                        onClick={() => {
                          const colorsFromPalettes =
                            data?.colors?.map(({ color }: any) => color) || [];
                          toggleQuickViewModel();
                          setQuickViewActiveTab("Formats");
                          setQuickViewPalette(colorsFromPalettes);
                          setQuickViewActiveColor(colorsFromPalettes[0]);
                        }}
                        size={17}
                        className={`text-gray-900 hover:scale-110 cursor-pointer active:scale-90 transition-all max-lg:hidden`}
                      />
                      <div className="flex items-center gap-2">
                        <Button
                          aria-label={`Copy all colors from ${data?.name} palette`}
                          onClick={async () => {
                            await navigator.clipboard.writeText(
                              `[${data?.colors?.map((color) => `"${color.color}"`)}]`,
                            );
                            FlashMessage("success", "Copied to the clipboard!");
                          }}
                          variant={"outline"}
                          size={"md"}
                          className="max-lg:hidden"
                        >
                          <LuCopy size={16} />
                          <span>Copy Array</span>
                        </Button>
                        <Button
                          aria-label="Export color palette as HEX, RGB, CSS, Tailwind CSS, SCSS, or JSON"
                          variant={"outline"}
                          size={"md"}
                          onClick={() => {
                            toggleExportModel();
                            setExportFrom("Palette");
                            setExportPalette(
                              data?.colors?.map((palette) => palette.color),
                            );
                          }}
                          className="max-lg:hidden"
                        >
                          <BiExport size={16} />
                          <span>Export</span>
                        </Button>
                        <PaletteDetailsMenu palette={data} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-60 max-md:h-40 max-sm:h-30 flex rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    {data.colors?.map(({ id, color }) => (
                      <div
                        key={id}
                        className="w-full h-full group relative cursor-pointer transition-all"
                        style={{ backgroundColor: color }}
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            color.toUpperCase(),
                          );
                          FlashMessage("success", "Copied to the clipboard!");
                        }}
                      >
                        <div className="absolute top-5 left-1/2">
                          <div className="relative -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-gray-50 text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap z-10">
                            <span className="text-xs font-medium text-gray-50">
                              {color.toUpperCase()}
                            </span>
                            <div className="w-2 h-2 top-6 left-1/2 absolute rotate-45 bg-gray-900"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {data.description && (
                  <div className="w-full bg-white border border-gray-200 rounded-2xl p-6">
                    <h2 className="text-xs font-semibold text-gray-500 mb-2">
                      Description
                    </h2>
                    <p className="text-sm font-medium text-gray-900 leading-relaxed">
                      {data.description}
                    </p>
                  </div>
                )}
                <div className="w-full grid grid-cols-3 gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1">
                  <TagSection
                    title="Preferred Colors"
                    items={data.preferred_colors}
                    renderItem={(color, i) => {
                      const hex = preferredColors.find(
                        (c) => c.name === color,
                      )?.hex;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-2 py-1 bg-gray-50 border border-gray-200 rounded-full"
                        >
                          {hex && (
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: hex }}
                            />
                          )}
                          <span className="text-sm font-semibold text-gray-900">
                            {color}
                          </span>
                        </div>
                      );
                    }}
                  />
                  <TagSection title="Moods" items={data.moods} />
                  <TagSection title="Industries" items={data.industries} />
                  <TagSection title="Use Cases" items={data.usecases} />
                  <TagSection title="Modes" items={data.modes} />
                  <TagSection title="Harmonies" items={data.harmonies} />
                  <TagSection
                    title="Brightness"
                    items={data.brightness_level}
                  />
                  <TagSection
                    title="Saturation"
                    items={data.saturation_level}
                  />
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mt-10">
                  Explore Similar
                </h1>
                <div className="w-full flex flex-wrap items-center gap-1">
                  {[
                    "Similar with Preferred Colors",
                    "Similar with Saturation Level",
                    "Similar with Brightness Level",
                    "Similar with Moods/Emotions",
                    "Similar with Harmonies",
                    "Similar with Modes",
                    "Similar with Industries",
                    "Similar with Use Cases",
                  ].map((_, index) => {
                    return (
                      <button
                        key={index}
                        className={`text-sm font-semibold ${similarWith === _ ? "bg-gray-900 text-gray-50 border-gray-900" : "text-gray-900 bg-white border-gray-200"} h-10 px-4 rounded-full border cursor-pointer transition-all active:scale-95`}
                        onClick={() => setSimilarWith(_)}
                      >
                        {_}
                      </button>
                    );
                  })}
                </div>
                {similarLoading || similarFetching ? (
                  <div className="w-full h-40 grid place-content-center">
                    <CircleLoader content="Loading similar palettes..." />
                  </div>
                ) : !similarData?.length ? (
                  <div className="w-full h-40 grid place-content-center">
                    <p className="text-sm font-semibold text-gray-500">
                      No similar palettes found.
                    </p>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-3 gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1">
                    {similarData.map((palette) => (
                      <PaletteCard key={palette.id} palette={palette} />
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </CommonHeaderFooterSection>
  );
}
