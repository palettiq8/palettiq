import { buttonStyles } from "@/utils/styles/Classes";
import { ButtonProps } from "@/utils/Props";
import { cn } from "@/utils/utils";

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles({ variant, size, className }))}
      {...props}
    />
  );
}
