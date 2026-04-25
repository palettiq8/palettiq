"use client";

import { LuPlus } from "react-icons/lu";
import { Button } from "../Button";

export default function ShadowAddLayerContainer({
  handler,
}: {
  handler: () => void;
}) {
  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-md font-semibold text-gray-900">Shadow Layers</p>
      <Button onClick={handler} variant={"outline"} size={"sm"}>
        <LuPlus size={16} />
        <span>Add layer</span>
      </Button>
    </div>
  );
}
