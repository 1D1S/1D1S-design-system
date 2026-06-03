"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { Stripe, type StripeTone } from "../Stripe";

export type CircleAvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CircleAvatarTone = StripeTone;

const sizePx: Record<CircleAvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 76,
};

interface CircleAvatarProps {
  /** 사이즈 — 프리셋 또는 px 숫자 (default `"md"` = 40) */
  size?: CircleAvatarSize | number;
  /** 이미지가 없을 때 보여줄 줄무늬 톤 — 프리셋 또는 CSS color 문자열 */
  tone?: CircleAvatarTone | string;
  /** 외곽선 (brand-soft 컬러). size>40일 때 3px, 아니면 2px */
  ring?: boolean;
  /** 이미지 URL — 비어있거나 로드 실패 시 톤 Stripe 패턴으로 fallback */
  imageUrl?: string;
  /** Stripe 대신 보여줄 커스텀 fallback (이니셜·이모지 등) */
  fallback?: React.ReactNode;
  /** alt 텍스트 */
  alt?: string;
  className?: string;
}

/**
 * CircleAvatar
 * 원형 아바타 — 이미지 또는 톤 Stripe 패턴.
 *
 * @param size `xs`(24)·`sm`(32)·`md`(40, default)·`lg`(56)·`xl`(76)·또는 px 숫자
 * @param tone Stripe 컬러 — `peach`(default)·`cream`·`mint`·`blue`·`sky`·`rose`·`gray`·또는 CSS color
 * @param ring brand-soft 외곽선 (size>40 → 3px, 이하 → 2px)
 *
 * @example
 * ```tsx
 * <CircleAvatar size="lg" tone="mint" ring />
 * <CircleAvatar imageUrl="/me.jpg" size="md" />
 * <CircleAvatar size={48} tone="#ffbaba" ring />
 * ```
 */
export function CircleAvatar({
  size = "md",
  tone = "peach",
  ring = false,
  imageUrl,
  fallback,
  alt = "avatar",
  className,
}: CircleAvatarProps): React.ReactElement {
  const px = typeof size === "number" ? size : sizePx[size];
  const ringWidth = px > 40 ? 3 : 2;

  const [hasErrored, setHasErrored] = useState(false);
  useEffect(() => {
    setHasErrored(false);
  }, [imageUrl]);

  const isUrlValid =
    typeof imageUrl === "string" && /^(\/|https?:\/\/)/.test(imageUrl);
  const showImage = isUrlValid && !hasErrored;

  return (
    <div
      data-slot="circle-avatar"
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full",
        className,
      )}
      style={{
        width: px,
        height: px,
        ...(ring ? { border: `${ringWidth}px solid var(--brand-soft)` } : null),
      }}
    >
      {showImage ? (
        <Image
          src={imageUrl as string}
          alt={alt}
          fill
          sizes="76px"
          className="object-cover"
          onError={() => setHasErrored(true)}
        />
      ) : (
        <>
          <Stripe tone={tone} className="absolute inset-0 h-full" />
          {fallback !== undefined ? (
            <div className="absolute inset-0 flex items-center justify-center text-gray-700">
              {fallback}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
