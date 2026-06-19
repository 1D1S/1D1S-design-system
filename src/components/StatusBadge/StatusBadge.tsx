"use client";

import React from "react";
import { cn } from "../../lib/utils";

export type StatusBadgeKind = "NEW" | "HOT" | "TIP";
export type StatusBadgeTone =
  | "brand"
  | "blue"
  | "mint"
  | "red"
  | "green"
  | "gray";

const toneWrapClass: Record<StatusBadgeTone, string> = {
  brand: "bg-brand",
  blue: "bg-blue-600",
  mint: "bg-mint-800",
  red: "bg-red-600",
  green: "bg-green-700",
  gray: "bg-gray-700",
};

const kindMap: Record<StatusBadgeKind, StatusBadgeTone> = {
  NEW: "brand",
  HOT: "blue",
  TIP: "mint",
};

export interface StatusBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 프리셋 — 라벨 텍스트와 tone을 자동 설정 */
  kind?: StatusBadgeKind;
  /** wrap 색상 (kind 없을 때 기본 brand) */
  tone?: StatusBadgeTone;
  /** 라벨 텍스트 (kind 미지정 시 필수) */
  children?: React.ReactNode;
  /**
   * `standalone` — wrap + inner pill 2-layer (default)
   * `inline` — 1-layer pill (이미 컬러 배경이 있는 컨테이너 안에 둘 때)
   */
  variant?: "standalone" | "inline";
}

/**
 * StatusBadge
 * NEW / HOT / TIP 상태 라벨. 배너 위 또는 단독으로 사용.
 *
 * @example
 * ```tsx
 * <StatusBadge kind="NEW" />
 * <StatusBadge tone="green">UPCOMING</StatusBadge>
 * <StatusBadge variant="inline" kind="NEW" />  {/* 컬러 배너 위에 사용 *\/}
 * ```
 */
export function StatusBadge({
  kind,
  tone,
  children,
  variant = "standalone",
  className,
  ...props
}: StatusBadgeProps): React.ReactElement {
  const resolvedTone = tone ?? (kind ? kindMap[kind] : "brand");
  const label = children ?? kind ?? "";

  if (variant === "inline") {
    return (
      <span
        data-slot="status-badge"
        data-variant="inline"
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-white/25 px-2.5 py-0.5",
          "text-3xs font-extrabold uppercase tracking-[0.4px] text-white",
          className,
        )}
        {...props}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      data-slot="status-badge"
      data-variant="standalone"
      className={cn(
        "inline-flex items-center justify-center rounded-2 px-3 py-1.5",
        toneWrapClass[resolvedTone],
        className,
      )}
      {...props}
    >
      <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-3xs font-extrabold uppercase tracking-[0.4px] text-white">
        {label}
      </span>
    </span>
  );
}
