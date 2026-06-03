'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';

import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from '../Icons';

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
      className={cn('w-fit p-2', className)}
      classNames={{
        months: 'flex flex-col gap-3',
        month: 'flex flex-col gap-3',
        caption: 'relative flex h-9 items-center justify-center',
        caption_label: 'text-sm font-extrabold tracking-[-0.2px] text-gray-900',
        nav: 'absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-1',
        nav_button:
          'inline-flex h-8 w-8 items-center justify-center rounded-2 border border-gray-200 bg-white p-0 text-gray-700 transition-colors duration-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer disabled:opacity-40',
        nav_button_previous: '',
        nav_button_next: '',
        table: 'w-full border-collapse',
        head_row: 'flex',
        head_cell: 'h-8 w-9 text-center text-xs font-medium text-gray-500',
        row: 'mt-0.5 flex w-full',
        cell: cn(
          'relative h-9 w-9 p-0 text-center text-sm',
          'focus-within:relative focus-within:z-20',
          isRangeMode
            ? '[&:has(.day-range-middle)]:bg-brand-soft/70 [&:has(.day-range-start)]:bg-brand-soft/70 [&:has(.day-range-end)]:bg-brand-soft/70 [&:has(.day-range-start)]:rounded-l-2 [&:has(.day-range-end)]:rounded-r-2'
            : '[&:has([aria-selected])]:rounded-2'
        ),
        day: 'inline-flex h-9 w-9 items-center justify-center rounded-2 border border-transparent p-0 text-sm font-medium text-gray-800 transition-colors duration-200 aria-selected:opacity-100 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-main-300/60',
        day_range_start:
          'day-range-start aria-selected:rounded-2 aria-selected:bg-brand aria-selected:text-white',
        day_range_end:
          'day-range-end aria-selected:rounded-2 aria-selected:bg-brand aria-selected:text-white',
        day_selected:
          'bg-brand text-white hover:bg-main-700 hover:text-white focus:bg-main-700 focus:text-white',
        day_today: 'text-brand font-extrabold',
        day_outside: 'day-outside text-gray-400 aria-selected:text-gray-500',
        day_disabled: 'cursor-not-allowed text-gray-300 opacity-40 hover:bg-transparent hover:text-gray-300',
        day_range_middle:
          'day-range-middle aria-selected:rounded-none aria-selected:bg-brand-soft aria-selected:text-brand',
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
