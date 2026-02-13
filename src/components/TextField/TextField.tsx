'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Search } from '../Icons/Search';
import { Text, textVariants } from '../Text';

const fieldVariants = cva(
  [
    'w-full transition-all duration-200 outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'placeholder:text-gray-500',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'rounded-3 border border-gray-300 bg-white px-5 text-gray-900 shadow-none',
          'focus-visible:border-main-500 focus-visible:ring-3 focus-visible:ring-main-300/60',
        ],
        search: [
          'rounded-3 !h-10 border border-gray-300 bg-white pl-11 pr-4 text-gray-700 placeholder:text-gray-500',
          'focus-visible:border-main-500 focus-visible:ring-3 focus-visible:ring-main-300/60',
        ],
      },
      multiline: {
        false: 'h-10 py-0',
        true: 'min-h-[320px] resize-none py-8 align-top leading-relaxed',
      },
    },
    defaultVariants: {
      variant: 'default',
      multiline: false,
    },
  }
);

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof fieldVariants> {
  label?: React.ReactNode;
  labelHint?: React.ReactNode;
  error?: string;
  multiline?: boolean;
  rows?: number;
  cols?: number;
}

type TextTagSize = VariantProps<typeof textVariants>['size'];

function getTextSize(variant: TextFieldProps['variant'], multiline: boolean): TextTagSize {
  if (variant === 'search') return 'body2';
  if (multiline) return 'body2';
  return 'body2';
}

function FieldLabel({
  label,
  labelHint,
  required,
  htmlFor,
}: {
  label?: React.ReactNode;
  labelHint?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}): React.ReactElement | null {
  if (!label) return null;

  return (
    <label htmlFor={htmlFor} className="mb-2 inline-flex items-center gap-2">
      <Text size="heading2" weight="bold" className="text-gray-900">
        {label}
      </Text>
      {required ? (
        <Text size="heading2" weight="bold" className="text-main-800">
          *
        </Text>
      ) : null}
      {labelHint ? (
        <Text size="heading2" weight="regular" className="text-gray-500">
          {labelHint}
        </Text>
      ) : null}
    </label>
  );
}

/**
 * TextField
 * 시안형 입력 필드 컴포넌트. `multiline` 사용 시 TextArea 스타일로 렌더링합니다.
 */
export const TextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
      className,
      variant = 'default',
      label,
      labelHint,
      error,
      type,
      multiline = false,
      rows = 8,
      cols,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const isSearch = variant === 'search';
    const textSize = getTextSize(variant, multiline);

    return (
      <div className="flex w-full flex-col">
        <FieldLabel label={label} labelHint={labelHint} required={required} htmlFor={id} />

        <div className="relative w-full">
          {multiline ? (
            <textarea
              id={id}
              rows={rows}
              cols={cols}
              required={required}
              className={cn(
                textVariants({ size: textSize, weight: 'regular' }),
                fieldVariants({ variant, multiline: true }),
                className
              )}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              {...(props as Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>)}
            />
          ) : (
            <input
              id={id}
              type={type}
              required={required}
              className={cn(
                textVariants({ size: textSize, weight: isSearch ? 'light' : 'regular' }),
                fieldVariants({ variant, multiline: false }),
                className
              )}
              ref={ref as React.Ref<HTMLInputElement>}
              {...props}
            />
          )}

          {isSearch && !multiline ? (
            <Search
              width={20}
              height={20}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-500"
            />
          ) : null}
        </div>

        {error ? (
          <Text size="caption1" weight="regular" className="mt-2 text-warning">
            {error}
          </Text>
        ) : null}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export type TextAreaProps = Omit<TextFieldProps, 'multiline' | 'type'>;

/**
 * TextArea
 * TextField의 multiline 전용 래퍼 컴포넌트.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  return <TextField {...props} ref={ref} multiline />;
});

TextArea.displayName = 'TextArea';
