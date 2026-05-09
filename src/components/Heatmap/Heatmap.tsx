"use client";

import React from "react";
import { cn } from "../../lib/utils";

export type HeatmapTone = "main" | "mint" | "blue" | "green" | "gray";

const tonePalettes: Record<HeatmapTone, [string, string, string, string, string]> = {
  main: [
    "var(--gray-100)",
    "var(--main-300)",
    "var(--main-500)",
    "var(--main-700)",
    "var(--main-800)",
  ],
  mint: [
    "var(--gray-100)",
    "var(--mint-300)",
    "var(--mint-500)",
    "var(--mint-700)",
    "var(--mint-900)",
  ],
  blue: [
    "var(--gray-100)",
    "var(--blue-300)",
    "var(--blue-400)",
    "var(--blue-500)",
    "var(--blue-600)",
  ],
  green: [
    "var(--gray-100)",
    "var(--green-200)",
    "var(--green-400)",
    "var(--green-500)",
    "var(--green-700)",
  ],
  gray: [
    "var(--gray-100)",
    "var(--gray-300)",
    "var(--gray-500)",
    "var(--gray-700)",
    "var(--gray-900)",
  ],
};

export interface HeatmapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 셀 값 배열 (각 0~4 레벨). 길이는 rows×cols 권장 */
  cells?: number[];
  /** 컬럼 수 (default 20) */
  cols?: number;
  /** 행 수 (default 7) */
  rows?: number;
  /** 컬러 톤 프리셋 */
  tone?: HeatmapTone;
  /** 5-step 컬러 직접 지정 (tone 무시). [level0, level1, level2, level3, level4] */
  palette?: [string, string, string, string, string];
  /** 셀 사이 간격 px */
  gap?: number;
  /** 셀 모서리 둥글기 px */
  cellRadius?: number;
  /** 호버 시 툴팁 라벨 생성 함수 (셀 인덱스 → 텍스트). 미지정 시 툴팁 비활성 */
  ariaLabel?: (index: number, level: number) => string;
}

/**
 * Heatmap
 * GitHub-style 활동 잔디. 7행 × N열 그리드, 각 셀 0~4 레벨.
 *
 * @param tone `main` (default) · `mint` · `blue` · `green` · `gray`
 * @param cells 길이 rows×cols 의 number[] 0~4
 * @param cols 컬럼 수 (default 20)
 *
 * @example
 * ```tsx
 * <Heatmap cols={20} cells={data} tone="main" />
 * <Heatmap cols={12} tone="mint" />  {/* 빈 그리드 *\/}
 * ```
 */
export function Heatmap({
  cells,
  cols = 20,
  rows = 7,
  tone = "main",
  palette,
  gap = 3,
  cellRadius = 3,
  ariaLabel,
  className,
  ...props
}: HeatmapProps): React.ReactElement {
  const colors = palette ?? tonePalettes[tone];
  const total = rows * cols;
  const data = cells ?? Array.from({ length: total }, () => 0);

  return (
    <div
      data-slot="heatmap"
      role="img"
      className={cn("w-full", className)}
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridAutoFlow: "column",
        gridAutoColumns: "1fr",
        gap,
      }}
      {...props}
    >
      {data.slice(0, total).map((raw, i) => {
        const level = Math.max(0, Math.min(4, Math.round(raw)));
        return (
          <div
            key={i}
            aria-label={ariaLabel?.(i, level)}
            style={{
              aspectRatio: "1",
              borderRadius: cellRadius,
              background: colors[level],
            }}
          />
        );
      })}
    </div>
  );
}
