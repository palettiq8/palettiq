"use client";

import { FlashMessage } from "@/utils/utils";
import { colord } from "colord";
import { useCallback, useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";

export default function CopyTooltip({ color }: { color: string }) {
  const [copied, setCopied] = useState<string>("");
  const isLight = colord(color).isLight();
  const isShown = copied === color;

  const copyHandler = useCallback(async (hexCode: string) => {
    try {
      await navigator.clipboard.writeText(hexCode.toUpperCase());
      setCopied(hexCode);
    } catch (error) {
      FlashMessage("error", "Something went wrong!");
    }
  }, []);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div
      onClick={() => copyHandler(color)}
      className="w-full h-full group hover:cursor-pointer relative grid place-content-center"
    >
      <LuCheck
        size={20}
        className={`transition-all duration-300 ease-out transform origin-center ${
          isLight ? "text-gray-900" : "text-gray-50"
        } ${isShown ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
      />
      <div className="absolute top-5 left-1/2">
        <div className="relative -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-gray-50 text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap z-10">
          {`${isShown ? "Copied" : color.toUpperCase()}`}
          <div className="w-2 h-2 top-6 left-1/2 absolute rotate-45 bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
