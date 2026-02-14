import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text, textVariants } from '../Text';

const tagVariants = cva(
  'inline-flex items-center rounded-2 px-2.5 py-1 bg-main-800 text-white',
  {
    variants: {
      hasIcon: {
        true: 'gap-1.5',
        false: '',
      },
    },
    defaultVariants: {
      hasIcon: false,
    },
  }
);

type TagProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: VariantProps<typeof textVariants>['size'];
  weight?: 'bold' | 'medium' | 'regular' | 'light';
} & VariantProps<typeof tagVariants>;

/**
 * Tag
 * 간단한 태그 스타일을 위한 컴포넌트 (텍스트 + 아이콘 구성)
 *
 * @param icon 선택적 아이콘 이모지 텍스트
 * @param weight 텍스트 굵기 (기본값: bold) : bold, medium, regular, light
 *
 * @example 기본 사용
 * ```tsx
 * <Tag icon="🔥">인기</Tag>
 * ```
 */
export function Tag({
  icon,
  children,
  size = 'caption2',
  weight = 'bold',
  className,
}: TagProps): React.ReactElement {
  return (
    <span className={cn(tagVariants({ hasIcon: Boolean(icon) }), className)}>
      {icon && (
        <Text size={size} weight="medium">
          {icon}
        </Text>
      )}
      <Text size={size} weight={weight}>
        {children}
      </Text>
    </span>
  );
}
