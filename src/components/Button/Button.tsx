import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Text } from "../Text";

const allButtonVariants =
  "inline-flex items-center justify-center gap-2 rounded-3 border border-transparent transition-colors duration-200 disabled:cursor-not-allowed";

const customButtonVariants = cva(allButtonVariants, {
  variants: {
    variant: {
      default:
        "bg-main-800 text-white hover:bg-main-600 disabled:bg-main-400 disabled:text-white",
      outlined:
        "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400",
      secondary:
        "bg-white text-gray-800 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400",
      ghost:
        "bg-transparent text-gray-800 hover:bg-gray-100 disabled:text-gray-400",
    },
    size: {
      small: "h-9 px-3.5",
      medium: "h-11 px-3.5",
      large: "h-13 px-5",
      icon: "h-9 w-9 p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "large",
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
 * @param variant 버튼스타일 : default, outlined, secondary, ghost
 * @param size 버튼 크기 : small, medium, large, icon
 *
 * @example 기본 버튼
 * ```tsx
 * <Button variant="default" size="large">Large Button</Button>
 * ```
 */
export function Button({
  className,
  variant = "default",
  size = "large",
  asChild = false,
  disabled = false,
  ...props
}: ButtonProps): React.ReactElement {
  const Comp = asChild ? Slot : "button";
  const currentVariant = variant ?? "default";
  const currentSize = size ?? "large";

  const labelStyleMap = {
    small: { size: "caption2", weight: "bold" },
    medium: { size: "caption1", weight: "bold" },
    large: { size: "body2", weight: "bold" },
    icon: { size: "caption1", weight: "bold" },
  } as const;

  const shouldWrapWithText =
    currentSize !== "icon" &&
    (typeof props.children === "string" || typeof props.children === "number");

  return (
    <Comp
      data-slot="button"
      className={cn(
        customButtonVariants({
          variant: currentVariant,
          size: currentSize,
          className,
        }),
      )}
      disabled={disabled}
      {...props}
    >
      {shouldWrapWithText ? (
        <Text
          size={labelStyleMap[currentSize].size}
          weight={labelStyleMap[currentSize].weight}
        >
          {props.children}
        </Text>
      ) : (
        props.children
      )}
    </Comp>
  );
}
