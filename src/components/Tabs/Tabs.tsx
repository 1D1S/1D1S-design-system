"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  /** 우측 카운트 등 — 라벨 옆에 작게 표시 */
  badge?: React.ReactNode;
  onClick?: () => void;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  items: TabItem[];
  /** 활성 항목 id (controlled) */
  activeId?: string;
  /** 활성 변경 콜백 */
  onChange?: (id: string) => void;
  /** 항목들이 화면 가득 차도록 균등 분할 */
  fullWidth?: boolean;
  /** 사이즈 — 폰트/패딩 */
  size?: "sm" | "md" | "lg";
}

/**
 * Tabs
 * 하단 보더 + 활성 표시. 각 탭은 button 요소.
 *
 * @example
 * ```tsx
 * <Tabs
 *   activeId={tab}
 *   onChange={setTab}
 *   items={[
 *     { id: 'challenge', label: '챌린지' },
 *     { id: 'diary',     label: '일지' },
 *     { id: 'cheer',     label: '응원' },
 *   ]}
 * />
 * ```
 */
export function Tabs({
  items,
  activeId,
  onChange,
  fullWidth = false,
  size = "md",
  className,
  ...props
}: TabsProps): React.ReactElement {
  const sizeClass = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  }[size];

  return (
    <div
      data-slot="tabs"
      role="tablist"
      className={cn(
        "flex border-b border-gray-200",
        fullWidth ? "" : "gap-1",
        className,
      )}
      {...props}
    >
      {items.map((it) => {
        const active = activeId === it.id;
        return (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-current={active ? "page" : undefined}
            onClick={() => {
              onChange?.(it.id);
              it.onClick?.();
            }}
            className={cn(
              "relative -mb-px inline-flex items-center justify-center gap-1.5 border-b-2 font-bold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
              fullWidth && "flex-1",
              sizeClass,
              active
                ? "border-brand text-brand"
                : "border-transparent text-gray-500 hover:text-gray-700",
            )}
          >
            <span>{it.label}</span>
            {it.badge !== undefined ? (
              <span
                className={cn(
                  "text-2xs font-semibold tabular-nums",
                  active ? "text-brand/70" : "text-gray-400",
                )}
              >
                {it.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
