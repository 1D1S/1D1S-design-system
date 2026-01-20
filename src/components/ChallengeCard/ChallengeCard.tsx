import { cn } from '../../lib/utils';
import { Text } from '../Text';
import { Tag } from '../Tag';
import { Logo } from '../Icons/Logo';
import { Person } from '../Icons/Person';

interface ChallengeProps {
  challengeTitle: string;
  challengeType: string;
  currentUserCount: number;
  maxUserCount: number;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
  className?: string;
  onClick?(): void;
}

/**
 * ChallengeCard
 * 챌린지 카드 컴포넌트 - 제목, 유형, 참여자 수, 기간, 상태(진행중/모집중) 표시
 *
 * @param challengeTitle 챌린지 이름
 * @param challengeType 챌린지 유형
 * @param currentUserCount 현재 참여자 수
 * @param maxUserCount 최대 참여자 수
 * @param startDate 시작일 (YYYY-MM-DD)
 * @param endDate 종료일 (YYYY-MM-DD)
 * @param isOngoing 챌린지 진행 상태 (true: 진행중, false: 모집중)
 *
 * @example 기본 사용 예
 * ```tsx
 * <ChallengeCard
 *   challengeTitle="챌린지 제목"
 *   challengeType="고정목표형"
 *   currentUserCount={12}
 *   maxUserCount={20}
 *   startDate="2023-10-01"
 *   endDate="2023-10-31"
 *   isOngoing={true}
 * />
 * ```
 */
export function ChallengeCard({
  challengeTitle,
  challengeType,
  currentUserCount,
  maxUserCount,
  startDate,
  endDate,
  isOngoing = false,
  className,
  onClick,
}: ChallengeProps): React.ReactElement {
  return (
    <div
      className={cn(
        'w-min px-2 py-4 cursor-pointer',
        'hover:rounded-2 hover:shadow-default hover:-translate-y-1 hover:bg-white',
        'transition-all duration-200 ease-in-out'
      )}
      onClick={onClick}
    >
      <div className={cn('flex w-50 flex-wrap items-start justify-between gap-y-2', className)}>
        <Text size="body1" weight="bold" className="text-black">
          {challengeTitle}
        </Text>
        <div className="rounded-2 bg-main-200 relative h-37.5 w-50">
          <div className="absolute flex flex-row gap-1.5 pt-1 pl-1">
            <Tag icon="💻">개발</Tag>
            {isOngoing && <Tag className="bg-mint-700">진행중</Tag>}
            {!isOngoing && <Tag className="bg-blue-500">모집중</Tag>}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Logo width={48} height={48} className="text-main-700" />
          </div>
        </div>
        <Text size="caption3" weight="bold">
          {challengeType}
        </Text>
        <div className="flex flex-row gap-1 items-center">
          <Person width={12} height={12} className="text-gray-600" />
          <Text size="caption2" weight="medium">
            {currentUserCount} / {maxUserCount}
          </Text>
        </div>
        <Text size="caption3" weight="medium">
          {startDate} - {endDate}
        </Text>
      </div>
    </div>
  );
}
