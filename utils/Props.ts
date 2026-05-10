import { buttonStyles } from "./styles/Classes";
import { VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonStyles> { }
