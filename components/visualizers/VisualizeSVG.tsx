// "use client";

// import { useVisualizerStore } from "@/libs/stores/dataStore";
// import { PaletteColor } from "@/utils/Types";
// import { distributePalette } from "@/utils/utils";
// import { useEffect, useMemo, useRef } from "react";

// function normaliseColor(raw: string): string | null {
//   if (!raw || raw === "none" || raw === "transparent") return null;
//   const s = raw.trim().toLowerCase();
//   if (s.startsWith("#") && s.length === 7) return s;
//   if (s.startsWith("#") && s.length === 4)
//     return "#" + s[1] + s[1] + s[2] + s[2] + s[3] + s[3];
//   const rgbMatch = s.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/);
//   if (rgbMatch)
//     return (
//       "#" +
//       [rgbMatch[1], rgbMatch[2], rgbMatch[3]]
//         .map((n) => parseInt(n).toString(16).padStart(2, "0"))
//         .join("")
//     );
//   return null;
// }

// function buildLiveSVG(
//   originalSVG: string,
//   selectedColors: string[],
//   palette: PaletteColor[],
// ): string {
//   if (!originalSVG || !selectedColors.length || !palette.length)
//     return originalSVG;

//   const distributed = distributePalette(palette, selectedColors.length);
//   let result = originalSVG;

//   selectedColors.forEach((originalColor, i) => {
//     const paletteColor = distributed[i]?.color ?? originalColor;
//     const escaped = originalColor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     result = result.replace(new RegExp(escaped, "gi"), paletteColor);
//   });

//   return result;
// }

// export default function VisualizeSVG({ palette }: { palette: PaletteColor[] }) {
//   const uploadedSVGString = useVisualizerStore((s) => s.uploadedSVGString);
//   const uploadedSVGSelectedColors = useVisualizerStore(
//     (s) => s.uploadedSVGSelectedColors,
//   );
//   const setVisualizerActiveColor = useVisualizerStore(
//     (s) => s.setVisualizerActiveColor,
//   );

//   const containerRef = useRef<HTMLDivElement>(null);

//   const liveSVG = useMemo(
//     () =>
//       buildLiveSVG(uploadedSVGString ?? "", uploadedSVGSelectedColors, palette),
//     [uploadedSVGString, uploadedSVGSelectedColors, palette],
//   );

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     // No SVG — clear and bail
//     if (!uploadedSVGString || !liveSVG) {
//       container.innerHTML = "";
//       return;
//     }

//     container.innerHTML = liveSVG;

//     const svgEl = container.querySelector("svg");
//     if (!svgEl) return;

//     svgEl.style.width = "100%";
//     svgEl.style.height = "100%";
//     svgEl.style.pointerEvents = "all";

//     const handlers: Array<{ el: Element; fn: (e: Event) => void }> = [];

//     const attach = (el: Element, color: string) => {
//       const fn = (e: Event) => {
//         e.stopPropagation();
//         setVisualizerActiveColor(color);
//       };
//       el.addEventListener("click", fn);
//       handlers.push({ el, fn });
//     };

//     // Normal fill elements
//     svgEl.querySelectorAll("[fill]").forEach((el) => {
//       const fillAttr = el.getAttribute("fill") ?? "";
//       if (fillAttr.startsWith("url(") || fillAttr === "none") return;
//       const color = normaliseColor(fillAttr);
//       if (color) attach(el, color);
//     });

//     // Gradient fill elements — use live stop-color (already palette-replaced)
//     svgEl.querySelectorAll('[fill^="url("]').forEach((el) => {
//       const fillAttr = el.getAttribute("fill") ?? "";
//       const idMatch = fillAttr.match(/url\(#([^)]+)\)/);
//       if (!idMatch) return;
//       const gradient = svgEl.querySelector(`#${CSS.escape(idMatch[1])}`);
//       const firstStop = gradient?.querySelector("stop");
//       const stopColor = normaliseColor(
//         firstStop?.getAttribute("stop-color") ??
//           (firstStop as HTMLElement | null)?.style?.stopColor ??
//           "",
//       );
//       if (stopColor) attach(el, stopColor);
//     });

//     return () => {
//       handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
//     };
//   }, [liveSVG, uploadedSVGString, setVisualizerActiveColor]);

