import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import {
  StopType,
  RadialType,
  ConicType,
  PaletteColor,
  ShadowLayer,
  TextShadowLayer,
  PaletteFilters,
} from "./Types";
import {
  brightnessLevels,
  colorFamilies,
  colorHarmonies,
  industries,
  modes,
  moods,
  preferredColors,
  saturationLevels,
  useCases,
} from "./Items";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import LZString from "lz-string";

extend([a11yPlugin]);

const harmonyOffsets: Record<string, number[]> = {
  analogous: [0, 30, -30, 60, -60],
  monochromatic: [0],
  complementary: [0, 180],
  "double-split-complementary": [0, 30, -30, 150, 210],
  rectangle: [0, 90, 180, 270],
  "split-complementary": [0, 150, 210],
  tetradic: [0, 90, 180, 270],
  triadic: [0, 120, 240],
};

export const generateHarmoniousPalette = (
  count: number,
  chosenColors: string[],
  customFamilies: Record<string, ColorFamily> | null,
  harmony: string | null,
): string[] => {
  const safeCustomFamilies = customFamilies ?? {};

  const allFamilyNames = Object.keys(colorFamilies);
  const pool = chosenColors.length > 0 ? chosenColors : allFamilyNames;
  const baseFamilyName = pool[Math.floor(Math.random() * pool.length)];
  const baseFamily =
    safeCustomFamilies[baseFamilyName] ?? colorFamilies[baseFamilyName];

  if (!baseFamily) {
    return Array.from({ length: count }, () => generateRandomColor());
  }

  const allHarmonyKeys = colorHarmonies.map((h) => h.harmony);
  const activeHarmony =
    harmony ??
    allHarmonyKeys[Math.floor(Math.random() * allHarmonyKeys.length)];
  const offsets = harmonyOffsets[activeHarmony] ?? [0];

  const [h1, h2] = baseFamily.hue;
  const baseHue =
    h1 > h2
      ? Math.random() < 0.5
        ? randomBetween(h1, 360)
        : randomBetween(0, h2)
      : randomBetween(h1, h2);

  const [lightMin, lightMax] = baseFamily.light;
  const lightnessSteps = Array.from({ length: count }, (_, i) => {
    if (count === 1) return (lightMin + lightMax) / 2;
    const t = i / (count - 1);
    const jitter = randomBetween(-3, 3);
    return Math.min(
      lightMax,
      Math.max(lightMin, lightMin + t * (lightMax - lightMin) + jitter),
    );
  });

  const familyRange = lightMax - lightMin;
  const minGap = Math.max(4, familyRange * 0.08);
  for (let i = 1; i < lightnessSteps.length; i++) {
    const diff = lightnessSteps[i] - lightnessSteps[i - 1];
    if (diff < minGap) {
      lightnessSteps[i] = Math.min(lightMax, lightnessSteps[i - 1] + minGap);
    }
  }

  const baseSat = randomBetween(baseFamily.sat[0], baseFamily.sat[1]);

  const colors = Array.from({ length: count }, (_, i) => {
    const offset = offsets[i % offsets.length];
    const hue = (baseHue + offset + 360) % 360;

    let sat = Math.min(
      baseFamily.sat[1],
      Math.max(baseFamily.sat[0], baseSat + randomBetween(-8, 8)),
    );
    const light = lightnessSteps[i];
    if (light > 75 && sat > 70) {
      sat = sat - (light - 75) * 0.4;
    }
    if (light < 25 && sat < 60) {
      sat = sat + (25 - light) * 0.5;
    }
    sat = Math.min(baseFamily.sat[1], Math.max(baseFamily.sat[0], sat));

    return { hue, sat, light };
  });

  if (activeHarmony === "monochromatic") {
    colors.sort((a, b) => a.light - b.light);
  }

  return colors.map((c) => hslToHex(c.hue, c.sat, c.light));
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function FlashMessage(status: string, message: string) {
  const style = {
    backgroundColor: "oklch(13% 0.028 261.692)",
    color: "oklch(98.5% 0.002 247.839)",
    fontSize: "14px",
    borderRadius: "12px",
    padding: "12px",
  };
  if (status === "success") {
    toast.success(message, { style });
  } else if (status === "error") {
    toast.error(message, { style });
  }
  return;
}
export function makeTextShorter(text: string, length: number) {
  const textLength = text?.length;
  let sliced;
  if (textLength >= length) {
    sliced = `${text.slice(0, length)}...`;
  } else {
    sliced = text;
  }
  return sliced;
}

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const hslToHex = (h: number, s: number, l: number): string => {
  const sPct = s / 100;
  const lPct = l / 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = sPct * Math.min(lPct, 1 - lPct);
  const f = (n: number) =>
    lPct - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
};

export const generateRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`.toUpperCase();
};

export const generateColorForFamily = (
  familyName: string,
  customFamilies?: Record<string, ColorFamily>,
): string => {
  const family = customFamilies?.[familyName] ?? colorFamilies[familyName];
  if (!family) return generateRandomColor();

  const [h1, h2] = family.hue;
  const hue =
    h1 > h2
      ? Math.random() < 0.5
        ? randomBetween(h1, 360)
        : randomBetween(0, h2)
      : randomBetween(h1, h2);

  const sat = randomBetween(family.sat[0], family.sat[1]);
  const light = randomBetween(family.light[0], family.light[1]);

  return hslToHex(hue, sat, light);
};

export const generateColor = (
  isLocked: boolean,
  currentColor: string,
  chosenColors: string[],
  customFamilies?: Record<string, ColorFamily> | null,
): string => {
  if (isLocked) return currentColor;

  const safeCustomFamilies = customFamilies ?? {};

  if (chosenColors.length === 0) {
    return generateRandomColor();
  }

  const randomFamily =
    chosenColors[Math.floor(Math.random() * chosenColors.length)];
  return generateColorForFamily(randomFamily, safeCustomFamilies);
};

export const copyTextHandlerOnly = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content.toUpperCase());
    FlashMessage("success", "Copied to the clipboard!");
  } catch (err) {
    FlashMessage("error", "Something went wrong!");
  }
};

export const checkIsLight = (rgb: string) => colord(rgb).isLight();

export const getColorAtPosition = (stops: StopType[], position: number) => {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const left = sorted.filter((s) => s.position <= position).pop();
  const right = sorted.find((s) => s.position >= position);

  if (!left && right) return right.color;
  if (!right && left) return left.color;
  if (!left || !right) return "#ffffff";

  const range = right.position - left.position;
  const factor = (position - left.position) / range;
  const color1 = left.color;
  const color2 = right.color;

  const c1 = colord(color1).toRgb();
  const c2 = colord(color2).toRgb();

  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));

  return colord(`rgb(${r}, ${g}, ${b})`).toHex();
};

export const getGradientCSS = (
  stops: StopType[],
  activeGradientType: string,
  gradientRotationValue: number | string,
  radial: RadialType,
  conic: ConicType,
) => {
  const visibleStops = stops.filter((stop) => !stop.isHide);

  if (visibleStops.length === 0) return "";

  const sortedStops = [...visibleStops].sort((a, b) => a.position - b.position);

  const unit = activeGradientType === "Conic" ? "deg" : "%";

  const stopsString = sortedStops
    .map((s) => `${s.color} ${s.position}${unit}`)
    .join(", ");

  const conicStopsString = sortedStops.map((s) => `${s.color}`).join(", ");

  switch (activeGradientType) {
    case "Linear":
      return `linear-gradient(${gradientRotationValue}deg, ${stopsString})`;

    case "Radial":
      return `radial-gradient(${radial.shape} at ${radial.x}% ${radial.y}%, ${stopsString})`;

    case "Conic":
      return `conic-gradient(from ${gradientRotationValue}deg at ${conic.x}% ${conic.y}%, ${conicStopsString})`;

    default:
      return "";
  }
};

type ColorFamily = {
  hue: [number, number];
  sat: [number, number];
  light: [number, number];
};

type ContrastPair = {
  foreground: string;
  background: string;
  family: string;
  ratio: number;
};

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export function generateContrastPair(
  colorFamilies: Record<string, ColorFamily>,
  preferredContrastItems: string[],
): ContrastPair {
  const families =
    preferredContrastItems.length === 0
      ? Object.keys(colorFamilies)
      : preferredContrastItems;

  const randomFamily = families[Math.floor(Math.random() * families.length)];

  const family = colorFamilies[randomFamily];

  const h = random(family.hue[0], family.hue[1]);
  const s = random(family.sat[0], family.sat[1]);

  const gap = random(0, 100);

  const l1 = random(0, 100 - gap);
  const l2 = l1 + gap;

  const color1 = colord({ h, s, l: l1 });
  const color2 = colord({ h, s, l: l2 });

  const ratio = color1.contrast(color2);

  return {
    foreground: color1.toHex(),
    background: color2.toHex(),
    family: randomFamily,
    ratio,
  };
}

export function generateComplementaryContrast(
  colorFamilies: Record<string, ColorFamily>,
  preferredContrastItems: string[],
): ContrastPair {
  if (!preferredContrastItems.length)
    return {
      foreground: "",
      background: "",
      family: "",
      ratio: 0,
    };

  const selectedFamilyName = preferredContrastItems[0];

  const family = colorFamilies[selectedFamilyName];

  if (!family)
    return {
      foreground: "",
      background: "",
      family: "",
      ratio: 0,
    };

  const h = random(family.hue[0], family.hue[1]);
  const s = random(family.sat[0], family.sat[1]);

  const lForeground = random(5, 45);
  const lBackground = random(55, 95);

  const foreground = colord({ h, s, l: lForeground });

  const complementaryHue = (h + 180) % 360;

  const background = colord({
    h: complementaryHue,
    s,
    l: lBackground,
  });

  return {
    foreground: foreground.toHex(),
    background: background.toHex(),
    family: selectedFamilyName,
    ratio: foreground.contrast(background),
  };
}

export function distributePalette(
  palette: PaletteColor[],
  SHAPE_COUNT: number,
) {
  if (!palette?.length) return [];

  return Array.from({ length: SHAPE_COUNT }, (_, i) => {
    const index = Math.floor((i * palette?.length) / SHAPE_COUNT);
    return palette[index];
  });
}

export function generateBoxShadow(layers: ShadowLayer[]): string {
  return layers
    .filter((layer) => layer.enabled)
    .map((layer) => {
      const { offsetX, offsetY, blur, spread, color, inset } = layer;
      return [
        inset ? "inset" : "",
        `${offsetX}px`,
        `${offsetY}px`,
        `${blur}px`,
        `${spread}px`,
        color,
      ]
        .filter(Boolean)
        .join(" ");
    })
    .join(", ");
}

export function generateTextShadow(layers: TextShadowLayer[]) {
  return layers
    .filter((layer) => layer.enabled)
    .map(
      (layer) =>
        `${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.color}`,
    )
    .join(", ");
}

export function generateMonochromatic(hex: string): string[] {
  const cleanHex = hex.replace("#", "");
  let r: number = parseInt(cleanHex.slice(0, 2), 16) / 255;
  let g: number = parseInt(cleanHex.slice(2, 4), 16) / 255;
  let b: number = parseInt(cleanHex.slice(4, 6), 16) / 255;

  const max: number = Math.max(r, g, b);
  const min: number = Math.min(r, g, b);
  let h: number = 0;
  let s: number = 0;
  let l: number = (max + min) / 2;

  if (max !== min) {
    const d: number = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  const results: string[] = [];
  const lightnessSteps: number[] = [];

  for (let i = 1; i <= 6; i++) {
    lightnessSteps.push(i * 0.14 + l * 0.1);
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  lightnessSteps.forEach((newL: number) => {
    const clampedL = Math.max(0.05, Math.min(0.95, newL));

    const q: number =
      clampedL < 0.5 ? clampedL * (1 + s) : clampedL + s - clampedL * s;
    const p: number = 2 * clampedL - q;

    const finalR: number = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const finalG: number = Math.round(hue2rgb(p, q, h) * 255);
    const finalB: number = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

    const toHex = (n: number): string => n.toString(16).padStart(2, "0");
    results.push(`#${toHex(finalR)}${toHex(finalG)}${toHex(finalB)}`);
  });

  return results;
}
export const generateCSS = (colors: string[]) => {
  return `:root {
${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n")}
}`;
};

