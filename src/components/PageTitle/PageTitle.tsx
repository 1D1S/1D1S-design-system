import { cn } from '../../lib/utils';
import { Text } from '../Text';
import { cva, VariantProps } from 'class-variance-authority';
import { Logo } from '../Icons/Logo';

const pageTitleVariants = cva('flex flex-col items-center sm:items-center', {
  variants: {
    variant: {
      withSubtitle: 'pb-1 pt-3 gap-1 sm:pb-2 sm:pt-6 sm:gap-2',
      noSubtitle: 'py-3 sm:py-5',
    },
  },
  defaultVariants: {
    variant: 'noSubtitle',
  },
});

type PageTitleProps = {
  title: string;
  subtitle?: string;
  className?: string;
} & VariantProps<typeof pageTitleVariants>;

/**
 * PageTitle
 * 페이지 상단 타이틀 및 부제목 컴포넌트
 *
 * @param title 페이지 제목 텍스트
 * @param subtitle 선택적 부제목 텍스트 (variant가 'withSubtitle'일 때 표시)
 * @param variant 타이틀 스타일 종류 ('noSubtitle' | 'withSubtitle')
 *
 * @example 기본 사용
 * ```tsx
 * <PageTitle title="오늘의 챌린지" />
 * ```
 *
 * @example 부제목 포함
 * ```tsx
 * <PageTitle title="챌린지 소개" subtitle="매일 7시에 기상하기" variant="withSubtitle" />
 * ```
 */
export function PageTitle({
  title,
  subtitle,
  variant = 'noSubtitle',
  className,
}: PageTitleProps): React.ReactElement {
  return (
    <div className={cn('flex items-end gap-3 sm:gap-6', className)}>
      <Logo width={32} height={54} className="text-main-700 sm:w-12 sm:h-20" />
      <div className={pageTitleVariants({ variant })}>
        <Text size="heading1" weight="bold" className="text-black sm:text-3xl">
          {title}
        </Text>
        {variant === 'withSubtitle' && subtitle && (
          <Text size="caption2" weight="medium" className="text-black sm:text-base">
            {subtitle}
          </Text>
        )}
      </div>
    </div>
  );
}
