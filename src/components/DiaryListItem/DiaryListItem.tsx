"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { CircleAvatar } from "../CircleAvatar";
import { CircularProgress } from "../CircularProgress";
import { Heart } from "../Icons/Heart";
import { HeartFilled } from "../Icons/HeartFilled";
import { ImagePlaceholder } from "../ImagePlaceholder/ImagePlaceholder";
import { Text } from "../Text";

type Emotion = "happy" | "soso" | "sad";

const emotionEmojiMap: Record<Emotion, string> = {
  happy: "😎",
  soso: "🙂",
  sad: "🥲",
};

export interface DiaryListItemProps {
  title: string;
  imageUrl?: string;
  percent: number;
  emotion: Emotion;
  likes: number;
  isLiked?: boolean;
  defaultLiked?: boolean;
  onLikeToggle?(nextLiked: boolean): void;
  user: string;
  userImage?: string;
  challengeLabel: string;
  totalMemberCount?: number;
  onChallengeClick?(): void;
  date: string;
  onClick?(): void;
  className?: string;
}

export function DiaryListItem({
  title,
  imageUrl,
  percent,
  emotion = "happy",
  likes,
  isLiked: isLikedProp,
  defaultLiked = false,
  onLikeToggle,
  user,
  userImage,
  challengeLabel,
  totalMemberCount,
  onChallengeClick,
  date,
  onClick,
  className,
}: DiaryListItemProps): React.ReactElement {
  const isLikeControlled = typeof isLikedProp === "boolean";
  const [internalIsLiked, setInternalIsLiked] = useState(defaultLiked);
  const [internalLikeCount, setInternalLikeCount] = useState(likes);
  const isLiked = isLikeControlled ? isLikedProp : internalIsLiked;
  const likeCount = isLikeControlled ? likes : internalLikeCount;

  useEffect(() => {
    if (isLikeControlled) return;
    setInternalLikeCount(likes);
  }, [isLikeControlled, likes]);

  const handleToggleLike = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const nextLiked = !isLiked;
    const nextCount = Math.max(0, likeCount + (nextLiked ? 1 : -1));
    if (!isLikeControlled) {
      setInternalIsLiked(nextLiked);
      setInternalLikeCount(nextCount);
    }
    onLikeToggle?.(nextLiked);
  };

  const hasImage = Boolean(imageUrl && imageUrl.trim().length > 0);
  const clampedPercent = Math.min(Math.max(percent, 0), 100);

  const challengeTypeLabel =
    typeof totalMemberCount === "number"
      ? totalMemberCount <= 1
        ? "개인"
        : "단체"
      : challengeLabel;

  return (
    <div
      className={cn(
        "flex min-w-[560px] gap-3 rounded-4 border border-gray-200 bg-white p-3 transition-shadow duration-200 hover:shadow-md",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative -mb-3 -ml-3 -mt-3 w-[140px] shrink-0 self-stretch overflow-hidden rounded-l-3 bg-gray-100">
        {hasImage ? (
          <Image src={imageUrl as string} alt={title} width={128} height={128} className="h-full w-full object-cover" />
        ) : (
          <ImagePlaceholder className="h-full w-full" logoSize="sm" />
        )}
        {hasImage ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-linear-to-t from-black/10 to-transparent" />
        ) : null}

        {/* Circular progress */}
        <div className="absolute top-2 left-2 z-10">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_4px_10px_rgba(34,34,34,0.18)]">
            <CircularProgress value={clampedPercent} size="sm" showPercentage />
          </div>
        </div>

        {/* Emotion */}
        <div className="absolute top-2 right-2 z-10 text-xl leading-none">
          <span role="img" aria-label={emotion}>
            {emotionEmojiMap[emotion]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col min-w-0 gap-2 py-0.5">
        <Text
          as="p"
          size="body1"
          weight="bold"
          className="line-clamp-2 leading-snug text-gray-900"
        >
          {title}
        </Text>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onChallengeClick?.();
          }}
          className="block w-fit cursor-pointer rounded-1 px-1 py-0.5 text-left transition-colors hover:bg-gray-100"
        >
          <Text size="caption1" weight="medium" className="truncate text-blue-500">
            {challengeTypeLabel}
          </Text>
        </button>

        <div className="h-px w-full bg-gray-200" />

        <div className="mt-auto flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <CircleAvatar imageUrl={userImage} size="sm" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <Text size="caption2" weight="bold" className="truncate text-gray-900">
                {user}
              </Text>
              <Text size="caption2" weight="regular" className="shrink-0 text-gray-500">
                {date}
              </Text>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleLike}
            className="flex shrink-0 items-center gap-1 text-gray-500 transition-colors hover:text-red-500"
          >
            {isLiked ? (
              <HeartFilled width={15} height={15} className="text-red-500" />
            ) : (
              <Heart width={15} height={15} />
            )}
            <Text size="caption2" weight="medium" className="text-inherit">
              {likeCount}
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
}
