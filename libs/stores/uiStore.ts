import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MenuStateType {
  generatorMaximize: boolean;
  toggleGeneratorMaximize: (value?: boolean) => void;
  isHorizontalPalette: boolean;
  setIsHorizontalPalette: () => void;
  addAiDescription: boolean;
  setAddAiDescription: () => void;
  isMaximizeColorPicker: boolean;
  setIsMaximizeColorPicker: () => void;
  isMaximizeGradient: boolean;
  setIsMaximizeGradient: () => void;
  isMaximizeExtractor: boolean;
  setIsMaximizeExtractor: () => void;
  isMaximizeContrast: boolean;
  setIsMaximizeContrast: () => void;
  isMaximizeShadow: boolean;
  setIsMaximizeShadow: () => void;
}

const useUiStore = create<MenuStateType>()(
  persist(
    (set) => ({
      generatorMaximize: false,
      toggleGeneratorMaximize: (value?: boolean) =>
        set((state) => ({
          generatorMaximize: value === false ? value : !state.generatorMaximize,
        })),
      isHorizontalPalette: false,
      setIsHorizontalPalette: () =>
        set((state) => ({ isHorizontalPalette: !state.isHorizontalPalette })),
      addAiDescription: false,
      setAddAiDescription: () =>
        set((state) => ({ addAiDescription: !state.addAiDescription })),
      isMaximizeColorPicker: false,
      setIsMaximizeColorPicker: () =>
        set((state) => ({
          isMaximizeColorPicker: !state.isMaximizeColorPicker,
        })),
      isMaximizeExtractor: false,
      setIsMaximizeExtractor: () =>
        set((state) => ({
          isMaximizeExtractor: !state.isMaximizeExtractor,
        })),
      isMaximizeGradient: false,
      setIsMaximizeGradient: () =>
        set((state) => ({ isMaximizeGradient: !state.isMaximizeGradient })),
      isMaximizeContrast: false,
      setIsMaximizeContrast: () =>
        set((state) => ({ isMaximizeContrast: !state.isMaximizeContrast })),
      isMaximizeShadow: false,
      setIsMaximizeShadow: () =>
        set((state) => ({ isMaximizeShadow: !state.isMaximizeShadow })),
    }),
    {
      name: "_ui_config",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isHorizontalPalette: state.isHorizontalPalette,
        addAiDescription: state.addAiDescription,
      }),
    },
  ),
);

export default useUiStore;
