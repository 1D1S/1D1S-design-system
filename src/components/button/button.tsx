import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Text } from "../Text";

const allButtonVariants =
  "h-auto border-none shadow-none cursor-pointer flex items-center justify-center transition-all duration-200";

const customButtonVariants = cva(allButtonVariants, {
  variants: {
    variant: {
      default: "bg-main-900 text-white hover:bg-main-800",
      disabled: "bg-gray-400 text-gray-600 cursor-not-allowed",
      warning: "bg-warning text-white",
      loading: "bg-main-900 opacity-80 cursor-wait",
      outline:
        "text-gray-900 hover:bg-main-900 hover:text-white inset-ring-[1.5px] inset-ring-main-900 bg-transparent",
      input:
        "bg-white text-gray-900 hover:bg-gray-50 inset-ring-[1px] inset-ring-gray-400 justify-between font-normal",
    },
    size: {
      lg: "rounded-2 py-2 px-3.5",
      md: "rounded-1.5 py-2 px-2.5",
      sm: "rounded-1 py-1.5 px-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "lg",
  },
});

export interface ButtonProps
  extends
    React.ComponentProps<"button">,
    VariantProps<typeof customButtonVariants> {
  asChild?: boolean;
}

/**
 * Button
 * 커스텀 버튼 컴포넌트
 * @param variant 버튼스타일 : default, disabled, warning, loading, outline, input
 * @param size 버튼 크기 : lg, md, sm
 *
 * @example 기본 버튼
 * ```tsx
 * <Button variant="default" size="lg">Large Button</Button>
 * ```
 */
export function Button({
  className,
  variant = "default",
  size = "lg",
  asChild = false,
  disabled = false,
  ...props
}: ButtonProps): React.ReactElement {
  const Comp = asChild ? Slot : "button";

  const labelSizeMap = {
    lg: "body2",
    md: "caption1",
    sm: "caption2",
  } as const;

  const isInputVariant = variant === "input";

  return (
    <Comp
      data-slot="button"
      className={cn(
        customButtonVariants({
          variant: disabled ? "disabled" : variant,
          size,
          className,
        }),
      )}
      disabled={disabled}
      {...props}
    >
      {isInputVariant ? (
        props.children
      ) : (
        <Text size={labelSizeMap[size || "lg"]} weight="regular">
          {props.children}
        </Text>
      )}
    </Comp>
  );
}
