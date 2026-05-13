"use client";

import { FlashMessage } from "@/utils/utils";
import { LuMail } from "react-icons/lu";

export default function SupportEmail() {
  return (
    <div
      className="flex items-center gap-2 bg-gray-100 border border-gray-200 h-10 px-4 rounded-full hover:bg-gray-200 transition-colors cursor-pointer   "
      onClick={async () => {
        try {
          await navigator.clipboard.writeText("palettiq8@gmail.com");
          FlashMessage("success", "Support email copied to the clipboard!");
        } catch {
          FlashMessage(
            "error",
            "Something went wrong while coping support email.",
          );
        }
      }}
    >
      <LuMail size={16} className="shrink-0" />
      <p className="text-sm font-medium text-gray-900">hello@palettiq.net</p>
    </div>
  );
}
