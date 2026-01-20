'use client';

import Image from 'next/image';
import { Text } from '../Text';
import { Tag } from '../Tag';
import { cn } from '../../lib/utils';
import { Person } from '../icons/Person';
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
        'flex h-20 w-full items-center',
        'gap-4 p-2.5',
        'cursor-pointer rounded-lg transition-shadow duration-200 ease-in-out',
        'hover:shadow-default',
        className
      )}
      onClick={onClick}
    >
      {/* 썸네일 이미지 - 정사각형 */}
      {challengeImageUrl ? (
        <div className="relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={challengeImageUrl}
            alt={challengeName}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <ImagePlaceholder
          className="h-[60px] w-[60px] flex-shrink-0 rounded-lg"
          logoSize="sm"
        />
      )}

      <div className="flex h-15 w-full flex-col justify-between">
        {/* 챌린지 이름과 날짜 */}
        <div className="flex w-full items-center justify-between">
          <Text size="body1" weight="bold">
            {challengeName}
          </Text>
          <Text size="caption3" weight="medium">
            {startDate} - {endDate}
          </Text>
        </div>
        <div className="flex w-full items-center justify-between">
          {/* 태그 */}
          <div className="flex gap-2">
            <Tag icon="💻">태그</Tag>
            <Tag>태그</Tag>
          </div>
          {/* 참여자 수 */}
          <div className="flex gap-2 items-center">
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
