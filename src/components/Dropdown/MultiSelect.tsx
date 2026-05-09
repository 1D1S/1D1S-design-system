"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface MultiSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  /** 선택된 값 라벨 배열 */
  selected: string[];
  /** placeholder 텍스트 (예: "카테고리 선택", "4 외 더 추가") */
  placeholder?: React.ReactNode;
  /** 칩 X 버튼 클릭 시 콜백 */
  onRemove?: (value: string) => void;
  /** 클릭 시 콜백 (메뉴 열기 등) */
  onAddClick?: () => void;
}

/**
 * MultiSelect
 * 선택된 값을 brand-soft 칩 묶음으로 보여주는 multi-tag 입력. 칩에 X 버튼.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   selected={['운동', '건강']}
 *   placeholder="4 외 더 추가"
 *   onRemove={(v) => setTags(tags.filter(t => t !== v))}
 *   onAddClick={openMenu}
 * />
 * ```
 */
export function MultiSelect({
  selected,
  placeholder = "추가",
  onRemove,
  onAddClick,
  className,
  ...props
}: MultiSelectProps): React.ReactElement {
  return (
    <div
      data-slot="multi-select"
      onClick={onAddClick}
      className={cn(
        "flex min-h-[38px] w-80 flex-wrap items-center gap-1.5 rounded-2 border border-gray-200 bg-white px-3 py-2.5",
        onAddClick && "cursor-pointer transition-colors hover:border-gray-300",
        className,
      )}
      {...props}
    >
      {selected.map((s) => (
        <span
          key={s}
          className="inline-flex items-center gap-1 rounded-[6px] bg-main-200 px-2 py-0.5 text-[11px] font-bold text-brand"
        >
          {s}
          {onRemove ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(s);
              }}
              aria-label={`${s} 제거`}
              className="ml-0.5 inline-flex h-3 w-3 items-center justify-center rounded-full text-brand transition-colors hover:bg-brand hover:text-white"
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M2 2l5 5M7 2l-5 5" />
              </svg>
            </button>
          ) : null}
        </span>
      ))}
      <span className="text-xs text-gray-400">{placeholder}</span>
    </div>
  );
}
