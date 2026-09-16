import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "icon";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-amber-500 text-white hover:bg-amber-600",
  secondary: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100",
  ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
  danger: "text-gray-400 hover:bg-red-400 hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-7 px-3 py-2",
  md: "min-h-9 px-4 py-2.5",
  icon: "h-7 w-7 p-1",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      type = "button",
      variant = "primary",
      size = "sm",
      fullWidth = false,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center rounded text-sm font-semibold transition-colors hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    />
  ),
);

Button.displayName = "Button";