"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { DateRange } from "react-day-picker";
import { cn } from "../../lib/utils";
import { Calendar } from "../Calendar";
import { Text } from "../Text";

interface BasePickerProps {
  className?: string;
  placeholder?: string;
  disableClickPropagation?: boolean;
}

export interface DatePickerProps extends BasePickerProps {
  value: Date | undefined;
  onChange(date: Date | undefined): void;
}

export interface RangeDatePickerProps extends BasePickerProps {
  value: DateRange | undefined;
  onChange(range: DateRange | undefined): void;
}

interface PickerTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  placeholder: string;
}

const PickerTrigger = React.forwardRef<HTMLButtonElement, PickerTriggerProps>(
  ({ label, placeholder, className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "group flex h-10 w-full items-center justify-between gap-3 rounded-3 border border-gray-300 bg-white px-5",
          "transition-colors duration-200",
          "data-[state=open]:border-main-500 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-main-300/60",
          className
        )}
        {...props}
      >
        <Text size="body2" weight="medium" className={cn(label ? "text-gray-900" : "text-gray-500")}>
          {label ?? placeholder}
        </Text>
        <CalendarIcon className="h-6 w-6 text-gray-600" strokeWidth={2.2} />
      </button>
    );
  }
);

PickerTrigger.displayName = "PickerTrigger";

function getPopoverContentProps(disableClickPropagation: boolean): {
  onMouseDownCapture?: (event: React.MouseEvent) => void;
} {
  if (!disableClickPropagation) return {};
  return {
    onMouseDownCapture: (event: React.MouseEvent) => event.stopPropagation(),
  };
}

/**
 * DatePicker
 * 단일 날짜를 선택하는 시안형 Date Picker 컴포넌트.
 */
export function DatePicker({
  value,
  onChange,
  className,
  placeholder = "YYYY/MM/DD",
  disableClickPropagation = false,
}: DatePickerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const label = value ? format(value, "yyyy/MM/dd") : undefined;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <PickerTrigger label={label} placeholder={placeholder} className={className} />
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(
            "z-50 w-auto rounded-4 border border-gray-300 bg-white p-2 text-gray-900",
            "shadow-[0_10px_20px_rgba(34,34,34,0.12)] outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          )}
          align="start"
          sideOffset={8}
          {...getPopoverContentProps(disableClickPropagation)}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              if (date) setOpen(false);
            }}
            initialFocus
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

/**
 * RangeDatePicker
 * 시작일/종료일 범위를 선택하는 시안형 Date Range Picker 컴포넌트.
 */
export function RangeDatePicker({
  value,
  onChange,
  className,
  placeholder = "기간을 선택해주세요",
  disableClickPropagation = false,
}: RangeDatePickerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const shouldRestartFromDateRef = React.useRef(false);

  const label =
    value?.from && value?.to
      ? `${format(value.from, "yyyy/MM/dd")} - ${format(value.to, "yyyy/MM/dd")}`
      : value?.from
        ? `${format(value.from, "yyyy/MM/dd")} -`
        : undefined;

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          shouldRestartFromDateRef.current = Boolean(value?.from && value?.to);
          return;
        }
        shouldRestartFromDateRef.current = false;
      }}
    >
      <PopoverPrimitive.Trigger asChild>
        <PickerTrigger label={label} placeholder={placeholder} className={className} />
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(
            "z-50 w-auto rounded-4 border border-gray-300 bg-white p-2 text-gray-900",
            "shadow-[0_10px_20px_rgba(34,34,34,0.12)] outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          )}
          align="start"
          sideOffset={8}
          {...getPopoverContentProps(disableClickPropagation)}
        >
          <Calendar
            mode="range"
            selected={value}
            onSelect={(nextRange, selectedDay) => {
              if (shouldRestartFromDateRef.current && selectedDay) {
                onChange({ from: selectedDay, to: undefined });
                shouldRestartFromDateRef.current = false;
                return;
              }

              onChange(nextRange);
              if (nextRange?.from && nextRange?.to) {
                setOpen(false);
                shouldRestartFromDateRef.current = false;
              }
            }}
            initialFocus
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
