"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../lib/utils";

export type HeatmapTone = "main" | "mint" | "blue" | "green" | "gray";

const tonePalettes: Record<HeatmapTone, [string, string, string, string, string]> = {
  main: [
    "var(--gray-100)",
    "var(--main-300)",
    "var(--main-500)",
    "var(--main-700)",
    "var(--brand)",
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

export interface HeatmapCellInfo {
  /** 셀 인덱스 (0-based, column-first) */
  index: number;
  /** 셀 레벨 (0~4) */
  level: number;
}

export interface HeatmapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onClick"> {
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
  /** 셀 a11y 라벨 생성 함수 (셀 인덱스/레벨 → 텍스트). */
  ariaLabel?: (index: number, level: number) => string;
  /**
   * Hover/포커스 시 popover로 보여줄 컨텐츠 생성 함수.
   * 지정하면 셀이 인터랙티브해지고 hover/click으로 popover가 열려요.
   */
  renderCellTooltip?: (info: HeatmapCellInfo) => React.ReactNode;
  /**
   * 셀 클릭 시 popover 하단에 추가로 렌더링할 액션 영역.
   * 클릭으로 선택된 상태에서만 표시되며, 인터랙션을 위해 `renderCellTooltip`이 함께 필요해요.
   */
  renderCellActions?: (info: HeatmapCellInfo) => React.ReactNode;
  /** 셀 클릭 콜백 */
  onCellClick?: (info: HeatmapCellInfo) => void;
  /** 셀 hover 콜백 */
  onCellHover?: (info: HeatmapCellInfo | null) => void;
}

/**
 * Heatmap
 * GitHub-style 활동 잔디. 7행 × N열 그리드, 각 셀 0~4 레벨.
 *
 * `renderCellTooltip`을 넘기면 각 셀에 hover popover + 클릭 선택 인터랙션이 활성화돼요.
 *
 * 구현 노트: popover 는 **컴포넌트 전체에 하나**만 있고 hover/선택된 셀을
 * 가상 앵커로 따라간다. 예전엔 셀마다 Popover.Root(상태 + 이펙트 + 포털)를
 * 만들어 20×7 그리드가 곧 Radix 인스턴스 140개였다 — 마이페이지 마운트가
 * 눈에 띄게 느려지던 원인. 동작(hover 열림/클릭 선택/80ms 유예)은 동일하다.
 *
 * @param tone `main` (default) · `mint` · `blue` · `green` · `gray`
 * @param cells 길이 rows×cols 의 number[] 0~4
 * @param cols 컬럼 수 (default 20)
 *
 * @example
 * ```tsx
 * // 정적 (인터랙션 없음)
 * <Heatmap cols={20} cells={data} tone="main" />
 *
 * // hover/click 인터랙션
 * <Heatmap
 *   cols={20}
 *   cells={data}
 *   renderCellTooltip={({ index, level }) =>
 *     `${dates[index]} · ${level}회 활동`
 *   }
 *   renderCellActions={({ index }) => (
 *     <Button size="xs" onClick={() => openDay(dates[index])}>일지 보기</Button>
 *   )}
 *   onCellClick={({ index, level }) => track(index, level)}
 * />
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
  renderCellTooltip,
  renderCellActions,
  onCellClick,
  onCellHover,
  className,
  ...props
}: HeatmapProps): React.ReactElement {
  const colors = palette ?? tonePalettes[tone];
  const total = rows * cols;
  const data = cells ?? Array.from({ length: total }, () => 0);
  const interactive = Boolean(renderCellTooltip);
  // 단일 선택 — 클릭으로 고정된 셀. 액션 영역 노출 여부를 가른다.
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  // hover 로 열려 있는 셀(선택이 없을 때만 의미).
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  // 단일 popover 의 가상 앵커 — 현재 활성 셀의 DOM 노드를 가리킨다.
  const anchorRef = React.useRef<HTMLElement | null>(null);
  const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = selectedIndex ?? hoverIndex;
  const activeLevel =
    activeIndex === null
      ? 0
      : Math.max(0, Math.min(4, Math.round(data[activeIndex] ?? 0)));

  const clearHoverTimeout = (): void => {
    if (hoverTimeoutRef.current !== null) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const closeAll = (): void => {
    clearHoverTimeout();
    setSelectedIndex(null);
    setHoverIndex(null);
  };

  return (
    <div
      data-slot="heatmap"
      role={interactive ? undefined : "img"}
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
        if (!interactive) {
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
        }
        const info: HeatmapCellInfo = { index: i, level };
        const selected = selectedIndex === i;
        return (
          <button
            key={i}
            type="button"
            aria-label={ariaLabel?.(i, level)}
            className={cn(
              "cursor-pointer transition-[box-shadow,transform] duration-150 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-1",
              selected && "ring-2 ring-gray-800 ring-offset-1",
            )}
            style={{
              aspectRatio: "1",
              borderRadius: cellRadius,
              background: colors[level],
              border: "none",
              padding: 0,
            }}
            onMouseEnter={(event) => {
              clearHoverTimeout();
              anchorRef.current = event.currentTarget;
              onCellHover?.(info);
              if (selectedIndex === null) setHoverIndex(i);
            }}
            onMouseLeave={() => {
              onCellHover?.(null);
              if (selectedIndex === null) {
                hoverTimeoutRef.current = setTimeout(
                  () => setHoverIndex(null),
                  80,
                );
              }
            }}
            onClick={(event) => {
              clearHoverTimeout();
              anchorRef.current = event.currentTarget;
              if (selected) {
                closeAll();
              } else {
                setSelectedIndex(i);
                setHoverIndex(null);
                onCellClick?.(info);
              }
            }}
          />
        );
      })}
      {interactive ? (
        // key 로 셀 전환 시 리마운트시켜 가상 앵커 위치를 다시 측정한다.
        <Popover.Root
          key={activeIndex ?? "closed"}
          open={activeIndex !== null}
          onOpenChange={(next) => {
            if (!next) closeAll();
          }}
        >
          <Popover.Anchor
            virtualRef={anchorRef as React.RefObject<HTMLElement>}
          />
          <Popover.Portal>
            <Popover.Content
              side="top"
              sideOffset={4}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onMouseEnter={clearHoverTimeout}
              onMouseLeave={() => {
                if (selectedIndex === null) setHoverIndex(null);
              }}
              className={cn(
                "z-50 min-w-[120px] rounded-2 bg-gray-900 px-3 py-2 text-xs text-white shadow-default",
                "animate-in fade-in-0 zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                "data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2",
              )}
            >
              {activeIndex !== null && renderCellTooltip ? (
                <div className="whitespace-nowrap text-xs">
                  {renderCellTooltip({ index: activeIndex, level: activeLevel })}
                </div>
              ) : null}
              {activeIndex !== null &&
              selectedIndex === activeIndex &&
              renderCellActions ? (
                <div className="mt-2">
                  {renderCellActions({ index: activeIndex, level: activeLevel })}
                </div>
              ) : null}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      ) : null}
    </div>
  );
}
