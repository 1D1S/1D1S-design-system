"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface SectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 섹션 제목 (h2 비주얼) */
  title: React.ReactNode;
  /** 부제 — 작은 회색 보조 텍스트 */
  subtitle?: React.ReactNode;
  /** 우측 액션 — "전체보기 →" 버튼이나 임의 노드 */
  action?: React.ReactNode;
  /** `action` 미지정이고 `onActionClick` 전달 시 기본 "전체보기 →" 버튼 자동 렌더링 */
  onActionClick?: () => void;
  /** 기본 액션 라벨 (default `"전체보기 →"`) */
  actionLabel?: React.ReactNode;
  /** 폰트 크기 변형 */
  size?: "sm" | "md" | "lg";
}

/**
 * SectionHeader
 * 페이지 섹션 헤더 — 제목 + (선택)부제 + 우측 액션 슬롯.
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="오늘 시작해볼 챌린지"
 *   subtitle="추천 4개"
 *   onActionClick={() => router.push('/challenges')}
 * />
 *
 * <SectionHeader title="진행 중" action={<Button size="sm" variant="ghost">필터</Button>} />
 * ```
 */
export function SectionHeader({
  title,
  subtitle,
  action,
  onActionClick,
  actionLabel = "전체보기 →",
  size = "md",
  className,
  ...props
}: SectionHeaderProps): React.ReactElement {
  const titleClass = {
    sm: "text-sm font-extrabold tracking-[-0.2px]",
    md: "text-base font-extrabold tracking-[-0.3px]",
    lg: "text-lg font-extrabold tracking-[-0.4px]",
  }[size];

  const subClass = {
    sm: "text-3xs",
    md: "text-2xs",
    lg: "text-xs",
  }[size];

  const resolvedAction =
    action ??
    (onActionClick ? (
      <button
        type="button"
        onClick={onActionClick}
        className="text-xs font-bold text-brand transition-opacity hover:opacity-80"
      >
        {actionLabel}
      </button>
    ) : null);

  return (
    <div
      data-slot="section-header"
      className={cn("flex items-baseline justify-between gap-3", className)}
      {...props}
    >
      <div className="min-w-0">
        <h2 className={cn("text-gray-900", titleClass)}>{title}</h2>
        {subtitle ? (
          <div className={cn("mt-0.5 text-gray-500", subClass)}>{subtitle}</div>
        ) : null}
      </div>
      {resolvedAction ? <div className="shrink-0">{resolvedAction}</div> : null}
    </div>
  );
}