export const generateTailwind = (colors: string[]) => {
  return `colors: {
${colors.map((c, i) => `  color${i + 1}: "${c}",`).join("\n")}
}`;
};

export const generateSCSS = (colors: string[]) => {
  return colors.map((c, i) => `$color-${i + 1}: ${c};`).join("\n");
};

export const generateGradient = (colors: string[]) => {
  return `background: linear-gradient(90deg, ${colors.join(", ")});`;
};

export const generateJSON = (colors: string[]) => {
  return JSON.stringify(
    {
      palette: colors.map((color, i) => ({
        name: `color-${i + 1}`,
        hex: colord(color).toHex(),
        rgb: colord(color).toRgb(),
        hsl: colord(color).toHsl(),
      })),
    },
    null,
    2,
  );
};

export const generateSVG = (colors: string[]) => {
  const width = 500;
  const height = 100;
  const segment = width / colors.length;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
${colors
  .map(
    (c, i) =>
      `  <rect x="${i * segment}" y="0" width="${segment}" height="${height}" fill="${c}" />`,
  )
  .join("\n")}
</svg>`;
};

export const generateArray = (colors: string[]) => {
  return `const palette = [${colors.map((c) => `"${c}"`).join(", ")}]`;
};

export const generateShareLink = (colors: string[], from: string) => {
  const encoded = encodeURIComponent(colors.join(","));
  let link = "";
  if (from === "Palette") {
    link = `${window.location.origin}/studio?colors=${encoded}`;
  }
  if (from === "Color") {
    link = `${window.location.origin}/studio/online-color-picker?color=${encoded}`;
  }
  return link;
};

export const getLanguage = (method: string) => {
  switch (method) {
    case "CSS":
    case "Gradient CSS":
      return "css";
    case "Tailwind CSS":
    case "Array":
      return "javascript";
    case "JSON":
      return "json";
    case "SCSS":
      return "scss";
    case "SVG":
      return "xml";
    default:
      return "text";
  }
};

export const downloadFile = (
  content: string,
  filename: string,
  type: string,
) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

const getContrastColor = (hex: string) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export const downloadPNG = (colors: string[], isWithoutHex: boolean) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = 1920;
  const height = 1080;

  const scale = window.devicePixelRatio || 1;
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);

  const segment = width / colors.length;

  colors.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.fillRect(i * segment, 0, segment, height);

    if (!isWithoutHex) {
      const textColor = getContrastColor(c);

      ctx.fillStyle = textColor;
      ctx.font = "bold 40px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const x = i * segment + segment / 2;
      const y = height / 2;

      ctx.fillText(c.toUpperCase(), x, y);
    }
  });

  const link = document.createElement("a");
  link.download = "image.png";
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
};

export const generateTailwindGradient = (gradient: string) => {
  const cleaned = gradient.replace("background:", "").replace(";", "").trim();

  return `bg-[${cleaned.replace(/,\s+/g, ",").replace(/\s+/g, "_")}]`;
};

export const generateSCSSGradient = (
  colors: string[],
  gradientExport?: string,
) => {
  if (!colors.length) return "";

  let type: "linear" | "radial" | "conic" = "linear";

  if (gradientExport?.includes("radial-gradient")) type = "radial";
  if (gradientExport?.includes("conic-gradient")) type = "conic";

  let direction = "90deg";
  let shape = "circle";
  let position = "50% 50%";
  let angle = "0deg";

  if (type === "radial") {
    const match = gradientExport?.match(
      /(circle|ellipse)?\s*at\s*([\d.]+%?)\s*([\d.]+%?)/,
    );
    if (match) {
      shape = match[1] || "circle";
      position = `${match[2]} ${match[3]}`;
    }
  }

  if (type === "conic") {
    const match = gradientExport?.match(
      /from\s*([\d.]+deg)\s*at\s*([\d.]+%?)\s*([\d.]+%?)/,
    );
    if (match) {
      angle = match[1];
      position = `${match[2]} ${match[3]}`;
    }
  }

  const variables = colors
    .map((color, i) => `$color${i + 1}: ${color};`)
    .join("\n");

  const stops = colors
    .map((_, i) => {
      const percent = Math.round((i / (colors.length - 1)) * 100);
      return `$color${i + 1} ${percent}%`;
    })
    .join(", ");

  let gradient = "";

  if (type === "linear") {
    gradient = `linear-gradient(${direction}, ${stops})`;
  }

  if (type === "radial") {
    gradient = `radial-gradient(${shape} at ${position}, ${stops})`;
  }

  if (type === "conic") {
    gradient = `conic-gradient(from ${angle} at ${position}, ${stops})`;
  }

  return `${variables}

.gradient {
  background: ${gradient};
}`;
};

export const generateJSONGradient = (
  colors: string[],
  gradientExport?: string,
) => {
  if (!colors.length) return "";

  let type: "linear" | "radial" | "conic" = "linear";

  if (gradientExport?.includes("radial-gradient")) type = "radial";
  if (gradientExport?.includes("conic-gradient")) type = "conic";

  let shape = "circle";
  let position = { x: "50%", y: "50%" };
  let angle = "from 0deg";
  let direction = "90deg";

  if (type === "radial") {
    const match = gradientExport?.match(
      /(circle|ellipse)?\s*at\s*([\d.]+%?)\s*([\d.]+%?)/,
    );
    if (match) {
      shape = match[1] || "circle";
      position = {
        x: match[2],
        y: match[3],
      };
    }
  }

  if (type === "conic") {
    const match = gradientExport?.match(
      /from\s*([\d.]+deg)\s*at\s*([\d.]+%?)\s*([\d.]+%?)/,
    );
    if (match) {
      angle = `from ${match[1]}`;
      position = {
        x: match[2],
        y: match[3],
      };
    }
  }

  const stops = colors.map((color, i) => ({
    color,
    position: Math.round((i / (colors.length - 1)) * 100) + "%",
  }));

  let data: any = {
    type,
    colors: stops,
  };

  if (type === "linear") data.direction = direction;
  if (type === "radial") {
    data.shape = shape;
    data.position = position;
  }
  if (type === "conic") {
    data.angle = angle;
    data.position = position;
  }

  return JSON.stringify(data, null, 2);
};

export const downloadGradientPNG = (
  stops: StopType[],
  activeGradientType: string,
  gradientRotationValue: number | string,
  radial: RadialType,
  conic: ConicType,
) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = canvas;
  const deg = Number(gradientRotationValue);

  const visibleStops = stops
    .filter((s) => !s.isHide)
    .sort((a, b) => a.position - b.position);

  if (visibleStops.length === 0) return;

  const addStops = (gradient: CanvasGradient, usePositions = true) => {
    visibleStops.forEach((s, i) => {
      const offset = usePositions
        ? Math.min(Math.max(s.position / 100, 0), 1)
        : visibleStops.length === 1
          ? 0
          : i / (visibleStops.length - 1);
      gradient.addColorStop(offset, s.color);
    });
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.download = `gradient-${activeGradientType.toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  };

  if (activeGradientType === "Linear") {
    const rad = (deg * Math.PI) / 180;
    const lineLength =
      Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad));

    const cx = width / 2;
    const cy = height / 2;
    const half = lineLength / 2;

    const x1 = cx - Math.sin(rad) * half;
    const y1 = cy + Math.cos(rad) * half;
    const x2 = cx + Math.sin(rad) * half;
    const y2 = cy - Math.cos(rad) * half;

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    addStops(gradient);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    triggerDownload();
  } else if (activeGradientType === "Radial") {
    const cx = (radial.x / 100) * width;
    const cy = (radial.y / 100) * height;

    if (radial.shape === "circle") {
      const r = Math.sqrt(
        Math.max(
          cx ** 2 + cy ** 2,
          (width - cx) ** 2 + cy ** 2,
          cx ** 2 + (height - cy) ** 2,
          (width - cx) ** 2 + (height - cy) ** 2,
        ),
      );

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      addStops(gradient);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      triggerDownload();
    } else {
      const rx = Math.max(cx, width - cx);
      const ry = Math.max(cy, height - cy);

      const offscreen = document.createElement("canvas");
      offscreen.width = rx * 2;
      offscreen.height = ry * 2;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const offCx = (cx / width) * (rx * 2);
      const offCy = (cy / height) * (ry * 2);

      const offGradient = offCtx.createRadialGradient(
        offCx,
        offCy,
        0,
        offCx,
        offCy,
        Math.max(rx, ry),
      );
      addStops(offGradient);

      offCtx.fillStyle = offGradient;
      offCtx.fillRect(0, 0, rx * 2, ry * 2);

      ctx.drawImage(offscreen, 0, 0, width, height);
      triggerDownload();
    }
  } else if (activeGradientType === "Conic") {
    const cx = (conic.x / 100) * width;
    const cy = (conic.y / 100) * height;
    const startAngle = ((deg - 90) * Math.PI) / 180;

    const gradient = ctx.createConicGradient(startAngle, cx, cy);
    addStops(gradient, false);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    triggerDownload();
  }
};

