"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { Stripe, type StripeTone } from "../Stripe";

export type CircleAvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CircleAvatarTone = StripeTone;

/** 기본 프로필 실루엣 — 앱 AppAvatar 의 Icons.person 과 같은 도형(Material "person"). */
const PERSON_PATH =
  "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";

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
  /** `fallback` 을 줄 때 그 뒤에 깔리는 줄무늬 톤 — 프리셋 또는 CSS color 문자열.
   *  기본 프로필(fallback 없음)에는 쓰지 않는다. */
  tone?: CircleAvatarTone | string;
  /** 외곽선 (brand-soft 컬러). size>40일 때 3px, 아니면 2px */
  ring?: boolean;
  /** 이미지 URL — 비어있거나 로드 실패 시 기본 프로필(peach 원 + 흰 실루엣) */
  imageUrl?: string;
  /** 기본 프로필 대신 보여줄 커스텀 fallback (이니셜·이모지 등) — 톤 줄무늬 위에 얹힌다 */
  fallback?: React.ReactNode;
  /** alt 텍스트 */
  alt?: string;
  className?: string;
}

/**
 * CircleAvatar
 * 원형 아바타 — 이미지, 없으면 **기본 프로필**(main-300 원 + 흰 사람 실루엣).
 *
 * 기본 프로필은 앱(AppAvatar)·웹(ProfileAvatar)과 같은 그림이다. 예전 기본값은
 * 톤 줄무늬였는데, 앱은 실루엣이라 같은 사람이 앱·웹에서 달라 보였다.
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
      ) : fallback !== undefined ? (
        <>
          <Stripe tone={tone} className="absolute inset-0 h-full" />
          <div className="absolute inset-0 flex items-center justify-center text-gray-700">
            {fallback}
          </div>
        </>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "var(--main-300)" }}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            style={{ width: px * 0.58, height: px * 0.58, color: "#ffffff" }}
          >
            <path d={PERSON_PATH} fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
}
