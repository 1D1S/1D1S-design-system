"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const statCardVariants = cva(
  "rounded-3 border",
  {
    variants: {
      /** `raised`: 그림자 + 옅은 톤 면 · `flat`: 그림자 없이 선+면 (마이페이지 KPI) */
      variant: {
        raised: "border-gray-200 shadow-sm",
        flat: "",
      },
      tone: {
        white: "bg-white",
        brand: "bg-brand-softer border-brand-soft",
        mint: "bg-mint-200/40 border-mint-200",
        blue: "bg-blue-200/40 border-blue-200",
        gray: "bg-gray-50",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
      },
    },
    compoundVariants: [
      // raised 만 최소 폭을 갖는다 — flat 은 그리드 칸에 맞춰 줄어든다.
      { variant: "raised", size: "sm", class: "min-w-[120px]" },
      { variant: "raised", size: "md", class: "min-w-[140px]" },
      { variant: "raised", size: "lg", class: "min-w-[160px]" },
      // flat 톤 — raised 톤 클래스를 tailwind-merge 로 덮어쓴다.
      { variant: "flat", tone: "white", class: "border-gray-200 bg-white" },
      { variant: "flat", tone: "brand", class: "border-main-200 bg-main-100" },
      { variant: "flat", tone: "mint", class: "border-mint-200 bg-mint-100" },
      { variant: "flat", tone: "blue", class: "border-blue-200 bg-blue-200/50" },
      { variant: "flat", tone: "gray", class: "border-gray-200 bg-gray-50" },
    ],
    defaultVariants: { variant: "raised", tone: "white", size: "md" },
  },
);

const valueSize: Record<"sm" | "md" | "lg", string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
};

const labelClass = {
  raised: "text-3xs font-semibold text-gray-500",
  flat: "text-sm leading-none font-medium text-gray-500",
};

export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof statCardVariants> {
  /** 캡션 라벨 */
  label: React.ReactNode;
  /** 큰 값 */
  value: React.ReactNode;
  /** 라벨 왼쪽 아이콘 (14px 권장) */
  icon?: React.ReactNode;
  /** 보조 텍스트 (값 아래 소형 메타) */
  helper?: React.ReactNode;
  /** value가 바뀔 때 숫자에 pop 애니메이션 (최초 마운트 시엔 미동작) */
  animateOnChange?: boolean;
}

/**
 * StatCard
 * 라벨 + 큰 숫자 통계 카드. 마이페이지/대시보드용.
 *
 * @param variant `raised` (default) · `flat` — flat 은 그림자 없음 + 라벨/보조 텍스트 한 단계 큼
 * @param tone `white` (default) · `brand` · `mint` · `blue` · `gray`
 * @param size `sm` · `md` (default) · `lg`
 *
 * @example
 * ```tsx
 * <StatCard label="현재 스트릭" value="🔥 27" tone="brand" />
 * <StatCard label="작성한 일지" value="48" helper="이번 달 +12" />
 * <StatCard variant="flat" icon={<Icon name="Flame" size={14} />} label="현재 스트릭" value="27" tone="brand" />
 * ```
 */
export function StatCard({
  label,
  value,
  helper,
  icon,
  variant,
  tone,
  size,
  animateOnChange,
  className,
  ...props
}: StatCardProps): React.ReactElement {
  const sz = size ?? "md";
  const flat = variant === "flat";
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
      className={cn(statCardVariants({ variant, tone, size }), className)}
      {...props}
    >
      {icon || flat ? (
        <div className="flex items-center gap-1.5">
          {icon ? (
            <span className="inline-flex h-4 w-4 items-center justify-center text-gray-500">
              {icon}
            </span>
          ) : null}
          <span className={labelClass[flat ? "flat" : "raised"]}>{label}</span>
        </div>
      ) : (
        <div className={labelClass.raised}>{label}</div>
      )}
      <div
        key={popKey}
        className={cn(
          "mt-1.5 font-extrabold tracking-[-0.4px] leading-none text-gray-900 tabular-nums",
          valueSize[sz],
          // raised 는 text-* 가 leading-none 을 덮어쓴 기존 행간을 유지한다.
          flat && "leading-none",
          animateOnChange && popKey > 0 && "animate-pop",
        )}
      >
        {value}
      </div>
      {helper ? (
        <div
          className={cn(
            "mt-1.5 text-gray-500",
            flat ? "text-sm leading-none font-normal" : "text-3xs",
          )}
        >
          {helper}
        </div>
      ) : null}
    </div>
  );
}
