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
      <h3 className="text-md font-semibold text-gray-900">Shadow Layers</h3>
      <Button
        aria-label="Add new shadow layer"
        onClick={handler}
        variant={"outline"}
        size={"sm"}
      >
        <LuPlus size={16} aria-hidden="true" />
        <span>Add layer</span>
      </Button>
    </div>
  );
}
