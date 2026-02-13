'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text } from '../Text';
import { cn } from '../../lib/utils';

const toggleGroupItemVariants = cva(
  [
    'inline-flex w-fit items-center justify-center gap-2.5 border bg-white whitespace-nowrap',
    'text-gray-700 transition-all duration-200',
    'cursor-pointer disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-main-300/60',
    'hover:bg-gray-100',
    'data-[state=on]:border-main-800 data-[state=on]:bg-main-800 data-[state=on]:text-white',
    'data-[state=on]:shadow-[0_4px_10px_rgba(255,87,34,0.22)]',
  ],
  {
    variants: {
      shape: {
        rounded: 'h-10 rounded-full px-5',
        square: 'h-10 rounded-3 px-4',
      },
    },
    defaultVariants: {
      shape: 'rounded',
    },
  }
);

interface ToggleGroupItemProps
  extends React.ComponentProps<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleGroupItemVariants> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * ToggleGroup
 * 토글 그룹 컴포넌트
 */
export function ToggleGroup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>): React.ReactElement {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn('flex flex-wrap gap-4 rounded-none', className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

/**
 * ToggleGroupItem
 * 토글 그룹 안에서 사용하는 카테고리형 아이템 컴포넌트.
 */
export function ToggleGroupItem({
  icon,
  shape = 'rounded',
  children,
  className,
  ...props
}: ToggleGroupItemProps): React.ReactElement {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(toggleGroupItemVariants({ shape }), className)}
      {...props}
    >
      {icon ? (
        <span className="inline-flex items-center justify-center text-[18px] leading-none text-inherit [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </span>
      ) : null}
      <Text size="body2" weight="bold" className="text-inherit">
        {children}
      </Text>
    </ToggleGroupPrimitive.Item>
  );
}
