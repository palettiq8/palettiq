"use client";

import { store } from "@/libs/stores/store";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import QuickViewModel from "./QuickViewModel";
import useModelStore from "@/libs/stores/modelStore";
import PaletteHistoryModel from "./PaletteHistoryModel";
import AddToCommunityModel from "./AddToCommunityModel";
import ColorHistoryModel from "./ColorHistoryModel";
import VisualizerPaletteHistoryModel from "./VisualizerPaletteHistoryModel";
import GradientHistoryModel from "./GradientHistoryModel";
import ExtractorHistoryModel from "./ExtractorHistoryModel";
import ContrastHistoryModel from "./ContrastHistoryModel";
import PalettesFilterModel from "./PalettesFilterModel";
import ExportModel from "./ExportModel";
import { useBrowseStore, useOtherStore } from "@/libs/stores/dataStore";
import ExportShadowModel from "./ExportShadowModel";
import NextTopLoader from "nextjs-toploader";
import PaletteViewDetailsModel from "./PaletteViewDetailsModel";
import OpenOnScreenPaletteModel from "./OpenOnScreenPaletteModel";
import ViewModePaletteModel from "./ViewModePaletteModel";
import ResetPreferencesModel from "./ResetPreferencesModel";

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
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
}
