"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Check } from "../Icons/Check";

export interface DropdownMenuItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownMenuProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "onSelect" | "children"
  > {
  items: DropdownMenuItem[];
  /** 현재 선택된 value */
  value?: string;
  /** 선택 시 콜백 */
  onSelect?: (value: string) => void;
  /** 메뉴 너비 (default 240) */
  width?: number | string;
  /**
   * 열림 상태. 지정하면 입·퇴장 애니메이션과 마운트/언마운트를 내부에서 관리한다.
   * (소비처는 조건부 렌더 없이 항상 렌더하고 open만 토글)
   * 미지정 시 기존처럼 항상 정적으로 표시한다.
   */
  open?: boolean;
}

/**
 * DropdownMenu
 * Dropdown 트리거 아래 띄우는 항목 목록 — 선택된 항목은 brand + check.
 *
 * @example
 * ```tsx
 * <DropdownMenu
 *   items={[{ value: 'recent', label: '최신순' }, { value: 'popular', label: '인기순' }]}
 *   value="popular"
 *   onSelect={(v) => setSort(v)}
 * />
 * ```
 */
export function DropdownMenu({
  items,
  value,
  onSelect,
  width = 240,
  open,
  className,
  style,
  ...props
}: DropdownMenuProps): React.ReactElement | null {
  const isControlled = open !== undefined;
  // 퇴장 애니메이션이 끝날 때까지 DOM에 남겨두기 위한 presence 상태
  const [present, setPresent] = React.useState(open ?? true);

  React.useEffect(() => {
    if (open) setPresent(true);
  }, [open]);

  if (isControlled && !present) return null;

  const state = isControlled ? (open ? "open" : "closed") : "open";

  return (
    <div
      data-slot="dropdown-menu"
      data-state={state}
      role="listbox"
      onAnimationEnd={(e) => {
        // 닫힘 애니메이션이 끝나면 언마운트 (자식 transition 이벤트는 무시)
        if (e.target === e.currentTarget && isControlled && !open) {
          setPresent(false);
        }
      }}
      className={cn(
        "rounded-2.5 border border-gray-200 bg-white p-1.5 shadow-lg",
        "origin-top",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1",
        "duration-150 ease-out",
        className,
      )}
      style={{ width, ...style }}
      {...props}
    >
      {items.map((it) => {
        const selected = it.value === value;
        return (
          <div
            key={it.value}
            role="option"
            aria-selected={selected}
            aria-disabled={it.disabled || undefined}
            onClick={() => !it.disabled && onSelect?.(it.value)}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-1.5 px-3 py-2 text-sm transition-colors",
              selected
                ? "bg-brand-softer font-bold text-brand"
                : "font-medium text-gray-800 hover:bg-gray-50",
              it.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <span className="truncate">{it.label}</span>
            {selected ? (
              <Check
                className="ml-2 h-3 w-3 shrink-0 text-brand"
                strokeWidth={10}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
