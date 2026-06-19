import { create } from "zustand";

interface MenuStateType {
  colorPreferencesMenu: boolean;
  toggleColorPreferencesMenu: () => void;
  colorCountMenu: boolean;
  toggleColorCountMenu: () => void;
  generatorMoreMenu: boolean;
  toggleGeneratorMoreMenu: () => void;
  harmonyMenu: boolean;
  toggleHarmonyMenu: () => void;
  pickerColorPickerMenu: boolean;
  togglePickerColorPickerMenu: () => void;
  gradientColorPositionMenu: boolean;
  toggleGradientColorPositionMenu: () => void;
  gradientColorFormatsMenu: boolean;
  toggleGradientColorFormatsMenu: () => void;
  gradientColorRotationMenu: boolean;
  toggleGradientColorRotationMenu: () => void;
  openMoreMenu: boolean;
  toggleOpenMoreMenu: () => void;
  shadowColorPickerMenu: boolean;
  toggleShadowColorPickerMenu: () => void;
  studioLeftFooterMenu: boolean;
  toggleStudioLeftFooterMenu: () => void;
  pickerResponsiveMoreMenu: boolean;
  togglePickerResponsiveMoreMenu: () => void;
  gradientResponsiveMoreMenu: boolean;
  toggleGradientResponsiveMoreMenu: () => void;
  extractorResponsiveMoreMenu: boolean;
  toggleExtractorResponsiveMoreMenu: () => void;
  contrastResponsiveMoreMenu: boolean;
  toggleContrastResponsiveMoreMenu: () => void;
  visualizerResponsiveMoreMenu: boolean;
  toggleVisualizerResponsiveMoreMenu: () => void;
  shadowResponsiveMoreMenu: boolean;
  toggleShadowResponsiveMoreMenu: () => void;
}

const useMenuStore = create<MenuStateType>((set) => ({
  colorPreferencesMenu: false,
  colorCountMenu: false,
  generatorMoreMenu: false,
  generatorColorPickerMenu: false,
  harmonyMenu: false,
  pickerColorPickerMenu: false,
  gradientColorPositionMenu: false,
  gradientColorFormatsMenu: false,
  gradientColorRotationMenu: false,
  openMoreMenu: false,
  shadowColorPickerMenu: false,
  studioLeftFooterMenu: false,
  pickerResponsiveMoreMenu: false,
  gradientResponsiveMoreMenu: false,
  extractorResponsiveMoreMenu: false,
  contrastResponsiveMoreMenu: false,
  visualizerResponsiveMoreMenu: false,
  shadowResponsiveMoreMenu: false,
  colorToolsMenu: false,

  toggleColorPreferencesMenu: () =>
    set((state) => ({ colorPreferencesMenu: !state.colorPreferencesMenu })),
  toggleColorCountMenu: () =>
    set((state) => ({ colorCountMenu: !state.colorCountMenu })),
  toggleGeneratorMoreMenu: () =>
    set((state) => ({ generatorMoreMenu: !state.generatorMoreMenu })),
  toggleHarmonyMenu: () =>
    set((state) => ({ harmonyMenu: !state.harmonyMenu })),
  togglePickerColorPickerMenu: () =>
    set((state) => ({ pickerColorPickerMenu: !state.pickerColorPickerMenu })),
  toggleGradientColorPositionMenu: () =>
    set((state) => ({
      gradientColorPositionMenu: !state.gradientColorPositionMenu,
    })),
  toggleGradientColorFormatsMenu: () =>
    set((state) => ({
      gradientColorFormatsMenu: !state.gradientColorFormatsMenu,
    })),
  toggleGradientColorRotationMenu: () =>
    set((state) => ({
      gradientColorRotationMenu: !state.gradientColorRotationMenu,
    })),
  toggleOpenMoreMenu: () =>
    set((state) => ({
      openMoreMenu: !state.openMoreMenu,
    })),
  toggleShadowColorPickerMenu: () =>
    set((state) => ({ shadowColorPickerMenu: !state.shadowColorPickerMenu })),
  toggleStudioLeftFooterMenu: () =>
    set((state) => ({ studioLeftFooterMenu: !state.studioLeftFooterMenu })),
  togglePickerResponsiveMoreMenu: () =>
    set((state) => ({
      pickerResponsiveMoreMenu: !state.pickerResponsiveMoreMenu,
    })),
  toggleGradientResponsiveMoreMenu: () =>
    set((state) => ({
      gradientResponsiveMoreMenu: !state.gradientResponsiveMoreMenu,
    })),
  toggleExtractorResponsiveMoreMenu: () =>
    set((state) => ({
      extractorResponsiveMoreMenu: !state.extractorResponsiveMoreMenu,
    })),
  toggleContrastResponsiveMoreMenu: () =>
    set((state) => ({
      contrastResponsiveMoreMenu: !state.contrastResponsiveMoreMenu,
    })),
  toggleVisualizerResponsiveMoreMenu: () =>
    set((state) => ({
      visualizerResponsiveMoreMenu: !state.visualizerResponsiveMoreMenu,
    })),
  toggleShadowResponsiveMoreMenu: () =>
    set((state) => ({
      shadowResponsiveMoreMenu: !state.shadowResponsiveMoreMenu,
    })),
}));

export default useMenuStore;
