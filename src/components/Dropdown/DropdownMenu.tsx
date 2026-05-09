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
  className,
  style,
  ...props
}: DropdownMenuProps): React.ReactElement {
  return (
    <div
      data-slot="dropdown-menu"
      role="listbox"
      className={cn(
        "rounded-[10px] border border-gray-200 bg-white p-1.5 shadow-lg",
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
              "flex cursor-pointer items-center justify-between rounded-[6px] px-3 py-2 text-sm transition-colors",
              selected
                ? "bg-main-100 font-bold text-brand"
                : "font-medium text-gray-800 hover:bg-gray-50",
              it.disabled && "cursor-not-allowed opacity-[0.45]",
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
