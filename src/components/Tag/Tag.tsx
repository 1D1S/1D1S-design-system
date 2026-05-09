import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva(
  "inline-flex items-center justify-center font-bold whitespace-nowrap",
  {
    variants: {
      tone: {
        gray: "bg-gray-100 text-gray-700",
        brand: "bg-main-200 text-brand",
        mint: "bg-mint-200 text-mint-900",
        blue: "bg-blue-200 text-blue-600",
        red: "bg-red-300 text-red-700",
        green: "bg-green-200 text-green-700",
      },
      size: {
        xs: "text-[9px] py-0.5 px-1.5 gap-0.5",
        sm: "text-[10px] py-[3px] px-2 gap-1",
        md: "text-[11px] py-1 px-2.5 gap-1",
        lg: "text-xs py-[5px] px-3 gap-1",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-1",
      },
    },
    defaultVariants: {
      tone: "brand",
      size: "md",
      pill: true,
    },
  },
);

export interface TagProps
  extends Omit<React.ComponentProps<"span">, "color">,
    VariantProps<typeof tagVariants> {
  /** 라벨 좌측 아이콘/이모지 */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Tag (a.k.a. Chip)
 * 카테고리 / 상태 / 메타데이터 표시용 작은 라벨.
 *
 * @param tone `gray` · `brand` (default) · `mint` · `blue` · `red` · `green`
 * @param size `xs` · `sm` · `md` (default) · `lg`
 * @param pill 알약형 라운딩 (default `true`)
 * @param icon 라벨 좌측 아이콘 또는 이모지
 *
 * @example
 * ```tsx
 * <Tag tone="brand">운동</Tag>
 * <Tag tone="mint" size="sm" icon="🔥">14일</Tag>
 * ```
 */
export function Tag({
  className,
  tone,
  size,
  pill,
  icon,
  children,
  ...props
}: TagProps): React.ReactElement {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ tone, size, pill, className }))}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
