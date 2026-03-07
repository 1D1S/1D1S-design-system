"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Text } from "../Text";
import { CircularProgress } from "../CircularProgress";
import { CircleAvatar } from "../CircleAvatar";
import { Heart } from "../Icons/Heart";
import { HeartFilled } from "../Icons/HeartFilled";
import { ImagePlaceholder } from "../ImagePlaceholder/ImagePlaceholder";
import { cn } from "../../lib/utils";

type Emotion = "happy" | "soso" | "sad";

interface ImageSectionProps {
  imageUrl?: string;
  alt: string;
  emotion: Emotion;
  percent: number;
  isLiked: boolean;
  likeCount: number;
  onToggleLike(): void;
}

function ImageSection({
  imageUrl,
  alt,
  percent,
  emotion,
  isLiked,
  likeCount,
  onToggleLike,
}: ImageSectionProps): React.ReactElement {
  const emotionEmojiMap: Record<Emotion, string> = {
    happy: "😎",
    soso: "🙂",
    sad: "🥲",
  };
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const hasImage = Boolean(imageUrl && imageUrl.trim().length > 0);

  return (
    <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100">
      {hasImage ? (
        <Image
          src={imageUrl as string}
          alt={alt}
          fill
          className="h-full w-full object-cover"
        />
      ) : (
        <ImagePlaceholder className="h-full w-full" logoSize="lg" />
      )}
      {hasImage ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-black/15 to-transparent" />
      ) : null}

      <div className="absolute top-3 left-3 z-20">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_6px_14px_rgba(34,34,34,0.2)] sm:h-12 sm:w-12">
          <CircularProgress
            value={clampedPercent}
            size="sm"
            showPercentage={true}
          />
        </div>
      </div>

      <div className="absolute top-3 right-3 z-20 text-2xl leading-none sm:text-3xl">
        <span role="img" aria-label={emotion}>
          {emotionEmojiMap[emotion]}
        </span>
      </div>

      <div className="absolute bottom-3 left-3 z-20">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleLike();
          }}
          className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-main-800 px-3 py-1.5 text-white shadow-[0_4px_10px_rgba(34,34,34,0.25)] transition-colors hover:bg-main-900"
        >
          {isLiked ? (
            <HeartFilled width={14} height={14} className="text-white" />
          ) : (
            <Heart width={14} height={14} className="text-white" />
          )}
          <Text size="body2" weight="bold" className="text-white">
            {likeCount}
          </Text>
        </button>
      </div>
    </div>
  );
}

interface TextSectionProps {
  title: string;
  user: string;
  userImage?: string;
  challengeLabel: string;
  onChallengeClick?(): void;
  date: string;
}

function TextSection({
  title,
  user,
  userImage,
  challengeLabel,
  onChallengeClick,
  date,
}: TextSectionProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col gap-2 p-3 sm:gap-3 sm:p-4">
      <Text
        as="p"
        size="body2"
        weight="bold"
        className="line-clamp-2 min-h-8 leading-tight text-gray-900 sm:text-xl sm:min-h-10"
      >
        {title}
      </Text>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onChallengeClick?.();
        }}
        className={cn(
          "block w-full cursor-pointer rounded-1 px-1 py-0.5 text-left transition-colors",
          "hover:bg-gray-100"
        )}
      >
        <Text
          size="caption1"
          weight="medium"
          className="block w-full truncate text-blue-500 sm:text-lg"
        >
          {challengeLabel}
        </Text>
      </button>

      <div className="h-px w-full bg-gray-200" />

      <div className="flex items-center gap-2 sm:gap-3">
        <CircleAvatar imageUrl={userImage} size="sm" />
        <div className="flex flex-col gap-0.5 sm:gap-1">
          <Text size="caption1" weight="bold" className="text-gray-900 sm:text-lg">
            {user}
          </Text>
          <Text size="caption3" weight="regular" className="text-gray-500 sm:text-sm">
            {date}
          </Text>
        </div>
      </div>
    </div>
  );
}

export interface DiaryCardProps {
  imageUrl?: string;
  percent: number;
  likes: number;
  isLiked?: boolean;
  defaultLiked?: boolean;
  onLikeToggle?(nextLiked: boolean): void;
  title: string;
  user: string;
  userImage?: string;
  challengeLabel: string;
  totalMemberCount?: number;
  onChallengeClick?(): void;
  date: string;
  emotion: Emotion;
  onClick?(): void;
}

export function DiaryCard({
  imageUrl,
  percent,
  likes,
  isLiked: isLikedProp,
  defaultLiked = false,
  onLikeToggle,
  title,
  user,
  userImage,
  challengeLabel,
  totalMemberCount,
  onChallengeClick,
  date,
  emotion = "happy",
  onClick,
}: DiaryCardProps): React.ReactElement {
  const isLikeControlled = typeof isLikedProp === "boolean";
  const [internalIsLiked, setInternalIsLiked] = useState<boolean>(defaultLiked);
  const [internalLikeCount, setInternalLikeCount] = useState<number>(likes);
  const isLiked = isLikeControlled ? isLikedProp : internalIsLiked;
  const likeCount = isLikeControlled ? likes : internalLikeCount;

  useEffect(() => {
    if (isLikeControlled) return;
    setInternalLikeCount(likes);
  }, [isLikeControlled, likes]);

  const handleToggleLike = (): void => {
    const nextLiked = !isLiked;
    const nextLikeCount = Math.max(0, likeCount + (nextLiked ? 1 : -1));

    if (!isLikeControlled) {
      setInternalIsLiked(nextLiked);
      setInternalLikeCount(nextLikeCount);
    }
    onLikeToggle?.(nextLiked);
  };

  const challengeTypeLabel =
    typeof totalMemberCount === "number"
      ? totalMemberCount <= 1
        ? "개인"
        : "단체"
      : challengeLabel;

  return (
    <div
      className={cn("block w-full", onClick && "cursor-pointer")}
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-4 border border-gray-200 bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
        <ImageSection
          imageUrl={imageUrl}
          alt={title}
          percent={percent}
          emotion={emotion}
          isLiked={isLiked}
          likeCount={likeCount}
          onToggleLike={handleToggleLike}
        />

        <TextSection
          title={title}
          user={user}
          userImage={userImage}
          challengeLabel={challengeTypeLabel}
          onChallengeClick={onChallengeClick}
          date={date}
        />
      </div>
    </div>
  );
}
