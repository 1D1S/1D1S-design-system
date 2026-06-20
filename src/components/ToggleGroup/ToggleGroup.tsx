'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text } from '../Text';
import { cn } from '../../lib/utils';

const toggleGroupItemVariants = cva(
  [
    'inline-flex w-fit items-center justify-center border bg-white whitespace-nowrap',
    'text-gray-700 transition-all duration-200 ease-out active:scale-95',
    'cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2',
    'hover:border-gray-400 hover:bg-gray-100',
    'data-[state=on]:border-brand data-[state=on]:bg-brand data-[state=on]:text-white',
    'data-[state=on]:hover:bg-main-600 data-[state=on]:hover:border-main-600',
    'data-[state=on]:shadow-brand-glow',
    'data-[state=on]:animate-pop',
  ],
  {
    variants: {
      shape: {
        rounded: 'rounded-full',
        square: 'rounded-3',
      },
      size: {
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-[46px]',
      },
    },
    compoundVariants: [
      { shape: 'rounded', size: 'sm', class: 'px-3.5 gap-1.5' },
      { shape: 'rounded', size: 'md', class: 'px-5 gap-2' },
      { shape: 'rounded', size: 'lg', class: 'px-6 gap-2.5' },
      { shape: 'square', size: 'sm', class: 'px-3 gap-1.5' },
      { shape: 'square', size: 'md', class: 'px-4 gap-2' },
      { shape: 'square', size: 'lg', class: 'px-5 gap-2.5' },
    ],
    defaultVariants: {
      shape: 'rounded',
      size: 'md',
    },
  }
);

// 사이즈별 글자/아이콘 크기 — 다른 폼 컨트롤과 동일 (sm 12 · md 14 · lg 16px)
const textBySize = {
  sm: 'caption3',
  md: 'caption2',
  lg: 'caption1',
} as const;

const iconClassBySize = {
  sm: 'text-[16px] [&>svg]:size-4',
  md: 'text-[18px] [&>svg]:size-5',
  lg: 'text-[20px] [&>svg]:size-5',
} as const;

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
  size = 'md',
  children,
  className,
  ...props
}: ToggleGroupItemProps): React.ReactElement {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(toggleGroupItemVariants({ shape, size }), className)}
      {...props}
    >
      {icon ? (
        <span
          className={cn(
            'inline-flex items-center justify-center leading-none text-inherit',
            iconClassBySize[size ?? 'md'],
          )}
        >
          {icon}
        </span>
      ) : null}
      <Text size={textBySize[size ?? 'md']} weight="medium" className="text-inherit">
        {children}
      </Text>
    </ToggleGroupPrimitive.Item>
  );
}
