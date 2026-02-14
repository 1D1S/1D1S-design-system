"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  value: number;
  label?: React.ReactNode;
  showLabel?: boolean;
  showValueText?: boolean;
  valueText?: React.ReactNode;
  infinite?: boolean;
  thickness?: number;
  fillColor?: string;
  trackColor?: string;
  labelClassName?: string;
  valueClassName?: string;
  trackClassName?: string;
  fillClassName?: string;
}

/**
 * ProgressBar
 * 라벨/퍼센트 텍스트/두께/색상을 유연하게 제어할 수 있는 진행률 바 컴포넌트.
 */
export function ProgressBar({
  value,
  label,
  showLabel,
  showValueText = true,
  valueText,
  infinite = false,
  thickness = 6,
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
              size="caption1"
              weight="medium"
              className={cn("shrink-0 text-gray-600", valueClassName)}
            >
              {resolvedValueText}
            </Text>
          ) : null}
        </div>
      )}

      <div
        className={cn("mt-2.5 overflow-hidden rounded-full bg-gray-200", trackClassName)}
        style={{
          height: `${thickness}px`,
          ...(trackColor ? { backgroundColor: trackColor } : {}),
        }}
      >
        <div
          className={cn(
            "h-full rounded-full bg-main-800 transition-all duration-200",
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
