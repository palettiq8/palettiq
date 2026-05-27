import { PublishedPaletteType } from "@/utils/Types";
import { LuCopy, LuEye } from "react-icons/lu";
import PaletteMoreMenu from "./PaletteMoreMenu";
import { FlashMessage } from "@/utils/utils";
import dayjs from "dayjs";
import { generatorContentHeaderItemsStyle } from "@/utils/styles/Classes";
import useModelStore from "@/libs/stores/modelStore";
import { useOtherStore } from "@/libs/stores/dataStore";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "../Button";

dayjs.extend(relativeTime);

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

  const colorsFromPalettes =
    palette?.colors?.map(({ color }: any) => color) || [];

  return (
    <article
      className={`bg-white p-4 w-full border border-gray-200 rounded-xl`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{palette?.name}</h3>
        <div className="flex items-center gap-3">
          <LuEye
            onClick={() => {
              toggleQuickViewModel();
              setQuickViewActiveTab("Formats");
              setQuickViewPalette(colorsFromPalettes);
              setQuickViewActiveColor(colorsFromPalettes[0]);
            }}
            size={17}
            aria-label={`Quick view ${palette?.name} color palette`}
            className={generatorContentHeaderItemsStyle}
          />
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
              className={`w-full ${explorePaletteView === "Vertical" ? "first:rounded-t-lg last:rounded-b-lg h-20" : "h-35 first:rounded-l-lg last:rounded-r-lg"} group relative transition-transform cursor-pointer`}
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
        <time
          dateTime={palette?.created_at?.toString()}
          className="text-sm font-semibold text-gray-900"
        >
          {dayjs(palette?.created_at).fromNow()}
        </time>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(
              `[${palette.colors.map((color) => `"${color.color}"`)}]`,
            );
            FlashMessage("success", "Copied to the clipboard!");
          }}
          aria-label={`Copy all colors from ${palette?.name} palette`}
          variant={"outline"}
          size={"md"}
        >
          <LuCopy size={16} className={generatorContentHeaderItemsStyle} />
          <span>Copy</span>
        </Button>
      </div>
    </article>
  );
}
