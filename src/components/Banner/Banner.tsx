"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { StatusBadge, type StatusBadgeKind } from "../StatusBadge";

const bannerVariants = cva(
  "relative overflow-hidden rounded-[18px] p-6 text-white",
  {
    variants: {
      tone: {
        orange:
          "bg-[linear-gradient(135deg,#ff8a65_0%,#ff5722_100%)] shadow-warm",
        mint: "bg-[linear-gradient(135deg,#7dd8b5_0%,#3eb489_100%)]",
        blue: "bg-[linear-gradient(135deg,#7ab3ef_0%,#1666ba_100%)]",
        purple: "bg-[linear-gradient(135deg,#a78bfa_0%,#7c3aed_100%)]",
        gray: "bg-[linear-gradient(135deg,#9e9e9e_0%,#424242_100%)]",
      },
      size: {
        sm: "p-4 rounded-3",
        md: "p-6 rounded-[18px]",
        lg: "p-8 rounded-4",
      },
    },
    defaultVariants: { tone: "orange", size: "md" },
  },
);

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof bannerVariants> {
  /** 좌상단 상태 라벨 (NEW/HOT/TIP) — string도 허용 */
  kind?: StatusBadgeKind | string;
  /** 제목 — `\n`은 줄바꿈으로 렌더링됨 */
  title: React.ReactNode;
  /** 부제 */
  subtitle?: React.ReactNode;
  /** 우측 슬롯 (CTA / 데코) */
  action?: React.ReactNode;
  /** 사용자 정의 background (CSS 값). 지정 시 tone 무시 */
  bg?: string;
}

/**
 * Banner
 * 풀블리드 그라디언트 히어로 배너 — 홈/마이페이지 등.
 *
 * @param tone `orange` (default) · `mint` · `blue` · `purple` · `gray`
 * @param size `sm` · `md` (default) · `lg`
 * @param kind 좌상단 상태 라벨 (StatusBadge inline 형태)
 * @param bg CSS background — 지정 시 tone 무시
 *
 * @example
 * ```tsx
 * <Banner kind="NEW" title={'5월 챌린지\n시즌 오픈!'} subtitle="함께 도전할 챌린저를 찾아보세요" />
 * <Banner tone="mint" kind="TIP" title="꾸준함이 실력이 됩니다" />
 * ```
 */
export function Banner({
  kind,
  title,
  subtitle,
  action,
  tone,
  size,
  bg,
  className,
  style,
  ...props
}: BannerProps): React.ReactElement {
  return (
    <div
      data-slot="banner"
      className={cn(bannerVariants({ tone, size }), className)}
      style={bg ? { ...style, background: bg } : style}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {kind ? (
            <StatusBadge variant="inline" kind={kind as StatusBadgeKind}>
              {kind}
            </StatusBadge>
          ) : null}
          <div
            className="mt-3 text-xl font-extrabold leading-[1.25] tracking-[-0.4px] whitespace-pre-line"
          >
            {title}
          </div>
          {subtitle ? (
            <div className="mt-1.5 text-xs opacity-90">{subtitle}</div>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
