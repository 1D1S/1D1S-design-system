"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const statCardVariants = cva(
  "rounded-3 border border-gray-200",
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
  className,
  ...props
}: StatCardProps): React.ReactElement {
  const sz = size ?? "md";
  return (
    <div
      data-slot="stat-card"
      className={cn(statCardVariants({ tone, size }), className)}
      {...props}
    >
      <div className="text-[10px] font-semibold text-gray-500">{label}</div>
      <div
        className={cn(
          "mt-1.5 font-extrabold tracking-[-0.4px] leading-none text-gray-900 tabular-nums",
          valueSize[sz],
        )}
      >
        {value}
      </div>
      {helper ? (
        <div className="mt-1.5 text-[10px] text-gray-500">{helper}</div>
      ) : null}
    </div>
  );
}
