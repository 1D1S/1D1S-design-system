"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../lib/utils";

export interface StreakData {
  /** 날짜 (YYYY-MM-DD) */
  date: string;
  /** 활동 레벨 (0-4) */
  count: number;
}

export interface StreakProps {
  /** 활동 데이터 (count 0-4 권장, 데이터 개수에 따라 가로로 길어짐) */
  data?: StreakData[];
  /** 각 날짜 박스의 크기 (픽셀) */
  size?: number;
  /** 박스 사이 간격 (픽셀) */
  gap?: number;
  /** 추가 클래스 */
  className?: string;
  /**
   * 셀 클릭 시 팝오버 하단에 렌더링할 액션 영역.
   * 버튼, 링크 등 인터랙티브 요소를 넣을 수 있습니다.
   */
  renderCellActions?: (item: StreakData) => React.ReactNode;
  /** 마지막(오늘) 셀에 펄스 링으로 주의 환기 (default false) */
  highlightLast?: boolean;
}

function getLevelColor(count: number): string {
  if (count <= 0) return "bg-gray-100";
  if (count === 1) return "bg-main-300";
  if (count === 2) return "bg-main-500";
  if (count === 3) return "bg-main-700";
  return "bg-brand";
}

/**
 * Streak
 * 활동 기록을 깃허브 잔디(Contribution Graph) 스타일로 보여주는 컴포넌트.
 * 7행 그리드 구조로 요일별로 쌓이며 가로로 데이터가 추가됩니다.
 *
 * - 데스크탑: hover 시 날짜/활동 정보 팝오버 표시
 * - 모바일: 클릭 시 테두리 + 정보 팝오버 표시, renderCellActions로 액션 영역 추가 가능
 */
export function Streak({
  data = [],
  size = 26,
  gap = 8,
  className,
  renderCellActions,
  highlightLast = false,
}: StreakProps): React.ReactElement {
  // hover open은 각 셀의 로컬 state — 부모는 단일 선택만 관리해 hover 시 전체 리렌더를 막는다
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  return (
    <div className={cn("w-full overflow-x-auto pb-2", className)}>
      <div
        className="grid w-max grid-flow-col grid-rows-7"
        style={{
          gridTemplateRows: `repeat(7, ${size}px)`,
          gridAutoColumns: `${size}px`,
          gap: `${gap}px`,
        }}
      >
        {data.map((item, index) => (
          <StreakCell
            key={index}
            item={item}
            index={index}
            size={size}
            selected={selectedIndex === index}
            anySelected={selectedIndex !== null}
            onSelect={setSelectedIndex}
            renderCellActions={renderCellActions}
            highlight={highlightLast && index === data.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

interface StreakCellProps {
  item: StreakData;
  index: number;
  size: number;
  selected: boolean;
  anySelected: boolean;
  onSelect: (index: number | null) => void;
  renderCellActions?: (item: StreakData) => React.ReactNode;
  highlight: boolean;
}

const StreakCell = React.memo(function StreakCell({
  item,
  index,
  size,
  selected,
  anySelected,
  onSelect,
  renderCellActions,
  highlight,
}: StreakCellProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const justClickedRef = React.useRef(false);
  const closingRef = React.useRef(false);

  // 다른 셀이 선택되어 이 셀이 해제되면 열려있던 popover도 닫는다
  React.useEffect(() => {
    if (!selected) setOpen(false);
  }, [selected]);

  const clearHoverTimeout = (): void => {
    if (hoverTimeoutRef.current !== null) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          if (justClickedRef.current) {
            justClickedRef.current = false;
            return;
          }
          setOpen(false);
          if (selected) onSelect(null);
          closingRef.current = true;
          setTimeout(() => { closingRef.current = false; }, 200);
        }
      }}
    >
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={`${item.date} · ${item.count}회 활동`}
          className={cn(
            "cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-1",
            getLevelColor(item.count),
            selected && "ring-2 ring-gray-800 ring-offset-1",
            highlight && "animate-pulse-ring",
          )}
          style={{
            width: size,
            height: size,
            borderRadius: `${Math.max(4, Math.round(size * 0.23))}px`,
          }}
          onMouseEnter={() => {
            clearHoverTimeout();
            if (!anySelected && !closingRef.current) setOpen(true);
          }}
          onMouseLeave={() => {
            if (!anySelected) {
              hoverTimeoutRef.current = setTimeout(() => setOpen(false), 80);
            }
          }}
          onClick={() => {
            clearHoverTimeout();
            if (selected) {
              onSelect(null);
              setOpen(false);
              closingRef.current = true;
              setTimeout(() => { closingRef.current = false; }, 200);
            } else {
              justClickedRef.current = true;
              onSelect(index);
              setOpen(true);
            }
          }}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onMouseEnter={clearHoverTimeout}
          onMouseLeave={() => {
            if (!anySelected) setOpen(false);
          }}
          className={cn(
            "z-50 min-w-[120px] rounded-2 bg-gray-900 px-3 py-2 text-xs text-white shadow-default",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2",
          )}
        >
          <p className="whitespace-nowrap text-xs">
            {item.date} · {item.count}회 활동
          </p>
          {selected && renderCellActions ? (
            <div className="mt-2">{renderCellActions(item)}</div>
          ) : null}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
});
