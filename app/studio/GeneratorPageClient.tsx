"use client";

import { Button } from "@/components/Button";
import ColorCountMenu from "@/components/client/ColorCountMenu";
import ColorPreferencesMenu from "@/components/client/ColorPreferencesMenu";
import { BiExport } from "react-icons/bi";
import { LuArrowLeft, LuBanknote, LuRedo2, LuUndo2 } from "react-icons/lu";
import GeneratorContentHeaderIconItems from "@/components/client/GeneratorContentHeaderIconItems";
import { Suspense, useCallback, useEffect } from "react";
import useUiStore from "@/libs/stores/uiStore";
import { useGeneratorStore, useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { REDOUNDOCOMMONSTYLE } from "@/utils/styles/Classes";
import SortablePaletteItem from "@/components/client/SortablePaletteItem";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { PaletteColor } from "@/utils/Types";
import { useSearchParams } from "next/navigation";
import CircleLoader from "@/components/server/CircleLoader";
import StudioResponsiveMenuIcon from "@/components/client/StudioResponsiveMenuIcon";
import PaletteStylesMenu from "@/components/client/PaletteStylesMenu";
import { useIsAdmin } from "@/hooks/useIsAdmin";

function StudioPage() {
  const generatorMaximize = useUiStore((state) => state.generatorMaximize);
  const toggleGeneratorMaximize = useUiStore(
    (state) => state.toggleGeneratorMaximize,
  );
  const setGeneratedPalette = useGeneratorStore(
    (state) => state.setGeneratedPalette,
  );
  const generatedPalette = useGeneratorStore((state) => state.generatedPalette);
  const paletteHistory = useGeneratorStore((state) => state.paletteHistory);
  const setPaletteHistory = useGeneratorStore(
    (state) => state.setPaletteHistory,
  );
  const togglePaletteHistoryModel = useModelStore(
    (state) => state.togglePaletteHistoryModel,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const generatorPaletteUndoHandler = useGeneratorStore(
    (state) => state.generatorPaletteUndoHandler,
  );
  const generatorPaletteRedoHandler = useGeneratorStore(
    (state) => state.generatorPaletteRedoHandler,
  );
  const toggleAddToCommunityModel = useModelStore(
    (state) => state.toggleAddToCommunityModel,
  );
  const historyIndex = useGeneratorStore((state) => state.historyIndex);
  const isHorizontalPalette = useUiStore((state) => state.isHorizontalPalette);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
  const setAddToCommunityPalette = useOtherStore(
    (state) => state.setAddToCommunityPalette,
  );
  const toggleHslControlPanelModel = useModelStore(
    (state) => state.toggleHslControlPanelModel,
  );
  const togglePickedPalettesForPublishedModel = useModelStore(
    (state) => state.togglePickedPalettesForPublishedModel,
  );

  const paletteGeneratorHandler = useCallback(() => {
    setGeneratedPalette();
    setPaletteHistory();
  }, [setGeneratedPalette]);

  const undoHandler = useCallback(() => {
    generatorPaletteUndoHandler();
  }, []);

  const redoHandler = useCallback(() => {
    generatorPaletteRedoHandler();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      const key = e.key.toLowerCase();
      if (key === "escape") {
        e.preventDefault();
        toggleGeneratorMaximize(false);
      }
      if (key === "h") {
        e.preventDefault();
        togglePaletteHistoryModel();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        paletteGeneratorHandler();
      }
      if (key === "arrowleft") {
        e.preventDefault();
        undoHandler();
      }
      if (key === "arrowright") {
        e.preventDefault();
        redoHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    toggleGeneratorMaximize,
    togglePaletteHistoryModel,
    paletteGeneratorHandler,
  ]);

  useEffect(() => {
    const currentPalette = useGeneratorStore.getState().generatedPalette;
    const currentHistory = useGeneratorStore.getState().paletteHistory;

    if (!currentPalette || currentPalette.length === 0) {
      paletteGeneratorHandler();
    } else if (currentHistory.length === 0) {
      setPaletteHistory(currentPalette);
    }
  }, [paletteGeneratorHandler, setPaletteHistory]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = generatedPalette.findIndex(
        (_, index) => index.toString() === active.id,
      );
      const newIndex = generatedPalette.findIndex(
        (_, index) => index.toString() === over.id,
      );
      const newArray = arrayMove(generatedPalette, oldIndex, newIndex);

      setGeneratedPalette(newArray);
      setPaletteHistory(newArray);
    }
  };

  const searchParams = useSearchParams();
  const colorsParam = searchParams.get("colors");
  const getColorsFromURL = (): PaletteColor[] => {
    if (!colorsParam) return [];

    return decodeURIComponent(colorsParam)
      .split(",")
      .map((item, i) => ({
        id: `${i + 1}`,
        color: item,
        isLocked: false,
      }));
  };

  useEffect(() => {
    if (colorsParam !== null) setGeneratedPalette(getColorsFromURL());
  }, []);

  return (
    <>
      <div className="w-full h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl">
        <div className="w-full h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="hidden max-[1400px]:block">
              <StudioResponsiveMenuIcon />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Color Palette Generator{" "}
              <span className="max-[1400px]:hidden">~ </span>
              <span className="text-sm font-medium text-gray-800 max-[1400px]:hidden">
                Press Enter to generate!
              </span>
            </h1>
          </div>
          <div className="bg-gray-100 border border-gray-200 max-lg:bg-white max-lg:border-white px-0.5 h-10 rounded-full flex items-center gap-2 max-lg:px-0">
            <GeneratorContentHeaderIconItems />
          </div>
          <div className="flex items-center gap-3 max-lg:hidden">
            {useIsAdmin() && (
              <Button
                onClick={() => togglePickedPalettesForPublishedModel()}
                variant={"outline"}
                size={"md"}
              >
                Picked Palettes
              </Button>
            )}
            <Button
              aria-label="Export color palette as HEX, RGB, CSS, Tailwind CSS, SCSS, or JSON"
              onClick={() => {
                toggleExportModel();
                setExportFrom("Palette");
                setExportPalette(
                  generatedPalette.map((palette) => palette.color),
                );
              }}
              variant={"outline"}
              size={"md"}
            >
              <BiExport size={16} />
              <span>Export</span>
            </Button>
            <Button
              aria-label="Add color palette to PalettIQ community"
              onClick={() => {
                toggleAddToCommunityModel();
                setAddToCommunityPalette(generatedPalette);
              }}
              variant={"outline"}
              size={"md"}
            >
              Add to Community
            </Button>
          </div>
        </div>
        <div
          className={`w-full p-30 graydotbg ${
            generatorMaximize
              ? "absolute top-0 left-0 w-full h-screen z-50"
              : "h-[calc(100%-128px)] max-lg:h-[calc(100%-272px)] max-lg:p-4"
          }`}
        >
          <DndContext
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={generatedPalette.map((_, index) => index.toString())}
              strategy={rectSortingStrategy}
            >
              <div
                className={`w-full h-full ${!generatorMaximize && "max-lg:h-70 max-md:h-50 max-sm:h-35"} flex gap-1 ${isHorizontalPalette && "flex-col"} ${generatorMaximize && "max-lg:flex-col"} relative`}
              >
                {generatedPalette.map(({ id, color, isLocked }, index) => (
                  <SortablePaletteItem
                    key={id}
                    index={index}
                    color={color}
                    isLocked={isLocked}
                    isFirst={index === 0}
                    isLast={index === generatedPalette.length - 1}
                  />
                ))}
                {generatorMaximize && (
                  <Button
                    onClick={() => toggleGeneratorMaximize()}
                    variant={"outline"}
                    size={"circle"}
                    className="absolute top-4 left-4"
                  >
                    <LuArrowLeft size={16} />
                  </Button>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="w-full px-4 bg-white rounded-b-xl h-16 max-lg:h-52 border-t border-gray-200 flex max-lg:flex-col gap-2 items-center justify-between max-lg:justify-center ">
          <div className="max-lg:w-full flex items-center gap-3 max-lg:flex-col-reverse">
            <ColorPreferencesMenu from="Studio" />
            <ColorCountMenu from="Generator" />
            <PaletteStylesMenu from="Generator" />
            <button
              aria-label="Open HSL Control Panel to adjust hue, saturation, and lightness"
              onClick={() => toggleHslControlPanelModel()}
              className="h-10 px-4 font-semibold text-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center select-none text-gray-50 rounded-full gap-2 bg-radial-[at_25%_25%] from-indigo-300 to-indigo-600 to-75% max-lg:hidden"
            >
              <LuBanknote size={16} />
              <span>HSL Control Panel</span>
            </button>
          </div>
          <div className="max-lg:w-full flex items-center gap-3">
            <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
              <Button
                aria-label="Undo last palette change"
                disabled={!(historyIndex > 0)}
                onClick={undoHandler}
                className={REDOUNDOCOMMONSTYLE}
                variant={"text"}
                size={"p0"}
              >
                <LuUndo2 size={16} aria-hidden="true" />
              </Button>
              <span className="w-px h-4 bg-gray-200"></span>
              <Button
                aria-label="Redo last palette change"
                disabled={!(historyIndex < paletteHistory.length - 1)}
                onClick={redoHandler}
                className={REDOUNDOCOMMONSTYLE}
                variant={"text"}
                size={"p0"}
              >
                <LuRedo2 size={16} aria-hidden="true" />
              </Button>
            </div>
            <Button
              aria-label="Generate personalized color palette"
              onClick={paletteGeneratorHandler}
              variant={"primary"}
              size={"md"}
              className="max-lg:w-full"
            >
              Generate Palette
            </Button>
          </div>
        </div>
      </div>
      <section className="sr-only">
        <h2>Generate Personalized Color Palettes</h2>

        <p>
          Generate personalized color palettes from selected colors, color
          families, moods, industries, and styles.
        </p>

        <p>
          Customize hue, saturation, and lightness, lock colors, reorder palette
          colors, and export palettes in HEX, RGB, CSS, Tailwind CSS, SCSS, and
          other formats.
        </p>
      </section>
    </>
  );
}

export default function GeneratorPageClient() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full grid place-content-center">
          <CircleLoader content="Loading..." />
        </div>
      }
    >
      <StudioPage />
    </Suspense>
  );
}
