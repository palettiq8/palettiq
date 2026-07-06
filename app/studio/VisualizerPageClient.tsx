"use client";

import { Button } from "@/components/Button";
import ColorCountMenu from "@/components/client/ColorCountMenu";
import ColorPreferencesMenu from "@/components/client/ColorPreferencesMenu";
import OpenMoreMenu from "@/components/client/OpenMoreMenu";
import StudioResponsiveMenuIcon from "@/components/client/StudioResponsiveMenuIcon";
import VisualizerColorPickerMenu from "@/components/client/VisualizerColorPickerMenu";
import VisualizerResponsiveMoreMenu from "@/components/client/VisualizerResponsiveMoreMenu";
import { useOtherStore, useVisualizerStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { visualizers } from "@/utils/Items";
import { REDOUNDOCOMMONSTYLE, CIRCLEBUTTONSTYLE } from "@/utils/styles/Classes";
import { checkIsLight } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import {
  LuCheck,
  LuCloudUpload,
  LuEye,
  LuLock,
  LuLockKeyhole,
  LuLockOpen,
  LuMaximize2,
  LuMinimize2,
  LuRedo2,
  LuShuffle,
  LuUndo2,
} from "react-icons/lu";
import SVGUploadModal from "@/components/client/SVGUploadModal";
import VisualizeSVG from "@/components/visualizers/VisualizeSVG";
import ColorHarmoniesMenu from "@/components/client/ColorHarmoniesMenu";

export default function VisualizerPageClient() {
  const [lockPanel, setLockPanel] = useState<boolean>(false);
  const [activeTemplateMaximize, setActiveTemplateMaximize] =
    useState<boolean>(false);
  const activeVisualizerMaximize = useVisualizerStore(
    (state) => state.activeVisualizerMaximize,
  );
  const setActiveVisualizerMaximize = useVisualizerStore(
    (state) => state.setActiveVisualizerMaximize,
  );
  const generatedVisualizerPalette = useVisualizerStore(
    (state) => state.generatedVisualizerPalette,
  );
  const setGeneratedVisualizerPalette = useVisualizerStore(
    (state) => state.setGeneratedVisualizerPalette,
  );
  const visualizerPaletteHistory = useVisualizerStore(
    (state) => state.visualizerPaletteHistory,
  );
  const visualizerHistoryIndex = useVisualizerStore(
    (state) => state.visualizerHistoryIndex,
  );
  const setVisualizerPaletteHistory = useVisualizerStore(
    (state) => state.setVisualizerPaletteHistory,
  );
  const toggleVisualizerPaletteHistoryModel = useModelStore(
    (state) => state.toggleVisualizerPaletteHistoryModel,
  );
  const setQuickViewActiveTab = useOtherStore(
    (state) => state.setQuickViewActiveTab,
  );
  const setQuickViewPalette = useOtherStore(
    (state) => state.setQuickViewPalette,
  );
  const toggleQuickViewModel = useModelStore(
    (state) => state.toggleQuickViewModel,
  );
  const visualizerPaletteUndoHandler = useVisualizerStore(
    (state) => state.visualizerPaletteUndoHandler,
  );
  const visualizerPaletteRedoHandler = useVisualizerStore(
    (state) => state.visualizerPaletteRedoHandler,
  );
  const visualizerPaletteColorShuffler = useVisualizerStore(
    (state) => state.visualizerPaletteColorShuffler,
  );
  const toggleVisualizerPaletteColorLock = useVisualizerStore(
    (state) => state.toggleVisualizerPaletteColorLock,
  );
  const visualizerActiveColors = useVisualizerStore(
    (state) => state.visualizerActiveColors,
  );
  const currentTemplateId = useVisualizerStore(
    (state) => state.currentTemplateId,
  );
  const setCurrentTemplateId = useVisualizerStore(
    (state) => state.setCurrentTemplateId,
  );
  const setQuickViewActiveColor = useOtherStore(
    (state) => state.setQuickViewActiveColor,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);

  const svgUploadModel = useModelStore((state) => state.svgUploadModel);
  const toggleSVGUploadModel = useModelStore(
    (state) => state.toggleSVGUploadModel,
  );

  const paletteGeneratorHandler = useCallback(() => {
    setGeneratedVisualizerPalette();
    setVisualizerPaletteHistory();
  }, [setGeneratedVisualizerPalette]);

  const lockUnlockHandler = useCallback(
    (index: number) => {
      toggleVisualizerPaletteColorLock(index);
    },
    [toggleVisualizerPaletteColorLock],
  );

  const undoHandler = useCallback(() => {
    visualizerPaletteUndoHandler();
  }, []);

  const redoHandler = useCallback(() => {
    visualizerPaletteRedoHandler();
  }, []);

  useEffect(() => {
    const currentPalette =
      useVisualizerStore.getState().generatedVisualizerPalette;
    const currentHistory =
      useVisualizerStore.getState().visualizerPaletteHistory;

    if (!currentPalette || currentPalette.length === 0) {
      paletteGeneratorHandler();
    } else if (currentHistory.length === 0) {
      setVisualizerPaletteHistory(currentPalette);
    }
  }, [paletteGeneratorHandler, setVisualizerPaletteHistory]);

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
        setActiveVisualizerMaximize(false);
      }
      if (key === "h") {
        e.preventDefault();
        toggleVisualizerPaletteHistoryModel();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        paletteGeneratorHandler();
      }

      if (key === "arrowleft") {
        undoHandler();
      }
      if (key === "arrowright") {
        redoHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleVisualizerPaletteHistoryModel, paletteGeneratorHandler]);

  const ActiveVisualizer = visualizers[currentTemplateId];

  const uploadedSVGString = useVisualizerStore((s) => s.uploadedSVGString);

  useEffect(() => {
    const activeTemplateId = useVisualizerStore.getState().currentTemplateId;
    if (uploadedSVGString) {
      setCurrentTemplateId(0);
    } else {
      if (activeTemplateId !== 0) {
        setCurrentTemplateId(activeTemplateId);
      } else {
        setCurrentTemplateId(1);
      }
    }
  }, [uploadedSVGString]);

  useEffect(() => {
    const shouldOpen = localStorage.getItem("open-svg-upload-modal");

    if (shouldOpen === "true") {
      toggleSVGUploadModel(true);
      localStorage.removeItem("open-svg-upload-modal");
    }
  }, []);

  function selectTemplate(index: number) {
    setCurrentTemplateId(index);
  }

  return (
    <>
      <div className="w-full h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl">
        <div className="w-full h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="hidden max-[1400px]:block">
              <StudioResponsiveMenuIcon />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Color Palette Visualizer
              <span className="max-[1400px]:hidden"> ~ </span>
              <span className="text-sm font-medium text-gray-800 max-[1400px]:hidden">
                Right-click on templates to open!
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              aria-label="Export color palette as HEX, RGB, CSS, Tailwind CSS, SCSS, or JSON"
              onClick={() => {
                toggleExportModel();
                setExportFrom("Palette");
                setExportPalette(
                  generatedVisualizerPalette.map((palette) => palette.color),
                );
              }}
              variant={"outline"}
              size={"md"}
              className="max-[1560px]:hidden"
            >
              <BiExport size={16} />
              <span>Export</span>
            </Button>
            <Button
              aria-label="Upload your own SVG to visualize with the current palette"
              variant={"outline"}
              size={"md"}
              onClick={() => toggleSVGUploadModel()}
              className="max-lg:hidden"
            >
              <LuCloudUpload size={16} />
              <span>Upload SVG</span>
            </Button>
            <Button
              aria-label="Generate random color palette for UI visualization"
              variant={"primary"}
              size={"md"}
              onClick={paletteGeneratorHandler}
              className="max-lg:hidden"
            >
              Random Palette
            </Button>
            <div className="hidden max-[1560px]:block">
              <VisualizerResponsiveMoreMenu />
            </div>
          </div>
        </div>
        <div
          className={`w-full bg-white flex h-[calc(100%-128px)] max-lg:h-[calc(100%-328px)]`}
        >
          <div
            className={`w-3/4 h-full graydotbg z-30 ${activeVisualizerMaximize && "w-full h-screen absolute top-0 left-0"} ${activeTemplateMaximize && "hidden"} max-lg:w-full`}
          >
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="relative h-full w-full p-4">
                {ActiveVisualizer && (
                  <ActiveVisualizer palette={generatedVisualizerPalette} />
                )}
              </div>
              <Button
                aria-label={`${activeVisualizerMaximize ? "Minimize" : "Maximize"} palette visualizer`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveVisualizerMaximize();
                }}
                variant={"outline"}
                size={"circle"}
                className="absolute top-4 left-4"
              >
                {activeVisualizerMaximize ? (
                  <LuMinimize2 size={16} aria-hidden="true" />
                ) : (
                  <LuMaximize2 size={16} aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
          <div
            className={`w-1/4 h-full border-l border-gray-200 p-4 overflow-y-auto noscrollbar ${activeTemplateMaximize && "w-full border-none graydotbg"} max-lg:hidden`}
          >
            <div className="w-full flex items-center justify-between">
              <h3 className="text-md font-semibold text-gray-900">
                UI Templates
              </h3>
              <Button
                aria-label={`${activeTemplateMaximize ? "Minimize" : "Maximize"} template panel`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTemplateMaximize((prev) => !prev);
                }}
                variant={"outline"}
                size={"circle"}
              >
                {activeTemplateMaximize ? (
                  <LuMinimize2 size={16} />
                ) : (
                  <LuMaximize2 size={16} />
                )}
              </Button>
            </div>
            <div
              className={`w-full mt-3 grid grid-cols-1 gap-1 ${activeTemplateMaximize && "grid-cols-3"}`}
            >
              {visualizers.map((Component, index) => {
                if (!uploadedSVGString && Component === VisualizeSVG)
                  return null;
                return (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Preview color palette on UI template ${index + 1}`}
                    key={index}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      selectTemplate(index);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectTemplate(index);
                      }
                    }}
                    className={`${activeTemplateMaximize ? "bg-white" : "bg-gray-100"} border border-gray-200 p-3 flex items-center justify-center rounded-lg`}
                  >
                    <Component palette={generatedVisualizerPalette} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full h-16 max-lg:h-66 border-t border-gray-200 px-4 bg-white rounded-b-xl flex items-center justify-between gap-2 max-lg:flex-col max-lg:justify-center">
          <div className="max-lg:w-full flex items-center max-lg:flex-col-reverse gap-2">
            <ColorPreferencesMenu from="Visualizer" />
            <ColorHarmoniesMenu from="Visualizer" />
            <div className="max-[1560px]:hidden">
              <OpenMoreMenu from="Visualizer" />
            </div>
          </div>
          <div className="max-lg:w-full flex items-center gap-2 max-lg:flex-col">
            <button
              aria-label="Quick view color palette formats"
              onClick={() => {
                toggleQuickViewModel();
                setQuickViewActiveTab("Formats");
                const data = generatedVisualizerPalette.map(
                  (palette) => palette.color,
                );
                setQuickViewPalette(data);
                setQuickViewActiveColor(data[0]);
              }}
              className={`${CIRCLEBUTTONSTYLE} max-[1560px]:hidden`}
            >
              <LuEye size={16} aria-hidden="true" />
            </button>
            <button
              aria-label="Shuffle visualizer palette colors"
              onClick={() => visualizerPaletteColorShuffler()}
              className={`${CIRCLEBUTTONSTYLE} max-[1560px]:hidden`}
            >
              <LuShuffle size={16} aria-hidden="true" />
            </button>
            <div className="max-lg:w-full flex items-center gap-2">
              <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
                <Button
                  aria-label="Undo palette change"
                  disabled={!(visualizerHistoryIndex > 0)}
                  onClick={undoHandler}
                  className={REDOUNDOCOMMONSTYLE}
                  variant={"text"}
                  size={"p0"}
                >
                  <LuUndo2 size={16} aria-hidden="true" />
                </Button>
                <span className="w-px h-4 bg-gray-200"></span>
                <Button
                  aria-label="Redo palette change"
                  disabled={
                    !(
                      visualizerHistoryIndex <
                      visualizerPaletteHistory.length - 1
                    )
                  }
                  onClick={redoHandler}
                  className={REDOUNDOCOMMONSTYLE}
                  variant={"text"}
                  size={"p0"}
                >
                  <LuRedo2 size={16} aria-hidden="true" />
                </Button>
              </div>
              <ColorCountMenu from="Visualizer" />
            </div>
            <div className="max-lg:w-full flex items-center gap-2">
              <div className="w-72 max-lg:w-full flex relative">
                {generatedVisualizerPalette.map((_, index) => {
                  const isLight = checkIsLight(_.color);
                  const isFirst = index === 0;
                  const isLast =
                    index === generatedVisualizerPalette.length - 1;
                  return (
                    <div
                      key={index}
                      role="button"
                      aria-label={`Select color ${_.color.toUpperCase()} in visualizer palette`}
                      className={`w-full h-10 cursor-pointer relative grid place-content-center
                      ${isFirst ? "rounded-l-full" : ""}
                      ${isLast ? "rounded-r-full" : ""}
                    `}
                      style={{ backgroundColor: _.color }}
                    >
                      <div className="w-full h-full absolute top-0 left-0">
                        <VisualizerColorPickerMenu
                          index={index}
                          color={_.color}
                        />
                      </div>
                      {visualizerActiveColors.includes(
                        _.color.toUpperCase(),
                      ) && (
                        <LuCheck
                          className={`${isLight ? "text-gray-900" : "text-gray-50"}`}
                          size={16}
                        />
                      )}
                    </div>
                  );
                })}
                <div
                  className={`w-full h-10 flex absolute bottom-11 left-0 
              transition-all duration-300 ease-in-out z-50
              ${
                lockPanel
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none"
              }
              `}
                >
                  {generatedVisualizerPalette.map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full group cursor-pointer relative grid place-content-center h-10 first:rounded-l-full last:rounded-r-full overflow-hidden"
                        onClick={() => lockUnlockHandler(index)}
                      >
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: _.color, opacity: 0.7 }}
                        />
                        <button
                          aria-label={`${_.isLocked ? "Unlock" : "Lock"} color ${_.color.toUpperCase()} in palette`}
                          className={`relative z-10 text-xs text-gray-900 cursor-pointer invisible ${_.isLocked ? "visible" : "group-hover:visible"}`}
                        >
                          {_.isLocked ? (
                            <LuLock size={14} aria-hidden="true" />
                          ) : (
                            <LuLockOpen size={14} aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button
                aria-label={`${lockPanel ? "Hide" : "Show"} color lock panel`}
                onClick={() => setLockPanel((prev) => !prev)}
                className={`${CIRCLEBUTTONSTYLE} shrink-0`}
              >
                <LuLockKeyhole size={16} aria-hidden="true" />
              </button>
            </div>
            <Button
              variant={"primary"}
              size={"md"}
              className="hidden max-lg:block w-full"
              aria-label="Generate random color palette for UI visualization"
              onClick={paletteGeneratorHandler}
            >
              Random Palette
            </Button>
          </div>
        </div>
      </div>
      <section className="sr-only">
        <h2>SVG Color Palette Visualizer</h2>

        <p>
          Upload your own SVG files and instantly preview color palettes on
          illustrations, logos, icons, graphics, and vector artwork.
        </p>

        <p>
          Test color combinations before applying them to websites, mobile apps,
          dashboards, design systems, branding projects, and marketing
          materials.
        </p>

        <p>
          The PalettIQ Color Palette Visualizer helps designers and developers
          evaluate how colors work together in real user interface components
          and custom SVG graphics.
        </p>

        <p>
          Preview palettes on buttons, cards, forms, navigation bars,
          dashboards, layouts, logos, and uploaded SVG designs to make better
          color decisions.
        </p>
      </section>

      <SVGUploadModal
        isOpen={svgUploadModel}
        onClose={() => toggleSVGUploadModel()}
      />
    </>
  );
}
