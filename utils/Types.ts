import { IconType } from "react-icons";

export type HeaderLinkItem = {
  id: number;
  title: string;
  url: string;
};
export type Feature = {
  id: number;
  title: string;
  urlTitle: string;
  icon: IconType;
  desc: string;
  url: string;
};
export type PreferredColor = {
  id: number;
  name: string;
  hex: string;
};
export type FontCompareItem = {
  id: number;
  bgColor: string;
  font: string;
  name: string;
};
export type FooterItem = {
  id: number;
  title: string;
  url: string;
};
export type ColorRange = [number, number];
export interface ColorFamily {
  hue: ColorRange;
  sat: ColorRange;
  light: ColorRange;
}
export type PaletteColor = {
  id: string;
  color: string;
  isLocked: boolean;
};
export interface PickerContainer {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}
export interface Picker {
  x: number;
  y: number;
  color: string;
}
export type StopType = {
  id: string;
  color: string;
  isHide: boolean;
  position: number;
};
export type GradientContainerSize = {
  content: string;
  width: string;
  height: string;
};
export type RadialType = {
  shape: string;
  x: number;
  y: number;
};
export type ConicType = {
  x: number;
  y: number;
};
export type ActiveContrast = {
  textColor: string;
  bgColor: string;
};
export type ShadowLayer = {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
  enabled: boolean;
};
export type TextShadowLayer = {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
  enabled: boolean;
};
export type ShadowPropsType = {
  title: string;
  value: number;
  index?: number;
  min: number;
  max: number;
  step?: number;
  property: string;
};
export interface PublishedPaletteType {
  id: string;
  name: string;
  description: string;
  colors: PaletteColor[];
  industries: string[];
  preferred_colors: [];
  moods: string[];
  brightness_level: string[];
  saturation_level: string[];
  modes: string[];
  usecases: string[];
  harmonies: string[];
  tags: string[];
  status: string;
  created_at: Date;
  updated_at: Date;
}
export interface ColorType {
  id: string;
  name: string;
  shades: string[];
  created_at: Date;
  updated_at: Date;
}
export interface GradientType {
  id: string;
  name: string;
  description: string;
  stops: StopType[];
  parent_colors: string[];
  created_at: Date;
  updated_at: Date;
}
export type Position = {
  title: string;
  value: number;
};
export type Degree = {
  title: string;
  value: number;
};
export interface GeneratorStateTypes {
  colorCount: number;
  setColorCount: (count: number) => void;
  defaultPreference: boolean;
  setDefaultPreference: () => void;
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  preferredItems: string[];
  setPreferredItems: (item: string) => void;
  clearPreferredItems: () => void;
  generatedPalette: PaletteColor[];
  setGeneratedPalette: (palette?: PaletteColor[]) => void;
  updateGeneratedPalette: (index: number, color: string) => void;
  togglePaletteColorLock: (index: number) => void;
  paletteHistory: PaletteColor[][];
  setPaletteHistory: (palette?: PaletteColor[]) => void;
  clearAllHistory: () => void;
  generatorPaletteUndoHandler: () => void;
  generatorPaletteRedoHandler: () => void;
  hslControlPanelFamilies: Record<string, ColorFamily>;
  setHslControlPanelFamilies: (name: string, family: ColorFamily) => void;
  addHslControlPanelFamily: (name: string, family: ColorFamily) => void;
  updateHslControlPanelFamily: (
    name: string,
    key: "hue" | "sat" | "light",
    index: 0 | 1,
    value: number,
  ) => void;
  resetHslControlPanelFamilies: () => void;
  paletteStyle: string | null;
  setPaletteStyle: (style: string | null) => void;
}
export interface PickerStateTypes {
  defaultColorPreference: boolean;
  setDefaultColorPreference: () => void;
  colorHistoryIndex: number;
  setColorHistoryIndex: (index: number) => void;
  preferredColorItems: string;
  setPreferredColorItems: (item: string) => void;
  clearPreferredColorItems: () => void;
  colorPickerColor: string;
  setColorPickerColor: (value?: string) => void;
  colorHistory: string[];
  setColorHistory: (newColor?: string) => void;
  clearAllColorHistory: () => void;
  colorPickerUndoHandler: () => void;
  colorPickerRedoHandler: () => void;
}
export interface GradientStateTypes {
  defaultGradientPreference: boolean;
  setDefaultGradientPreference: () => void;
  preferredGradientItems: string[];
  setPreferredGradientItems: (item: string) => void;
  clearPreferredGradientItems: () => void;
  gradientHistoryIndex: number;
  setGradientHistoryIndex: (index: number) => void;
  gradientHistory: StopType[][];
  setGradientHistory: (stops?: StopType[]) => void;
  gradientUndoHandler: () => void;
  gradientRedoHandler: () => void;
  clearAllGradientHistory: () => void;
  gradientStops: StopType[];
  setGradientStop: () => void;
  MAX_STOPS: number;
  modifyActiveColor: StopType;
  setModifyActiveColor: (stop: StopType) => void;
  updateGradientStop: (
    id: string,
    value: string | number | boolean,
    to: "color" | "position" | "isHide",
  ) => void;
  removeGradientStop: (id: string) => void;
  activeGradientType: string;
  setActiveGradientType: (type: string) => void;
  gradientRotationValue: number | string;
  setGradientRotationValue: (value: number | string) => void;
  gradientContainerSize: GradientContainerSize;
  setGradientContainerSize: (item: GradientContainerSize) => void;
  gradientCornerRadius: number;
  setGradientCornerRadius: (value: number) => void;
  activeRadial: RadialType;
  setActiveRadial: (radial: RadialType) => void;
  activeConic: ConicType;
  setActiveConic: (conic: ConicType) => void;
  generateRandomGradient: () => void;
  addGradientStop: (stop: StopType[]) => void;
}
export interface ExtractorStateTypes {
  extractorHistoryIndex: number;
  setExtractorHistoryIndex: (index: number) => void;
  pickers: Picker[];
  setPickers: (picker: Picker[]) => void;
  updatePickers: (
    activePickerIndex: number,
    mouseX: number,
    offsetX: number,
    pickerHalf: number,
    mouseY: number,
    offsetY: number,
    rgb: string,
  ) => void;
  extractorHistory: Picker[][];
  setExtractorHistory: (picker: Picker[]) => void;
  extractorUndoHandler: () => void;
  extractorRedoHandler: () => void;
  clearAllExtractorHistory: () => void;
  extractorRecommendedPalettes: Picker[][];
  setExtractorRecommendedPalettes: (palettes: Picker[][]) => void;
  extractorPickerCount: number;
  setExtractorPickerCount: (count: number) => void;
}
export interface ContrastStateTypes {
  defaultContrastPreference: boolean;
  setDefaultContrastPreference: () => void;
  preferredContrastItems: string[];
  setPreferredContrastItems: (item: string) => void;
  clearPreferredContrastItems: () => void;
  activeContrast: ActiveContrast | null;
  setActiveContrast: (contrast: ActiveContrast) => void;
  alterContrast: () => void;
  complementaryMode: boolean;
  setComplementaryMode: () => void;
  contrastHistoryIndex: number;
  setContrastHistoryIndex: (index: number) => void;
  contrastHistory: ActiveContrast[];
  setContrastHistory: (contrast?: ActiveContrast) => void;
  contrastUndoHandler: () => void;
  contrastRedoHandler: () => void;
  clearAllContrastHistory: () => void;
  generateContrastPair: (from: "normal" | "complementary") => void;
  contrastTitle: string | null;
  setContrastTitle: (title: string | null) => void;
  contrastDescription: string | null;
  setContrastDescription: (desc: string | null) => void;
}
export interface VisualizerStateTypes {
  visualizerColorCount: number;
  setVisualizerColorCount: (count: number) => void;
  defaultVisualizerPreference: boolean;
  setDefaultVisualizerPreference: () => void;
  visualizerHistoryIndex: number;
  setVisualizerHistoryIndex: (index: number) => void;
  preferredVisualizerItems: string[];
  setPreferredVisualizerItems: (item: string) => void;
  clearPreferredVisualizerItems: () => void;
  generatedVisualizerPalette: PaletteColor[];
  setGeneratedVisualizerPalette: (palette?: PaletteColor[]) => void;
  updateVisualizerPalette: (
    index: number,
    color: string,
    isUp: boolean,
  ) => void;
  toggleVisualizerPaletteColorLock: (index: number) => void;
  visualizerPaletteHistory: PaletteColor[][];
  setVisualizerPaletteHistory: (palette?: PaletteColor[]) => void;
  clearAllVisualizerHistory: () => void;
  visualizerPaletteUndoHandler: () => void;
  visualizerPaletteRedoHandler: () => void;
  visualizerPaletteColorShuffler: () => void;
  visualizerActiveColor: string;
  setVisualizerActiveColor: (color: string) => void;
  currentTemplateId: number;
  setCurrentTemplateId: (id: number) => void;
  activeVisualizerMaximize: boolean;
  setActiveVisualizerMaximize: (value?: boolean) => void;
}
export interface ShadowStateTypes {
  activeShadowTab: string;
  setActiveShadowTab: (tab: string) => void;
  shadowCornerRadius: number;
  setShadowCornerRadius: (radius: number) => void;
  shadowContainerSize: number;
  setShadowContainerSize: (size: number) => void;
  shadows: ShadowLayer[];
  setShadow: (shadow: ShadowLayer) => void;
  updateShadow: (
    index: number,
    property: string,
    value: number | string | boolean,
  ) => void;
  removeShadow: (index: number) => void;
  activeShadowViewer: string;
  setActiveShadowViewer: (view: string) => void;
  textShadows: TextShadowLayer[];
  setTextShadow: (shadow: TextShadowLayer) => void;
  updateTextShadow: (
    index: number,
    property: string,
    value: number | string | boolean,
  ) => void;
  removeTextShadow: (index: number) => void;
  textShadowSize: number;
  setTextShadowSize: (size: number) => void;
  textShadowWeight: number;
  setTextShadowWeight: (weight: number) => void;
  activeTextShadowViewer: string;
  setActiveTextShadowViewer: (view: string) => void;
}
export interface BrowseStateTypes {
  browseGradientActiveType: string;
  setBrowseGradientActiveType: (type: string) => void;
  filterIndustries: string[];
  setFilterIndustries: (item: string[]) => void;
  filterPreferredColors: string[];
  setFilterPreferredColors: (item: string[]) => void;
  filterMoods: string[];
  setFilterMoods: (item: string[]) => void;
  filterBrightnessLevels: string[];
  setFilterBrightnessLevels: (item: string[]) => void;
  filterSaturationLevels: string[];
  setFilterSaturationLevels: (item: string[]) => void;
  filterModes: string[];
  setFilterModes: (item: string[]) => void;
  filterUsecases: string[];
  setFilterUsecases: (item: string[]) => void;
  filterHarmonies: string[];
  setFilterHarmonies: (item: string[]) => void;
  clearAllPaletteFiltersItems: () => void;
  palettesPage: number;
  setPalettesPage: (value: number) => void;
  searchPalettesQuery: string;
  setSearchPalettesQuery: (query: string) => void;
  searchColorsQuery: string;
  setSearchColorsQuery: (query: string) => void;
  searchGradientsQuery: string;
  setSearchGradientsQuery: (query: string) => void;
  searchFontsQuery: string;
  setSearchFontsQuery: (query: string) => void;
  paletteViewDetailsItem: PublishedPaletteType | null;
  setPaletteViewDetailsItem: (palette: PublishedPaletteType | null) => void;
  openOnScreenPalette: PaletteColor[] | null;
  setOpenOnScreenPalette: (paletteColor: PaletteColor[] | null) => void;
  viewModePalette: PaletteColor[] | null;
  setViewModePalette: (paletteColor: PaletteColor[] | null) => void;
  browseGradients: GradientType | null;
  setBrowseGradients: (gradient: GradientType | null) => void;
  openOnScreenGradient: StopType[] | null;
  setOpenOnScreenGradient: (gradient: StopType[] | null) => void;
  viewModeGradient: StopType[] | null;
  setViewModeGradient: (gradient: StopType[] | null) => void;
}
export interface OtherTypes {
  quickViewActiveTab: string;
  setQuickViewActiveTab: (value?: string) => void;
  quickViewPalette: string[];
  setQuickViewPalette: (palette: string[]) => void;
  quickViewActiveColor: string;
  setQuickViewActiveColor: (color: string) => void;
  exportPalette: string[];
  setExportPalette: (palette: string[]) => void;
  gradientExport: string;
  setGradientExport: (gradient: string) => void;
  exportFrom: string;
  setExportFrom: (from: string) => void;
  exportBoxShadow: ShadowLayer[];
  setExportBoxShadow: (shadow: ShadowLayer[]) => void;
  exportTextShadow: TextShadowLayer[];
  setExportTextShadow: (shadow: TextShadowLayer[]) => void;
  paletteSearchQuery: string;
  setPaletteSearchQuery: (query: string) => void;
  downloadPngWithoutHex: boolean;
  setDownloadPngWithoutHex: () => void;
  setDownloadPngWithoutHexTrue: () => void;
  explorePaletteView: string | null;
  setExplorePaletteView: (view: string | null) => void;
  addToCommunityPalette: PaletteColor[] | null;
  setAddToCommunityPalette: (palette: PaletteColor[] | null) => void;
}
