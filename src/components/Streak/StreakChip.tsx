"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface StreakChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 연속 일수 */
  days: number;
  /** 좌측 아이콘 (기본 🔥 이모지) */
  icon?: React.ReactNode;
  /** 일수 우측 단위 (예: "일") — 미지정 시 표시 안함 */
  unit?: React.ReactNode;
}

/**
 * StreakChip
 * 헤더/네비 등에 들어가는 알약형 스트릭 표시.
 *
 * @example
 * ```tsx
 * <StreakChip days={27} />
 * <StreakChip days={27} unit="일" />
 * ```
 */
export function StreakChip({
  days,
  icon = "🔥",
  unit,
  className,
  ...props
}: StreakChipProps): React.ReactElement {
  return (
    <span
      data-slot="streak-chip"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-main-200 bg-main-100",
        "px-3 py-1.5 text-sm font-extrabold text-brand tabular-nums",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="leading-none">{icon}</span>
      <span>
        {days}
        {unit ? <span className="ml-0.5">{unit}</span> : null}
      </span>
    </span>
  );
}
