"use client";

import { Button } from "@/components/Button";
import ColorCountMenu from "@/components/client/ColorCountMenu";
import ColorPreferencesMenu from "@/components/client/ColorPreferencesMenu";
import OpenMoreMenu from "@/components/client/OpenMoreMenu";
import VisualizerColorPickerMenu from "@/components/client/VisualizerColorPickerMenu";
import Visualize1 from "@/components/visualizers/Visualize1";
import Visualize2 from "@/components/visualizers/Visualize2";
import Visualize3 from "@/components/visualizers/Visualize3";
import Visualize4 from "@/components/visualizers/Visualize4";
import Visualize5 from "@/components/visualizers/Visualize5";
import Visualize6 from "@/components/visualizers/Visualize6";
import { useOtherStore, useVisualizerStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { REDOUNDOCOMMONSTYLE, CIRCLEBUTTONSTYLE } from "@/utils/styles/Classes";
import { checkIsLight } from "@/utils/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiExport } from "react-icons/bi";
import {
  LuCheck,
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

export default function page() {
  const [lockPanel, setLockPanel] = useState<boolean>(false);
  const [activeVisualizerMaximize, setActiveVisualizerMaximize] =
    useState(false);
  const [activeTemplateMaximize, setActiveTemplateMaximize] =
    useState<boolean>(false);
  const updateSource = useRef<"generate" | "lock/unlock" | "redo/undo" | null>(
    null,
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
  const visualizerActiveColor = useVisualizerStore(
    (state) => state.visualizerActiveColor,
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

  useEffect(() => {
    console.log(visualizerHistoryIndex);
  }, [visualizerHistoryIndex]);

  const paletteGeneratorHandler = useCallback(() => {
    updateSource.current = "generate";
    setGeneratedVisualizerPalette();
    setVisualizerPaletteHistory();
  }, [setGeneratedVisualizerPalette]);

  const lockUnlockHandler = useCallback(
    (index: number) => {
      updateSource.current = "lock/unlock";
      toggleVisualizerPaletteColorLock(index);
    },
    [toggleVisualizerPaletteColorLock],
  );

  const undoHandler = useCallback(() => {
    updateSource.current = "redo/undo";
    visualizerPaletteUndoHandler();
  }, []);

  const redoHandler = useCallback(() => {
    updateSource.current = "redo/undo";
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

  const visualizers = [
    Visualize6,
    Visualize4,
    Visualize1,
    Visualize2,
    Visualize5,
    Visualize3,
  ];
  const ActiveVisualizer = visualizers[currentTemplateId];

  return (
    <div className="w-full h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl">
      <div className="w-full h-16 border-b border-gray-200 px-4 bg-white rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            Visualizer ~{" "}
          </h2>
          <span className="text-sm font-medium text-gray-800">
            Right-click on templates to open!
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                toggleExportModel();
                setExportFrom("Palette");
                setExportPalette(
                  generatedVisualizerPalette.map((palette) => palette.color),
                );
              }}
              variant={"outline"}
              size={"md"}
            >
              <BiExport size={16} />
              <span>Export</span>
            </Button>
            <Button
              variant={"primary"}
              size={"md"}
              onClick={paletteGeneratorHandler}
            >
              Random Palette
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-full bg-white flex`}
        style={{ height: "calc(100% - 128px)" }}
      >
        <div
          className={`w-3/4 h-full bg-white z-30 ${activeVisualizerMaximize && "w-full h-screen absolute top-0 left-0"} ${activeTemplateMaximize && "hidden"}`}
        >
          <div className="w-full h-full flex items-center justify-center relative">
            <div
              className={`w-171 max-lg:w-100 h-max flex items-center justify-center ${activeVisualizerMaximize && "w-210"}`}
            >
              {ActiveVisualizer && (
                <ActiveVisualizer palette={generatedVisualizerPalette} />
              )}
            </div>
            {!activeVisualizerMaximize && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveVisualizerMaximize((prev) => !prev);
                }}
                variant={"outline"}
                size={"circle"}
                className="absolute top-4 left-4"
              >
                <LuMaximize2 size={16} />
              </Button>
            )}
          </div>
        </div>
        <div
          className={`w-1/4 h-full border-l border-gray-200 p-4 overflow-y-auto noscrollbar ${activeTemplateMaximize && "w-full border-none"}`}
        >
          <div className="w-full flex items-center justify-between">
            <h3 className="text-md font-semibold text-gray-900">Templetes</h3>
            <Button
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
            className={`w-full mt-3 grid grid-cols-1 gap-4 ${activeTemplateMaximize && "grid-cols-3"}`}
          >
            {visualizers.map((Component, index) => {
              return (
                <div
                  key={index}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setCurrentTemplateId(index);
                  }}
                  className="bg-gray-100 p-3 flex items-center justify-center rounded-lg"
                >
                  <Component palette={generatedVisualizerPalette} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full h-16 border-t border-gray-200 px-4 bg-white rounded-b-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ColorPreferencesMenu from="Visualizer" />
          <OpenMoreMenu from="Visualizer" />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              toggleQuickViewModel();
              setQuickViewActiveTab("Formats");
              const data = generatedVisualizerPalette.map(
                (palette) => palette.color,
              );
              setQuickViewPalette(data);
              setQuickViewActiveColor(data[0]);
            }}
            className={`${CIRCLEBUTTONSTYLE}`}
          >
            <LuEye size={16} />
          </button>
          <button
            onClick={() => visualizerPaletteColorShuffler()}
            className={`${CIRCLEBUTTONSTYLE}`}
          >
            <LuShuffle size={16} />
          </button>
          <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
            <Button
              disabled={!(visualizerHistoryIndex > 0)}
              onClick={undoHandler}
              className={REDOUNDOCOMMONSTYLE}
              variant={"text"}
              size={"p0"}
            >
              <LuUndo2 size={16} />
            </Button>
            <span className="w-px h-4 bg-gray-200"></span>
            <Button
              disabled={
                !(visualizerHistoryIndex < visualizerPaletteHistory.length - 1)
              }
              onClick={redoHandler}
              className={REDOUNDOCOMMONSTYLE}
              variant={"text"}
              size={"p0"}
            >
              <LuRedo2 size={16} />
            </Button>
          </div>
          <ColorCountMenu from="Visualizer" />
          <div className="relative flex items-center gap-1">
            <div className="w-72 flex">
              {generatedVisualizerPalette.map((_, index) => {
                const isLight = checkIsLight(_.color);
                return (
                  <div
                    key={index}
                    className="w-full h-10 cursor-pointer relative grid place-content-center first:rounded-l-lg last:rounded-r-lg"
                    style={{ backgroundColor: _.color }}
                  >
                    <div className="w-full h-full absolute top-0 left-0">
                      <VisualizerColorPickerMenu
                        index={index}
                        color={_.color}
                      />
                    </div>
                    {visualizerActiveColor === _.color && (
                      <LuCheck
                        className={`${isLight ? "text-gray-900" : "text-gray-50"}`}
                        size={16}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div
              className={`w-72 h-10 flex absolute bottom-11 left-0 
              transition-all duration-300 ease-in-out
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
                    className="w-full group cursor-pointer relative grid place-content-center h-10 first:rounded-l-lg last:rounded-r-lg overflow-hidden"
                    onClick={() => lockUnlockHandler(index)}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: _.color, opacity: 0.7 }}
                    />
                    <button
                      className={`relative z-10 text-xs text-gray-900 cursor-pointer invisible ${_.isLocked ? "visible" : "group-hover:visible"}`}
                    >
                      {_.isLocked ? (
                        <LuLock size={13} />
                      ) : (
                        <LuLockOpen size={13} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setLockPanel((prev) => !prev)}
              className={`${CIRCLEBUTTONSTYLE}`}
            >
              <LuLockKeyhole size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
