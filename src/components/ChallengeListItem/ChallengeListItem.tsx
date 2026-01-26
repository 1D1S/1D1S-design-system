'use client';

import Image from 'next/image';
import { Text } from '../Text';
import { Tag } from '../Tag';
import { cn } from '../../lib/utils';
import { Person } from '../Icons/Person';
import { ImagePlaceholder } from '../ImagePlaceholder/ImagePlaceholder';

interface ChallengeListItemProps {
  challengeName: string;
  challengeImageUrl?: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  onClick?(): void;
  className?: string;
}

export function ChallengeListItem({
  challengeName,
  challengeImageUrl,
  startDate,
  endDate,
  maxParticipants,
  currentParticipants,
  onClick = () => {},
  className = '',
}: ChallengeListItemProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex w-full items-center',
        'gap-3 p-2',
        'cursor-pointer rounded-lg transition-shadow duration-200 ease-in-out',
        'hover:shadow-default',
        className
      )}
      onClick={onClick}
    >
      {/* 썸네일 이미지 - 정사각형 */}
      {challengeImageUrl ? (
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={challengeImageUrl}
            alt={challengeName}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <ImagePlaceholder
          className="h-12 w-12 flex-shrink-0 rounded-lg"
          logoSize="sm"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* 챌린지 이름과 날짜 */}
        <div className="flex w-full flex-col gap-0.5">
          <Text size="body2" weight="bold" className="truncate">
            {challengeName}
          </Text>
          <Text size="caption3" weight="medium" className="text-gray-600 shrink-0">
            {startDate} - {endDate}
          </Text>
        </div>
        <div className="flex w-full items-center justify-between">
          {/* 태그 */}
          <div className="flex gap-1.5 overflow-hidden">
            <Tag icon="💻">태그</Tag>
            <Tag>태그</Tag>
          </div>
          {/* 참여자 수 */}
          <div className="flex gap-1.5 items-center shrink-0">
            <Person width={12} height={12} className="text-gray-600" />
            <Text size="caption3" weight="medium">
              {currentParticipants} / {maxParticipants}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
