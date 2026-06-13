import { useGeneratorStore, useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import TransparentButton from "./TransparentButton";
import GeneratorColorPickerMenu from "./GeneratorColorPickerMenu";
import useUiStore from "@/libs/stores/uiStore";
import { colord } from "colord";
import { useCallback } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LuCopy, LuMove } from "react-icons/lu";
import { FlashMessage } from "@/utils/utils";

export default function SortablePaletteItem({
  index,
  color,
  isLocked,
  isFirst,
  isLast,
}: {
  index: number;
  color: string;
  isLocked: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const generatedPalette = useGeneratorStore((state) => state.generatedPalette);
  const setQuickViewActiveColor = useOtherStore(
    (state) => state.setQuickViewActiveColor,
  );
  const generatorMaximize = useUiStore((state) => state.generatorMaximize);
  const setQuickViewPalette = useOtherStore(
    (state) => state.setQuickViewPalette,
  );
  const toggleQuickViewModel = useModelStore(
    (state) => state.toggleQuickViewModel,
  );
  const togglePaletteColorLock = useGeneratorStore(
    (state) => state.togglePaletteColorLock,
  );
  const isHorizontalPalette = useUiStore((state) => state.isHorizontalPalette);

  const isLight = colord(color).isLight();

  const lockUnlockHandler = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      togglePaletteColorLock(index);
    },
    [togglePaletteColorLock],
  );
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index.toString() });
  const style: React.CSSProperties = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    backgroundColor: color,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      key={index}
      className={`w-full h-full rounded-xl p-4 flex group hover:cursor-pointer group flex-col justify-end ${isFirst && !generatorMaximize && "max-lg:first:rounded-l-lg"} ${isLast && !generatorMaximize && "max-lg:last:rounded-r-lg"}`}
      style={style}
      onClick={() => {
        toggleQuickViewModel();
        const data = generatedPalette.map((palette) => palette.color);
        setQuickViewPalette(data);
        setQuickViewActiveColor(color);
      }}
    >
      <div
        className={`flex ${isHorizontalPalette ? "flex" : "flex-col"} items-start gap-2 max-lg:hidden`}
      >
        <div
          className={`invisible ${isLocked ? "visible" : "group-hover:visible"}`}
        >
          <TransparentButton
            content={isLocked ? "🔒" : "🔓"}
            parentBg={color}
            handler={(e) => lockUnlockHandler(e, index)}
          />
        </div>
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await navigator.clipboard.writeText(color.toUpperCase());
            FlashMessage("success", "Copied to the clipboard!");
          }}
          className={`h-10 w-10 cursor-pointer active:scale-90 transition-all rounded-full grid place-content-center ${isLight ? "bg-black/10 text-gray-900" : "bg-gray-50/10 text-gray-50"}`}
        >
          <LuCopy size={16} />
        </button>
        <button
          {...listeners}
          className={`h-10 w-10 cursor-pointer active:scale-90 transition-all rounded-full grid place-content-center ${isLight ? "bg-black/10 text-gray-900" : "bg-gray-50/10 text-gray-50"}`}
        >
          <LuMove size={18} />
        </button>
        <GeneratorColorPickerMenu
          index={index}
          color={color}
          isLightStyle={isLight}
        />
      </div>
    </div>
  );
}
