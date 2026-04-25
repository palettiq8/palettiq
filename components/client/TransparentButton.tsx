"use client";

import { colord } from "colord";
import { IconType } from "react-icons";

export default function TransparentButton({
  content,
  Icon,
  parentBg,
  handler,
}: {
  content?: string;
  Icon?: IconType;
  parentBg: string;
  handler: (e: React.MouseEvent) => void;
}) {
  const isLight = colord(parentBg).isLight();
  return (
    <button
      onClick={handler}
      className={`w-11 h-11 rounded-full ${isLight ? "bg-black/10 text-gray-900" : "bg-white/10 text-gray-50"} hover:transition-all active:scale-90 grid place-content-center cursor-pointer select-none`}
      
    >
      {content ? (
        <p className="text-lg">{content}</p>
      ) : (
        Icon && <Icon size={18} />
      )}
    </button>
  );
}
