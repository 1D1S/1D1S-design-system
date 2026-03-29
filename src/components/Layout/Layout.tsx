"use client";

import React from "react";
import { cn } from "../../lib/utils";

// ─────────────────────────────────────────────
// AppLayout
// ─────────────────────────────────────────────

export interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AppLayout
 * 전체 페이지의 최상위 래퍼 컴포넌트.
 * `AppLayoutHeader`, `AppLayoutBody`와 함께 사용합니다.
 *
 * @example
 * ```tsx
 * <AppLayout>
 *   <AppLayoutHeader>
 *     <AppHeader ... />
 *   </AppLayoutHeader>
 *   <AppLayoutBody sidebar={<AppLayoutSidebar>...</AppLayoutSidebar>}>
 *     {children}
 *   </AppLayoutBody>
 * </AppLayout>
 * ```
 */
export function AppLayout({
  children,
  className,
}: AppLayoutProps): React.ReactElement {
  return (
    <div className={cn("flex min-h-screen w-screen flex-col bg-white", className)}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// AppLayoutHeader
// ─────────────────────────────────────────────

export interface AppLayoutHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AppLayoutHeader
 * 화면 상단에 sticky하게 고정되는 헤더 슬롯.
 */
export function AppLayoutHeader({
  children,
  className,
}: AppLayoutHeaderProps): React.ReactElement {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 shrink-0 bg-white px-4 pt-3",
        className
      )}
    >
      {children}
    </header>
  );
}

// ─────────────────────────────────────────────
// AppLayoutBody
// ─────────────────────────────────────────────

export interface AppLayoutBodyProps {
  children: React.ReactNode;
  /** 전달 시 오른쪽에 사이드바 열 추가 (lg 이상에서만 표시) */
  sidebar?: React.ReactNode;
  className?: string;
}

/**
 * AppLayoutBody
 * 메인 콘텐츠 영역. `sidebar` prop을 전달하면 lg 이상에서 오른쪽 사이드바 열이 추가됩니다.
 */
export function AppLayoutBody({
  children,
  sidebar,
  className,
}: AppLayoutBodyProps): React.ReactElement {
  if (sidebar) {
    return (
      <div className={cn("flex min-h-0 flex-1 gap-4", className)}>
        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden">
          {children}
        </main>
        {sidebar}
      </div>
    );
  }

  return (
    <main className={cn("min-h-0 min-w-0 flex-1", className)}>
      {children}
    </main>
  );
}

// ─────────────────────────────────────────────
// AppLayoutSidebar
// ─────────────────────────────────────────────

export interface AppLayoutSidebarProps {
  children: React.ReactNode;
  /** sticky top 위치 — 헤더가 있으면 "top-28", 없으면 "top-6" */
  stickyTop?: string;
  className?: string;
}

/**
 * AppLayoutSidebar
 * 데스크톱(lg 이상)에서 오른쪽에 sticky하게 고정되는 사이드바 슬롯.
 * `AppLayoutBody`의 `sidebar` prop으로 전달합니다.
 */
export function AppLayoutSidebar({
  children,
  stickyTop = "top-28",
  className,
}: AppLayoutSidebarProps): React.ReactElement {
  return (
    <aside
      className={cn(
        "sticky hidden h-fit min-h-0 shrink-0 self-start pt-3 pr-3 lg:block",
        stickyTop,
        className
      )}
    >
      {children}
    </aside>
  );
}

// ─────────────────────────────────────────────
// AppLayoutOverlay
// ─────────────────────────────────────────────

export interface AppLayoutOverlayProps {
  children: React.ReactNode;
  /** 오버레이 표시 여부 (opacity 트랜지션 적용) */
  open: boolean;
  className?: string;
}

/**
 * AppLayoutOverlay
 * 화면 우측 상단에 fixed로 표시되는 오버레이 패널.
 * 주로 모바일에서 프로필 클릭 시 나타나는 사이드바에 사용합니다.
 *
 * 마운트/언마운트는 부모에서 관리하고, `open` prop으로 fade를 제어합니다.
 */
export function AppLayoutOverlay({
  children,
  open,
  className,
}: AppLayoutOverlayProps): React.ReactElement {
  return (
    <div
      className={cn(
        "fixed top-4 right-3 z-50 transition-opacity duration-200",
        open ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
