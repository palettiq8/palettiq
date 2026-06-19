"use client";

import { useVisualizerStore } from "@/libs/stores/dataStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuCheck, LuMinus, LuPlus, LuUpload, LuX } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";

function normaliseColor(raw: string): string | null {
  if (!raw || raw === "none" || raw === "transparent") return null;
  const s = raw.trim().toLowerCase();
  if (s.startsWith("#") && (s.length === 4 || s.length === 7)) return s;
  if (s.startsWith("#") && s.length === 4)
    return "#" + s[1] + s[1] + s[2] + s[2] + s[3] + s[3];

  // rgb(r, g, b) — integer 0-255 form
  const rgbMatch = s.match(
    /^rgb\(\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)\s*\)$/,
  );
  if (rgbMatch) {
    return (
      "#" +
      [rgbMatch[1], rgbMatch[2], rgbMatch[3]]
        .map((n) => Math.round(parseFloat(n)).toString(16).padStart(2, "0"))
        .join("")
    );
  }

  // rgb(r%, g%, b%) — percentage form, e.g. rgb(40.49%, 71.92%, 91.22%)
  const rgbPercentMatch = s.match(
    /^rgb\(\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%\s*\)$/,
  );
  if (rgbPercentMatch) {
    return (
      "#" +
      [rgbPercentMatch[1], rgbPercentMatch[2], rgbPercentMatch[3]]
        .map((p) =>
          Math.round((parseFloat(p) / 100) * 255)
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")
    );
  }

  return null;
}

function extractUniqueColors(svgString: string): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const seen = new Set<string>();

  const tryAdd = (raw: string | null | undefined) => {
    if (!raw) return;
    const hex = normaliseColor(raw);
    if (hex) seen.add(hex);
  };

  doc.querySelectorAll("*").forEach((el) => {
    tryAdd(el.getAttribute("fill"));
    tryAdd(el.getAttribute("stroke"));
    tryAdd((el as HTMLElement).style?.fill);
    tryAdd((el as HTMLElement).style?.stroke);
  });

  doc.querySelectorAll("stop").forEach((stop) => {
    tryAdd(stop.getAttribute("stop-color"));
    tryAdd(stop.style?.stopColor);
  });

  return Array.from(seen);
}

/** Prefix all gradient/clip/filter IDs in an SVG string with a unique
 *  namespace so they don't clash with other SVGs already on the page. */
