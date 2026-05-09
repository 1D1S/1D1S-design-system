"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Flag } from "../Icons/Flag";

export interface ChallengeTagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 챌린지 제목 */
  children: React.ReactNode;
  /** 좌측 아이콘 변경 (default Flag 아이콘) */
  icon?: React.ReactNode;
  size?: "sm" | "md";
}

/**
 * ChallengeTag
 * 일지 / 상세 화면에서 챌린지 출처를 표시하는 알약형 태그.
 * Flag 아이콘 + brand-soft 컬러 (main-100 bg + main-200 border + brand text).
 *
 * @example
 * ```tsx
 * <ChallengeTag>아침 30분 러닝하기</ChallengeTag>
 * ```
 */
export function ChallengeTag({
  children,
  icon,
  size = "md",
  className,
  ...props
}: ChallengeTagProps): React.ReactElement {
  const sizeClass = {
    sm: "text-[10px] px-2 py-1 gap-1",
    md: "text-[11px] px-2.5 py-[5px] gap-1.5",
  }[size];

  const iconSize = size === "sm" ? 10 : 11;

  return (
    <span
      data-slot="challenge-tag"
      className={cn(
        "inline-flex items-center rounded-full border border-main-200 bg-main-100 font-bold text-brand",
        sizeClass,
        className,
      )}
      {...props}
    >
      <span aria-hidden className="flex items-center">
        {icon ?? <Flag width={iconSize} height={iconSize} />}
      </span>
      <span>{children}</span>
    </span>
  );
}
