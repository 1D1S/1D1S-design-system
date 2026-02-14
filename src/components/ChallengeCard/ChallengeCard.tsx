import type { ReactNode } from "react";
import Image from "next/image";
import { UserRound, Users } from "lucide-react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";
import { ImagePlaceholder } from "../ImagePlaceholder/ImagePlaceholder";

export interface ChallengeCardProps {
  challengeTitle: string;
  challengeType: string;
  challengeCategory?: string;
  challengeIcon?: ReactNode;
  imageUrl?: string;
  currentUserCount: number;
  maxUserCount: number;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
  isEnded?: boolean;
  className?: string;
  onClick?(): void;
}

/**
 * ChallengeCard
 * 챌린지 카드 컴포넌트 - 제목, 유형, 참여자 수, 기간, 상태(진행중/모집중/종료됨) 표시
 */
export function ChallengeCard({
  challengeTitle,
  challengeType,
  challengeCategory,
  imageUrl,
  currentUserCount,
  maxUserCount,
  startDate,
  endDate,
  isOngoing = false,
  isEnded = false,
  className,
  onClick,
}: ChallengeCardProps): React.ReactElement {
  const hasImage = Boolean(imageUrl && imageUrl.trim().length > 0);

  const statusLabel = isEnded ? "종료됨" : isOngoing ? "진행중" : "모집중";
  const statusClassName = isEnded
    ? "bg-gray-500"
    : isOngoing
      ? "bg-green-500"
      : "bg-blue-500";

  return (
    <div
      className={cn(
        "min-w-62.5 w-full overflow-hidden rounded-[12px] border border-gray-200 bg-white",
        onClick && "cursor-pointer",
        "transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-default",
        className,
      )}
      onClick={onClick}
    >
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        {hasImage ? (
          <div className="absolute inset-0">
            <Image
              src={imageUrl as string}
              alt={challengeTitle}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <ImagePlaceholder className="absolute inset-0" logoSize="lg" />
        )}
        {hasImage ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-linear-to-b from-black/20 to-transparent" />
        ) : null}

        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
          <span className="inline-flex items-center rounded-2 bg-main-800 px-2.5 py-1">
            <Text size="caption2" weight="bold" className="text-white">
              {challengeCategory ?? challengeType}
            </Text>
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-2 px-2.5 py-1",
              statusClassName,
            )}
          >
            <Text size="caption2" weight="bold" className="text-white">
              {statusLabel}
            </Text>
          </span>
        </div>
      </div>

      <div className="w-full bg-white px-5 py-5">
        <Text
          size="heading2"
          weight="bold"
          className="line-clamp-2 min-h-10 text-gray-900"
        >
          {challengeTitle}
        </Text>

        <div className="mt-4 flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <UserRound className="h-3.5 w-3.5 text-gray-600" />
            <Text size="caption1" weight="medium" className="text-gray-600">
              {challengeType}
            </Text>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-gray-600" />
            <Text size="caption1" weight="medium" className="text-gray-600">
              {currentUserCount} / {maxUserCount}
            </Text>
          </div>
        </div>

        <Text size="caption1" weight="regular" className="mt-3 text-gray-500">
          {startDate} - {endDate}
        </Text>
      </div>
    </div>
  );
}
