'use client';

import { Textarea } from '../ui/textarea';
import { cn } from '../../lib/utils';
import { Label, labelVariants } from '../label';

interface TextAreaProps extends React.ComponentProps<typeof Textarea> {
  label?: string;
  error?: string;
}

/**
 * TextArea
 * 입력 필드 컴포넌트
 *
 * @param label 입력 필드 레이블 (선택적)
 * @param error 입력 필드 오류 메시지 (선택적)
 *
 * @example 기본 사용
 * ```tsx
 * <TextArea
 *   label="에러 메시지가 있는 텍스트 필드"
 *   placeholder="텍스트 필드"
 *   error="이 필드는 필수입니다."
 * />
 * ```
 */
export function TextArea({
  className,
  label,
  error,
  ...props
}: TextAreaProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-black" htmlFor={props.id ? props.id : undefined}>
          <Label size="body2" weight="bold">
            {label}
          </Label>
        </label>
      )}
      <Textarea
        className={cn(
          labelVariants({ size: 'body2', weight: 'regular' }),
          'rounded-2 h-auto w-auto border-none bg-gray-50 px-3 py-3 text-gray-900 shadow-none placeholder:text-gray-500 transition-all duration-200',
          'focus-visible:inset-ring-main-700 focus-visible:bg-main-100 focus-visible:border-0 focus-visible:ring-0 focus-visible:inset-ring-[1.5px] focus-visible:outline-none',
          'sm:text-lg md:text-lg lg:text-lg',
          className
        )}
        {...props}
      />
      {error && (
        <Label size="caption2" weight="regular" className="text-warning">
          {error}
        </Label>
      )}
    </div>
  );
}
