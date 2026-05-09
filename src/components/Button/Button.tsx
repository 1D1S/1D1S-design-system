import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Text } from "../Text";

const baseClasses =
  "inline-flex items-center justify-center gap-1.5 border transition-[transform,filter,background-color,box-shadow,border-color,color] duration-150 ease-out " +
  "active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-[0.45] disabled:active:scale-100 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

const buttonVariants = cva(baseClasses, {
  variants: {
    variant: {
      primary:
        "bg-brand text-white border-transparent hover:brightness-105 hover:-translate-y-px",
      secondary:
        "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300",
      soft:
        "bg-main-200 text-brand border-main-300 hover:bg-main-300/70",
      ghost:
        "bg-transparent text-gray-700 border-transparent hover:bg-gray-100",
      danger:
        "bg-red-500 text-white border-transparent hover:brightness-105 hover:-translate-y-px",
      // ── v0.2 호환 alias ──
      // 기존 호출부(`outlined`/`default`) 호환 유지. 신규 코드는 위 5종 사용 권장.
      outlined:
        "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300",
      default:
        "bg-brand text-white border-transparent hover:brightness-105 hover:-translate-y-px",
    },
    size: {
      xs: "h-6 px-2 gap-1",
      sm: "h-[30px] px-3 gap-1",
      md: "h-[38px] px-4",
      lg: "h-[46px] px-5",
      xl: "h-[54px] px-6",
      icon: "h-[38px] w-[38px] p-0",
      // ── v0.2 호환 alias ──
      small: "h-[30px] px-3 gap-1",
      medium: "h-[38px] px-4",
      large: "h-[46px] px-5",
    },
    pill: {
      true: "rounded-full",
      false: "rounded-2.5",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    pill: false,
    fullWidth: false,
  },
});

const labelStyleMap = {
  xs: { size: "caption3", weight: "extrabold" },
  sm: { size: "caption3", weight: "extrabold" },
  md: { size: "caption2", weight: "extrabold" },
  lg: { size: "caption1", weight: "extrabold" },
  xl: { size: "body2", weight: "extrabold" },
  icon: { size: "caption2", weight: "extrabold" },
  // v0.2 호환 alias
  small: { size: "caption3", weight: "extrabold" },
  medium: { size: "caption2", weight: "extrabold" },
  large: { size: "caption1", weight: "extrabold" },
} as const;

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "size">,
    VariantProps<typeof buttonVariants> {
  /** asChild로 렌더링하면 자식 엘리먼트에 버튼 props를 머지 (Radix Slot) */
  asChild?: boolean;
  /** 라벨 좌측 아이콘 */
  iconLeft?: React.ReactNode;
  /** 라벨 우측 아이콘 */
  iconRight?: React.ReactNode;
}

/**
 * Button v3
 *
 * @param variant `primary` (default) · `secondary` · `soft` · `ghost` · `danger`
 * @param size `xs` · `sm` · `md` (default) · `lg` · `xl` · `icon`
 * @param pill 둥근 알약형 (rounded-full)
 * @param fullWidth 부모 너비 100%
 * @param iconLeft / iconRight 라벨 양옆 아이콘
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" iconLeft={<Plus />}>
 *   새 챌린지
 * </Button>
 * ```
 */
export function Button({
  className,
  variant,
  size,
  pill,
  fullWidth,
  asChild = false,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const Comp = asChild ? Slot : "button";
  const resolvedSize = size ?? "md";
  const isStringChild =
    typeof children === "string" || typeof children === "number";
  const showText = resolvedSize !== "icon" && isStringChild;

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, pill, fullWidth, className }),
      )}
      disabled={disabled}
      {...props}
    >
      {iconLeft}
      {showText ? (
        <Text
          size={labelStyleMap[resolvedSize].size}
          weight={labelStyleMap[resolvedSize].weight}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      {iconRight}
    </Comp>
  );
}
