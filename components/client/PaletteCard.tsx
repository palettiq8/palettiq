import { PublishedPaletteType } from "@/utils/Types";
import { LuArrowUpRight, LuCopy, LuEye } from "react-icons/lu";
import PaletteMoreMenu from "./PaletteMoreMenu";
import { FlashMessage, nameToSlug } from "@/utils/utils";
import useModelStore from "@/libs/stores/modelStore";
import { useBrowseStore, useOtherStore } from "@/libs/stores/dataStore";
import { Button } from "../Button";
import Link from "next/link";

export default function PaletteCard({
  palette,
}: {
  palette: PublishedPaletteType;
}) {
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
  const explorePaletteView = useOtherStore((state) => state.explorePaletteView);
  const togglePaletteQuickVisualizerModel = useModelStore(
    (state) => state.togglePaletteQuickVisualizerModel,
  );
  const setQuickVisualizerPalette = useBrowseStore(
    (state) => state.setQuickVisualizerPalette,
  );

  const colorsFromPalettes =
    palette?.colors?.map(({ color }: any) => color) || [];

  return (
    <article
      className={`bg-white p-4 w-full border border-gray-200 rounded-xl`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{palette?.name}</h3>
        <div className="flex items-center gap-1">
          <Link
            href={`/palettes/${palette?.id}-${nameToSlug(palette?.name ?? "")}`}
          >
            <Button
              variant={"secondary"}
              size={"circle"}
              className="border-none hover:bg-gray-50"
            >
              <LuArrowUpRight
                size={16}
                aria-label={`Quick view ${palette?.name} color palette`}
              />
            </Button>
          </Link>
          <Button
            variant={"secondary"}
            size={"circle"}
            className="border-none hover:bg-gray-50"
          >
            <LuEye
              onClick={() => {
                toggleQuickViewModel();
                setQuickViewActiveTab("Formats");
                setQuickViewPalette(colorsFromPalettes);
                setQuickViewActiveColor(colorsFromPalettes[0]);
              }}
              size={16}
              aria-label={`Quick view ${palette?.name} color palette`}
            />
          </Button>

          <PaletteMoreMenu palette={palette} />
        </div>
      </div>
      <div
        className={`flex rounded-lg ${explorePaletteView === "Vertical" ? "flex-col" : "items-center"} mt-3 border-2 border-white shadow-sm`}
      >
        {palette?.colors?.map(({ color }: any, index: number) => {
          return (
            <div
              key={index}
              role="button"
              className={`w-full ${explorePaletteView === "Vertical" ? "first:rounded-t-lg last:rounded-b-lg h-30" : "h-40 max-lg:h-30 first:rounded-l-lg last:rounded-r-lg"} group relative transition-transform cursor-pointer`}
              style={{ backgroundColor: color }}
              aria-label={`Copy color ${color.toUpperCase()} from ${palette?.name} palette`}
              onClick={async () => {
                await navigator.clipboard.writeText(color.toUpperCase());
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
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-3">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            togglePaletteQuickVisualizerModel();
            setQuickVisualizerPalette(palette?.colors);
          }}
        >
          <span>Quick Visualize</span>
        </Button>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(
              `[${palette.colors.map((color) => `"${color.color}"`)}]`,
            );
            FlashMessage("success", "Copied to the clipboard!");
          }}
          aria-label={`Copy all colors from ${palette?.name} palette`}
          variant={"outline"}
          size={"sm"}
        >
          <LuCopy
            size={16}
            className="text-gray-900 hover:scale-110 cursor-pointer active:scale-90 transition-all"
          />
          <span>Copy</span>
        </Button>
      </div>
    </article>
  );
}
