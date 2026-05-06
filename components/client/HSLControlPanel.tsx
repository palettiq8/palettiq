"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { preferredColors, colorFamilies } from "@/utils/Items";
import { useGeneratorStore } from "@/libs/stores/dataStore";
import { useEffect, useState } from "react";
import { useRef, useCallback } from "react";
import { FlashMessage } from "@/utils/utils";

function DualRangeSlider({
  label,
  min,
  max,
  hardMin,
  hardMax,
  onMinChange,
  onMaxChange,
}: {
  label: string;
  min: number;
  max: number;
  hardMin: number;
  hardMax: number;
  onMinChange: (val: number) => void;
  onMaxChange: (val: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"min" | "max" | null>(null);

  const isWrapped = hardMin > hardMax;

  const totalRange = isWrapped ? 360 - hardMin + hardMax : hardMax - hardMin;

  const getPercent = (val: number) => {
    if (isWrapped) {
      const dist = val >= hardMin ? val - hardMin : 360 - hardMin + val;
      return (dist / totalRange) * 100;
    }
    return ((val - hardMin) / (hardMax - hardMin)) * 100;
  };

  const getValueFromPercent = (percent: number) => {
    if (isWrapped) {
      const dist = Math.round((percent / 100) * totalRange);
      return (hardMin + dist) % 360;
    }
    return Math.round(hardMin + (percent / 100) * (hardMax - hardMin));
  };

  const minPercent = getPercent(min);
  const maxPercent = getPercent(max);

  const getValueFromEvent = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return null;
      const rect = track.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(100, ((clientX - rect.left) / rect.width) * 100),
      );
      return getValueFromPercent(percent);
    },
    [hardMin, hardMax, isWrapped, totalRange],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    const val = getValueFromEvent(e.clientX);
    if (val === null) return;

    const distToMin = Math.abs(val - min);
    const distToMax = Math.abs(val - max);
    dragging.current = distToMin <= distToMax ? "min" : "max";

    const handleMouseMove = (e: MouseEvent) => {
      const newVal = getValueFromEvent(e.clientX);
      if (newVal === null) return;

      if (dragging.current === "min") {
        if (getPercent(newVal) < maxPercent - 1) {
          onMinChange(newVal);
        }
      } else {
        if (getPercent(newVal) > minPercent + 1) {
          onMaxChange(newVal);
        }
      }
    };

    const handleMouseUp = () => {
      dragging.current = null;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const val = getValueFromEvent(touch.clientX);
    if (val === null) return;

    const distToMin = Math.abs(val - min);
    const distToMax = Math.abs(val - max);
    dragging.current = distToMin <= distToMax ? "min" : "max";

    const handleTouchMove = (e: TouchEvent) => {
      const newVal = getValueFromEvent(e.touches[0].clientX);
      if (newVal === null) return;

      if (dragging.current === "min") {
        if (getPercent(newVal) < maxPercent - 1) {
          onMinChange(newVal);
        }
      } else {
        if (getPercent(newVal) > minPercent + 1) {
          onMaxChange(newVal);
        }
      }
    };

    const handleTouchEnd = () => {
      dragging.current = null;
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between mb-1">
        <h3 className="text-sm text-gray-900 font-semibold">{label}</h3>
        <span className="text-xs font-semibold text-gray-500">
          {min} – {max}
        </span>
      </div>

      <div
        ref={trackRef}
        role="slider"
        aria-label={`Adjust ${label} range — min ${min}, max ${max}`}
        aria-valuemin={hardMin}
        aria-valuemax={hardMax}
        className="relative h-5 flex items-center cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
        {isWrapped ? (
          <>
            <div
              className="absolute h-1.5 bg-gray-900 rounded-full"
              style={{ left: 0, width: `${maxPercent}%` }}
            />
            <div
              className="absolute h-1.5 bg-gray-900 rounded-full"
              style={{ left: `${minPercent}%`, right: 0 }}
            />
          </>
        ) : (
          <div
            className="absolute h-1.5 bg-gray-900 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        )}

        <div
          className="absolute w-4 h-4 bg-white border-2 border-gray-900 rounded-full shadow"
          style={{ left: `calc(${minPercent}% - 8px)` }}
        />
        <div
          className="absolute w-4 h-4 bg-white border-2 border-gray-900 rounded-full shadow"
          style={{ left: `calc(${maxPercent}% - 8px)` }}
        />
      </div>
    </div>
  );
}

const hslFields = [
  {
    label: "Hue",
    key: "hue",
    bg: "bg-orange-200",
    border: "border-orange-300",
  },
  {
    label: "Saturation",
    key: "sat",
    bg: "bg-red-200",
    border: "border-red-300",
  },
  {
    label: "Lightness",
    key: "light",
    bg: "bg-purple-200",
    border: "border-purple-300",
  },
] as const;

export default function HSLControlPanel() {
  const [activeColor, setActiveColor] = useState<string>();

  const hslControlPanelModel = useModelStore(
    (state) => state.hslControlPanelModel,
  );
  const toggleHslControlPanelModel = useModelStore(
    (state) => state.toggleHslControlPanelModel,
  );
  const preferredItems = useGeneratorStore((state) => state.preferredItems);
  const hslControlPanelFamilies = useGeneratorStore(
    (state) => state.hslControlPanelFamilies,
  );
  const updateHslControlPanelFamily = useGeneratorStore(
    (state) => state.updateHslControlPanelFamily,
  );
  const resetHslControlPanelFamilies = useGeneratorStore(
    (state) => state.resetHslControlPanelFamilies,
  );
  const addHslControlPanelFamily = useGeneratorStore(
    (state) => state.addHslControlPanelFamily,
  );

  useEffect(() => {
    setActiveColor(preferredItems[0]);
  }, []);

  useEffect(() => {
    if (!hslControlPanelModel) return;

    preferredItems.forEach((name) => {
      addHslControlPanelFamily(name, colorFamilies[name]);
    });
  }, [hslControlPanelModel]);

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleHslControlPanelModel();
    }
  };

  const originalFamily = activeColor ? colorFamilies[activeColor] : null;

  return (
    <AnimatePresence>
      {hslControlPanelModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 z-50 grid place-content-center max-md:block max-md:px-4 parent"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="HSL Control Panel — Adjust hue, saturation, and lightness"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-170 bg-white rounded-xl shadow-2xl max-md:w-full"
          >
            <div className="w-full p-4 flex items-center justify-between bg-white rounded-t-xl border-b border-gray-200">
              <div className="flex flex-col items-start gap-0.5">
                <h3 className="text-md font-semibold text-gray-900">
                  HSL Control Panel
                </h3>
                <p className="text-xs font-medium text-gray-600">
                  Adjust HSL for each selected color.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Button
                  aria-label="Reset HSL values to default"
                  variant={"distrcutiveText"}
                  size={"p0"}
                  disabled={preferredItems.length === 0}
                  onClick={() => {
                    resetHslControlPanelFamilies();
                    FlashMessage("success", "HSL values reset to default.");
                  }}
                >
                  Reset Hsl
                </Button>
                <Button
                  aria-label="Apply HSL changes and close panel"
                  onClick={() => toggleHslControlPanelModel()}
                  variant={"primary"}
                  size={"md"}
                >
                  Done
                </Button>
              </div>
            </div>

            <div className="w-full flex">
              <div className="w-45 h-100 border-r border-gray-200 p-2.5 shrink-0 flex flex-col gap-1 items-start overflow-y-auto noscrollbar">
                {preferredColors.map(({ id, name, hex }) => {
                  const isInclude = preferredItems.includes(name);
                  const isActive = activeColor === name;
                  return (
                    <button
                      key={id}
                      disabled={!isInclude}
                      aria-label={`${isInclude ? "Select" : "Unavailable"} ${name} color family`}
                      aria-pressed={isActive}
                      className={`w-full flex items-center justify-between p-2 rounded-lg border ${
                        !isInclude
                          ? "opacity-60 cursor-not-allowed border-white"
                          : `hover:border-gray-200 hover:bg-gray-100 cursor-pointer ${
                              isActive
                                ? "border-gray-200 bg-gray-100"
                                : "border-white"
                            }`
                      }`}
                      onClick={() => setActiveColor(name)}
                    >
                      <p
                        className={`text-sm font-semibold ${!isInclude ? "text-gray-600" : "text-gray-900"}`}
                      >
                        {name}
                      </p>
                      <span
                        className={`w-4 h-4 rounded-full shadow-sm ${!isInclude ? "opacity-50" : ""}`}
                        style={{ backgroundColor: hex }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="w-full h-100 p-4 overflow-y-auto">
                {preferredItems.length === 0 ? (
                  <div className="w-full h-full grid place-content-center bg-gray-100 border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">
                      Select preferred colors to continue.
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      {hslFields.map(({ label, key, bg, border }) => (
                        <div
                          key={key}
                          className={`w-full p-3 ${bg} border ${border} rounded-lg`}
                        >
                          <h3 className="text-sm font-semibold text-gray-900">
                            {label}
                          </h3>
                          <div className="flex flex-col gap-1.5 mt-3">
                            {(["Min", "Max"] as const).map((type, i) => (
                              <div
                                key={type}
                                className="w-full flex items-center justify-between"
                              >
                                <span className="text-xs font-semibold text-gray-900">
                                  {type}
                                </span>
                                <span className="text-xs font-semibold text-gray-900">
                                  {activeColor
                                    ? `~ ${hslControlPanelFamilies[activeColor]?.[key][i]}`
                                    : "–"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex flex-col gap-6 px-1.5 mt-2">
                      {hslFields.map(({ label, key }) => {
                        const hardMin = originalFamily?.[key][0] ?? 0;
                        const hardMax = originalFamily?.[key][1] ?? 100;
                        const min = activeColor
                          ? (hslControlPanelFamilies[activeColor]?.[key][0] ??
                            hardMin)
                          : hardMin;
                        const max = activeColor
                          ? (hslControlPanelFamilies[activeColor]?.[key][1] ??
                            hardMax)
                          : hardMax;

                        return (
                          <DualRangeSlider
                            key={key}
                            label={label}
                            min={min}
                            max={max}
                            hardMin={hardMin}
                            hardMax={hardMax}
                            onMinChange={(val) =>
                              activeColor &&
                              updateHslControlPanelFamily(
                                activeColor,
                                key,
                                0,
                                val,
                              )
                            }
                            onMaxChange={(val) =>
                              activeColor &&
                              updateHslControlPanelFamily(
                                activeColor,
                                key,
                                1,
                                val,
                              )
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
