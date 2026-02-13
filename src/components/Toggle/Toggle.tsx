'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text } from '../Text';
import { cn } from '../../lib/utils';

const toggleVariants = cva(
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

interface ToggleProps
  extends React.ComponentProps<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Toggle
 * 카테고리 선택형 토글 버튼 컴포넌트. `shape`로 둥근/사각 스타일을 선택할 수 있습니다.
 */
export function Toggle({
  icon,
  shape = 'rounded',
  children,
  className,
  ...props
}: ToggleProps): React.ReactElement {
  return (
    <TogglePrimitive.Root className={cn(toggleVariants({ shape }), className)} {...props}>
      {icon ? (
        <span className="inline-flex items-center justify-center text-[18px] leading-none text-inherit [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </span>
      ) : null}
      <Text size="body2" weight="bold" className="text-inherit">
        {children}
      </Text>
    </TogglePrimitive.Root>
  );
}
