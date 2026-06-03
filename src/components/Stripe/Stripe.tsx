"use client";

import React from "react";
import { cn } from "../../lib/utils";

export type StripeTone =
  | "peach"
  | "cream"
  | "mint"
  | "blue"
  | "sky"
  | "rose"
  | "gray";

const toneColor: Record<StripeTone, string> = {
  peach: "var(--main-300)",
  cream: "var(--brand-soft)",
  mint: "var(--mint-200)",
  blue: "var(--blue-200)",
  sky: "var(--blue-300)",
  rose: "var(--red-300)",
  gray: "var(--gray-200)",
};

export function resolveStripeTone(tone: StripeTone | string | undefined): string {
  if (!tone) return toneColor.cream;
  if (tone in toneColor) return toneColor[tone as StripeTone];
  return tone;
}

export function stripeBackground(color: string): string {
  // 135° repeating gradient with a 2% darker stripe (matches renewal `shade(tone, -4)`).
  return `repeating-linear-gradient(135deg, ${color}, ${color} 8px, color-mix(in srgb, ${color} 98%, black) 8px, color-mix(in srgb, ${color} 98%, black) 16px)`;
}

export interface StripeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 줄무늬 컬러 — 프리셋 또는 CSS color (default `cream` = brand-soft) */
  tone?: StripeTone | string;
  /** 가운데 라벨 — 작은 흰색 알약형 박스에 표시. 비우면 패턴만 */
  label?: React.ReactNode;
  /** 둥근 모서리 px (default `0` — 카드 내부 사용 가정) */
  radius?: number | string;
  /** 높이 (default `100%` — 부모를 채움) */
  height?: number | string;
}

/**
 * Stripe (Placeholder)
 * 이미지 자리 표시자 — 사선 줄무늬 패턴. 카드 썸네일 / 아바타 fallback / 배너 등.
 *
 * @param tone `peach`·`cream`(default)·`mint`·`blue`·`sky`·`rose`·`gray` 또는 임의 CSS color
 * @param label 가운데 작은 흰색 알약 박스에 표시
 * @param radius 둥근 모서리 px (default 0)
 *
 * @example
 * ```tsx
 * <div style={{ height: 110 }}><Stripe tone="peach" label="run" /></div>
 * <Stripe tone="#c8f4e1" />
 * ```
 */
export function Stripe({
  tone,
  label,
  radius = 0,
  height = "100%",
  className,
  style,
  ...props
}: StripeProps): React.ReactElement {
  const color = resolveStripeTone(tone);
  return (
    <div
      data-slot="stripe"
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        "font-mono text-[10px] tracking-[0.3px] text-black/45",
        className,
      )}
      style={{
        height,
        borderRadius: radius,
        background: stripeBackground(color),
        ...style,
      }}
      {...props}
    >
      {label !== undefined && label !== "" ? (
        <span className="rounded-0.5 bg-white/70 px-1.5 py-0.5">{label}</span>
      ) : null}
    </div>
  );
}
