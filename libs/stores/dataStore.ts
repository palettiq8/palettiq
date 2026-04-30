import { colorFamilies } from "@/utils/Items";
import {
  ActiveContrast,
  AiPaletteType,
  AiStateTypes,
  BrowseStateTypes,
  ConicType,
  ContrastStateTypes,
  ExtractorStateTypes,
  GeneratorStateTypes,
  GradientContainerSize,
  GradientStateTypes,
  OtherTypes,
  PaletteColor,
  Picker,
  PickerStateTypes,
  PublishedPaletteType,
  RadialType,
  ShadowLayer,
  ShadowStateTypes,
  StopType,
  TextShadowLayer,
  VisualizerStateTypes,
} from "@/utils/Types";
import {
  generateColor,
  generateComplementaryContrast,
  generateContrastPair,
  generateRandomColor,
  getColorAtPosition,
} from "@/utils/utils";
import { colord } from "colord";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useGeneratorStore = create<GeneratorStateTypes>()(
  persist(
    (set) => ({
      colorCount: 5,
      setColorCount: (count: number) => set({ colorCount: count }),
      defaultPreference: true,
      setDefaultPreference: () =>
        set((state) => {
          if (state.preferredItems.length === 0) {
            return { defaultPreference: true };
          }
          return { defaultPreference: false };
        }),
      historyIndex: 0,
      setHistoryIndex: (index: number) => set({ historyIndex: index }),
      preferredItems: [],
      setPreferredItems: (item: string) =>
        set((state) => {
          const isExist = state.preferredItems.includes(item);
          let updated;
          if (isExist) {
            updated = state.preferredItems.filter((i) => i !== item);
          } else {
            updated = [...state.preferredItems, item];
          }
          return {
            preferredItems: updated,
            defaultPreference: updated.length > 0 ? false : true,
          };
        }),
      clearPreferredItems: () => set({ preferredItems: [] }),
      generatedPalette: [],
      setGeneratedPalette: (palette?: PaletteColor[]) => {
        set((state) => {
          if (palette) {
            return { generatedPalette: palette };
          }
          const safePrev = Array.isArray(state.generatedPalette)
            ? state.generatedPalette
            : [];

          const newPalette = Array.from({ length: state.colorCount }).map(
            (_, i) => {
              const prev = safePrev[i];

              const color = generateColor(
                prev?.isLocked ?? false,
                prev?.color ?? "#000000",
                state.preferredItems,
              );

              return {
                id: crypto.randomUUID(),
                color,
                isLocked: prev?.isLocked ?? false,
              };
            },
          );
          return { generatedPalette: newPalette };
        });
      },
      updateGeneratedPalette: (index: number, color: string) => {
        set((state) => {
          const updatedPalette = state.generatedPalette.map((item, i) =>
            i === index ? { ...item, color: color } : item,
          );
          return {
            generatedPalette: updatedPalette,
            paletteHistory: [...state.paletteHistory, updatedPalette],
          };
        });
      },
      togglePaletteColorLock: (index: number) => {
        set((state) => ({
          generatedPalette: state.generatedPalette.map((item, i) =>
            i === index ? { ...item, isLocked: !item.isLocked } : item,
          ),
        }));
      },
      paletteHistory: [],
      setPaletteHistory: (palette?: PaletteColor[]) => {
        set((state) => {
          const paletteToPush = palette || state.generatedPalette;
          const newHistory = [...state.paletteHistory, paletteToPush];

          if (!paletteToPush || paletteToPush.length === 0) return state;

          const isAllLocked = paletteToPush.every((item) => item.isLocked);

          if (isAllLocked && !palette) {
            return state;
          }

          const lastPalette =
            state.paletteHistory[state.paletteHistory.length - 1];
          const isDuplicate =
            JSON.stringify(lastPalette) === JSON.stringify(paletteToPush);

          if (isDuplicate) {
            return state;
          }
          return {
            paletteHistory: newHistory,
            historyIndex: newHistory.length - 1,
          };
        });
      },
      clearAllHistory: () => {
        set((state) => ({
          paletteHistory: [state.generatedPalette],
          historyIndex: 0,
        }));
      },
      generatorPaletteUndoHandler: () => {
        set((state) => {
          if (state.historyIndex > 0) {
            const nextIndex = state.historyIndex - 1;
            return {
              historyIndex: nextIndex,
              generatedPalette: state.paletteHistory[nextIndex],
            };
          }
          return state;
        });
      },
      generatorPaletteRedoHandler: () => {
        set((state) => {
          if (state.historyIndex < state.paletteHistory.length - 1) {
            const nextIndex = state.historyIndex + 1;
            return {
              historyIndex: nextIndex,
              generatedPalette: state.paletteHistory[nextIndex],
            };
          }
          return state;
        });
      },
    }),
    {
      name: "_generator_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        colorCount: state.colorCount,
        defaultPreference: state.defaultPreference,
        preferredItems: state.preferredItems,
        generatedPalette: state.generatedPalette,
      }),
    },
  ),
);
const useAiStore = create<AiStateTypes>()(
  persist(
    (set) => ({
      aiPreferredColors: [],
      aiColorCount: "5 Colors",
      aiColorHarmony: "No Harmony",
      aiColorMood: "No Mood",
      aiIndustry: "No Industry",
      aiBrightness: "No Brightness",
      aiSaturation: "No Saturation",
      aiMode: "No Mode",
      aiPaletteCount: "1 Palette",
      aiUseCase: "No Use Case",
      setAiItems: (item: string, from: string) =>
        set((state) => {
          switch (from) {
            case "preferred":
              const exists = state.aiPreferredColors.includes(item);

              return {
                aiPreferredColors: exists
                  ? state.aiPreferredColors.filter((c) => c !== item)
                  : [...state.aiPreferredColors, item],
              };

            case "count":
              return { aiColorCount: item };

            case "paletteCount":
              return { aiPaletteCount: item };

            case "harmony":
              return {
                aiColorHarmony:
                  state.aiColorHarmony === item ? "No Harmony" : item,
              };

            case "mood":
              return {
                aiColorMood: state.aiColorMood === item ? "No Mood" : item,
              };

            case "industry":
              return {
                aiIndustry: state.aiIndustry === item ? "No Industry" : item,
              };

            case "brightness":
              return {
                aiBrightness:
                  state.aiBrightness === item ? "No Brightness" : item,
              };

            case "saturation":
              return {
                aiSaturation:
                  state.aiSaturation === item ? "No Saturation" : item,
              };

            case "mode":
              return { aiMode: state.aiMode === item ? "No Mode" : item };

            case "usecase":
              return {
                aiUseCase: state.aiUseCase === item ? "No Use Case" : item,
              };

            default:
              return {};
          }
        }),
      clearAllAiItems: () =>
        set({
          aiPreferredColors: [],
          aiColorCount: "5 Colors",
          aiColorHarmony: "No Harmony",
          aiColorMood: "No Mood",
          aiIndustry: "No Industry",
          aiBrightness: "No Brightness",
          aiSaturation: "No Saturation",
          aiMode: "No Mode",
          aiPaletteCount: "1 Palette",
          aiUseCase: "No Use Case",
        }),
      aiGeneratedPalettes: [],
      setAiGeneratedPalettes: (palettes: AiPaletteType[]) =>
        set({
          aiGeneratedPalettes: palettes,
        }),
      activeAiModel: "gemini-2.5-pro",
      setActiveAiModel: (model: string) => set({ activeAiModel: model }),
    }),
    {
      name: "_ai_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        aiPreferredColors: state.aiPreferredColors,
        aiColorCount: state.aiColorCount,
        aiColorHarmony: state.aiColorHarmony,
        aiColorMood: state.aiColorMood,
        aiIndustry: state.aiIndustry,
        aiBrightness: state.aiBrightness,
        aiSaturation: state.aiSaturation,
        aiMode: state.aiMode,
        aiPaletteCount: state.aiPaletteCount,
        aiUseCase: state.aiUseCase,
        aiGeneratedPalettes: state.aiGeneratedPalettes,
        activeAiModel: state.activeAiModel,
      }),
    },
  ),
);
const usePickerStore = create<PickerStateTypes>()(
  persist(
    (set) => ({
      defaultColorPreference: true,
      setDefaultColorPreference: () =>
        set((state) => {
          if (state.preferredColorItems.length === 0) {
            return { defaultColorPreference: true };
          }
          return { defaultColorPreference: false };
        }),
      preferredColorItems: "",
      setPreferredColorItems: (item: string) =>
        set((state) => {
          const newItem = state.preferredColorItems === item ? "" : item;

          return {
            preferredColorItems: newItem,
            defaultColorPreference: newItem.length === 0,
          };
        }),
      clearPreferredColorItems: () => set({ preferredColorItems: "" }),
      colorPickerColor: "",
      setColorPickerColor: (value?: string) => set({ colorPickerColor: value }),
      colorHistoryIndex: 0,
      setColorHistoryIndex: (index: number) =>
        set({ colorHistoryIndex: index }),
      colorHistory: [],
      setColorHistory: (newColor?: string) => {
        set((state) => {
          const colorToPush = newColor || state.colorPickerColor;
          const updatedHistory = [...state.colorHistory, colorToPush];
          return {
            colorHistory: updatedHistory,
            colorHistoryIndex: updatedHistory.length - 1,
          };
        });
      },
      clearAllColorHistory: () => {
        set((state) => ({
          colorHistory: [state.colorPickerColor],
          colorHistoryIndex: 0,
        }));
      },
      colorPickerUndoHandler: () => {
        set((state) => {
          if (state.colorHistoryIndex > 0) {
            const nextIndex = state.colorHistoryIndex - 1;
            return {
              colorHistoryIndex: nextIndex,
              colorPickerColor: state.colorHistory[nextIndex],
            };
          }
          return state;
        });
      },
      colorPickerRedoHandler: () => {
        set((state) => {
          if (state.colorHistoryIndex < state.colorHistory.length - 1) {
            const nextIndex = state.colorHistoryIndex + 1;
            return {
              colorHistoryIndex: nextIndex,
              colorPickerColor: state.colorHistory[nextIndex],
            };
          }
          return state;
        });
      },
    }),
    {
      name: "_picker_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        colorPickerColor: state.colorPickerColor,

        defaultColorPreference: state.defaultColorPreference,
        preferredColorItems: state.preferredColorItems,
      }),
    },
  ),
);
const useGradientStore = create<GradientStateTypes>()(
  persist(
    (set) => ({
      defaultGradientPreference: true,
      setDefaultGradientPreference: () =>
        set((state) => {
          if (state.preferredGradientItems.length === 0) {
            return { defaultGradientPreference: true };
          }
          return { defaultGradientPreference: false };
        }),
      preferredGradientItems: [],
      setPreferredGradientItems: (item: string) =>
        set((state) => {
          const isExist = state.preferredGradientItems.includes(item);
          let updated;
          if (isExist) {
            updated = state.preferredGradientItems.filter((i) => i !== item);
          } else {
            if (
              state.preferredGradientItems.length >= state.gradientStops.length
            )
              return state;

            updated = [...state.preferredGradientItems, item];
          }
          return {
            preferredGradientItems: updated,
            defaultGradientPreference: updated.length > 0 ? false : true,
          };
        }),
      clearPreferredGradientItems: () => set({ preferredGradientItems: [] }),
      gradientHistoryIndex: 0,
      setGradientHistoryIndex: (index: number) =>
        set({ gradientHistoryIndex: index }),
      gradientHistory: [],
      setGradientHistory: (stops?: StopType[]) => {
        set((state) => {
          const stopsToPush = stops || state.gradientStops;
          const newHistory = [...state.gradientHistory, stopsToPush];

          if (!stopsToPush || stopsToPush.length === 0) return state;

          const lastStops =
            state.gradientHistory[state.gradientHistory.length - 1];
          const isDuplicate =
            JSON.stringify(lastStops) === JSON.stringify(stopsToPush);

          if (isDuplicate) {
            return state;
          }
          return {
            gradientHistory: newHistory,
            gradientHistoryIndex: newHistory.length - 1,
          };
        });
      },
      gradientUndoHandler: () => {
        set((state) => {
          if (state.gradientHistoryIndex > 0) {
            const nextIndex = state.gradientHistoryIndex - 1;
            const stops = state.gradientHistory[nextIndex];
            return {
              gradientHistoryIndex: nextIndex,
              gradientStops: state.gradientHistory[nextIndex],
              modifyActiveColor: stops[0],
            };
          }
          return state;
        });
      },
      gradientRedoHandler: () => {
        set((state) => {
          if (state.gradientHistoryIndex < state.gradientHistory.length - 1) {
            const nextIndex = state.gradientHistoryIndex + 1;
            const stops = state.gradientHistory[nextIndex];
            return {
              gradientHistoryIndex: nextIndex,
              gradientStops: state.gradientHistory[nextIndex],
              modifyActiveColor: stops[0],
            };
          }
          return state;
        });
      },
      clearAllGradientHistory: () => {
        set((state) => ({
          gradientHistory: [state.gradientStops],
          gradientHistoryIndex: 0,
        }));
      },
      MAX_STOPS: 10,
      gradientStops: [],
      setGradientStop: () => {
        set((state) => {
          if (state.gradientStops.length >= state.MAX_STOPS) return state;
          let position: number;

          do {
            position = Math.floor(Math.random() * 98) + 1;
          } while (
            state.gradientStops.some((s) => Math.abs(s.position - position) < 5)
          );
          const colorAtPosition = getColorAtPosition(
            state.gradientStops,
            position,
          );
          return {
            gradientStops: [
              ...state.gradientStops,
              {
                id: crypto.randomUUID().toString(),
                color: colorAtPosition,
                isHide: false,
                position,
              },
            ],
          };
        });
      },
      generateRandomGradient: () => {
        set((state) => {
          const stops =
            state.gradientStops.length === 0
              ? [
                  {
                    id: crypto.randomUUID(),
                    color: generateRandomColor(),
                    isHide: false,
                    position: 0,
                  },
                  {
                    id: crypto.randomUUID(),
                    color: generateRandomColor(),
                    isHide: false,
                    position: 100,
                  },
                ]
              : state.gradientStops;

          const randomizedStops = stops.map((stop) => {
            const _pi = state.preferredGradientItems;
            const res = generateColor(false, "#000000", _pi);

            return {
              ...stop,
              id: crypto.randomUUID(),
              color: _pi.length === 0 ? generateRandomColor() : res,
              isHide: false,
              position: stop.position,
            };
          });

          return {
            gradientStops: randomizedStops,
            modifyActiveColor: randomizedStops[0],
          };
        });
      },
      updateGradientStop: (
        id: string,
        value: string | number | boolean,
        to: "color" | "position" | "isHide",
      ) => {
        set((state) => {
          const updatedStops = state.gradientStops.map((stop) =>
            stop.id === id ? { ...stop, [to]: value } : stop,
          );
          const updatedActiveColor =
            state.modifyActiveColor?.id === id
              ? { ...state.modifyActiveColor, [to]: value }
              : state.modifyActiveColor;

          return {
            gradientStops: updatedStops,
            modifyActiveColor: updatedActiveColor,
          };
        });
      },
      removeGradientStop: (id: string) => {
        set((state) => {
          const shouldRemoveLast =
            state.gradientStops.length === state.preferredGradientItems.length;
          return {
            gradientStops: state.gradientStops.filter((stop) => stop.id !== id),
            modifyActiveColor:
              state.modifyActiveColor?.id === id
                ? { id: "", color: "", isHide: false, position: 0 }
                : state.modifyActiveColor,
            preferredGradientItems: shouldRemoveLast
              ? state.preferredGradientItems.slice(0, -1)
              : state.preferredGradientItems,
          };
        });
      },
      activeGradientType: "Linear",
      setActiveGradientType: (type: string) =>
        set({ activeGradientType: type }),
      gradientRotationValue: 90,
      setGradientRotationValue: (value: number | string) =>
        set({ gradientRotationValue: value }),
      modifyActiveColor: { id: "", color: "", isHide: false, position: 0 },
      setModifyActiveColor: (stop: StopType) =>
        set({ modifyActiveColor: stop }),
      gradientContainerSize: { content: "100%", width: "100%", height: "100%" },
      setGradientContainerSize: (item: GradientContainerSize) =>
        set({ gradientContainerSize: item }),
      gradientCornerRadius: 10,
      setGradientCornerRadius: (value: number) =>
        set({ gradientCornerRadius: value }),
      activeRadial: { shape: "circle", x: 50, y: 50 },
      setActiveRadial: (radial: RadialType) => set({ activeRadial: radial }),
      activeConic: { x: 50, y: 50 },
      setActiveConic: (conic: ConicType) => set({ activeConic: conic }),
      addGradientStop: (stop: StopType[]) =>
        set({
          gradientStops: stop,
          modifyActiveColor: stop[0],
        }),
    }),
    {
      name: "_gradient_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        defaultGradientPreference: state.defaultGradientPreference,
        preferredGradientItems: state.preferredGradientItems,
        gradientStops: state.gradientStops,
      }),
    },
  ),
);
const useExtractorStore = create<ExtractorStateTypes>()(
  persist(
    (set) => ({
      extractorHistoryIndex: 0,
      setExtractorHistoryIndex: (index: number) =>
        set({ extractorHistoryIndex: index }),
      extractorHistory: [],
      pickers: [],
      setPickers: (picker: Picker[]) => set({ pickers: picker }),
      updatePickers: (
        activePickerIndex: number,
        mouseX: number,
        offsetX: number,
        pickerHalf: number,
        mouseY: number,
        offsetY: number,
        rgb: string,
      ) => {
        set((state) => ({
          pickers: state.pickers.map((p, i) =>
            i === activePickerIndex
              ? {
                  ...p,
                  x: mouseX - offsetX - pickerHalf,
                  y: mouseY - offsetY - pickerHalf,
                  color: rgb,
                }
              : p,
          ),
        }));
      },
      setExtractorHistory: (picker: Picker[]) => {
        set((state) => {
          const pickerToPush = picker || state.pickers;
          const newHistory = [...state.extractorHistory, pickerToPush];

          if (!pickerToPush || pickerToPush.length === 0) return state;

          const lastPalette =
            state.extractorHistory[state.extractorHistory.length - 1];
          const isDuplicate =
            JSON.stringify(lastPalette) === JSON.stringify(pickerToPush);

          if (isDuplicate) {
            return state;
          }
          return {
            extractorHistory: newHistory,
            extractorHistoryIndex: newHistory.length - 1,
          };
        });
      },
      extractorUndoHandler: () => {
        set((state) => {
          if (state.extractorHistoryIndex > 0) {
            const nextIndex = state.extractorHistoryIndex - 1;
            return {
              extractorHistoryIndex: nextIndex,
              pickers: state.extractorHistory[nextIndex],
            };
          }
          return state;
        });
      },
      extractorRedoHandler: () => {
        set((state) => {
          if (state.extractorHistoryIndex < state.extractorHistory.length - 1) {
            const nextIndex = state.extractorHistoryIndex + 1;
            return {
              extractorHistoryIndex: nextIndex,
              pickers: state.extractorHistory[nextIndex],
            };
          }
          return state;
        });
      },
      clearAllExtractorHistory: () => {
        set((state) => ({
          extractorHistoryIndex: 0,
          extractorHistory: [state.pickers],
        }));
      },
      extractorRecommendedPalettes: [],
      setExtractorRecommendedPalettes: (palettes: Picker[][]) =>
        set({ extractorRecommendedPalettes: palettes }),
      extractorPickerCount: 5,
      setExtractorPickerCount: (count: number) =>
        set({ extractorPickerCount: count }),
    }),
    {
      name: "_extractor_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        extractorPickerCount: state.extractorPickerCount,
      }),
    },
  ),
);
const useContrastStore = create<ContrastStateTypes>()(
  persist(
    (set) => ({
      defaultContrastPreference: true,
      setDefaultContrastPreference: () =>
        set((state) => {
          if (state.preferredContrastItems.length === 0) {
            return { defaultContrastPreference: true };
          }
          return { defaultContrastPreference: false };
        }),
      preferredContrastItems: [],
      setPreferredContrastItems: (item: string) =>
        set((state) => {
          const isExist = state.preferredContrastItems.includes(item);
          let updated;
          if (isExist) {
            updated = state.preferredContrastItems.filter((i) => i !== item);
          } else {
            updated = [item];
          }
          return {
            preferredContrastItems: updated,
            defaultContrastPreference: updated.length > 0 ? false : true,
            complementaryMode: updated.length === 0 ? false : true,
          };
        }),
      clearPreferredContrastItems: () => set({ preferredContrastItems: [] }),
      activeContrast: null,
      setActiveContrast: (contrast: ActiveContrast) =>
        set({
          activeContrast: contrast,
        }),
      alterContrast: () =>
        set((state) => {
          if (!state.activeContrast) return state;

          return {
            activeContrast: {
              textColor: state.activeContrast.bgColor,
              bgColor: state.activeContrast.textColor,
            },
          };
        }),
      complementaryMode: false,
      setComplementaryMode: () => {
        set((state) => {
          if (
            !state.complementaryMode &&
            state.preferredContrastItems.length === 0
          ) {
            return {
              complementaryMode: true,
              preferredContrastItems: ["Red"],
              defaultContrastPreference: false,
            };
          }

          if (
            state.complementaryMode &&
            state.preferredContrastItems.length !== 0
          ) {
            return {
              complementaryMode: false,
              preferredContrastItems: [],
              defaultContrastPreference: true,
            };
          }

          return {
            complementaryMode: !state.complementaryMode,
          };
        });
      },
      contrastHistoryIndex: 0,
      setContrastHistoryIndex: (index: number) =>
        set({ contrastHistoryIndex: index }),
      contrastHistory: [],
      setContrastHistory: (contrast?: ActiveContrast) => {
        set((state) => {
          const contrastToPush = contrast || state.activeContrast;

          if (!contrastToPush) return state;

          const last = state.contrastHistory[state.contrastHistory.length - 1];

          const isDuplicate =
            last &&
            last.textColor === contrastToPush.textColor &&
            last.bgColor === contrastToPush.bgColor;

          if (isDuplicate) return state;

          const newHistory = [...state.contrastHistory, contrastToPush];

          return {
            contrastHistory: newHistory,
            contrastHistoryIndex: newHistory.length - 1,
          };
        });
      },
      contrastUndoHandler: () => {
        set((state) => {
          if (state.contrastHistoryIndex > 0) {
            const nextIndex = state.contrastHistoryIndex - 1;
            return {
              contrastHistoryIndex: nextIndex,
              activeContrast: state.contrastHistory[nextIndex],
            };
          }
          return state;
        });
      },
      contrastRedoHandler: () => {
        set((state) => {
          if (state.contrastHistoryIndex < state.contrastHistory.length - 1) {
            const nextIndex = state.contrastHistoryIndex + 1;
            return {
              contrastHistoryIndex: nextIndex,
              activeContrast: state.contrastHistory[nextIndex],
            };
          }
          return state;
        });
      },
      clearAllContrastHistory: () => {
        set((state) => {
          if (!state.activeContrast) return state;

          return {
            contrastHistoryIndex: 0,
            contrastHistory: [state.activeContrast],
          };
        });
      },
      generateContrastPair: (from: "normal" | "complementary") => {
        set((state) => {
          const res =
            from === "normal"
              ? generateContrastPair(
                  colorFamilies,
                  state.preferredContrastItems,
                )
              : generateComplementaryContrast(
                  colorFamilies,
                  state.preferredContrastItems,
                );

          const generatedContrast = {
            textColor: colord(res.foreground).toHex(),
            bgColor: colord(res.background).toHex(),
          };

          return {
            activeContrast: generatedContrast,
          };
        });
      },
      contrastTitle: null,
      setContrastTitle: (title: string | null) => set({ contrastTitle: title }),
      contrastDescription: null,
      setContrastDescription: (desc: string | null) =>
        set({ contrastDescription: desc }),
    }),
    {
      name: "_contrast_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        defaultContrastPreference: state.defaultContrastPreference,
        preferredContrastItems: state.preferredContrastItems,
        complementaryMode: state.complementaryMode,
        activeContrast: state.activeContrast,
        contrastTitle: state.contrastTitle,
        contrastDescription: state.contrastDescription,
      }),
    },
  ),
);
const useVisualizerStore = create<VisualizerStateTypes>()(
  persist(
    (set) => ({
      visualizerColorCount: 5,

      setVisualizerColorCount: (count: number) =>
        set({ visualizerColorCount: count }),

      defaultVisualizerPreference: true,

      setDefaultVisualizerPreference: () =>
        set((state) => {
          if (state.preferredVisualizerItems.length === 0) {
            return { defaultVisualizerPreference: true };
          }
          return { defaultVisualizerPreference: false };
        }),

      visualizerHistoryIndex: 0,

      setVisualizerHistoryIndex: (index: number) =>
        set({ visualizerHistoryIndex: index }),

      preferredVisualizerItems: [],

      setPreferredVisualizerItems: (item: string) =>
        set((state) => {
          const isExist = state.preferredVisualizerItems.includes(item);
          let updated;
          if (isExist) {
            updated = state.preferredVisualizerItems.filter((i) => i !== item);
          } else {
            updated = [...state.preferredVisualizerItems, item];
          }
          return {
            preferredVisualizerItems: updated,
            defaultVisualizerPreference: updated.length > 0 ? false : true,
          };
        }),
      clearPreferredVisualizerItems: () =>
        set({ preferredVisualizerItems: [] }),
      generatedVisualizerPalette: [],

      setGeneratedVisualizerPalette: (palette?: PaletteColor[]) => {
        set((state) => {
          if (palette) {
            return { generatedVisualizerPalette: palette };
          }
          const safePrev = Array.isArray(state.generatedVisualizerPalette)
            ? state.generatedVisualizerPalette
            : [];

          const newPalette = Array.from({
            length: state.visualizerColorCount,
          }).map((_, i) => {
            const prev = safePrev[i];
            const color = generateColor(
              prev?.isLocked ?? false,
              prev?.color ?? "#000000",
              state.preferredVisualizerItems,
            );

            return {
              id: crypto.randomUUID(),
              color,
              isLocked: prev?.isLocked ?? false,
            };
          });
          return { generatedVisualizerPalette: newPalette };
        });
      },

      updateVisualizerPalette: (
        index: number,
        color: string,
        isUp: boolean,
      ) => {
        set((state) => {
          const updatedPalette = state.generatedVisualizerPalette.map(
            (item, i) => (i === index ? { ...item, color: color } : item),
          );
          if (isUp) {
            return {
              generatedVisualizerPalette: updatedPalette,
              visualizerPaletteHistory: [
                ...state.visualizerPaletteHistory,
                updatedPalette,
              ],
            };
          }
          return {
            generatedVisualizerPalette: updatedPalette,
          };
        });
      },
      toggleVisualizerPaletteColorLock: (index: number) => {
        set((state) => ({
          generatedVisualizerPalette: state.generatedVisualizerPalette.map(
            (item, i) =>
              i === index ? { ...item, isLocked: !item.isLocked } : item,
          ),
        }));
      },

      visualizerPaletteHistory: [],

      setVisualizerPaletteHistory: (palette?: PaletteColor[]) => {
        set((state) => {
          const paletteToPush = palette || state.generatedVisualizerPalette;
          const newHistory = [...state.visualizerPaletteHistory, paletteToPush];

          if (!paletteToPush || paletteToPush.length === 0) return state;

          const isAllLocked = paletteToPush.every((item) => item.isLocked);

          if (isAllLocked && !palette) {
            return state;
          }

          const lastPalette =
            state.visualizerPaletteHistory[
              state.visualizerPaletteHistory.length - 1
            ];
          const isDuplicate =
            JSON.stringify(lastPalette) === JSON.stringify(paletteToPush);

          if (isDuplicate) {
            return state;
          }
          return {
            visualizerPaletteHistory: newHistory,
            visualizerHistoryIndex: newHistory.length - 1,
          };
        });
      },
      clearAllVisualizerHistory: () => {
        set((state) => ({
          visualizerPaletteHistory: [state.generatedVisualizerPalette],
          visualizerHistoryIndex: 0,
        }));
      },
      visualizerPaletteUndoHandler: () => {
        set((state) => {
          if (state.visualizerHistoryIndex > 0) {
            const nextIndex = state.visualizerHistoryIndex - 1;
            return {
              visualizerHistoryIndex: nextIndex,
              generatedVisualizerPalette:
                state.visualizerPaletteHistory[nextIndex],
            };
          }
          return state;
        });
      },
      visualizerPaletteRedoHandler: () => {
        set((state) => {
          if (
            state.visualizerHistoryIndex <
            state.visualizerPaletteHistory.length - 1
          ) {
            const nextIndex = state.visualizerHistoryIndex + 1;
            return {
              visualizerHistoryIndex: nextIndex,
              generatedVisualizerPalette:
                state.visualizerPaletteHistory[nextIndex],
            };
          }
          return state;
        });
      },
      visualizerPaletteColorShuffler: () => {
        set((state) => {
          const unlockedColors = state.generatedVisualizerPalette
            .filter((item) => !item.isLocked)
            .map((item) => item.color);

          for (let i = unlockedColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [unlockedColors[i], unlockedColors[j]] = [
              unlockedColors[j],
              unlockedColors[i],
            ];
          }
          let unlockedIndex = 0;
          const newPalette = state.generatedVisualizerPalette.map((item) => {
            if (item.isLocked) return item;

            const newItem = { ...item, color: unlockedColors[unlockedIndex] };
            unlockedIndex++;
            return newItem;
          });

          const history = [...state.visualizerPaletteHistory, newPalette];

          return {
            generatedVisualizerPalette: newPalette,
            visualizerPaletteHistory: history,
            visualizerHistoryIndex: history.length - 1,
          };
        });
      },
      visualizerActiveColor: "",
      setVisualizerActiveColor: (color: string) =>
        set({ visualizerActiveColor: color }),
      currentTemplateId: 0,
      setCurrentTemplateId: (id: number) => set({ currentTemplateId: id }),
      activeVisualizerMaximize: false,
      setActiveVisualizerMaximize: () =>
        set((state) => ({
          activeVisualizerMaximize: !state.activeVisualizerMaximize,
        })),
    }),
    {
      name: "_visualizer_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        visualizerColorCount: state.visualizerColorCount,
        generatedVisualizerPalette: state.generatedVisualizerPalette,
        defaultVisualizerPreference: state.defaultVisualizerPreference,
        preferredVisualizerItems: state.preferredVisualizerItems,
        currentTemplateId: state.currentTemplateId,
      }),
    },
  ),
);
const useShadowStore = create<ShadowStateTypes>()(
  persist(
    (set) => ({
      activeShadowTab: "Box Shadow",
      setActiveShadowTab: (tab: string) => set({ activeShadowTab: tab }),
      shadowCornerRadius: 12,
      setShadowCornerRadius: (radius: number) =>
        set({ shadowCornerRadius: radius }),
      shadowContainerSize: 400,
      setShadowContainerSize: (size: number) =>
        set({ shadowContainerSize: size }),
      shadows: [
        {
          offsetX: 0,
          offsetY: 8,
          blur: 24,
          spread: -6,
          color: "#99a1af",
          inset: false,
          enabled: true,
        },
      ],
      setShadow: (shadow: ShadowLayer) => {
        set((state) => ({
          shadows: [...state.shadows, shadow],
        }));
      },
      updateShadow: (
        index: number,
        property: string,
        value: number | string | boolean,
      ) => {
        set((state) => ({
          shadows: state.shadows.map((shadow, i) =>
            i === index ? { ...shadow, [property]: value } : shadow,
          ),
        }));
      },
      removeShadow: (index: number) => {
        set((state) => ({
          shadows: state.shadows.filter((_, i) => i !== index),
        }));
      },
      activeShadowViewer: "Container View",
      setActiveShadowViewer: (sv: string) => set({ activeShadowViewer: sv }),
      textShadows: [
        {
          offsetX: 0,
          offsetY: 2,
          blur: 4,
          color: "#99a1af",
          enabled: true,
        },
      ],
      setTextShadow: (shadow: TextShadowLayer) => {
        set((state) => ({
          textShadows: [...state.textShadows, shadow],
        }));
      },
      updateTextShadow: (
        index: number,
        property: string,
        value: number | string | boolean,
      ) => {
        set((state) => ({
          textShadows: state.textShadows.map((shadow, i) =>
            i === index ? { ...shadow, [property]: value } : shadow,
          ),
        }));
      },
      removeTextShadow: (index: number) => {
        set((state) => ({
          textShadows: state.textShadows.filter((_, i) => i !== index),
        }));
      },
      textShadowSize: 36,
      setTextShadowSize: (size: number) => set({ textShadowSize: size }),
      textShadowWeight: 600,
      setTextShadowWeight: (weight: number) =>
        set({ textShadowWeight: weight }),
      activeTextShadowViewer: "Container View",
      setActiveTextShadowViewer: (view: string) =>
        set({ activeTextShadowViewer: view }),
    }),
    {
      name: "_shadow_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeShadowTab: state.activeShadowTab,
        activeShadowViewer: state.activeShadowViewer,
        activeTextShadowViewer: state.activeTextShadowViewer,
      }),
    },
  ),
);
const useBrowseStore = create<BrowseStateTypes>()(
  persist(
    (set) => ({
      browseGradientActiveType: "Linear",
      setBrowseGradientActiveType: (type: string) =>
        set({ browseGradientActiveType: type }),
      filterIndustries: [],
      setFilterIndustries: (item: string[]) => set({ filterIndustries: item }),
      filterPreferredColors: [],
      setFilterPreferredColors: (item: string[]) =>
        set({ filterPreferredColors: item }),
      filterMoods: [],
      setFilterMoods: (item: string[]) => set({ filterMoods: item }),
      filterBrightnessLevels: [],
      setFilterBrightnessLevels: (item: string[]) =>
        set({ filterBrightnessLevels: item }),
      filterSaturationLevels: [],
      setFilterSaturationLevels: (item: string[]) =>
        set({ filterSaturationLevels: item }),
      filterModes: [],
      setFilterModes: (item: string[]) => set({ filterModes: item }),
      filterUsecases: [],
      setFilterUsecases: (item: string[]) => set({ filterUsecases: item }),
      filterHarmonies: [],
      setFilterHarmonies: (item: string[]) => set({ filterHarmonies: item }),
      clearAllPaletteFiltersItems: () =>
        set({
          filterIndustries: [],
          filterPreferredColors: [],
          filterMoods: [],
          filterBrightnessLevels: [],
          filterSaturationLevels: [],
          filterModes: [],
          filterUsecases: [],
          filterHarmonies: [],
        }),
      palettesPage: 0,
      setPalettesPage: (value: number) => set({ palettesPage: value }),
      searchPalettesQuery: "",
      setSearchPalettesQuery: (query: string) =>
        set({ searchPalettesQuery: query }),
      searchColorsQuery: "",
      setSearchColorsQuery: (query: string) =>
        set({ searchColorsQuery: query }),
      searchGradientsQuery: "",
      setSearchGradientsQuery: (query: string) =>
        set({ searchGradientsQuery: query }),
      searchFontsQuery: "",
      setSearchFontsQuery: (query: string) => set({ searchFontsQuery: query }),
      paletteViewDetailsItem: null,
      setPaletteViewDetailsItem: (palette: PublishedPaletteType | null) =>
        set({ paletteViewDetailsItem: palette }),
      openOnScreenPalette: null,
      setOpenOnScreenPalette: (paletteColor: PaletteColor[] | null) =>
        set({ openOnScreenPalette: paletteColor }),
      viewModePalette: null,
      setViewModePalette: (paletteColor: PaletteColor[] | null) =>
        set({ viewModePalette: paletteColor }),
    }),
    {
      name: "_browse_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        browseGradientActiveType: state.browseGradientActiveType,
      }),
    },
  ),
);
const useOtherStore = create<OtherTypes>()(
  persist(
    (set) => ({
      quickViewActiveTab: "Formats",
      setQuickViewActiveTab: (value?: string) =>
        set({ quickViewActiveTab: value }),

      quickViewPalette: [],
      setQuickViewPalette: (palette: string[]) =>
        set({ quickViewPalette: palette }),

      quickViewActiveColor: "",
      setQuickViewActiveColor: (color: string) =>
        set({ quickViewActiveColor: color }),

      exportPalette: [],
      setExportPalette: (palette: string[]) => set({ exportPalette: palette }),
      gradientExport: "",
      setGradientExport: (gradient: string) =>
        set({ gradientExport: gradient }),
      exportFrom: "",
      setExportFrom: (from: string) => set({ exportFrom: from }),
      exportBoxShadow: [],
      setExportBoxShadow: (shadow: ShadowLayer[]) =>
        set({ exportBoxShadow: shadow }),
      exportTextShadow: [],
      setExportTextShadow: (shadow: TextShadowLayer[]) =>
        set({ exportTextShadow: shadow }),
      paletteSearchQuery: "",
      setPaletteSearchQuery: (query: string) =>
        set({ paletteSearchQuery: query }),
      downloadPngWithoutHex: true,
      setDownloadPngWithoutHex: () =>
        set((state) => ({
          downloadPngWithoutHex: !state.downloadPngWithoutHex,
        })),
      setDownloadPngWithoutHexTrue: () =>
        set({
          downloadPngWithoutHex: true,
        }),
      explorePaletteView: "Vertical",
      setExplorePaletteView: (view: string | null) =>
        set({ explorePaletteView: view }),
    }),
    {
      name: "_other_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        downloadPngWithoutHex: state.downloadPngWithoutHex,
        explorePaletteView: state.explorePaletteView,
      }),
    },
  ),
);

export {
  useGeneratorStore,
  useAiStore,
  usePickerStore,
  useGradientStore,
  useExtractorStore,
  useContrastStore,
  useVisualizerStore,
  useShadowStore,
  useBrowseStore,
  useOtherStore,
};
