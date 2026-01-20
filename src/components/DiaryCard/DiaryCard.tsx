"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Text } from "../Text";
import { Button } from "../Button";
import { CircularProgress } from "../CircularProgress";
import { cn } from "../../lib/utils";
import { CircleAvatar } from "../CircleAvatar";
import Link from "next/link";
import { Heart } from "../icons/Heart";
import { HeartFilled } from "../icons/HeartFilled";
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
  const emotionImageMap: Record<Emotion, string> = {
    happy: "/EmotionHappy.png",
    soso: "/EmotionSoso.png",
    sad: "/EmotionSad.png",
  };

  return (
    <div className="rounded-2 relative h-62.5 w-50 overflow-hidden">
      {/* 배경 이미지 */}
      {imageUrl ? (
        <Image src={imageUrl} alt={alt} fill className="object-cover" />
      ) : (
        <ImagePlaceholder className="absolute inset-0" logoSize="lg" />
      )}

      {/* 달성 퍼센티지 */}
      <div className="absolute top-2 left-2 z-20">
        <div
          className={cn(
            "flex items-center space-x-2",
            "bg-main-200/80 rounded-2 p-1",
          )}
        >
          <CircularProgress
            value={percent}
            size="sm"
            color="red"
            showPercentage={false}
          />
          <div className="flex h-7.5 flex-col justify-between">
            <Text size="caption1" weight="bold" className="text-main-900">
              {percent}%
            </Text>
            <Text
              size="caption3"
              weight="medium"
              className="text-gray-700"
            >
              달성
            </Text>
          </div>
        </div>
      </div>

      {/* 감정 이미지 */}
      <div className="absolute top-2 right-2 z-20">
        <Image
          src={emotionImageMap[emotion]}
          alt={emotion}
          width={30}
          height={30}
        />
      </div>

      {/* 좋아요 토글 */}
      <div className="absolute bottom-2 left-2 z-20">
        <Button
          variant="default"
          size="sm"
          onClick={onToggleLike}
          className="pr-2 pl-2"
        >
          <div className="flex flex-row items-center space-x-1">
            {isLiked ? (
              <HeartFilled width={10} height={9} className="text-red-500" />
            ) : (
              <Heart width={10} height={9} className="text-gray-600" />
            )}
            <Text weight="light" size="caption3">
              {likeCount}
            </Text>
          </div>
        </Button>
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
    <div className="mt-2 flex w-full flex-col">
      <Text size="body1" weight="bold" className="truncate">
        {title}
      </Text>

      <div className="mt-1 flex items-center">
        <CircleAvatar imageUrl={userImage} size="sm" />
        <div className="ml-2 flex h-10 flex-col justify-between">
          <Text size="caption3" weight="medium">
            {user}
          </Text>
          <Link href={challengeUrl} className="m-0 p-0 no-underline">
            <Text
              size="caption3"
              weight="medium"
              className="text-mint-900"
            >
              {challengeLabel}
            </Text>
          </Link>
        </div>
      </div>
      <Text size="caption3" weight="medium" className="mt-2 text-gray-900">
        {date}
      </Text>
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
    <div className="block w-54 cursor-pointer" onClick={onClick}>
      <div className="rounded-2 transform p-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
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