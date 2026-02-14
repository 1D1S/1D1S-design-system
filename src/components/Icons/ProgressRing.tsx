import React from "react";
import { cn } from "../../lib/utils";

export interface ProgressRingProps {
  baseSize: number;
  radius: number;
  strokeWidth: number;
  circumference: number;
  dashOffset: number;
  className?: string;
}

export function ProgressRing({
  baseSize,
  radius,
  strokeWidth,
  circumference,
  dashOffset,
  className,
}: ProgressRingProps): React.ReactElement {
  return (
    <svg
      viewBox={`0 0 ${baseSize} ${baseSize}`}
      className={cn("rounded-full", className)}
    >
      <circle
        cx={baseSize / 2}
        cy={baseSize / 2}
        r={radius}
        fill="none"
        className="stroke-main-800"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        transform={`rotate(-100 ${baseSize / 2} ${baseSize / 2})`}
        style={{
          transition: "stroke-dashoffset 800ms cubic-bezier(0.2, 0.7, 0.1, 1)",
        }}
        strokeLinecap="round"
      />
    </svg>
  );
}

