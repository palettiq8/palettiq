import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MenuStateType {
  generatorMaximize: boolean;
  toggleGeneratorMaximize: (value?: boolean) => void;
  isHorizontalPalette: boolean;
  setIsHorizontalPalette: () => void;
  isMaximizeColorPicker: boolean;
  setIsMaximizeColorPicker: (value?: boolean) => void;
  isMaximizeGradient: boolean;
  setIsMaximizeGradient: (value?: boolean) => void;
  isMaximizeExtractor: boolean;
  setIsMaximizeExtractor: (value?: boolean) => void;
  isMaximizeContrast: boolean;
  setIsMaximizeContrast: (value?: boolean) => void;
  isMaximizeShadow: boolean;
  setIsMaximizeShadow: (value?: boolean) => void;
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
      isMaximizeColorPicker: false,
      setIsMaximizeColorPicker: (value?: boolean) =>
        set((state) => ({
          isMaximizeColorPicker:
            value === false ? value : !state.isMaximizeColorPicker,
        })),
      isMaximizeExtractor: false,
      setIsMaximizeExtractor: (value?: boolean) =>
        set((state) => ({
          isMaximizeExtractor:
            value === false ? value : !state.isMaximizeExtractor,
        })),
      isMaximizeGradient: false,
      setIsMaximizeGradient: (value?: boolean) =>
        set((state) => ({
          isMaximizeGradient:
            value === false ? value : !state.isMaximizeGradient,
        })),
      isMaximizeContrast: false,
      setIsMaximizeContrast: (value?: boolean) =>
        set((state) => ({
          isMaximizeContrast:
            value === false ? value : !state.isMaximizeContrast,
        })),
      isMaximizeShadow: false,
      setIsMaximizeShadow: (value?: boolean) =>
        set((state) => ({
          isMaximizeShadow: value === false ? value : !state.isMaximizeShadow,
        })),
    }),
    {
      name: "_ui_config",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isHorizontalPalette: state.isHorizontalPalette,
      }),
    },
  ),
);

export default useUiStore;
