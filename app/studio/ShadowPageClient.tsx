"use client";

import { Button } from "@/components/Button";
import OpenMoreMenu from "@/components/client/OpenMoreMenu";
import ShadowAddLayerContainer from "@/components/client/ShadowAddLayerContainer";
import ShadowColorPickerMenu from "@/components/client/ShadowColorPickerMenu";
import ShadowProgressBar from "@/components/client/ShadowProgressBar";
import ShadowResponsiveMoreMenu from "@/components/client/ShadowResponsiveMoreMenu";
import StudioResponsiveMenuIcon from "@/components/client/StudioResponsiveMenuIcon";
import ToggleButton from "@/components/server/ToggleButton";
import ShadowOutputComponent from "@/components/svgs/ShadowOutputComponent";
import { useIsMaxLg } from "@/hooks/useIsMaxLg";
import { useOtherStore, useShadowStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import useUiStore from "@/libs/stores/uiStore";
import { BUTTONCOMMONSTYLE } from "@/utils/styles/Classes";
import { ShadowPropsType } from "@/utils/Types";
import { generateBoxShadow, generateTextShadow } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiExport } from "react-icons/bi";
import { LuArrowLeft, LuChevronDown, LuX } from "react-icons/lu";

export default function ShadowPageClient() {
  const activeShadowTab = useShadowStore((state) => state.activeShadowTab);
  const setActiveShadowTab = useShadowStore(
    (state) => state.setActiveShadowTab,
  );
  const shadowCornerRadius = useShadowStore(
    (state) => state.shadowCornerRadius,
  );
  const shadowContainerSize = useShadowStore(
    (state) => state.shadowContainerSize,
  );
  const shadows = useShadowStore((state) => state.shadows);
  const setShadow = useShadowStore((state) => state.setShadow);
  const updateShadow = useShadowStore((state) => state.updateShadow);
  const removeShadow = useShadowStore((state) => state.removeShadow);
  const activeShadowViewer = useShadowStore(
    (state) => state.activeShadowViewer,
  );
  const setActiveShadowViewer = useShadowStore(
    (state) => state.setActiveShadowViewer,
  );
  const textShadowSize = useShadowStore((store) => store.textShadowSize);
  const textShadowWeight = useShadowStore((store) => store.textShadowWeight);
  const textShadows = useShadowStore((state) => state.textShadows);
  const setTextShadow = useShadowStore((state) => state.setTextShadow);
  const updateTextShadow = useShadowStore((state) => state.updateTextShadow);
  const removeTextShadow = useShadowStore((state) => state.removeTextShadow);
  const activeTextShadowViewer = useShadowStore(
    (state) => state.activeTextShadowViewer,
  );
  const setActiveTextShadowViewer = useShadowStore(
    (state) => state.setActiveTextShadowViewer,
  );
  const isMaximizeShadow = useUiStore((state) => state.isMaximizeShadow);
  const setIsMaximizeShadow = useUiStore((state) => state.setIsMaximizeShadow);
  const toggleExportShadowModel = useModelStore(
    (state) => state.toggleExportShadowModel,
  );
  const setExportBoxShadow = useOtherStore((state) => state.setExportBoxShadow);
  const setExportTextShadow = useOtherStore(
    (state) => state.setExportTextShadow,
  );

  const CPB: ShadowPropsType[] = [
    {
      title: "Radius",
      value: shadowCornerRadius,
      min: 0,
      max: 512,
      property: "radius",
    },
    {
      title: "Container Size",
      value: shadowContainerSize,
      min: 30,
      max: 600,
      property: "size",
    },
  ];
  const TCI: ShadowPropsType[] = [
    {
      title: "Font Size",
      value: textShadowSize,
      min: 8,
      max: 96,
      property: "fontsize",
    },
    {
      title: "Font Weight",
      value: textShadowWeight,
      min: 100,
      max: 900,
      step: 100,
      property: "fontweight",
    },
    {
      title: "Container Size",
      value: shadowContainerSize,
      min: 30,
      max: 600,
      property: "size",
    },
  ];

  const ensetHandler = (index: number, currentInset: boolean) =>
    updateShadow(index, "inset", !currentInset);

  const addBoxShadowLayerHandler = () => {
    setShadow({
      offsetX: 0,
      offsetY: 8,
      blur: 24,
      spread: -6,
      color: "#99a1af",
      inset: false,
      enabled: false,
    });
  };
  const addTextShadowLayerHandler = () => {
    setTextShadow({
      offsetX: 0,
      offsetY: 2,
      blur: 4,
      color: "#99a1af",
      enabled: false,
    });
  };

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
        setIsMaximizeShadow(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsMaximizeShadow]);

  const boxShadow = generateBoxShadow(shadows);
  const textShadow = generateTextShadow(textShadows);
  const VIEWERCOMMONSTYLE =
    "w-10 h-10 flex items-center rounded-md cursor-pointer transition-all active:scale-90 select-none justify-center";

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(280);

  const isMaxLg = useIsMaxLg();

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize(Math.min(width, height) - 32);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl">
      <div className="w-full h-16 px-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden max-[1400px]:block">
            <StudioResponsiveMenuIcon />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            CSS Shadow Generator
          </h2>
        </div>
        <Button
          aria-label="Export CSS shadow code"
          onClick={() => {
            toggleExportShadowModel();
            setExportBoxShadow(shadows);
            setExportTextShadow(textShadows);
          }}
          variant={"outline"}
          size={"md"}
          className="max-lg:hidden"
        >
          <BiExport size={16} />
          <span>Export</span>
        </Button>
        <div className="hidden max-lg:block">
          <ShadowResponsiveMoreMenu />
        </div>
      </div>
      <div
        className={`w-full h-full max-lg:flex-col bg-white flex rounded-b-xl`}
        style={{ height: "calc(100% - 64px)" }}
      >
        <div
          className={`w-full h-full graydotbg rounded-bl-xl max-lg:rounded-none max-xl:border-b max-xl:border-gray-200 ${isMaximizeShadow && "w-full h-screen absolute bg-white top-0 left-0 z-50"}`}
        >
          <div
            ref={containerRef}
            className={`w-full ${isMaximizeShadow ? "h-full" : "h-50"} lg:h-full flex items-center justify-center relative`}
          >
            {activeShadowTab === "Box Shadow" ? (
              <>
                {activeShadowViewer === "Container View" && (
                  <div
                    style={{
                      boxShadow: boxShadow,
                      borderRadius: `${shadowCornerRadius}px`,
                      width: `${isMaxLg ? containerSize : shadowContainerSize}px`,
                      height: `${isMaxLg ? containerSize : shadowContainerSize}px`,
                    }}
                    className="bg-white"
                  ></div>
                )}
                {activeShadowViewer === "Output View" && (
                  <ShadowOutputComponent
                    boxShadow={boxShadow}
                    radius={shadowCornerRadius}
                    size={isMaxLg ? containerSize : shadowContainerSize}
                  />
                )}
              </>
            ) : (
              <>
                {activeTextShadowViewer === "Container View" && (
                  <h1
                    className="text-gray-900"
                    style={{
                      fontSize: `${isMaxLg ? 30 : textShadowSize}px`,
                      fontWeight: `${textShadowWeight}`,
                      textShadow: textShadow,
                    }}
                  >
                    Compose a Review
                  </h1>
                )}
                {activeTextShadowViewer === "Output View" && (
                  <ShadowOutputComponent
                    textShadow={textShadow}
                    radius={shadowCornerRadius}
                    size={isMaxLg ? containerSize : shadowContainerSize}
                  />
                )}
              </>
            )}
            {isMaximizeShadow && (
              <Button
                onClick={() => setIsMaximizeShadow()}
                variant={"outline"}
                size={"circle"}
                className="absolute top-4 left-4"
              >
                <LuArrowLeft size={16} />
              </Button>
            )}
          </div>
        </div>
        <div className="w-120 max-lg:w-full shrink-0 h-full rounded-br-xl border-l max-lg:border-none border-gray-200 max-lg:h-[calc(100%-200px)]">
          <div
            className="w-full overflow-y-auto pb-4"
            style={{ height: "calc(100% - 64px)" }}
          >
            <div className="w-full p-4">
              <div className="flex items-center border border-gray-200 rounded-full p-1">
                {["Box Shadow", "Text Shadow"].map((_, index) => {
                  return (
                    <button
                      aria-label={`Switch to ${_} tab`}
                      aria-pressed={activeShadowTab === _}
                      key={index}
                      onClick={() => {
                        setActiveShadowTab(_);
                      }}
                      className={`w-full h-10 px-4 text-sm font-semibold border rounded-full ${activeShadowTab === _ ? "bg-gray-100 border-gray-200 text-gray-900" : "bg-white border-white text-gray-900"} cursor-pointer transition-all`}
                    >
                      {_}
                    </button>
                  );
                })}
              </div>
            </div>
            {activeShadowTab === "Box Shadow" && (
              <div className="w-full">
                <div className="w-full px-4 grid grid-cols-1 gap-3 max-lg:hidden">
                  <div className="w-full rounded-lg border border-gray-200">
                    {CPB.map((props, i) => (
                      <ShadowProgressBar key={i} {...props} />
                    ))}
                  </div>
                </div>
                <div className="w-full p-4">
                  <ShadowAddLayerContainer handler={addBoxShadowLayerHandler} />
                </div>
                <div className="w-full px-4 grid grid-cols-1 gap-3">
                  {shadows.map(
                    (
                      { offsetX, offsetY, blur, spread, color, inset, enabled },
                      index,
                    ) => {
                      const XYBS: ShadowPropsType[] = [
                        {
                          title: "Offset X",
                          value: offsetX,
                          index,
                          min: -50,
                          max: 50,
                          property: "offsetX",
                        },
                        {
                          title: "Offset Y",
                          value: offsetY,
                          index,
                          min: -50,
                          max: 50,
                          property: "offsetY",
                        },
                        {
                          title: "Blur",
                          value: blur,
                          index,
                          min: 0,
                          max: 100,
                          property: "blur",
                        },
                        {
                          title: "Spread",
                          value: spread,
                          index,
                          min: -50,
                          max: 50,
                          property: "spread",
                        },
                      ];
                      return (
                        <div
                          key={index}
                          className="w-full border border-gray-200 rounded-lg"
                        >
                          <div
                            role="button"
                            aria-label={`Toggle shadow layer ${index + 1}`}
                            aria-expanded={enabled}
                            onClick={() => {
                              updateShadow(index, "enabled", !enabled);
                            }}
                            className="w-full px-3 h-11 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer rounded-lg group"
                          >
                            <p className="text-sm font-semibold text-gray-900 select-none">{`Layer ${index + 1}`}</p>
                            <div className="flex items-center gap-2">
                              <div className="xl:hidden group-hover:block">
                                <button
                                  aria-label={`Remove box shadow layer ${index + 1}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeShadow(index);
                                  }}
                                  className={`${BUTTONCOMMONSTYLE}`}
                                >
                                  <LuX size={18} aria-hidden="true" />
                                </button>
                              </div>
                              <LuChevronDown
                                className="text-gray-900"
                                size={18}
                              />
                            </div>
                          </div>
                          <AnimatePresence initial={false}>
                            {enabled && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.0 }}
                                className="grid grid-cols-1 gap-2 border-t border-gray-200"
                              >
                                {XYBS.map((props, i) => (
                                  <ShadowProgressBar key={i} {...props} />
                                ))}
                                <div className="w-full flex items-center justify-between p-3">
                                  <label className="text-sm font-semibold text-gray-900">
                                    Color
                                  </label>
                                  <ShadowColorPickerMenu
                                    from="Box"
                                    color={color}
                                    index={index}
                                  />
                                </div>
                                <div className="flex items-center justify-between p-3">
                                  <label className="text-sm font-semibold text-gray-900">
                                    Enable Inset
                                  </label>
                                  <ToggleButton
                                    isTrue={inset}
                                    setIsTrue={() => ensetHandler(index, inset)}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
            {activeShadowTab === "Text Shadow" && (
              <div className="w-full">
                <div className="w-full px-4 grid grid-cols-1 gap-3 max-lg:hidden">
                  <div className="w-full rounded-lg border border-gray-200">
                    {TCI.slice(
                      0,
                      activeTextShadowViewer === "Output View" ? 3 : 2,
                    ).map((props, i) => (
                      <ShadowProgressBar key={i} {...props} />
                    ))}
                  </div>
                </div>
                <div className="w-full p-4">
                  <ShadowAddLayerContainer
                    handler={addTextShadowLayerHandler}
                  />
                </div>
                <div className="w-full px-4 grid grid-cols-1 gap-3">
                  {textShadows.map(
                    ({ offsetX, offsetY, blur, color, enabled }, index) => {
                      const XYB: ShadowPropsType[] = [
                        {
                          title: "Offset X",
                          value: offsetX,
                          index,
                          min: -200,
                          max: 200,
                          property: "offsetX",
                        },
                        {
                          title: "Offset Y",
                          value: offsetY,
                          index,
                          min: -200,
                          max: 200,
                          property: "offsetY",
                        },
                        {
                          title: "Blur",
                          value: blur,
                          index,
                          min: 0,
                          max: 200,
                          property: "blur",
                        },
                      ];
                      return (
                        <div
                          key={index}
                          className="w-full border border-gray-200 rounded-lg"
                        >
                          <div
                            role="button"
                            aria-label={`Toggle text shadow layer ${index + 1}`}
                            aria-expanded={enabled}
                            onClick={() => {
                              updateTextShadow(index, "enabled", !enabled);
                            }}
                            className="w-full px-3 h-11 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer rounded-lg group"
                          >
                            <p className="text-sm font-semibold text-gray-900 select-none">{`Layer ${index + 1}`}</p>
                            <div className="flex items-center gap-2">
                              <div className="xl:hidden group-hover:block">
                                <button
                                  aria-label={`Remove text shadow layer ${index + 1}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeTextShadow(index);
                                  }}
                                  className={`${BUTTONCOMMONSTYLE}`}
                                >
                                  <LuX size={18} aria-hidden="true" />
                                </button>
                              </div>
                              <LuChevronDown
                                className="text-gray-900"
                                size={18}
                              />
                            </div>
                          </div>
                          <AnimatePresence initial={false}>
                            {enabled && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.0 }}
                                className="grid grid-cols-1 gap-2 border-t border-gray-200"
                              >
                                {XYB.map((props, i) => (
                                  <ShadowProgressBar key={i} {...props} />
                                ))}
                                <div className="w-full flex items-center justify-between p-3">
                                  <label className="text-sm font-semibold text-gray-900">
                                    Color
                                  </label>
                                  <ShadowColorPickerMenu
                                    from="Text"
                                    color={color}
                                    index={index}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-full h-16 border-t border-gray-200 flex items-center justify-between px-4">
            <div className="max-lg:hidden">
              <OpenMoreMenu from="Shadow" />
            </div>
            <div className="flex items-center gap-3">
              {activeShadowTab === "Box Shadow" && (
                <>
                  <div
                    role="button"
                    aria-label="Switch to box shadow container view"
                    aria-pressed={activeShadowViewer === "Container View"}
                    onClick={() => setActiveShadowViewer("Container View")}
                    className={`${VIEWERCOMMONSTYLE} ${activeShadowViewer === "Container View" && "outline-2 outline-indigo-600"}`}
                  >
                    <div
                      className="border border-gray-200 flex items-center justify-center"
                      style={{
                        boxShadow: boxShadow,
                        borderRadius: `${4}px`,
                        width: `${34}px`,
                        height: `${34}px`,
                      }}
                    ></div>
                  </div>
                  <div
                    role="button"
                    aria-label="Switch to box shadow output view"
                    aria-pressed={activeShadowViewer === "Output View"}
                    onClick={() => setActiveShadowViewer("Output View")}
                    className={`${VIEWERCOMMONSTYLE} ${activeShadowViewer === "Output View" && "outline-2 outline-indigo-600"}`}
                  >
                    <ShadowOutputComponent
                      boxShadow={boxShadow}
                      radius={4}
                      size={34}
                    />
                  </div>
                </>
              )}
              {activeShadowTab === "Text Shadow" && (
                <>
                  <div
                    onClick={() => setActiveTextShadowViewer("Container View")}
                    className={`${VIEWERCOMMONSTYLE} ${activeTextShadowViewer === "Container View" && "outline-2 outline-indigo-600"}`}
                  >
                    <div
                      className="border border-gray-200 flex items-center justify-center"
                      style={{
                        borderRadius: `${4}px`,
                        width: `${34}px`,
                        height: `${34}px`,
                      }}
                    >
                      <span className="text-gray-900 text-[2px]">
                        Compose a Review
                      </span>
                    </div>
                  </div>
                  <div
                    role="button"
                    aria-label="Switch to text shadow output view"
                    aria-pressed={activeTextShadowViewer === "Output View"}
                    onClick={() => setActiveTextShadowViewer("Output View")}
                    className={`${VIEWERCOMMONSTYLE} ${activeTextShadowViewer === "Output View" && "outline-2 outline-indigo-600"}`}
                  >
                    <ShadowOutputComponent
                      textShadow={textShadow}
                      radius={4}
                      size={34}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
