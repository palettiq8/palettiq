"use client";

import dynamic from "next/dynamic";

import { store } from "@/libs/stores/store";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { useBrowseStore, useOtherStore } from "@/libs/stores/dataStore";
const QuickViewModel = dynamic(() => import("./QuickViewModel"));
const PaletteHistoryModel = dynamic(() => import("./PaletteHistoryModel"));
const AddToCommunityModel = dynamic(() => import("./AddToCommunityModel"));
const ColorHistoryModel = dynamic(() => import("./ColorHistoryModel"));
const GradientHistoryModel = dynamic(() => import("./GradientHistoryModel"));
const ExtractorHistoryModel = dynamic(() => import("./ExtractorHistoryModel"));
const ContrastHistoryModel = dynamic(() => import("./ContrastHistoryModel"));
const PalettesFilterModel = dynamic(() => import("./PalettesFilterModel"));
const ExportModel = dynamic(() => import("./ExportModel"));
const ExportShadowModel = dynamic(() => import("./ExportShadowModel"));
const PaletteViewDetailsModel = dynamic(
  () => import("./PaletteViewDetailsModel"),
);
const OpenOnScreenPaletteModel = dynamic(
  () => import("./OpenOnScreenPaletteModel"),
);
const ViewModePaletteModel = dynamic(() => import("./ViewModePaletteModel"));
const ResetPreferencesModel = dynamic(() => import("./ResetPreferencesModel"));
const StudioLeftMenuModel = dynamic(() => import("./StudioLeftMenuModel"));
const VisualizerResponsiveTempletesModel = dynamic(
  () => import("./VisualizerResponsiveTempletesModel"),
);
import VisualizerPaletteHistoryModel from "./VisualizerPaletteHistoryModel";
import useModelStore from "@/libs/stores/modelStore";
import NextTopLoader from "nextjs-toploader";
import HSLControlPanel from "./HSLControlPanel";
import GradientViewDetailsModel from "./GradientViewDetailsModel";
import OpenOnScreenGradientModel from "./OpenOnScreenGradientModel";
import ViewModeGradientModel from "./ViewModeGradientModel";
import PickedPalettesForPublishedModel from "./PickedPalettesForPublishedModel";

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const quickViewModel = useModelStore((state) => state.quickViewModel);
  const paletteHistoryModel = useModelStore(
    (state) => state.paletteHistoryModel,
  );
  const visualizerPaletteHistoryModel = useModelStore(
    (state) => state.visualizerPaletteHistoryModel,
  );
  const addToCommunityModel = useModelStore(
    (state) => state.addToCommunityModel,
  );
  const colorHistoryModel = useModelStore((state) => state.colorHistoryModel);
  const gradientHistoryModel = useModelStore(
    (state) => state.gradientHistoryModel,
  );
  const extractorHistoryModel = useModelStore(
    (state) => state.extractorHistoryModel,
  );
  const contrastHistoryModel = useModelStore(
    (state) => state.contrastHistoryModel,
  );
  const palettesFilterModel = useModelStore(
    (state) => state.palettesFilterModel,
  );
  const exportModel = useModelStore((state) => state.exportModel);
  const setGradientExport = useOtherStore((state) => state.setGradientExport);
  const exportShadowModel = useModelStore((state) => state.exportShadowModel);
  const paletteViewDetailsModel = useModelStore(
    (state) => state.paletteViewDetailsModel,
  );
  const openOnScreenPalette = useBrowseStore(
    (state) => state.openOnScreenPalette,
  );
  const viewModePalette = useBrowseStore((state) => state.viewModePalette);
  const resetPreferencesModel = useModelStore(
    (state) => state.resetPreferencesModel,
  );
  const studioLeftMenuModel = useModelStore(
    (state) => state.studioLeftMenuModel,
  );
  const visualizerResponsiveTempletesModel = useModelStore(
    (state) => state.visualizerResponsiveTempletesModel,
  );
  const hslControlPanelModel = useModelStore(
    (state) => state.hslControlPanelModel,
  );
  const gradientViewDetailsModel = useModelStore(
    (state) => state.gradientViewDetailsModel,
  );
  const openOnScreenGradient = useBrowseStore(
    (state) => state.openOnScreenGradient,
  );
  const viewModeGradient = useBrowseStore((state) => state.viewModeGradient);
  const pickedPalettesForPublishedModel = useModelStore(
    (state) => state.pickedPalettesForPublishedModel,
  );

  useEffect(() => {
    if (!exportModel) {
      setGradientExport("");
    }
  }, [exportModel]);

  return (
    <Provider store={store}>
      <NextTopLoader color="#101828" showSpinner={false} />
      {children}
      {quickViewModel && <QuickViewModel />}
      {paletteHistoryModel && <PaletteHistoryModel />}
      {visualizerPaletteHistoryModel && <VisualizerPaletteHistoryModel />}
      {addToCommunityModel && <AddToCommunityModel />}
      {colorHistoryModel && <ColorHistoryModel />}
      {gradientHistoryModel && <GradientHistoryModel />}
      {extractorHistoryModel && <ExtractorHistoryModel />}
      {contrastHistoryModel && <ContrastHistoryModel />}
      {palettesFilterModel && <PalettesFilterModel />}
      {exportModel && <ExportModel />}
      {exportShadowModel && <ExportShadowModel />}
      {paletteViewDetailsModel && <PaletteViewDetailsModel />}
      {openOnScreenPalette !== null && <OpenOnScreenPaletteModel />}
      {viewModePalette !== null && <ViewModePaletteModel />}
      {resetPreferencesModel !== null && <ResetPreferencesModel />}
      {studioLeftMenuModel !== null && <StudioLeftMenuModel />}
      {visualizerResponsiveTempletesModel !== null && (
        <VisualizerResponsiveTempletesModel />
      )}
      {hslControlPanelModel && <HSLControlPanel />}
      {gradientViewDetailsModel && <GradientViewDetailsModel />}
      {openOnScreenGradient !== null && <OpenOnScreenGradientModel />}
      {viewModeGradient !== null && <ViewModeGradientModel />}
      <Toaster position="top-center" reverseOrder={false} />
      {pickedPalettesForPublishedModel !== null && (
        <PickedPalettesForPublishedModel />
      )}
    </Provider>
  );
}
