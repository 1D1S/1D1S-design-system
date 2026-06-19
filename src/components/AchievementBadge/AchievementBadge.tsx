"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-gray-900",
  {
    variants: {
      tone: {
        main: "bg-main-300",
        peach: "bg-brand-soft",
        mint: "bg-mint-200",
        blue: "bg-blue-200",
        green: "bg-green-200",
        gray: "bg-gray-100",
      },
      layout: {
        vertical: "flex-col text-center",
        horizontal: "flex-row gap-2",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      // vertical: square-ish padded card
      { layout: "vertical", size: "sm", class: "min-w-[72px] rounded-2.5 px-3 py-3 gap-1" },
      { layout: "vertical", size: "md", class: "min-w-[88px] rounded-3 px-3 py-3.5 gap-1.5" },
      { layout: "vertical", size: "lg", class: "min-w-[112px] rounded-4 px-4 py-5 gap-2" },
      // horizontal: pill-ish
      { layout: "horizontal", size: "sm", class: "rounded-2.5 px-3.5 py-2.5" },
      { layout: "horizontal", size: "md", class: "rounded-3 px-4 py-3" },
      { layout: "horizontal", size: "lg", class: "rounded-4 px-5 py-3.5" },
    ],
    defaultVariants: {
      tone: "main",
      layout: "vertical",
      size: "md",
    },
  },
);

const emojiSize: Record<"sm" | "md" | "lg", string> = {
  sm: "text-[18px]",
  md: "text-[22px]",
  lg: "text-[34px]",
};

const labelSize: Record<"sm" | "md" | "lg", string> = {
  sm: "text-3xs",
  md: "text-2xs",
  lg: "text-xs",
};

export interface AchievementBadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof badgeVariants> {
  /** 배지 이모지 또는 아이콘 */
  emoji: React.ReactNode;
  /** 배지 라벨 */
  label: React.ReactNode;
}

/**
 * AchievementBadge
 * 마이페이지 / 프로필에 사용하는 업적 배지.
 *
 * @param tone `main` (default) · `peach` · `mint` · `blue` · `green` · `gray`
 * @param layout `vertical` (default) · `horizontal`
 * @param size `sm` · `md` (default) · `lg`
 *
 * @example
 * ```tsx
 * <AchievementBadge emoji="🔥" label="14일 연속" tone="main" />
 * <AchievementBadge emoji="🏆" label="첫 완주" tone="peach" layout="horizontal" />
 * ```
 */
export function AchievementBadge({
  emoji,
  label,
  tone,
  layout,
  size,
  className,
  ...props
}: AchievementBadgeProps): React.ReactElement {
  const sz = size ?? "md";
  return (
    <div
      data-slot="achievement-badge"
      className={cn(badgeVariants({ tone, layout, size }), className)}
      {...props}
    >
      <span aria-hidden className={cn("leading-none", emojiSize[sz])}>
        {emoji}
      </span>
      <span className={cn("font-bold", labelSize[sz])}>{label}</span>
    </div>
  );
}