export const generateShadowString = (
  layers: ShadowLayer[] | TextShadowLayer[],
  isTextShadow: boolean,
) => {
  return layers
    .filter((l) => l.enabled)
    .map((l) => {
      if (isTextShadow) {
        const t = l as TextShadowLayer;

        return `${t.offsetX}px ${t.offsetY}px ${t.blur}px ${t.color}`;
      } else {
        const b = l as ShadowLayer;

        return `${b.inset ? "inset " : ""}${b.offsetX}px ${b.offsetY}px ${b.blur}px ${b.spread}px ${b.color}`;
      }
    })
    .join(", ");
};

export const exportShadowCSS = (
  layers: ShadowLayer[] | TextShadowLayer[],
  isTextShadow: boolean,
) => {
  const shadow = generateShadowString(layers, isTextShadow);

  return isTextShadow ? `text-shadow: ${shadow};` : `box-shadow: ${shadow};`;
};
export const exportShadowTailwind = (
  layers: ShadowLayer[] | TextShadowLayer[],
  isTextShadow: boolean,
) => {
  const shadow = generateShadowString(layers, isTextShadow)
    .replace(/,/g, "_")
    .replace(/ /g, "_");

  return isTextShadow ? `text-shadow-[${shadow}]` : `shadow-[${shadow}]`;
};
export const exportShadowSCSS = (
  layers: ShadowLayer[] | TextShadowLayer[],
  isTextShadow: boolean,
) => {
  const shadow = generateShadowString(layers, isTextShadow);

  return isTextShadow ? `$text-shadow: ${shadow};` : `$box-shadow: ${shadow};`;
};
export const exportShadowJSON = (layers: ShadowLayer[] | TextShadowLayer[]) => {
  return JSON.stringify(
    layers.filter((l) => l.enabled),
    null,
    2,
  );
};
export const exportShadowSVG = (
  layers: ShadowLayer[] | TextShadowLayer[],
  isTextShadow: boolean,
) => {
  const enabledLayers = layers.filter((l) => l.enabled);

  const filters = enabledLayers
    .map((l) => {
      if (isTextShadow) {
        const t = l as TextShadowLayer;

        return `<feDropShadow dx="${t.offsetX}" dy="${t.offsetY}" stdDeviation="${
          t.blur / 2
        }" flood-color="${t.color}" />`;
      } else {
        const b = l as ShadowLayer;

        return `<feDropShadow dx="${b.offsetX}" dy="${b.offsetY}" stdDeviation="${
          b.blur / 2
        }" flood-color="${b.color}" />`;
      }
    })
    .join("\n");

  return `<filter id="shadow">
  ${filters}
</filter>`;
};

