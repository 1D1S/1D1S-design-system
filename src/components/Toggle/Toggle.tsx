'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { Text } from '../Text';
import { cn } from '../../lib/utils';

interface ToggleProps extends React.ComponentProps<typeof TogglePrimitive.Root> {
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Toggle
 * 간단한 토글 스타일을 위한 컴포넌트 (텍스트 + 아이콘 구성)
 *
 * @param icon 선택적 아이콘 이모지 텍스트
 *
 * @example 기본 사용
 * ```tsx
 * <Toggle icon="🔥">인기</Toggle>
 * ```
 */
export function Toggle({
  icon,
  children,
  className,
  ...props
}: ToggleProps): React.ReactElement {
  const hasIcon = Boolean(icon);
  return (
    <TogglePrimitive.Root
      className={cn(
        'rounded-2 data-[state=on]:bg-main-900 bg-gray-200 px-3 py-2 font-light text-gray-700 data-[state=on]:font-bold data-[state=on]:text-white cursor-pointer transition-all duration-200',
        hasIcon && 'gap-2.5',
        className
      )}
      {...props}
    >
      {icon && (
        <Text size="body2" weight="regular">
          {icon}
        </Text>
      )}
      <Text size="body2" weight={null}>
        {children}
      </Text>
    </TogglePrimitive.Root>
  );
}