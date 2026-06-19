"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface StreakHeroProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 현재 연속 일수 */
  days: number;
  /** 헤더 라벨 (default `"현재 스트릭"`) */
  label?: React.ReactNode;
  /** 일수 단위 (default `"일째"`) */
  unit?: React.ReactNode;
  /** 우상단 아이콘 (default 🔥 — flame-flicker 애니메이션 자동 적용) */
  icon?: React.ReactNode;
  /** 하단 메타 라인 (예: "최장 45일 · 이번주 5/7") */
  meta?: React.ReactNode;
}

/**
 * StreakHero
 * 따뜻한 그라디언트 카드에 큰 스트릭 숫자를 표시.
 *
 * @example
 * ```tsx
 * <StreakHero days={27} meta="최장 45일 · 이번주 5/7" />
 * ```
 */
export function StreakHero({
  days,
  label = "현재 스트릭",
  unit = "일째",
  icon = "🔥",
  meta,
  className,
  ...props
}: StreakHeroProps): React.ReactElement {
  return (
    <div
      data-slot="streak-hero"
      className={cn(
        "min-w-[200px] rounded-4 border border-brand-soft p-4 shadow-warm",
        "bg-[linear-gradient(135deg,var(--main-100),var(--main-300))]",
        className,
      )}
      {...props}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-2xs font-bold text-gray-600">{label}</span>
        <span aria-hidden className="text-lg animate-flame-flicker leading-none">
          {icon}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-extrabold leading-none tracking-[-0.6px] text-brand tabular-nums">
          {days}
        </span>
        <span className="text-sm font-bold text-gray-700">{unit}</span>
      </div>
      {meta ? (
        <div className="mt-1.5 text-3xs text-gray-600">{meta}</div>
      ) : null}
    </div>
  );
}
