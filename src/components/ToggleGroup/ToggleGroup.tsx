'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { Text } from '../Text';
import { cn } from '../../lib/utils';

interface ToggleProps extends React.ComponentProps<typeof ToggleGroupPrimitive.Item> {
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * ToggleGroup
 * 토글 그룹 컴포넌트
 *
 * @example 기본 사용
 * ```tsx
 * <ToggleGroup type="single">
 *  <ToggleGroupItem icon="🔥">인기</ToggleGroupItem
 *  <ToggleGroupItem icon="⭐">추천</ToggleGroupItem>
 *  <ToggleGroupItem icon="💬">토론</ToggleGroupItem
 * </ToggleGroup>
 * ```
 */
export function ToggleGroup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>): React.ReactElement {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn('flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-2.5 sm:gap-y-2.5 rounded-none', className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

/**
 * ToggleGroupItem
 * 간단한 토글 스타일을 위한 컴포넌트 (텍스트 + 아이콘 구성)
 *
 * @param icon 선택적 아이콘 이모지 텍스트
 *
 * @example 기본 사용
 * ```tsx
 * <ToggleGroupItem icon="🔥">인기</Toggle>
 * ```
 */
export function ToggleGroupItem({
  icon,
  children,
  className,
  ...props
}: ToggleProps): React.ReactElement {
  const hasIcon = Boolean(icon);
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'data-[state=on]:bg-main-900 bg-gray-200 px-2.5 py-1.5 sm:px-3 sm:py-2 font-light text-gray-700 data-[state=on]:font-bold data-[state=on]:text-white cursor-pointer',
        hasIcon && 'gap-2',
        className
      )}
      {...props}
    >
      {icon && (
        <Text size="caption1" weight="regular" className="sm:text-lg">
          {icon}
        </Text>
      )}
      <Text size="caption1" weight={null} className="sm:text-lg">
        {children}
      </Text>
    </ToggleGroupPrimitive.Item>
  );
}
