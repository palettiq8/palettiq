"use client";

import { HexAlphaColorPicker } from "react-colorful";

export default function ColorPicker({
  color,
  setColor,
}: {
  color: string;
  setColor: (newColor: string) => void;
}) {
  return <HexAlphaColorPicker color={color} onChange={setColor} />;
}