export const buildGradientPayload = (
  stops: StopType[],
  activeGradientType: string,
  gradientRotationValue: number | string,
  radial: RadialType,
  conic: ConicType,
) => {
  return {
    v: 1,
    stops,
    type: activeGradientType,
    rotation: gradientRotationValue,
    radial,
    conic,
  };
};

export const generateGradientLink = (
  stops: StopType[],
  activeGradientType: string,
  gradientRotationValue: number | string,
  radial: RadialType,
  conic: ConicType,
) => {
  const payload = buildGradientPayload(
    stops,
    activeGradientType,
    gradientRotationValue,
    radial,
    conic,
  );

  const json = JSON.stringify(payload);
  const compressed = LZString.compressToEncodedURIComponent(json);

  return `${window.location.origin}/studio/css-gradient-generator?g=${compressed}`;
};

export const parseGradientFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const data = params.get("g");

  if (!data) return null;

  try {
    const json = LZString.decompressFromEncodedURIComponent(data);
    return JSON.parse(json!);
  } catch (e) {
    console.error("Invalid gradient link");
    return null;
  }
};

export function isValidEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function filtersToSlug(filters: PaletteFilters): string {
  const orderedColors = preferredColors.map((c) => c.name);
  const orderedMoods = moods;
  const orderedBrightness = brightnessLevels;
  const orderedSaturation = saturationLevels;
  const orderedModes = modes;
  const orderedIndustries = industries;
  const orderedUsecases = useCases;
  const orderedHarmonies = colorHarmonies.map((h) => h.title);

  const sortByOrder = (selected: string[], ordered: string[]) =>
    ordered.filter((v) => selected.includes(v));

  const parts = [
    ...sortByOrder(filters.preferred_colors ?? [], orderedColors),
    ...sortByOrder(filters.saturation_level ?? [], orderedSaturation),
    ...sortByOrder(filters.brightness_level ?? [], orderedBrightness),
    ...sortByOrder(filters.moods ?? [], orderedMoods),
    ...sortByOrder(filters.harmonies ?? [], orderedHarmonies),
    ...sortByOrder(filters.modes ?? [], orderedModes),
    ...sortByOrder(filters.industries ?? [], orderedIndustries),
    ...sortByOrder(filters.usecases ?? [], orderedUsecases),
  ]
    .filter(Boolean)
    .map((v) => v.toLowerCase().replace(/&/g, "and"));

  return [...new Set(parts)].join("-");
}

