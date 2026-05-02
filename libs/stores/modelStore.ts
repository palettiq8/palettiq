import { create } from "zustand";

interface MenuStateType {
  quickViewModel: boolean;
  toggleQuickViewModel: () => void;
  paletteHistoryModel: boolean;
  togglePaletteHistoryModel: () => void;
  visualizerPaletteHistoryModel: boolean;
  toggleVisualizerPaletteHistoryModel: () => void;
  addToCommunityModel: boolean;
  toggleAddToCommunityModel: () => void;
  colorHistoryModel: boolean;
  toggleColorHistoryModel: () => void;
  gradientHistoryModel: boolean;
  toggleGradientHistoryModel: () => void;
  extractorHistoryModel: boolean;
  toggleExtractorHistoryModel: () => void;
  contrastHistoryModel: boolean;
  toggleContrastHistoryModel: () => void;
  logoutModel: boolean;
  toggleLogoutModel: () => void;
  palettesFilterModel: boolean;
  togglePalettesFilterModel: () => void;
  exportModel: boolean;
  toggleExportModel: () => void;
  exportShadowModel: boolean;
  toggleExportShadowModel: () => void;
  paletteViewDetailsModel: boolean;
  togglePaletteViewDetailsModel: () => void;
  resetPreferencesModel: boolean;
  toggleResetPreferencesModel: () => void;
  studioLeftMenuModel: boolean;
  toggleStudioLeftMenuModel: () => void;
  visualizerResponsiveTempletesModel: boolean;
  toggleVisualizerResponsiveTempletesModel: () => void;
  hslControlPanelModel: boolean;
  toggleHslControlPanelModel: () => void;
}

const useModelStore = create<MenuStateType>((set) => ({
  quickViewModel: false,
  toggleQuickViewModel: () =>
    set((state) => ({ quickViewModel: !state.quickViewModel })),
  paletteHistoryModel: false,
  togglePaletteHistoryModel: () =>
    set((state) => ({ paletteHistoryModel: !state.paletteHistoryModel })),
  visualizerPaletteHistoryModel: false,
  toggleVisualizerPaletteHistoryModel: () =>
    set((state) => ({
      visualizerPaletteHistoryModel: !state.visualizerPaletteHistoryModel,
    })),
  addToCommunityModel: false,
  toggleAddToCommunityModel: () =>
    set((state) => ({ addToCommunityModel: !state.addToCommunityModel })),
  colorHistoryModel: false,
  toggleColorHistoryModel: () =>
    set((state) => ({ colorHistoryModel: !state.colorHistoryModel })),
  gradientHistoryModel: false,
  toggleGradientHistoryModel: () =>
    set((state) => ({ gradientHistoryModel: !state.gradientHistoryModel })),
  extractorHistoryModel: false,
  toggleExtractorHistoryModel: () =>
    set((state) => ({ extractorHistoryModel: !state.extractorHistoryModel })),
  contrastHistoryModel: false,
  toggleContrastHistoryModel: () =>
    set((state) => ({ contrastHistoryModel: !state.contrastHistoryModel })),
  logoutModel: false,
  toggleLogoutModel: () =>
    set((state) => ({ logoutModel: !state.logoutModel })),
  palettesFilterModel: false,
  togglePalettesFilterModel: () =>
    set((state) => ({ palettesFilterModel: !state.palettesFilterModel })),
  exportModel: false,
  toggleExportModel: () =>
    set((state) => ({ exportModel: !state.exportModel })),
  exportShadowModel: false,
  toggleExportShadowModel: () =>
    set((state) => ({ exportShadowModel: !state.exportShadowModel })),
  paletteViewDetailsModel: false,
  togglePaletteViewDetailsModel: () =>
    set((state) => ({
      paletteViewDetailsModel: !state.paletteViewDetailsModel,
    })),
  resetPreferencesModel: false,
  toggleResetPreferencesModel: () =>
    set((state) => ({
      resetPreferencesModel: !state.resetPreferencesModel,
    })),
  studioLeftMenuModel: false,
  toggleStudioLeftMenuModel: () =>
    set((state) => ({
      studioLeftMenuModel: !state.studioLeftMenuModel,
    })),
  visualizerResponsiveTempletesModel: false,
  toggleVisualizerResponsiveTempletesModel: () =>
    set((state) => ({
      visualizerResponsiveTempletesModel:
        !state.visualizerResponsiveTempletesModel,
    })),
  hslControlPanelModel: false,
  toggleHslControlPanelModel: () =>
    set((state) => ({
      hslControlPanelModel: !state.hslControlPanelModel,
    })),
}));

export default useModelStore;
