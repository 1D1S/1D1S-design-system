"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface TopNavItem {
  id: string;
  label: React.ReactNode;
  onClick?: () => void;
}

export interface TopNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onChange"> {
  /** 좌측 브랜드 영역 (로고 + 이름). `<TopNav.Brand />` 또는 임의 노드 */
  brand?: React.ReactNode;
  /** 가운데 네비 항목 */
  items?: TopNavItem[];
  /** 활성 항목의 id */
  activeId?: string;
  /** 항목 클릭 콜백 (id 전달, 그 후 item.onClick 호출) */
  onChange?: (id: string) => void;
  /** 우측 영역 (검색 / 알림 / 프로필 등) */
  end?: React.ReactNode;
  /** 컴팩트(태블릿) 변형 — height 56px, padding 줄어듦 */
  compact?: boolean;
}

/**
 * TopNav
 * 데스크톱/태블릿 상단 sticky 네비게이션 — 좌측 브랜드 / 가운데 항목 / 우측 슬롯.
 *
 * @example
 * ```tsx
 * <TopNav
 *   brand={<TopNav.Brand letters="1D" name="1Day 1Streak" />}
 *   activeId={tab}
 *   onChange={setTab}
 *   items={[
 *     { id: 'home', label: '홈' },
 *     { id: 'challenge', label: '챌린지' },
 *   ]}
 *   end={<>... 검색 / 알림 / 아바타 ...</>}
 * />
 * ```
 */
export function TopNav({
  brand,
  items,
  activeId,
  onChange,
  end,
  compact = false,
  className,
  ...props
}: TopNavProps): React.ReactElement {
  return (
    <header
      data-slot="top-nav"
      className={cn(
        "sticky top-0 z-30 flex w-full items-center border-b border-gray-200 bg-white",
        compact ? "h-14 gap-4 px-4" : "h-[62px] gap-6 px-7",
        className,
      )}
      {...props}
    >
      {brand ? <div className="flex shrink-0 items-center">{brand}</div> : null}

      {items && items.length > 0 ? (
        <nav className={cn("flex items-center gap-1", compact ? "ml-2" : "ml-4")}>
          {items.map((it) => {
            const active = activeId === it.id;
            return (
              <button
                key={it.id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  onChange?.(it.id);
                  it.onClick?.();
                }}
                className={cn(
                  "rounded-2 px-3.5 py-2 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
                  active
                    ? "bg-brand-softer font-bold text-brand"
                    : "font-medium text-gray-700 hover:bg-gray-100",
                  compact && "px-2.5 py-1.5",
                )}
              >
                {it.label}
              </button>
            );
          })}
        </nav>
      ) : null}

      {end ? (
        <div className="ml-auto flex shrink-0 items-center gap-2.5">{end}</div>
      ) : null}
    </header>
  );
}

export interface TopNavBrandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 로고 박스 안에 표시할 약자 (e.g. "1D") */
  letters?: React.ReactNode;
  /** 로고 박스 옆에 표시할 풀 네임 */
  name?: React.ReactNode;
  /** 로고 박스 클릭 가능 시 onClick */
  onLogoClick?: () => void;
}

/**
 * TopNav.Brand
 * 그라디언트 로고 박스 + 이름. 캘러는 letters/name만 넘기면 됨.
 */
export function TopNavBrand({
  letters,
  name,
  onLogoClick,
  className,
  ...props
}: TopNavBrandProps): React.ReactElement {
  return (
    <div
      data-slot="top-nav-brand"
      className={cn("flex items-center gap-2.5", className)}
      {...props}
    >
      <div
        onClick={onLogoClick}
        className={cn(
          "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-2",
          "bg-[linear-gradient(135deg,var(--main-700),var(--main-800))] text-xs font-extrabold text-white",
          "shadow-warm",
          onLogoClick && "cursor-pointer",
        )}
      >
        {letters}
      </div>
      {name ? (
        <div className="text-lg font-extrabold tracking-[-0.3px] text-gray-900">
          {name}
        </div>
      ) : null}
    </div>
  );
}

TopNav.Brand = TopNavBrand;
