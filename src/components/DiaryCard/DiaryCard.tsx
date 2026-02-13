"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Text } from "../Text";
import { CircularProgress } from "../CircularProgress";
import { CircleAvatar } from "../CircleAvatar";
import Link from "next/link";
import { Heart } from "../Icons/Heart";
import { HeartFilled } from "../Icons/HeartFilled";
import { ImagePlaceholder } from "../ImagePlaceholder/ImagePlaceholder";

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
    <div className="relative aspect-11/10 w-full overflow-hidden bg-gray-100">
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

      <div className="absolute top-4 left-4 z-20">
        <div className="relative flex h-13 w-13 items-center justify-center rounded-full bg-white shadow-[0_6px_14px_rgba(34,34,34,0.2)]">
          <CircularProgress
            value={clampedPercent}
            size="sm"
            showPercentage={true}
          />
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 text-4xl leading-none">
        <span role="img" aria-label={emotion}>
          {emotionEmojiMap[emotion]}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 z-20">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleLike();
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-main-800 px-3.5 py-2 text-white shadow-[0_4px_10px_rgba(34,34,34,0.25)] transition-colors hover:bg-main-900"
        >
          {isLiked ? (
            <HeartFilled width={16} height={16} className="text-white" />
          ) : (
            <Heart width={16} height={16} className="text-white" />
          )}
          <Text size="body1" weight="bold" className="text-white">
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
  challengeUrl: string;
  date: string;
}

function TextSection({
  title,
  user,
  userImage,
  challengeLabel,
  challengeUrl,
  date,
}: TextSectionProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col gap-4 p-5">
      <Text
        as="p"
        size="heading2"
        weight="bold"
        className="line-clamp-2 min-h-12.5 leading-tight text-gray-900"
      >
        {title}
      </Text>

      <Link href={challengeUrl} className="block w-full no-underline">
        <Text
          size="body1"
          weight="medium"
          className="block w-full truncate text-blue-500"
        >
          {challengeLabel}
        </Text>
      </Link>

      <div className="h-px w-full bg-gray-200" />

      <div className="flex items-center gap-3">
        <CircleAvatar imageUrl={userImage} size="sm" />
        <div className="flex flex-col gap-1">
          <Text size="body1" weight="bold" className="text-gray-900">
            {user}
          </Text>
          <Text size="caption1" weight="regular" className="text-gray-500">
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
  title: string;
  user: string;
  userImage?: string;
  challengeLabel: string;
  challengeUrl: string;
  date: string;
  emotion: Emotion;
  onClick?(): void;
}

export function DiaryCard({
  imageUrl,
  percent,
  likes,
  title,
  user,
  userImage,
  challengeLabel,
  challengeUrl,
  date,
  emotion = "happy",
  onClick,
}: DiaryCardProps): React.ReactElement {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(likes);

  const handleToggleLike = (): void => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="block w-full cursor-pointer" onClick={onClick}>
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
          challengeLabel={challengeLabel}
          challengeUrl={challengeUrl}
          date={date}
        />
      </div>
    </div>
  );
}
