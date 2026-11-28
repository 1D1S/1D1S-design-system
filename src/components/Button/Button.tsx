import { cn } from "../../lib/utils";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Text, textVariants } from "../Text";

const baseClasses =
  "inline-flex items-center justify-center gap-1.5 border transition-[scale,translate,filter,background-color,box-shadow,border-color,color] duration-150 ease-out " +
  "active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-[0.45] disabled:active:scale-100 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

const buttonVariants = cva(baseClasses, {
  variants: {
    variant: {
      // 플랫(1D1S 웹 docs/flat-design-system.md): 선 없는 채움, 떠오르는 움직임 없음.
      primary:
        "bg-brand text-fixed-white border-transparent hover:brightness-105",
      secondary:
        "bg-fill text-fg border-transparent hover:bg-gray-200",
      soft:
        "bg-soft text-ink border-transparent hover:bg-main-300",
      ghost:
        "bg-transparent text-sub border-transparent hover:bg-fill hover:text-fg",
      danger:
        "bg-danger text-fixed-white border-transparent hover:brightness-105",
    },
    size: {
      xs: "h-6 px-2 gap-1",
      // TextField·Select 와 같은 높이: sm 32 · md 40. 한 줄에 섞어 놓아도 맞는다.
      sm: "h-8 px-3 gap-1",
      md: "h-10 px-4",
      lg: "h-[46px] px-5",
      xl: "h-[54px] px-6",
      icon: "h-10 w-10 p-0",
      "icon-sm": "h-8 w-8 p-0",
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
  "icon-sm": { size: "caption3", weight: "extrabold" },
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
 * @param size `xs` · `sm`(32) · `md`(40, default) · `lg` · `xl` · `icon`(40) · `icon-sm`(32)
 * @param asChild 자식(예: next/link)을 버튼 모양으로. iconLeft/iconRight 는 자식 안에 들어간다.
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
  const Comp = "button";
  const resolvedSize = size ?? "md";
  const isStringChild =
    typeof children === "string" || typeof children === "number";
  const isIcon = resolvedSize === "icon" || resolvedSize === "icon-sm";
  const showText = !isIcon && isStringChild;

  if (asChild) {
    // Slot 은 자식이 하나여야 한다 — 아이콘은 Slottable 로 자식 안쪽에 끼워 넣고,
    // 라벨 글자 크기는 Text 대신 클래스로 준다(자식의 글자를 감쌀 수 없으므로).
    return (
      <Slot
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, pill, fullWidth }),
          !isIcon && textVariants(labelStyleMap[resolvedSize]),
          className,
        )}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {iconLeft}
        <Slottable>{children}</Slottable>
        {iconRight}
      </Slot>
    );
  }

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
