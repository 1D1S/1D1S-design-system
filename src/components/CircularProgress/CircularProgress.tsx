"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Text, type textVariants } from "../Text";
import type { VariantProps } from "class-variance-authority";

type LabelSize = VariantProps<typeof textVariants>["size"];

export type CircularProgressSize = "sm" | "md" | "lg" | "xl";

const presets: Record<
  CircularProgressSize,
  { diameter: number; stroke: number; labelSize: LabelSize }
> = {
  sm: { diameter: 48, stroke: 5, labelSize: "caption2" },
  md: { diameter: 72, stroke: 7, labelSize: "body2" },
  lg: { diameter: 100, stroke: 9, labelSize: "body1" },
  xl: { diameter: 140, stroke: 12, labelSize: "heading2" },
};

export interface CircularProgressProps {
  /** 진행률 0~100 */
  value: number;
  /** 사이즈 프리셋 또는 픽셀 단위 직경 */
  size?: CircularProgressSize | number;
  /** stroke 두께(px). 미지정 시 size 프리셋 값 또는 직경의 1/10 */
  stroke?: number;
  /** 채움 색 — 미지정 시 brand */
  color?: string;
  /** 트랙 색 — 미지정 시 gray-100 */
  trackColor?: string;
  /** 가운데 퍼센트 텍스트 */
  showPercentage?: boolean;
  /** 가운데에 들어갈 커스텀 노드 (showPercentage보다 우선) */
  centerSlot?: React.ReactNode;
  className?: string;
}

/**
 * CircularProgress v3
 * 원형 진행률 — track + fill 2-arc SVG.
 *
 * @param size `sm`(48) · `md`(72, default) · `lg`(100) · `xl`(140) · 또는 숫자(px)
 * @param stroke stroke 두께 (px)
 * @param color 채움 색
 *
 * @example
 * ```tsx
 * <CircularProgress value={75} size="lg" />
 * <CircularProgress value={62} size={120} stroke={10} />
 * ```
 */
export function CircularProgress({
  value,
  size = "md",
  stroke,
  color,
  trackColor,
  showPercentage = true,
  centerSlot,
  className,
}: CircularProgressProps): React.ReactElement {
  const isPreset = typeof size === "string";
  const preset = isPreset
    ? presets[size]
    : { diameter: size, stroke: stroke ?? Math.max(2, Math.round(size / 10)), labelSize: "body1" as const };

  const diameter = preset.diameter;
  const resolvedStroke = stroke ?? preset.stroke;
  const radius = (diameter - resolvedStroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(value, 0), 100);
  const labelSize = preset.labelSize;

  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const f = requestAnimationFrame(() => setAnimated(clamped));
    return () => cancelAnimationFrame(f);
  }, [clamped]);

  const dashOffset = circumference - (circumference * animated) / 100;

  return (
    <div
      data-slot="circular-progress"
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: diameter, height: diameter }}
    >
      <svg width={diameter} height={diameter} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          strokeWidth={resolvedStroke}
          className={cn(!trackColor && "stroke-gray-100")}
          stroke={trackColor}
        />
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          strokeWidth={resolvedStroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={cn(!color && "stroke-brand")}
          stroke={color}
          style={{
            transition:
              "stroke-dashoffset 600ms cubic-bezier(0.2, 0.7, 0.1, 1)",
          }}
        />
      </svg>

      {(centerSlot ?? showPercentage) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {centerSlot ?? (
            <Text
              size={labelSize}
              weight="extrabold"
              className={cn(!color && "text-brand")}
              style={color ? { color } : undefined}
            >
              {`${clamped}%`}
            </Text>
          )}
        </div>
      )}
    </div>
  );
}