function namespaceSVGIds(svgString: string, prefix: string): string {
  const ids: string[] = [];
  const idRegex = /id="([^"]+)"/g;
  let match;
  while ((match = idRegex.exec(svgString)) !== null) {
    ids.push(match[1]);
  }
  if (ids.length === 0) return svgString;

  let result = svgString;
  ids.forEach((id) => {
    const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result
      .replace(new RegExp(`id="${escapedId}"`, "g"), `id="${prefix}-${id}"`)
      .replace(
        new RegExp(`url\\(#${escapedId}\\)`, "g"),
        `url(#${prefix}-${id})`,
      )
      .replace(
        new RegExp(`href="#${escapedId}"`, "g"),
        `href="#${prefix}-${id}"`,
      )
      .replace(
        new RegExp(`xlink:href="#${escapedId}"`, "g"),
        `xlink:href="#${prefix}-${id}"`,
      );
  });
  return result;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SVGUploadModal({ isOpen, onClose }: Props) {
  const setUploadedSVGData = useVisualizerStore((s) => s.setUploadedSVGData);

  const [svgString, setSvgString] = useState<string | null>(null);
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const hasMoved = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [svgNaturalSize, setSvgNaturalSize] = useState({
    width: 500,
    height: 500,
  });

  useEffect(() => {
    if (!isOpen) {
      setSvgString(null);
      setUniqueColors([]);
      setSelectedColors(new Set());
      setScale(1);
      setTranslate({ x: 0, y: 0 });
      setError(null);
    }
  }, [isOpen]);

  const loadFile = useCallback((file: File) => {
    if (!file.name.endsWith(".svg") && file.type !== "image/svg+xml") {
      setError("Please upload a valid SVG file.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      // Namespace all IDs so gradient IDs don't clash with other SVGs on page
      const namespacedText = namespaceSVGIds(text, "modal-svg");
      setSvgString(namespacedText);
      // Extract colors from the ORIGINAL text (before namespacing) so hex values are unaffected
      const colors = extractUniqueColors(text);
      setUniqueColors(colors);
      setSelectedColors(new Set());
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    };
    reader.readAsText(file);
  }, []);

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const toggleColor = (hex: string) => {
    setSelectedColors((prev) => {
      const next = new Set(prev);
      if (next.has(hex)) next.delete(hex);
      else next.add(hex);
      return next;
    });
  };

  // Select all / deselect all toggle
  const toggleSelectAll = () => {
    if (selectedColors.size === uniqueColors.length) {
      setSelectedColors(new Set());
    } else {
      setSelectedColors(new Set(uniqueColors));
    }
  };

  const isAllSelected =
    uniqueColors.length > 0 && selectedColors.size === uniqueColors.length;

  const onSVGClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as SVGElement;
      if (target.tagName === "svg" || target.tagName === "DIV") return;
      if (hasMoved.current) return;

      const fillAttr =
        target.getAttribute("fill") ??
        (target as unknown as HTMLElement).style?.fill ??
        "";

      if (fillAttr.startsWith("url(")) {
        const idMatch = fillAttr.match(/url\(#([^)]+)\)/);
        if (idMatch) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgString ?? "", "image/svg+xml");
          const gradient = doc.getElementById(idMatch[1]);
          if (gradient) {
            const stops = Array.from(gradient.querySelectorAll("stop"));
            const stopColors = stops
              .map((s) =>
                normaliseColor(
                  s.getAttribute("stop-color") ?? s.style?.stopColor ?? "",
                ),
              )
              .filter(Boolean) as string[];

            if (stopColors.length > 0) {
              setUniqueColors((prev) => {
                const next = [...prev];
                stopColors.forEach((c) => {
                  if (!next.includes(c)) next.push(c);
                });
                return next;
              });
              setSelectedColors((prev) => {
                const next = new Set(prev);
                const allSelected = stopColors.every((c) => next.has(c));
                stopColors.forEach((c) =>
                  allSelected ? next.delete(c) : next.add(c),
                );
                return next;
              });
            }
          }
        }
        return;
      }

      const fill = normaliseColor(fillAttr);
      const stroke = normaliseColor(
        target.getAttribute("stroke") ??
          (target as unknown as HTMLElement).style?.stroke ??
          "",
      );

      const hit = fill ?? stroke;
      if (!hit) return;

      setUniqueColors((prev) => {
        if (!prev.includes(hit)) return [...prev, hit];
        return prev;
      });
      setSelectedColors((prev) => {
        const next = new Set(prev);
        if (next.has(hit)) next.delete(hit);
        else next.add(hit);
        return next;
      });
    },
    [svgString],
  );
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const container = previewRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    // Cursor position relative to container
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    const delta = -e.deltaY * 0.0003;

    setScale((prevScale) => {
      const nextScale = Math.min(5, Math.max(0.01, prevScale + delta));
      const ratio = nextScale / prevScale;

      // Adjust translate so cursor position stays fixed
      setTranslate((t) => ({
        x: cursorX - ratio * (cursorX - t.x),
        y: cursorY - ratio * (cursorY - t.y),
      }));

      return nextScale;
    });
  };

  useEffect(() => {
    if (!svgString || !previewRef.current) return;
    setTimeout(() => {
      const container = previewRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();

      // SVG এর natural size বের করো
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, "image/svg+xml");
      const svgEl = doc.querySelector("svg");
      const viewBox = svgEl?.getAttribute("viewBox")?.split(" ");
      const svgW = viewBox
        ? parseFloat(viewBox[2])
        : parseFloat(svgEl?.getAttribute("width") ?? "500");
      const svgH = viewBox
        ? parseFloat(viewBox[3])
        : parseFloat(svgEl?.getAttribute("height") ?? "500");

      // Container এ fit করার জন্য scale বের করো (padding 32px)
      const padding = 32;
      const fitScale = Math.min(
        (rect.width - padding) / svgW,
        (rect.height - padding) / svgH,
      );

      setScale(fitScale);

      setSvgNaturalSize({ width: svgW, height: svgH });
      setScale(fitScale);
      // Center এ রাখো
      setTranslate({
        x: (rect.width - svgW * fitScale) / 2,
        y: (rect.height - svgH * fitScale) / 2,
      });
    }, 50);
  }, [svgString]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isPanning.current = true;
    hasMoved.current = false;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));
  };

  const onMouseUp = () => {
    isPanning.current = false;
  };

  const handleApply = () => {
    if (!svgString || selectedColors.size === 0) return;
    setUploadedSVGData(svgString, Array.from(selectedColors));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (
              (e.target as HTMLElement).classList.contains("svg-modal-parent")
            )
              onClose();
          }}
          className="fixed inset-0 w-full h-screen bg-black/50 grid items-center z-50 svg-modal-parent"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative mx-auto w-300 h-[85vh] max-xl:w-full max-xl:h-full max-xl:rounded-none bg-gray-50 rounded-xl flex flex-col overflow-hidden"
          >
            {/* header */}
            <div className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-md font-semibold text-gray-900">
                Upload SVG &amp; Apply Palettes
              </p>
              <Button onClick={onClose} variant={"outline"} size={"circle"}>
                <LuX size={18} />
              </Button>
            </div>

            {/* body */}
            <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
              {/* left: SVG preview */}
              <div className="flex-1 border-r-0 lg:border-r border-b lg:border-b-0 border-gray-200 flex flex-col overflow-hidden h-[40vh] lg:h-auto">
                {!svgString ? (
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={onDrop}
                    className={`flex-1 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors m-4 rounded-xl border-2 border-dashed
                  ${isDragging ? "border-gray-400 bg-gray-50" : "border-gray-200 hover:border-gray-300 hover:bg-white"}`}
                  >
                    <input
                      type="file"
                      accept=".svg,image/svg+xml"
                      className="sr-only"
                      onChange={onFileInput}
                    />
                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <LuUpload size={20} className="text-gray-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        Drop your SVG here
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        or click to browse
                      </p>
                    </div>
                    {error && (
                      <p className="text-xs text-red-500 font-medium">
                        {error}
                      </p>
                    )}
                  </label>
                ) : (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 shrink-0">
                      <span className="text-xs text-gray-700 font-medium mr-1 hidden lg:block">
                        Scroll to zoom · Drag to pan · Click element to select
                        color
                      </span>
                      <div className="ml-auto flex items-center gap-1">
                        <button
                          onClick={() =>
                            setScale((s) =>
                              Math.max(0.01, +(s - 0.01).toFixed(2)),
                            )
                          }
                          className="w-7 h-7 rounded-lg border text-gray-900 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Zoom out"
                        >
                          <LuMinus size={12} />
                        </button>
                        <span className="text-xs text-gray-900 font-medium w-10 text-center">
                          {Math.round(scale * 100)}%
                        </span>
                        <button
                          onClick={() =>
                            setScale((s) => Math.min(5, +(s + 0.01).toFixed(2)))
                          }
                          className="w-7 h-7 rounded-lg border text-gray-900 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Zoom in"
                        >
                          <LuPlus size={12} />
                        </button>
                        <button
                          onClick={() => {
                            setScale(1);
                            setTranslate({ x: 0, y: 0 });
                          }}
                          className="ml-1 text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors px-2 h-7 rounded-lg border border-gray-200 hover:bg-gray-50"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div
                      ref={previewRef}
                      className="flex-1 overflow-hidden relative graydotbg cursor-grab active:cursor-grabbing select-none"
                      onWheel={onWheel}
                      onMouseDown={onMouseDown}
                      onMouseMove={onMouseMove}
                      onMouseUp={onMouseUp}
                      onMouseLeave={onMouseUp}
                      onClick={onSVGClick}
                    >
                      <div
                        style={{
                          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                          transformOrigin: "0 0",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: `${svgNaturalSize.width}px`,
                          height: `${svgNaturalSize.height}px`,
                        }}
                        className="[&>svg]:w-full [&>svg]:h-full [&>svg]:block"
                        dangerouslySetInnerHTML={{ __html: svgString }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* right: color panel */}
              <div className="w-full lg:w-72 flex flex-col overflow-hidden shrink-0 h-[60vh] lg:h-auto">
                <div className="p-4 border-b border-gray-200 shrink-0">
                  <p className="text-md font-semibold text-gray-800">
                    Colors in SVG
                  </p>
                  <p className="text-xs font-medium text-gray-700 mt-1">
                    Select which colors to replace with your palette
                  </p>
                </div>

                {uniqueColors.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-xs font-medium text-gray-700 text-center px-4">
                      Upload an SVG to see its colors here
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Select all row */}
                    <div className="p-4 shrink-0">
                      <button
                        onClick={toggleSelectAll}
                        className={`w-full flex items-center cursor-pointer gap-3 p-2 rounded-xl border transition-all
                          ${
                            isAllSelected
                              ? "border-gray-400 bg-gray-50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors
                            ${
                              isAllSelected
                                ? "bg-gray-900 border-gray-900"
                                : "border-gray-300"
                            }`}
                        >
                          {isAllSelected && (
                            <LuCheck size={12} className="text-gray-50" />
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-900">
                          {isAllSelected ? "Deselect all" : "Select all"}
                        </span>
                        <span className="ml-auto text-xs font-medium text-gray-900">
                          {uniqueColors.length} colors
                        </span>
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto noscrollbar px-4 pb-4 space-y-1">
                      {uniqueColors.map((hex) => {
                        const isSelected = selectedColors.has(hex);
                        return (
                          <button
                            key={hex}
                            onClick={() => toggleColor(hex)}
                            className={`w-full flex cursor-pointer items-center gap-3 p-2 rounded-xl border transition-all
                              ${
                                isSelected
                                  ? "border-gray-400 bg-gray-50"
                                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                              }`}
                          >
                            <div
                              className="w-8 h-8 rounded-full shrink-0"
                              style={{ backgroundColor: hex }}
                            />
                            <span className="text-sm font-semibold text-gray-900 uppercase flex-1 text-left">
                              {hex}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors
                                ${
                                  isSelected
                                    ? "bg-gray-900 border-gray-900"
                                    : "border-gray-300"
                                }`}
                            >
                              {isSelected && (
                                <LuCheck size={12} className="text-gray-50" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* footer */}
                <div className="px-4 py-4 border-t border-gray-200 shrink-0 space-y-2">
                  {selectedColors.size > 0 && (
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {Array.from(selectedColors).map((hex) => (
                        <div
                          key={hex}
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                      <span className="text-xs font-medium text-gray-700">
                        {selectedColors.size} color
                        {selectedColors.size !== 1 ? "s" : ""} will be replaced
                      </span>
                    </div>
                  )}

                  {selectedColors.size > 0 && (
                    <Button
                      variant={"outline"}
                      size={"md"}
                      className="w-full"
                      onClick={() => setSelectedColors(new Set())}
                    >
                      Clear selection
                    </Button>
                  )}

                  <Button
                    onClick={handleApply}
                    disabled={!svgString || selectedColors.size === 0}
                    className="w-full"
                  >
                    Open on Visualizer
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
