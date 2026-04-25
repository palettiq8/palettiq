"use client";

import { preferredColors } from "@/utils/Items";
import { useState, useCallback, useMemo, memo } from "react";
import { LuCheck } from "react-icons/lu";
import { Button } from "@/components/Button";

const ColorItem = memo(({ item, isSelected, toggle }: any) => {
  return (
    <div
      className={`w-full flex items-center justify-between p-4 rounded-xl border hover:cursor-pointer hover:bg-gray-50 transition-all ${
        isSelected ? "bg-gray-50 border-gray-300" : "bg-white border-gray-200"
      }`}
      onClick={() => toggle(item.hex)}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-7 h-7 rounded-full"
          style={{ backgroundColor: item.hex }}
        />
        <p className="text-md font-semibold text-gray-900">{item.name}</p>
      </div>
      {isSelected && <LuCheck className="text-gray-900" size={18} />}
    </div>
  );
});

ColorItem.displayName = "ColorItem";

export default function ColorPreferences() {
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());

  const toggleColor = useCallback((hex: string) => {
    setSelectedColors((prev) => {
      const set = new Set(prev);
      if (set.has(hex)) {
        set.delete(hex);
      } else {
        set.add(hex);
      }
      return set;
    });
  }, []);

  const clearHandler = useCallback(() => setSelectedColors(new Set()), []);

  const selectedColorsArray = useMemo(
    () => Array.from(selectedColors),
    [selectedColors],
  );
  const hasSelection = selectedColors.size > 0;

  return (
    <>
      <div className="w-full mt-8 grid grid-cols-4 gap-4">
        {preferredColors.map((item) => (
          <ColorItem
            key={item.id}
            item={item}
            isSelected={selectedColors.has(item.hex)}
            toggle={toggleColor}
          />
        ))}
      </div>

      <div className="w-full flex justify-between items-center mt-6">
        {hasSelection ? (
          <div className="flex relative select-none">
            {selectedColorsArray.map((hex, index) => (
              <div
                key={hex}
                className={`w-8 h-8 rounded-full ${index !== 0 && "-ml-3"} border-2 border-white`}
                style={{ backgroundColor: hex }}
              />
            ))}
            <span className="text-xs font-medium absolute top-2 -right-4 text-gray-900">
              +{selectedColors.size}
            </span>
          </div>
        ) : (
          <p className="text-md font-medium text-gray-900">
            Select one or multiple colors.
          </p>
        )}

        <div className="flex items-center gap-6">
          <Button onClick={clearHandler} variant="distrcutiveText" size="p0">
            Clear
          </Button>
          <Button disabled={!hasSelection} variant="primary" size="lg">
            Generate Awesome 😍
          </Button>
        </div>
      </div>
    </>
  );
}
