import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Label } from '../label';
import { Calendar } from '../calendar';

/**
 * DatePicker
 * 챌린지 카드 컴포넌트 - 제목, 유형, 참여자 수, 기간, 상태(진행중/모집중) 표시
 *
 * @param value hook에서 관리하는 날짜 값
 * @param onChange 날짜 선택 변경 핸들러
 *
 * @example 기본 사용 예
 * ```tsx
 * <FormItem>
 *  <FormField
 *    control={control}
 *    name="startDate"
 *    render={({ field }) => (
 *      <DatePicker value={field.value} onChange={field.onChange} />
 *    )}
 *  />
 * </FormItem>
 * ```
 */
export function DatePicker({
  value,
  onChange,
  disableClickPropagation = false,
}: {
  value: Date | undefined;
  onChange(date: Date | undefined): void;
  disableClickPropagation?: boolean;
}): React.ReactElement {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="input"
          size="md"
          className={cn('w-50', 'text-gray-900')}
        >
          {value ? (
            <Label size="body2" weight="regular">
              {format(value, 'yyyy-MM-dd')}
            </Label>
          ) : (
            <Label size="body2" weight="regular">
              날짜를 선택해주세요.
            </Label>
          )}

          <CalendarIcon size="16" />
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="z-50 w-auto rounded-md border border-gray-200 bg-white p-0 text-gray-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          align="start"
          sideOffset={4}
          {...(disableClickPropagation
            ? { onMouseDownCapture: (event: React.MouseEvent) => event.stopPropagation() }
            : {})}
        >
          <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}