"use client";

import { Button } from "@/components/Button";
import {
  generatorContentHeaderItemsStyle,
  REDOUNDOCOMMONSTYLE,
} from "@/utils/styles/Classes";
import { BiExport } from "react-icons/bi";
import { LuEye, LuHistory, LuPlus, LuRedo2, LuUndo2 } from "react-icons/lu";
import { defaultGradients } from "@/utils/Items";
import { useCallback, useEffect, useRef } from "react";
import { useGradientStore, useOtherStore } from "@/libs/stores/dataStore";
import {
  checkIsLight,
  getGradientCSS,
  parseGradientFromURL,
} from "@/utils/utils";
import GradientStopWithMenu from "@/components/client/GradientStopWithMenu";
import useModelStore from "@/libs/stores/modelStore";
import GradientCustomizedItem from "@/components/client/GradientCustomizedItem";
import ColorPreferencesMenu from "@/components/client/ColorPreferencesMenu";
import OpenMoreMenu from "@/components/client/OpenMoreMenu";
import useUiStore from "@/libs/stores/uiStore";
import StudioResponsiveMenuIcon from "@/components/client/StudioResponsiveMenuIcon";
import GradientResponsiveMoreMenu from "@/components/client/GradientResponsiveMoreMenu";

export default function page() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const draggingId = useRef<string | null>(null);
  const gradientStops = useGradientStore((state) => state.gradientStops);
  const setGradientStop = useGradientStore((state) => state.setGradientStop);
  const setModifyActiveColor = useGradientStore(
    (state) => state.setModifyActiveColor,
  );
  const gradientHistoryIndex = useGradientStore(
    (state) => state.gradientHistoryIndex,
  );
  const gradientUndoHandler = useGradientStore(
    (state) => state.gradientUndoHandler,
  );
  const gradientRedoHandler = useGradientStore(
    (state) => state.gradientRedoHandler,
  );
  const gradientHistory = useGradientStore((state) => state.gradientHistory);
  const setGradientHistory = useGradientStore(
    (state) => state.setGradientHistory,
  );
  const updateGradientStop = useGradientStore(
    (state) => state.updateGradientStop,
  );
  const modifyActiveColor = useGradientStore(
    (state) => state.modifyActiveColor,
  );
  const activeGradientType = useGradientStore(
    (state) => state.activeGradientType,
  );
  const gradientRotationValue = useGradientStore(
    (state) => state.gradientRotationValue,
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
  const gradientContainerSize = useGradientStore(
    (state) => state.gradientContainerSize,
  );
  const gradientCornerRadius = useGradientStore(
    (state) => state.gradientCornerRadius,
  );
  const activeRadial = useGradientStore((state) => state.activeRadial);
  const activeConic = useGradientStore((state) => state.activeConic);
  const generateRandomGradient = useGradientStore(
    (state) => state.generateRandomGradient,
  );
  const setQuickViewActiveColor = useOtherStore(
    (state) => state.setQuickViewActiveColor,
  );
  const toggleGradientHistoryModel = useModelStore(
    (state) => state.toggleGradientHistoryModel,
  );
  const addGradientStop = useGradientStore((state) => state.addGradientStop);
  const isMaximizeGradient = useUiStore((state) => state.isMaximizeGradient);
  const setIsMaximizeGradient = useUiStore(
    (state) => state.setIsMaximizeGradient,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
  const setGradientExport = useOtherStore((state) => state.setGradientExport);

  const addStopHandler = useCallback(() => setGradientStop(), []);
  const handlePointerDown = (id: string) => {
    draggingId.current = id;
  };
  const handlePointerUp = () => {
    draggingId.current = null;
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!draggingId.current || !barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    updateGradientStop(draggingId.current, Math.round(percent), "position");
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const generateRandomGradientHandler = useCallback(() => {
    generateRandomGradient();
    setGradientHistory();
  }, [setGradientHistory]);

  const undoHandler = useCallback(() => {
    gradientUndoHandler();
  }, []);

  const redoHandler = useCallback(() => {
    gradientRedoHandler();
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
      if (e.key === "Escape") {
        e.preventDefault();
        setIsMaximizeGradient();
      }
      if (key === "h") {
        e.preventDefault();
        toggleGradientHistoryModel();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        generateRandomGradientHandler();
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
  }, []);

  useEffect(() => {
    const { gradientStops, gradientHistory } = useGradientStore.getState();

    if (!gradientStops || gradientStops.length === 0) {
      generateRandomGradientHandler();
    } else {
      setModifyActiveColor(gradientStops[0]);
      if (gradientHistory.length === 0) {
        setGradientHistory(gradientStops);
      }
    }
  }, [generateRandomGradientHandler, setGradientHistory]);

  useEffect(() => {
    const gradient = parseGradientFromURL();

    if (gradient) {
      useGradientStore.setState({
        gradientStops: gradient.stops,
        activeGradientType: gradient.type,
        gradientRotationValue: gradient.rotation,
        activeRadial: gradient.radial,
        activeConic: gradient.conic,
      });
    }
  }, []);

  return (
    <div className="w-full h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl">
      <div className="w-full h-16 px-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden max-xl:block">
            <StudioResponsiveMenuIcon />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Gradient</h2>
        </div>
        <div className="flex items-center gap-3 max-lg:hidden">
          <Button
            onClick={() => toggleGradientHistoryModel()}
            variant={"outline"}
            size={"md"}
          >
            <LuHistory size={16} />
            <span>History</span>
          </Button>
          <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
            <Button
              disabled={!(gradientHistoryIndex > 0)}
              onClick={() => {
                undoHandler();
              }}
              className={REDOUNDOCOMMONSTYLE}
              variant={"text"}
              size={"p0"}
            >
              <LuUndo2 size={16} />
            </Button>
            <span className="w-px h-4 bg-gray-200"></span>
            <Button
              disabled={!(gradientHistoryIndex < gradientHistory.length - 1)}
              onClick={() => {
                redoHandler();
              }}
              className={REDOUNDOCOMMONSTYLE}
              variant={"text"}
              size={"p0"}
            >
              <LuRedo2 size={16} />
            </Button>
          </div>
          <Button
            onClick={() => {
              toggleExportModel();
              setExportFrom("Gradient");
              setExportPalette(gradientStops.map((stop) => stop.color));
              setGradientExport(
                `background: ${getGradientCSS(
                  gradientStops,
                  activeGradientType,
                  gradientRotationValue,
                  activeRadial,
                  activeConic,
                )};`,
              );
            }}
            variant={"outline"}
            size={"md"}
          >
            <BiExport size={16} />
            <span>Export</span>
          </Button>
          <Button
            onClick={generateRandomGradientHandler}
            variant={"primary"}
            size={"md"}
          >
            Generate Random Gradient
          </Button>
        </div>
        <div className="hidden max-lg:block">
          <GradientResponsiveMoreMenu />
        </div>
      </div>
      <div className="w-full flex max-lg:flex-col h-[calc(100%-64px)]">
        <div className="w-full max-lg:h-35 max-lg:flex-none border-r bg-gray-100 rounded-bl-xl max-lg:rounded-none max-lg:border-r-0 max-lg:border-b border-gray-200 p-4">
          <div
            style={{
              width: gradientContainerSize.width,
              height: gradientContainerSize.height,
              borderRadius: !isMaximizeGradient
                ? `${gradientCornerRadius}px`
                : "0px",
              background: getGradientCSS(
                gradientStops,
                activeGradientType,
                gradientRotationValue,
                activeRadial,
                activeConic,
              ),
            }}
            className={`flex p-4 flex-col justify-between items-start ${
              isMaximizeGradient && "w-full h-screen absolute top-0 left-0 z-50"
            }`}
          ></div>
        </div>
        <div className="w-120 h-full shrink-0 max-lg:w-full max-lg:h-[calc(100%-140px)]">
          <div className="w-full overflow-y-scroll noscrollbar h-[calc(100%-64px)] max-lg:h-[calc(100%-112px)]">
            <div className="p-4 grid grid-cols-7 max-sm:grid-cols-4 gap-2 border-b border-gray-200">
              {defaultGradients.map((stop, index) => {
                return (
                  <div
                    key={index}
                    className={`w-full h-14 hover:cursor-pointer rounded-lg active:scale-90 transition-all`}
                    onClick={() => addGradientStop(stop)}
                    style={{
                      background: getGradientCSS(
                        stop,
                        "Linear",
                        90,
                        { shape: "circle", x: 50, y: 50 },
                        { x: 50, y: 50 },
                      ),
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="w-full p-4">
              <div className="flex items-center w-full justify-between">
                <h2 className="text-md font-semibold text-gray-900">Stops</h2>
                <div className="flex items-center gap-3">
                  <LuEye
                    onClick={() => {
                      toggleQuickViewModel();
                      setQuickViewActiveTab("Formats");
                      const data = gradientStops
                        .sort((a, b) => a.position - b.position)
                        .map((stop) => stop.color);
                      setQuickViewPalette(data);
                      setQuickViewActiveColor(data[0]);
                    }}
                    size={17}
                    className={generatorContentHeaderItemsStyle}
                  />
                  <Button
                    onClick={addStopHandler}
                    disabled={!(gradientStops.length < 10)}
                    variant={"outline"}
                    size={"md"}
                  >
                    <LuPlus size={16} />
                    <span>Add stop</span>
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <div
                  ref={barRef}
                  className="w-full h-3 rounded-full relative"
                  style={{
                    background: `linear-gradient(to right, ${[...gradientStops]
                      .filter((stop) => !stop.isHide)
                      .sort((a, b) => a.position - b.position)
                      .map((s) => `${s.color} ${s.position}%`)
                      .join(", ")})`,
                  }}
                >
                  {gradientStops
                    .filter((stop) => !stop.isHide)
                    .sort((a, b) => a.position - b.position)
                    .map(({ id, color, isHide, position }) => {
                      const isLight = checkIsLight(color);
                      return (
                        <div
                          key={id}
                          className="w-7 h-7 bg-gray-50 rounded-full border border-gray-200 grid place-content-center absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                          style={{
                            left: `${position}%`,
                          }}
                          onClick={() =>
                            setModifyActiveColor({
                              id,
                              color,
                              isHide,
                              position,
                            })
                          }
                          onPointerDown={(e) => {
                            e.preventDefault();
                            e.currentTarget.setPointerCapture(e.pointerId);
                            handlePointerDown(id);
                            setModifyActiveColor({
                              id,
                              color,
                              isHide,
                              position,
                            });
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded-full grid place-content-center"
                            style={{ backgroundColor: color }}
                          >
                            {modifyActiveColor?.id === id && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-gray-900" : "bg-gray-50"}`}
                              ></span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="w-full mt-4 grid grid-cols-2 max-sm:grid-cols-1 gap-3">
                {gradientStops
                  .sort((a, b) => a.position - b.position)
                  .map(({ id, color, isHide, position }) => (
                    <GradientStopWithMenu
                      key={id}
                      id={id}
                      color={color}
                      isHide={isHide}
                      position={position}
                    />
                  ))}
              </div>
            </div>
            <div className="w-full px-4 pb-4 flex flex-col gap-4">
              <GradientCustomizedItem />
            </div>
          </div>
          <div className="w-full h-16 max-lg:h-28 border-t bg-white rounded-br-xl max-lg:rounded-bl-xl border-gray-200 flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:gap-2 p-4">
            <div className="max-lg:hidden">
              <OpenMoreMenu from="Gradient" />
            </div>
            <ColorPreferencesMenu from="Gradient" />
            <div className="w-full hidden max-lg:block">
              <div className="w-full flex items-center gap-2">
                <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
                  <Button
                    disabled={!(gradientHistoryIndex > 0)}
                    onClick={() => {
                      undoHandler();
                    }}
                    className={REDOUNDOCOMMONSTYLE}
                    variant={"text"}
                    size={"p0"}
                  >
                    <LuUndo2 size={16} />
                  </Button>
                  <span className="w-px h-4 bg-gray-200"></span>
                  <Button
                    disabled={
                      !(gradientHistoryIndex < gradientHistory.length - 1)
                    }
                    onClick={() => {
                      redoHandler();
                    }}
                    className={REDOUNDOCOMMONSTYLE}
                    variant={"text"}
                    size={"p0"}
                  >
                    <LuRedo2 size={16} />
                  </Button>
                </div>
                <Button
                  onClick={generateRandomGradientHandler}
                  variant={"primary"}
                  size={"md"}
                  className="w-full"
                >
                  Generate Gradient
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
