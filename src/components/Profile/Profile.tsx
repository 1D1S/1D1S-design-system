"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { CircleAvatar } from "../CircleAvatar";
import { Text } from "../Text";

type ProfileSize = "sm" | "md" | "lg";
type ProfileLayout = "horizontal" | "vertical";

export interface ProfileProps {
  /** 닉네임 */
  nickname: string;
  /** 프로필 이미지 URL */
  imageUrl?: string;
  /** 크기 (기본값: md) */
  size?: ProfileSize;
  /** 레이아웃 방향 (기본값: horizontal) */
  layout?: ProfileLayout;
  /** 닉네임 아래(vertical) 또는 옆(horizontal)에 표시되는 상태 텍스트 */
  statusText?: string;
  /** 클릭 핸들러 — 전달 시 버튼으로 렌더링됩니다 */
  onClick?: () => void;
  className?: string;
}

const sizeMap: Record<
  ProfileSize,
  {
    avatar: "sm" | "md" | "lg";
    textSize: "caption1" | "body2" | "body1";
    statusSize: "caption2" | "caption1" | "caption1";
  }
> = {
  sm: { avatar: "sm", textSize: "caption1", statusSize: "caption2" },
  md: { avatar: "md", textSize: "body2",    statusSize: "caption1" },
  lg: { avatar: "lg", textSize: "body1",    statusSize: "caption1" },
};

/**
 * Profile
 * 프로필 사진과 닉네임을 함께 보여주는 컴포넌트.
 *
 * @param nickname 닉네임
 * @param imageUrl 프로필 이미지 URL
 * @param size 크기: sm | md | lg (기본값: md)
 * @param layout 방향: horizontal | vertical (기본값: horizontal)
 * @param statusText 닉네임 옆/아래에 표시되는 상태 텍스트
 * @param onClick 전달 시 버튼으로 렌더링
 *
 * @example
 * ```tsx
 * <Profile nickname="홍길동" imageUrl="/profile.jpg" size="md" />
 * <Profile nickname="홍길동" statusText="온라인" layout="vertical" size="lg" onClick={() => router.push('/profile')} />
 * ```
 */
export function Profile({
  nickname,
  imageUrl,
  size = "md",
  layout = "horizontal",
  statusText,
  onClick,
  className,
}: ProfileProps): React.ReactElement {
  const { avatar, textSize, statusSize } = sizeMap[size];

  const isClickable = Boolean(onClick);
  const Comp = isClickable ? "button" : "div";

  return (
    <Comp
      type={isClickable ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center",
        layout === "horizontal" ? "flex-row gap-2.5" : "flex-col gap-2",
        isClickable && [
          "cursor-pointer rounded-2xl px-3 py-2 transition-colors",
          "hover:bg-gray-100",
        ],
        className
      )}
    >
      <CircleAvatar imageUrl={imageUrl} size={avatar} />

      {layout === "horizontal" ? (
        <div className="flex min-w-0 flex-col">
          <Text size={textSize} weight="bold" className="line-clamp-1 text-gray-900">
            {nickname}
          </Text>
          {statusText ? (
            <Text size={statusSize} weight="regular" className="text-gray-500">
              {statusText}
            </Text>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-0.5">
          <Text size={textSize} weight="bold" className="text-gray-900">
            {nickname}
          </Text>
          {statusText ? (
            <Text size={statusSize} weight="regular" className="text-gray-500">
              {statusText}
            </Text>
          ) : null}
        </div>
      )}
    </Comp>
  );
}
