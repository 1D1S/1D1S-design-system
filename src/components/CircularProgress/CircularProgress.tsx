"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Text, textVariants } from "../Text";

type LabelSize = VariantProps<typeof textVariants>["size"];

const circularProgressVariants = cva("", {
  variants: {
    size: {
      sm: "w-11 h-11",
      lg: "w-30 h-30",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type CircularProgressVariants = VariantProps<
  typeof circularProgressVariants
>;

interface CircularProgressProps extends CircularProgressVariants {
  value: number;
  showPercentage?: boolean;
  className?: string;
}

/**
 * CircularProgress
 * 원형 진행률 표시 컴포넌트
 *
 * @param value 진행률 (0~100)
 * @param size 크기 (sm, lg)
 * @param showPercentage 퍼센트 표시 여부
 * @param className 추가 클래스 이름
 *
 * @example 기본 사용
 * ```tsx
 * <CircularProgress value={75} size="sm" showPercentage />
 * ```
 */
export function CircularProgress({
  value,
  size,
  showPercentage = true,
  className,
}: CircularProgressProps): React.ReactElement {
  const sizeKey: "sm" | "lg" = size === "lg" ? "lg" : "sm";

  const baseSizeMap: Record<"sm" | "lg", number> = {
    sm: 50,
    lg: 120,
  };
  const strokeWidthMap: Record<"sm" | "lg", number> = {
    sm: 5,
    lg: 10,
  };

  const fontSizeMap: Record<"sm" | "lg", LabelSize> = {
    sm: "caption3",
    lg: "display2",
  };

  const baseSize = baseSizeMap[sizeKey];
  const strokeWidth = strokeWidthMap[sizeKey];

  const radius = (baseSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const [animatedValue, setAnimatedValue] = useState<number>(0);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setAnimatedValue(clampedValue);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [clampedValue]);

  const animatedOffset = circumference - (circumference * animatedValue) / 100;

  const wrapperClasses = cn(
    circularProgressVariants({ size: sizeKey }),
    "rounded-full",
    className,
  );

  return (
    <div className="relative inline-block">
      <svg viewBox={`0 0 ${baseSize} ${baseSize}`} className={wrapperClasses}>
        <circle
          cx={baseSize / 2}
          cy={baseSize / 2}
          r={radius}
          fill="none"
          className="stroke-main-800"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          transform={`rotate(-100 ${baseSize / 2} ${baseSize / 2})`}
          style={{
            transition:
              "stroke-dashoffset 800ms cubic-bezier(0.2, 0.7, 0.1, 1)",
          }}
          strokeLinecap="round"
        />
      </svg>

      {showPercentage && (
        <Text
          className="absolute inset-0 flex items-center justify-center text-main-800"
          size={fontSizeMap[sizeKey]}
          weight="bold"
        >
          {`${clampedValue}%`}
        </Text>
      )}
    </div>
  );
}
