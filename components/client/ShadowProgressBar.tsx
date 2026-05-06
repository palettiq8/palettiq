"use client";

import { useShadowStore } from "@/libs/stores/dataStore";
import { ShadowPropsType } from "@/utils/Types";

export default function ShadowProgressBar({
  title,
  value,
  index,
  min,
  max,
  step,
  property,
}: ShadowPropsType) {
  const updateShadow = useShadowStore((state) => state.updateShadow);
  const setShadowCornerRadius = useShadowStore(
    (state) => state.setShadowCornerRadius,
  );
  const setShadowContainerSize = useShadowStore(
    (state) => state.setShadowContainerSize,
  );
  const setTextShadowSize = useShadowStore((state) => state.setTextShadowSize);
  const setTextShadowWeight = useShadowStore(
    (state) => state.setTextShadowWeight,
  );
  const updateTextShadow = useShadowStore((state) => state.updateTextShadow);
  const activeShadowTab = useShadowStore((state) => state.activeShadowTab);
  return (
    <div className="w-full p-3">
      <div className="w-full flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-gray-900 shrink-0">
          {title}
        </label>
        <div className="flex items-center w-full gap-4">
          <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            aria-label={`Adjust ${title} — current value ${value}`}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (index !== undefined) {
                if (activeShadowTab === "Box Shadow") {
                  updateShadow(index, property, val);
                } else if (activeShadowTab === "Text Shadow") {
                  updateTextShadow(index, property, val);
                }
              } else {
                if (property === "radius") {
                  setShadowCornerRadius(val);
                } else if (property === "size") {
                  setShadowContainerSize(val);
                } else if (property === "fontsize") {
                  setTextShadowSize(val);
                } else if (property === "fontweight") {
                  setTextShadowWeight(val);
                }
              }
            }}
            style={{
              background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <span className="text-sm font-semibold text-gray-900 shrink-0 w-max text-end">
            {`${value}px`}
          </span>
        </div>
      </div>
    </div>
  );
}
