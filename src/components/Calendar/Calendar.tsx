'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';

import { cn } from '../../lib/utils';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>): React.ReactElement {
  const isRangeMode = props.mode === 'range';

  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      className={cn('w-fit p-1.5', className)}
      classNames={{
        months: 'flex flex-col gap-2',
        month: 'flex flex-col gap-2',
        caption: 'relative flex h-9 items-center justify-center',
        caption_label: 'text-base font-bold text-gray-800',
        nav: 'absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-1',
        nav_button:
          'inline-flex h-8 w-8 items-center justify-center rounded-2 border border-gray-300 bg-white p-0 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-40',
        nav_button_previous: '',
        nav_button_next: '',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell: 'h-8 w-9 text-center text-xs font-bold tracking-[0.02em] text-gray-500',
        row: 'mt-1 flex w-full',
        cell: cn(
          'relative h-9 w-9 p-0 text-center text-sm',
          'focus-within:relative focus-within:z-20',
          isRangeMode
            ? '[&:has(.day-range-middle)]:bg-main-200/70 [&:has(.day-range-start)]:bg-main-200/70 [&:has(.day-range-end)]:bg-main-200/70 [&:has(.day-range-start)]:rounded-l-2 [&:has(.day-range-end)]:rounded-r-2'
            : '[&:has([aria-selected])]:rounded-2'
        ),
        day: 'inline-flex h-9 w-9 items-center justify-center rounded-2 border border-transparent p-0 text-sm font-medium text-gray-700 transition-colors aria-selected:opacity-100 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-300/70',
        day_range_start:
          'day-range-start aria-selected:rounded-2 aria-selected:bg-main-800 aria-selected:text-white',
        day_range_end:
          'day-range-end aria-selected:rounded-2 aria-selected:bg-main-800 aria-selected:text-white',
        day_selected:
          'bg-main-800 text-white hover:bg-main-700 hover:text-white focus:bg-main-700 focus:text-white',
        day_today: 'border-main-500 text-main-800',
        day_outside: 'day-outside text-gray-400 aria-selected:text-gray-500',
        day_disabled: 'text-gray-400 opacity-50',
        day_range_middle:
          'day-range-middle aria-selected:rounded-none aria-selected:bg-main-200 aria-selected:text-main-800',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('size-4', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('size-4', className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
