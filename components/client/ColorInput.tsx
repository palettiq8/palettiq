"use client";

import { FlashMessage } from "@/utils/utils";
import { colord } from "colord";
import { Dispatch, SetStateAction } from "react";
import { LuCopy } from "react-icons/lu";

export default function ColorInput({
  hex,
  setHex,
}: {
  hex: string;
  setHex: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full relative">
      <input
        value={hex}
        type="text"
        placeholder="Enter HEX color code"
        aria-label="Enter HEX color code"
        className="w-full py-1.5 pl-2.5 pr-10 rounded-lg border-2 border-gray-200 text-sm font-semibold text-gray-900 placeholder:text-gray-500 uppercase caret-gray-500 outline-none focus:border-indigo-500"
        onChange={(e) => {
          setHex(e.target.value);
        }}
        onPaste={(e) => {
          e.preventDefault();

          const pastedData = e.clipboardData.getData("Text");
          const colorObj = colord(
            pastedData.slice(0, 1) !== "#" ? `#${pastedData}` : pastedData,
          );

          if (!colorObj.isValid()) {
            FlashMessage("error", "Not a valid color!");
          } else {
            setHex(colorObj.toHex());
          }
        }}
        onBlur={(e) => {
          const value = e.target.value;
          if (value === "") return;

          const colorObj = colord(value);

          if (colorObj.isValid()) {
            setHex(colorObj.toHex());
          } else {
            FlashMessage("error", "Not a valid color!");
          }
        }}
      />
      <button
        aria-label={`Copy HEX color code ${hex.toUpperCase()}`}
        onClick={async () => {
          await navigator.clipboard.writeText(hex.toUpperCase());
          FlashMessage("success", "Copied to the clipboard!");
        }}
        className="text-gray-600 absolute top-1 right-1 cursor-pointer w-6.5 h-6.5 rounded-md hover:bg-gray-100 grid place-content-center border border-white hover:border-gray-200"
      >
        <LuCopy size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
