"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "../Icons";
import { Text } from "../Text";

export interface StepIndicatorItem {
  id?: string;
  label: React.ReactNode;
}

type StepIndicatorSize = "sm" | "md" | "lg";

const SIZE_CONFIG: Record<StepIndicatorSize, {
  circle: string;
  trackTop: string;
  checkIcon: string;
  numberSize: React.ComponentProps<typeof Text>["size"];
  labelSize: React.ComponentProps<typeof Text>["size"];
  labelMargin: string;
}> = {
  sm: {
    circle: "h-7 w-7",
    trackTop: "top-3.5",
    checkIcon: "h-3 w-3",
    numberSize: "caption1",
    labelSize: "body2",
    labelMargin: "mt-3",
  },
  md: {
    circle: "h-10 w-10",
    trackTop: "top-5",
    checkIcon: "h-4 w-4",
    numberSize: "body1",
    labelSize: "heading2",
    labelMargin: "mt-5",
  },
  lg: {
    circle: "h-14 w-14",
    trackTop: "top-7",
    checkIcon: "h-5 w-5",
    numberSize: "body1",
    labelSize: "heading1",
    labelMargin: "mt-7",
  },
};

export interface StepIndicatorProps {
  steps: StepIndicatorItem[];
  /** 현재 단계 (1부터 시작) */
  currentStep: number;
  size?: StepIndicatorSize;
  className?: string;
}

/**
 * StepIndicator
 * 단계 진행 상태를 가로 라인과 원형 포인트로 표시하는 컴포넌트.
 */
export function StepIndicator({
  steps,
  currentStep,
  size = "md",
  className,
}: StepIndicatorProps): React.ReactElement {
  const config = SIZE_CONFIG[size];
  if (steps.length === 0) {
    return <div className={cn("w-full", className)} />;
  }

  const maxIndex = Math.max(steps.length - 1, 0);
  const clampedCurrentIndex = Math.min(Math.max(currentStep - 1, 0), maxIndex);
  const edgeOffset = `${100 / (steps.length * 2)}%`;
  const progressPercent = maxIndex === 0 ? 100 : (clampedCurrentIndex / maxIndex) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        {steps.length > 1 ? (
          <div
            className={cn("absolute", config.trackTop)}
            style={{
              left: edgeOffset,
              right: edgeOffset,
            }}
          >
            <div className="h-0.5 w-full bg-gray-200" />
            <div
              className="absolute top-0 left-0 h-0.5 bg-main-800 transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        ) : null}

        <ol className="relative z-10 flex items-start">
          {steps.map((step, index) => {
            const isCompleted = index < clampedCurrentIndex;
            const isCurrent = index === clampedCurrentIndex;
            const key = step.id ?? `step-${index}`;

            return (
              <li key={key} className="flex flex-1 flex-col items-center">
                <span
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 bg-white transition-colors duration-200",
                    config.circle,
                    isCompleted && "border-main-800 bg-main-800 text-white",
                    isCurrent && "border-main-800 bg-main-800 text-white ring-4 ring-main-300",
                    !isCompleted && !isCurrent && "border-gray-300 text-gray-600"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className={config.checkIcon} strokeWidth={2.5} />
                  ) : (
                    <Text
                      size={config.numberSize}
                      weight="bold"
                      className={cn(isCurrent ? "text-white" : "text-gray-600")}
                    >
                      {index + 1}
                    </Text>
                  )}
                </span>

                <Text
                  size={config.labelSize}
                  weight={isCurrent ? "bold" : "medium"}
                  className={cn(
                    "text-center leading-tight",
                    config.labelMargin,
                    isCompleted && "text-gray-900",
                    isCurrent && "text-main-800",
                    !isCompleted && !isCurrent && "text-gray-600"
                  )}
                >
                  {step.label}
                </Text>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
