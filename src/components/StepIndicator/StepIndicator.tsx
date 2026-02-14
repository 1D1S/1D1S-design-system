"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

export interface StepIndicatorItem {
  id?: string;
  label: React.ReactNode;
}

export interface StepIndicatorProps {
  steps: StepIndicatorItem[];
  /** 현재 단계 (1부터 시작) */
  currentStep: number;
  className?: string;
}

/**
 * StepIndicator
 * 단계 진행 상태를 가로 라인과 원형 포인트로 표시하는 컴포넌트.
 */
export function StepIndicator({
  steps,
  currentStep,
  className,
}: StepIndicatorProps): React.ReactElement {
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
            className="absolute top-5"
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
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white transition-colors duration-200",
                    isCompleted && "border-main-800 bg-main-800 text-white",
                    isCurrent && "border-main-800 bg-main-800 text-white ring-4 ring-main-300",
                    !isCompleted && !isCurrent && "border-gray-300 text-gray-600"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    <Text
                      size="body1"
                      weight="bold"
                      className={cn(isCurrent ? "text-white" : "text-gray-600")}
                    >
                      {index + 1}
                    </Text>
                  )}
                </span>

                <Text
                  size="heading2"
                  weight={isCurrent ? "bold" : "medium"}
                  className={cn(
                    "mt-5 text-center leading-tight",
                    isCompleted && "text-main-800",
                    isCurrent && "text-gray-900",
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
