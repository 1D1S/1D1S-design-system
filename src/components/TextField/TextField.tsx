'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Text, textVariants } from '../Text';
import { Search } from '../Icons/Search';
import { cva, type VariantProps } from 'class-variance-authority';

const textFieldVariants = cva(
  'w-full transition-all duration-200 outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: [
          'rounded-2 border-none bg-gray-50 px-3 py-2 text-gray-900 placeholder:text-gray-500',
          'focus-visible:inset-ring-[1.5px] focus-visible:inset-ring-main-700 focus-visible:bg-main-100',
        ],
        search: [
          'rounded-full border border-gray-400 bg-white px-3 py-2 pr-10 text-gray-900 placeholder:text-gray-900',
          'focus-visible:border-gray-400 focus-visible:ring-0',
        ],
      },
      size: {
        default: 'h-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof textFieldVariants> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  cols?: number;
}

/**
 * TextField
 * 입력 필드 컴포넌트
 *
 * @param label 입력 필드 레이블 (선택적)
 * @param error 입력 필드 오류 메시지 (선택적)
 * @param variant 스타일 변형 (default | search)
 * @param multiline 다중 행 입력 여부 (textarea 렌더링)
 *
 * @example 기본 사용
 * ```tsx
 * <TextField
 *   label="레이블"
 *   placeholder="플레이스홀더"
 * />
 * ```
 *
 * @example 검색 필드
 * ```tsx
 * <TextField
 *   variant="search"
 *   placeholder="검색어 입력"
 * />
 * ```
 *
 * @example 다중 행 입력
 * ```tsx
 * <TextField
 *   multiline
 *   rows={4}
 *   placeholder="내용을 입력하세요"
 * />
 * ```
 */
export const TextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  ({ className, variant, label, error, type, multiline = false, ...props }, ref) => {
    const isSearch = variant === 'search';
    
    // multiline일 때 textarea로 렌더링, 아니면 input
    const Comp = multiline ? 'textarea' : 'input';

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label className="text-black" htmlFor={props.id}>
            <Text size="body2" weight="bold">
              {label}
            </Text>
          </label>
        )}
        <div className="relative w-full">
          <Comp
            type={!multiline ? type : undefined}
            className={cn(
              textVariants({
                size: 'body2',
                weight: isSearch ? 'light' : 'regular',
              }),
              textFieldVariants({ variant, className }),
              multiline && "resize-none min-h-[60px] sm:min-h-[80px]"
            )}
            // @ts-ignore - ref types are compatible enough for this use case
            ref={ref}
            {...props as any}
          />
          {isSearch && !multiline && (
            <Search
              width={16}
              height={16}
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-600"
            />
          )}
        </div>
        {error && (
          <Text size="caption2" weight="regular" className="text-warning">
            {error}
          </Text>
        )}
      </div>
    );
  }
);
TextField.displayName = 'TextField';
