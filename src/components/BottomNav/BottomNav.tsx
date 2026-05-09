"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface BottomNavItem {
  id: string;
  /** 아이콘 노드 (또는 active/inactive 분기용 함수) */
  icon: React.ReactNode | ((active: boolean) => React.ReactNode);
  label: React.ReactNode;
  onClick?: () => void;
}

export interface BottomNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onChange"> {
  items: BottomNavItem[];
  /** 활성 항목의 id */
  activeId?: string;
  /** 항목 클릭 시 호출 (item.onClick보다 먼저 호출됨) */
  onChange?: (id: string) => void;
}

/**
 * BottomNav
 * 모바일 하단 sticky 내비게이션. 4개 탭이 일반적이지만 가변.
 *
 * @example
 * ```tsx
 * <BottomNav
 *   activeId={tab}
 *   onChange={setTab}
 *   items={[
 *     { id: 'home', icon: <Home />, label: '홈' },
 *     { id: 'challenge', icon: <Grid />, label: '챌린지' },
 *     { id: 'diary', icon: <Book />, label: '일지' },
 *     { id: 'mypage', icon: <User />, label: '마이' },
 *   ]}
 * />
 * ```
 */
export function BottomNav({
  items,
  activeId,
  onChange,
  className,
  ...props
}: BottomNavProps): React.ReactElement {
  return (
    <nav
      data-slot="bottom-nav"
      className={cn(
        "sticky bottom-0 z-30 grid border-t border-gray-100 bg-white/95 px-3 pb-3.5 pt-2.5 backdrop-blur-md",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
      {...props}
    >
      {items.map((it) => {
        const active = activeId === it.id;
        const iconNode =
          typeof it.icon === "function" ? it.icon(active) : it.icon;
        return (
          <button
            key={it.id}
            type="button"
            data-active={active ? "true" : "false"}
            aria-current={active ? "page" : undefined}
            onClick={() => {
              onChange?.(it.id);
              it.onClick?.();
            }}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 py-1 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
              active ? "text-brand" : "text-gray-400 hover:text-gray-600",
            )}
          >
            <span className="leading-none">{iconNode}</span>
            <span className="text-[10px] font-semibold leading-none">
              {it.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
