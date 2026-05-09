"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

export type ProgressBarSize = "xs" | "sm" | "md" | "lg";

const heightBySize: Record<ProgressBarSize, number> = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
};

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 진행률 0~100 */
  value: number;
  label?: React.ReactNode;
  showLabel?: boolean;
  showValueText?: boolean;
  valueText?: React.ReactNode;
  /** 마감 없음 — 100%로 채운 채 ∞ 표시 */
  infinite?: boolean;
  /** 굵기 프리셋 (xs=4 · sm=6 · md=8 · lg=12). `thickness` 우선 적용 */
  size?: ProgressBarSize;
  /** 픽셀 단위 굵기 (size 무시) */
  thickness?: number;
  /** 채움 색 (CSS color) — 미지정 시 brand */
  fillColor?: string;
  /** 트랙 색 (CSS color) — 미지정 시 gray-100 */
  trackColor?: string;
  labelClassName?: string;
  valueClassName?: string;
  trackClassName?: string;
  fillClassName?: string;
}

/**
 * ProgressBar v3
 * 진행률 바 — 라벨 / 퍼센트 / 굵기 / 색상 제어 가능.
 *
 * @param size `xs` (4px) · `sm` (6px) · `md` (8px, default) · `lg` (12px)
 * @param thickness 픽셀 단위 직접 지정 (size를 덮어씀)
 *
 * @example
 * ```tsx
 * <ProgressBar value={62} size="md" />
 * <ProgressBar label="아침 30분 러닝" value={45} size="lg" />
 * ```
 */
export function ProgressBar({
  value,
  label,
  showLabel,
  showValueText = true,
  valueText,
  infinite = false,
  size = "md",
  thickness,
  fillColor,
  trackColor,
  className,
  labelClassName,
  valueClassName,
  trackClassName,
  fillClassName,
  ...props
}: ProgressBarProps): React.ReactElement {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const progressWidth = infinite ? "100%" : `${clampedValue}%`;
  const resolvedValueText =
    valueText ?? (infinite ? "∞" : `${clampedValue}%`);
  const shouldShowLabel = showLabel ?? label !== undefined;
  const resolvedThickness = thickness ?? heightBySize[size];

  return (
    <div className={cn("w-full", className)} {...props}>
      {(shouldShowLabel || showValueText) && (
        <div className="flex items-center justify-between gap-3">
          {shouldShowLabel ? (
            <Text
              size="caption1"
              weight="medium"
              className={cn("line-clamp-1 text-gray-800", labelClassName)}
            >
              {label}
            </Text>
          ) : (
            <span />
          )}
          {showValueText ? (
            <Text
              size="caption2"
              weight="medium"
              className={cn("shrink-0 text-gray-600", valueClassName)}
            >
              {resolvedValueText}
            </Text>
          ) : null}
        </div>
      )}

      <div
        className={cn(
          "mt-2 overflow-hidden rounded-full bg-gray-100",
          trackClassName,
        )}
        style={{
          height: `${resolvedThickness}px`,
          ...(trackColor ? { backgroundColor: trackColor } : {}),
        }}
      >
        <div
          className={cn(
            "h-full rounded-full bg-brand transition-[width] duration-300 ease-out",
            fillClassName,
          )}
          style={{
            width: progressWidth,
            ...(fillColor ? { backgroundColor: fillColor } : {}),
          }}
        />
      </div>
    </div>
  );
}
