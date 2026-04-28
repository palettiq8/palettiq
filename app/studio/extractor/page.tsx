"use client";

import { Button } from "@/components/Button";
import ExtractorResponsiveMoreMenu from "@/components/client/ExtractorResponsiveMoreMenu";
import OpenMoreMenu from "@/components/client/OpenMoreMenu";
import StudioResponsiveMenuIcon from "@/components/client/StudioResponsiveMenuIcon";
import { useExtractorStore, useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import useUiStore from "@/libs/stores/uiStore";
import {
  generatorContentHeaderItemsStyle,
  REDOUNDOCOMMONSTYLE,
} from "@/utils/styles/Classes";
import { Picker, PickerContainer } from "@/utils/Types";
import { checkIsLight } from "@/utils/utils";
import { colord } from "colord";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiExport } from "react-icons/bi";
import {
  LuCheck,
  LuCloudUpload,
  LuEye,
  LuHistory,
  LuMinus,
  LuPlus,
  LuRedo2,
  LuShuffle,
  LuUndo2,
} from "react-icons/lu";

export default function page() {
  const [imgSrc, setImgSrc] = useState(
    "https://images.unsplash.com/photo-1689005047267-b9bf392f0bb8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  );
  const [pickerContainer, setPickerContainer] =
    useState<PickerContainer | null>(null);
  const [activePickerIndex, setActivePickerIndex] = useState<number | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState<
    number | null
  >(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
  const pickers = useExtractorStore((state) => state.pickers);
  const setPickers = useExtractorStore((state) => state.setPickers);
  const extractorHistoryIndex = useExtractorStore(
    (state) => state.extractorHistoryIndex,
  );
  const extractorHistory = useExtractorStore((state) => state.extractorHistory);
  const setExtractorHistory = useExtractorStore(
    (state) => state.setExtractorHistory,
  );
  const updatePickers = useExtractorStore((state) => state.updatePickers);
  const extractorUndoHandler = useExtractorStore(
    (state) => state.extractorUndoHandler,
  );
  const extractorRedoHandler = useExtractorStore(
    (state) => state.extractorRedoHandler,
  );
  const toggleExtractorHistoryModel = useModelStore(
    (state) => state.toggleExtractorHistoryModel,
  );
  const extractorRecommendedPalettes = useExtractorStore(
    (state) => state.extractorRecommendedPalettes,
  );
  const setExtractorRecommendedPalettes = useExtractorStore(
    (state) => state.setExtractorRecommendedPalettes,
  );
  const extractorPickerCount = useExtractorStore(
    (state) => state.extractorPickerCount,
  );
  const setExtractorPickerCount = useExtractorStore(
    (state) => state.setExtractorPickerCount,
  );
  const isMaximizeExtractor = useUiStore((state) => state.isMaximizeExtractor);
  const setIsMaximizeExtractor = useUiStore(
    (state) => state.setIsMaximizeExtractor,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);

  const undoHandler = useCallback(() => {
    extractorUndoHandler();
  }, [extractorUndoHandler]);

  const redoHandler = useCallback(() => {
    extractorRedoHandler();
  }, [extractorRedoHandler]);

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(val, max));

  const generateRecommendedPalettes = (
    offsetX: number,
    offsetY: number,
    width: number,
    height: number,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;
    const palettes: Picker[][] = [];

    for (let p = 0; p < 30; p++) {
      const palette: Picker[] = [];

      for (let i = 0; i < 5; i++) {
        const x = Math.floor(offsetX + Math.random() * width);
        const y = Math.floor(offsetY + Math.random() * height);

        const data = ctx.getImageData(x, y, 1, 1).data;
        const [r, g, b] = data;
        const rgb = `rgb(${r}, ${g}, ${b})`;

        const hex = colord(rgb).toHex();

        palette.push({
          x: x - (offsetX + 14),
          y: y - (offsetY + 14),
          color: hex,
        });
      }
      palettes.push(palette);
    }
    setExtractorRecommendedPalettes(palettes);
  };

  const generatePickerPositions = (
    offsetX: number,
    offsetY: number,
    width: number,
    height: number,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;
    const newPickers: Picker[] = [];

    for (let i = 0; i < extractorPickerCount; i++) {
      const x = Math.floor(offsetX + Math.random() * width);
      const y = Math.floor(offsetY + Math.random() * height);

      const data = ctx.getImageData(x, y, 1, 1).data;
      const [r, g, b] = data;
      const rgb = `rgb(${r}, ${g}, ${b})`;

      const hex = colord(rgb).toHex();

      newPickers.push({
        x: x - (offsetX + 14),
        y: y - (offsetY + 14),
        color: hex,
      });
    }
    setPickers(newPickers);
    setExtractorHistory(newPickers);
  };

  const drawImageToCanvas = useCallback((src: string) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvasWidth = container.clientWidth;
      const canvasHeight = container.clientHeight;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth: number;
      let drawHeight: number;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
      } else {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
      }

      const offsetX = (canvasWidth - drawWidth) / 2;
      const offsetY = (canvasHeight - drawHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      setPickerContainer({
        offsetX,
        offsetY,
        width: drawWidth,
        height: drawHeight,
      });
    };
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      drawImageToCanvas(imgSrc);
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [imgSrc, drawImageToCanvas]);

  useEffect(() => {
    drawImageToCanvas(imgSrc);
    setSelectedPaletteIndex(null);
  }, [imgSrc, drawImageToCanvas]);

  useEffect(() => {
    if (!pickerContainer) return;
    generatePickerPositions(
      pickerContainer.offsetX,
      pickerContainer.offsetY,
      pickerContainer.width,
      pickerContainer.height,
    );

    generateRecommendedPalettes(
      pickerContainer.offsetX,
      pickerContainer.offsetY,
      pickerContainer.width,
      pickerContainer.height,
    );
  }, [pickerContainer]);

  const randomShuffleHandler = useCallback(() => {
    setSelectedPaletteIndex(null);
    if (!pickerContainer) return;

    generatePickerPositions(
      pickerContainer.offsetX,
      pickerContainer.offsetY,
      pickerContainer.width,
      pickerContainer.height,
    );
  }, [pickerContainer, extractorPickerCount]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || activePickerIndex === null || !pickerContainer) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const pickerHalf = 14;

    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    mouseX = clamp(
      mouseX,
      pickerContainer.offsetX,
      pickerContainer.offsetX + pickerContainer.width - 1,
    );
    mouseY = clamp(
      mouseY,
      pickerContainer.offsetY,
      pickerContainer.offsetY + pickerContainer.height - 1,
    );

    const ctx = canvasRef.current!.getContext("2d")!;
    const data = ctx.getImageData(mouseX, mouseY, 1, 1).data;
    const [r, g, b] = data;
    const rgb = `rgb(${r}, ${g}, ${b})`;

    const hex = colord(rgb).toHex();

    updatePickers(
      activePickerIndex,
      mouseX,
      pickerContainer.offsetX,
      pickerHalf,
      mouseY,
      pickerContainer.offsetY,
      hex,
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActivePickerIndex(null);
  };

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, activePickerIndex, pickerContainer]);

  const minusHandler = () => {
    const count = extractorPickerCount - 1;
    extractorPickerCount > 2 && setExtractorPickerCount(count);
  };
  const plusHandler = () => {
    const count = extractorPickerCount + 1;
    extractorPickerCount < 10 && setExtractorPickerCount(count);
  };
  const isMinusDisabled =
    !(extractorPickerCount > 2) || selectedPaletteIndex !== null;
  const isPlusDisabled =
    !(extractorPickerCount < 10) || selectedPaletteIndex !== null;

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
        setIsMaximizeExtractor();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        randomShuffleHandler();
      }
      if (key === "h") {
        e.preventDefault();
        toggleExtractorHistoryModel();
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
  }, [randomShuffleHandler]);

  const UploadButton = () => {
    return (
      <>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const url = URL.createObjectURL(file);
            setImgSrc(url);
          }}
        />
        <Button variant={"primary"} size={"md"} className="max-lg:w-full">
          <label
            htmlFor="imageUpload"
            className="flex h-10 items-center gap-3 cursor-pointer"
          >
            <LuCloudUpload size={16} />
            <span>Upload Image</span>
          </label>
        </Button>
      </>
    );
  };

  return (
    <div className="w-full h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl">
      <div className="w-full h-16 px-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden max-xl:block">
            <StudioResponsiveMenuIcon />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Extractor</h2>
        </div>
        <div className="flex items-center gap-3 max-lg:hidden">
          <Button
            onClick={() => toggleExtractorHistoryModel()}
            variant={"outline"}
            size={"md"}
          >
            <LuHistory size={16} />
            <span>History</span>
          </Button>
          <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
            <Button
              disabled={!(extractorHistoryIndex > 0)}
              onClick={undoHandler}
              className={REDOUNDOCOMMONSTYLE}
              variant={"text"}
              size={"p0"}
            >
              <LuUndo2 size={16} />
            </Button>
            <span className="w-px h-4 bg-gray-200"></span>
            <Button
              disabled={!(extractorHistoryIndex < extractorHistory.length - 1)}
              onClick={redoHandler}
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
              setExportFrom("Palette");
              setExportPalette(pickers.map((p) => p.color));
            }}
            variant={"outline"}
            size={"md"}
          >
            <BiExport size={16} />
            <span>Export</span>
          </Button>
          <UploadButton />
        </div>
        <div className="hidden max-lg:block">
          <ExtractorResponsiveMoreMenu />
        </div>
      </div>
      <div className="w-full flex max-lg:flex-col h-[calc(100%-64px)]">
        <div className="w-full h-full border-r border-gray-200 p-4 bg-gray-100 rounded-bl-xl max-lg:rounded-none flex items-center justify-center relative max-lg:h-35 max-lg:border-r-0 max-lg:border-b">
          <div className="relative w-full h-full" ref={containerRef}>
            <canvas ref={canvasRef} />
            <div
              className="absolute"
              style={{
                width: pickerContainer?.width,
                height: pickerContainer?.height,
                top: pickerContainer?.offsetY,
                left: pickerContainer?.offsetX,
              }}
            >
              {pickers.map((p, i) => {
                return (
                  <div
                    key={i}
                    className={`absolute w-7 h-7 rounded-full border-3 border-gray-50 hover:cursor-pointer hover:scale-150 transition-all ${
                      activePickerIndex === i && "scale-150 transition-none"
                    }`}
                    style={{
                      top: p.y,
                      left: p.x,
                      backgroundColor: p.color,
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                      setActivePickerIndex(i);
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
          <span className="text-xs font-semibold text-gray-500 absolute bottom-4 left-4 select-none max-lg:hidden">
            @Image from{" "}
            <Link
              href={"https://unsplash.com/"}
              target="_blank"
              className="hover:underline"
            >
              Unsplash
            </Link>
          </span>
        </div>
        <div className="w-120 max-lg:w-full h-full shrink-0 max-lg:h-[calc(100%-140px)]">
          <div className="w-full h-[calc(100%-64px)] max-lg:h-[calc(100%-112px)] overflow-y-scroll noscrollbar">
            <div className="w-full p-4 h-50 border-b border-gray-200">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center max-sm:flex-col max-sm:items-start gap-1">
                  <h3 className="text-md font-semibold text-gray-900">
                    Shuffled Palette{" "}
                  </h3>
                  <span className="text-indigo-600 text-sm font-semibold">{`(${extractorPickerCount} Colors)`}</span>
                </div>
                <div className="flex items-center gap-6">
                  <LuEye
                    onClick={() => {
                      toggleQuickViewModel();
                      setQuickViewActiveTab("Formats");
                      const data = pickers.map((picker) => picker.color);
                      setQuickViewPalette(data);
                      setQuickViewActiveColor(data[0]);
                    }}
                    size={17}
                    className={`${generatorContentHeaderItemsStyle} max-lg:hidden`}
                  />
                  <div className="flex items-center justify-between gap-4 px-3 border border-gray-200 h-9 rounded-full">
                    <Button
                      className={REDOUNDOCOMMONSTYLE}
                      onClick={minusHandler}
                      disabled={isMinusDisabled}
                      variant={"text"}
                      size={"p0"}
                    >
                      <LuMinus size={16} />
                    </Button>
                    <span className="w-px h-4 bg-gray-200"></span>
                    <Button
                      className={REDOUNDOCOMMONSTYLE}
                      onClick={plusHandler}
                      disabled={isPlusDisabled}
                      variant={"text"}
                      size={"p0"}
                    >
                      <LuPlus size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={`w-full flex items-center ${isMaximizeExtractor ? "absolute top-0 left-0 h-screen z-50" : "mt-3"}`}
              >
                {pickers.map((p, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-full ${isMaximizeExtractor ? "h-full" : "h-30 first:rounded-l-lg last:rounded-r-lg"} grid place-content-center hover:cursor-pointer`}
                      style={{ backgroundColor: p.color }}
                      onClick={() =>
                        !isMaximizeExtractor &&
                        setActivePickerIndex(activePickerIndex === i ? null : i)
                      }
                    >
                      {activePickerIndex === i && !isMaximizeExtractor && (
                        <LuCheck
                          size={22}
                          className={`${
                            checkIsLight(p.color)
                              ? "text-gray-900"
                              : "text-gray-50"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full p-4">
              <p className="text-md font-semibold text-gray-900">
                Picked Palettes
              </p>
              <div className="w-full grid grid-cols-3 gap-3 mt-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {extractorRecommendedPalettes.map((palettes, index) => {
                  return (
                    <div
                      onClick={() => {
                        setPickers(palettes);
                        setSelectedPaletteIndex(index);
                      }}
                      className="relative group"
                      key={index}
                    >
                      <div className="flex w-full">
                        {palettes.map((palette, index) => {
                          return (
                            <div
                              key={index}
                              className={`w-full h-14 first:rounded-l-lg last:rounded-r-lg`}
                              style={{ backgroundColor: palette.color }}
                            ></div>
                          );
                        })}
                      </div>
                      <div
                        className={`w-full h-full rounded-lg bg-gray-900/40 absolute top-0 left-0 grid place-content-center ${
                          selectedPaletteIndex === index
                            ? "visible"
                            : "invisible"
                        } invisible group-hover:visible hover:cursor-pointer`}
                      >
                        {selectedPaletteIndex === index && (
                          <LuCheck className="text-gray-50" size={20} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full h-16 max-lg:h-28 border-t bg-white rounded-br-xl max-lg:rounded-bl-xl border-gray-200 flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:gap-2 p-4">
            <div className="max-lg:hidden">
              <OpenMoreMenu from="Extractor" />
            </div>
            <UploadButton />
            <div className="w-full hidden max-lg:block">
              <div className="w-full flex items-center gap-2">
                <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
                  <Button
                    disabled={!(extractorHistoryIndex > 0)}
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
                      !(extractorHistoryIndex < extractorHistory.length - 1)
                    }
                    onClick={redoHandler}
                    className={REDOUNDOCOMMONSTYLE}
                    variant={"text"}
                    size={"p0"}
                  >
                    <LuRedo2 size={16} />
                  </Button>
                </div>
                <Button
                  onClick={randomShuffleHandler}
                  variant={"outline"}
                  size={"md"}
                  className="max-lg:w-full"
                >
                  <LuShuffle size={18} />
                  <span>Random Shuffle</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
