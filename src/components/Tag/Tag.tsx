import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva(
  "inline-flex items-center justify-center font-semibold whitespace-nowrap",
  {
    variants: {
      tone: {
        // 플랫 칩 — 옅은 면 + 같은 색상의 글자(대비 4.5:1 이상). mint 는 green(ok)과 갈라 보여야 하는
        // 자리가 있어(어드민 회차 상태: 모집 mint · 진행 green) 제 램프를 그대로 쓴다.
        gray: "bg-fill text-sub",
        brand: "bg-soft text-ink",
        mint: "bg-mint-200 text-mint-900",
        blue: "bg-info-soft text-info",
        red: "bg-danger-soft text-danger",
        green: "bg-ok-soft text-ok",
      },
      size: {
        xs: "text-3xs py-0.5 px-1.5 gap-0.5",
        sm: "text-3xs py-0.5 px-2 gap-1",
        md: "text-2xs py-1 px-2.5 gap-1",
        lg: "text-xs py-1.5 px-3 gap-1",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-ui-sm",
      },
    },
    defaultVariants: {
      tone: "brand",
      size: "md",
      // 플랫 칩은 r6(1D1S 웹 Chip). 알약이 필요하면 pill 을 켠다.
      pill: false,
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
 * @param pill 알약형 라운딩 (default `false` — 플랫 칩은 r6)
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