export function slugToFilters(slug: string): PaletteFilters {
  const segments = slug.split("-");

  const match = (validValues: string[]) =>
    validValues.filter((v) =>
      segments.includes(v.toLowerCase().replace(/&/g, "and")),
    );

  const allIndustries = industries;
  const allColors = preferredColors.map((c) => c.name);
  const allMoods = moods;
  const allBrightness = brightnessLevels;
  const allSaturation = saturationLevels;
  const allModes = modes;
  const allUsecases = useCases;
  const allHarmonies = colorHarmonies.map((h) => h.title);

  return {
    industries: match(allIndustries),
    preferred_colors: match(allColors),
    moods: match(allMoods),
    brightness_level: match(allBrightness),
    saturation_level: match(allSaturation),
    modes: match(allModes),
    usecases: match(allUsecases),
    harmonies: match(allHarmonies),
  };
}

export function filtersToGradientSlug(colors: string[]): string {
  const orderedColors = preferredColors.map((c) => c.name);

  return orderedColors
    .filter((c) => colors.includes(c))
    .map((v) => v.toLowerCase())
    .join("-");
}

export function gradientSlugToColors(slug: string): string[] {
  const segments = slug.split("-");
  const allColors = preferredColors.map((c) => c.name);
  return allColors.filter((c) => segments.includes(c.toLowerCase()));
}
