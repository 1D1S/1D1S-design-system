"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";
import { ArrowLeft } from "../Icons/ArrowLeft";

export interface MobileHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** 가운데 타이틀 — body1 / extrabold 로 통일 렌더 */
  title: string;
  /** 뒤로가기 핸들러. 넘기지 않으면 좌측 버튼은 렌더되지 않음 */
  onBack?: () => void;
  /** 타이틀 아래 작은 보조 텍스트 */
  subtitle?: React.ReactNode;
  /** 우측 액션 슬롯 (설정 / 공유 등) */
  right?: React.ReactNode;
  /** 뒤로가기 버튼 aria-label (기본 "뒤로가기") */
  backLabel?: string;
}

/**
 * MobileHeader
 * 모바일 서브페이지용 sticky 헤더 — 좌측 뒤로가기 / 가운데 타이틀 / 우측 액션 슬롯.
 * `lg:hidden` 으로 모바일 전용이며, 데스크톱/태블릿은 {@link TopNav} 를 사용한다.
 *
 * 타이틀 규격은 body1(text-xl) · extrabold 로 통일한다.
 *
 * @example
 * ```tsx
 * <MobileHeader
 *   title="챌린지 상세"
 *   onBack={() => router.back()}
 *   right={<button aria-label="설정"><Settings width={20} height={20} /></button>}
 * />
 * ```
 */
export function MobileHeader({
  title,
  onBack,
  subtitle,
  right,
  backLabel = "뒤로가기",
  className,
  ...props
}: MobileHeaderProps): React.ReactElement {
  return (
    <header
      data-slot="mobile-header"
      className={cn(
        "sticky top-0 z-30 border-b border-gray-100 bg-white/95 px-4 backdrop-blur-md lg:hidden",
        "pt-[env(safe-area-inset-top)]",
        className,
      )}
      {...props}
    >
      <div className="flex h-14 items-center gap-2">
        <div className="flex w-8 shrink-0 justify-start">
          {onBack ? (
            <button
              type="button"
              aria-label={backLabel}
              onClick={onBack}
              className={cn(
                "grid h-8 w-8 place-items-center rounded-2 text-gray-800 transition-colors",
                "hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
              )}
            >
              <ArrowLeft width={20} height={20} />
            </button>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center text-center">
          <Text
            as="h1"
            size="body1"
            weight="extrabold"
            className="max-w-full truncate text-gray-900"
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              size="caption3"
              weight="medium"
              className="max-w-full truncate text-gray-500"
            >
              {subtitle}
            </Text>
          ) : null}
        </div>

        <div className="flex min-w-8 shrink-0 items-center justify-end gap-1">
          {right}
        </div>
      </div>
    </header>
  );
}
