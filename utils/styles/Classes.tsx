import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  "font-semibold text-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gray-900 rounded-full text-gray-50 hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100 gap-3",
        secondary:
          "text-gray-900 gap-2 rounded-full border border-gray-100 hover:border-gray-200",
        outline:
          "bg-white rounded-full text-gray-900 border border-gray-200 hover:bg-gray-50 gap-2 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100",
        text: "text-gray-900 hover:text-indigo-600 gap-3",
        textUnderline:
          "text-gray-900 hover:text-indigo-600 hover:underline gap-3",
        distrcutiveText:
          "text-red-500 hover:text-red-600 gap-3 disabled:text-red-300 disabled:cursor-not-allowed disabled:active:scale-100",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-10 px-4",
        lg: "h-12 px-5",
        p0: "",
        circle: "h-8 w-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export const generatorContentHeaderItemsStyle =
  "text-gray-900 hover:scale-110 cursor-pointer active:scale-90 transition-all";

export const REDOUNDOCOMMONSTYLE =
  "hover:scale-110 active:scale-95 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed";

export const ICONBUTTONCOMMONSTYLE =
  "h-10 px-3 border border-gray-200 shrink-0 flex items-center gap-1.5 bg-gray-50 transition-all";

export const BUTTONCOMMONSTYLE =
  "text-gray-900 cursor-pointer h-8 w-8 rounded-md border border-white hover:border-gray-200 hover:bg-gray-100 active:scale-90 grid place-content-center transition-all";

export const CIRCLEBUTTONSTYLE =
  "w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 cursor-pointer flex items-center justify-center";