//   // Always render the div so containerRef is always mounted.
//   // Hide visually when no SVG uploaded.
//   return (
//     <div
//       ref={containerRef}
//       className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full cursor-pointer"
//       style={{ display: uploadedSVGString ? "flex" : "none" }}
//     />
//   );
// }
"use client";

import { useVisualizerStore } from "@/libs/stores/dataStore";
import { PaletteColor } from "@/utils/Types";
import { distributePalette } from "@/utils/utils";
import { useEffect, useMemo, useRef } from "react";

function normaliseColor(raw: string): string | null {
  if (!raw || raw === "none" || raw === "transparent") return null;
  const s = raw.trim().toLowerCase();
  if (s.startsWith("#") && s.length === 7) return s;
  if (s.startsWith("#") && s.length === 4)
    return "#" + s[1] + s[1] + s[2] + s[2] + s[3] + s[3];
  const rgbMatch = s.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/);
  if (rgbMatch)
    return (
      "#" +
      [rgbMatch[1], rgbMatch[2], rgbMatch[3]]
        .map((n) => parseInt(n).toString(16).padStart(2, "0"))
        .join("")
    );
  return null;
}

function buildLiveSVG(
  originalSVG: string,
  selectedColors: string[],
  palette: PaletteColor[],
): string {
  if (!originalSVG || !selectedColors.length || !palette.length)
    return originalSVG;

  const distributed = distributePalette(palette, selectedColors.length);
  let result = originalSVG;

  selectedColors.forEach((originalColor, i) => {
    const paletteColor = distributed[i]?.color ?? originalColor;
    const escaped = originalColor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(escaped, "gi"), paletteColor);
  });

  return result;
}

export default function VisualizeSVG({ palette }: { palette: PaletteColor[] }) {
  const uploadedSVGString = useVisualizerStore((s) => s.uploadedSVGString);
  const uploadedSVGSelectedColors = useVisualizerStore(
    (s) => s.uploadedSVGSelectedColors,
  );
  const setVisualizerActiveColors = useVisualizerStore(
    (s) => s.setVisualizerActiveColors,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const liveSVG = useMemo(
    () =>
      buildLiveSVG(uploadedSVGString ?? "", uploadedSVGSelectedColors, palette),
    [uploadedSVGString, uploadedSVGSelectedColors, palette],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // No SVG — clear and bail
    if (!uploadedSVGString || !liveSVG) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = liveSVG;

    const svgEl = container.querySelector("svg");
    if (!svgEl) return;

    svgEl.style.width = "100%";
    svgEl.style.height = "100%";
    svgEl.style.pointerEvents = "all";

    const handlers: Array<{ el: Element; fn: (e: Event) => void }> = [];

    const attach = (el: Element, color: string) => {
      const fn = (e: Event) => {
        e.stopPropagation();
        setVisualizerActiveColors([color.toUpperCase()]);
      };
      el.addEventListener("click", fn);
      handlers.push({ el, fn });
    };

    // Normal fill elements
    svgEl.querySelectorAll("[fill]").forEach((el) => {
      const fillAttr = el.getAttribute("fill") ?? "";
      if (fillAttr.startsWith("url(") || fillAttr === "none") return;
      const color = normaliseColor(fillAttr);
      if (color) attach(el, color);
    });

    // Gradient fill elements — use live stop-color (already palette-replaced)
    // Gradient fill elements
    svgEl.querySelectorAll('[fill^="url("]').forEach((el) => {
      const fillAttr = el.getAttribute("fill") ?? "";
      const idMatch = fillAttr.match(/url\(#([^)]+)\)/);
      if (!idMatch) return;
      const gradient = svgEl.querySelector(`#${CSS.escape(idMatch[1])}`);
      const stops = Array.from(gradient?.querySelectorAll("stop") ?? []);
      const stopColors = stops
        .map((s) =>
          normaliseColor(
            s.getAttribute("stop-color") ?? s.style?.stopColor ?? "",
          ),
        )
        .filter(Boolean) as string[];

      if (!stopColors.length) return;

      const fn = (e: Event) => {
        e.stopPropagation();
        setVisualizerActiveColors(stopColors.map((c) => c.toUpperCase()));
      };
      el.addEventListener("click", fn);
      handlers.push({ el, fn });
    });

    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    };
  }, [liveSVG, uploadedSVGString, setVisualizerActiveColors]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full cursor-pointer"
      style={{ display: uploadedSVGString ? "flex" : "none" }}
    />
  );
}
