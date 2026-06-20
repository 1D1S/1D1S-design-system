"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const statCardVariants = cva(
  "rounded-3 border border-gray-200 shadow-sm",
  {
    variants: {
      tone: {
        white: "bg-white",
        brand: "bg-brand-softer border-brand-soft",
        mint: "bg-mint-200/40 border-mint-200",
        blue: "bg-blue-200/40 border-blue-200",
        gray: "bg-gray-50",
      },
      size: {
        sm: "min-w-[120px] p-3",
        md: "min-w-[140px] p-4",
        lg: "min-w-[160px] p-5",
      },
    },
    defaultVariants: { tone: "white", size: "md" },
  },
);

const valueSize: Record<"sm" | "md" | "lg", string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
};

export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof statCardVariants> {
  /** 캡션 라벨 */
  label: React.ReactNode;
  /** 큰 값 */
  value: React.ReactNode;
  /** 보조 텍스트 (값 아래 소형 메타) */
  helper?: React.ReactNode;
  /** value가 바뀔 때 숫자에 pop 애니메이션 (최초 마운트 시엔 미동작) */
  animateOnChange?: boolean;
}

/**
 * StatCard
 * 라벨 + 큰 숫자 통계 카드. 마이페이지/대시보드용.
 *
 * @param tone `white` (default) · `brand` · `mint` · `blue` · `gray`
 * @param size `sm` · `md` (default) · `lg`
 *
 * @example
 * ```tsx
 * <StatCard label="현재 스트릭" value="🔥 27" tone="brand" />
 * <StatCard label="작성한 일지" value="48" helper="이번 달 +12" />
 * ```
 */
export function StatCard({
  label,
  value,
  helper,
  tone,
  size,
  animateOnChange,
  className,
  ...props
}: StatCardProps): React.ReactElement {
  const sz = size ?? "md";
  const [popKey, setPopKey] = React.useState(0);
  const prevValueRef = React.useRef(value);
  React.useEffect(() => {
    if (animateOnChange && prevValueRef.current !== value) {
      setPopKey((k) => k + 1);
    }
    prevValueRef.current = value;
  }, [value, animateOnChange]);
  return (
    <div
      data-slot="stat-card"
      className={cn(statCardVariants({ tone, size }), className)}
      {...props}
    >
      <div className="text-3xs font-semibold text-gray-500">{label}</div>
      <div
        key={popKey}
        className={cn(
          "mt-1.5 font-extrabold tracking-[-0.4px] leading-none text-gray-900 tabular-nums",
          valueSize[sz],
          animateOnChange && popKey > 0 && "animate-pop",
        )}
      >
        {value}
      </div>
      {helper ? (
        <div className="mt-1.5 text-3xs text-gray-500">{helper}</div>
      ) : null}
    </div>
  );
}
