"use client";

import React from "react";
import { format } from "date-fns";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { DateRange } from "react-day-picker";
import { cn } from "../../lib/utils";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { Calendar as CalendarView } from "../Calendar";
import { Calendar as CalendarIcon } from "../Icons";
import { Text } from "../Text";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "../BottomSheet";

interface BasePickerProps {
  className?: string;
  placeholder?: string;
  /** 비활성화 상태. 트리거를 클릭해도 열리지 않으며 회색조로 표시된다. */
  disabled?: boolean;
  disableClickPropagation?: boolean;
  /**
   * 모바일 뷰포트에서 팝오버 대신 바텀시트로 표시한다. (기본 true)
   * false면 항상 팝오버로 표시.
   */
  mobileSheet?: boolean;
  /** 바텀시트 상단 제목 (모바일에서만 표시). 기본값은 placeholder. */
  sheetTitle?: string;
  /**
   * 내부 Calendar(react-day-picker)로 그대로 전달되는 옵션.
   * 비활성 날짜(`disabled` 매처), 선택 가능 범위(`fromDate`/`toDate`),
   * 초기 표시 월(`defaultMonth`) 등을 지정할 수 있다.
   * `mode`/`selected`/`onSelect`는 내부에서 제어하므로 무시된다.
   *
   * @example calendarProps={{ disabled: { before: new Date() } }}
   */
  calendarProps?: CalendarPassthroughProps;
}

/** DatePicker가 내부 Calendar로 넘기는 옵션 (제어 prop 제외) */
export type CalendarPassthroughProps = Omit<
  React.ComponentProps<typeof CalendarView>,
  "mode" | "selected" | "onSelect" | "className"
>;

const POPOVER_CONTENT_CLASS = cn(
  "z-50 w-auto text-gray-900 outline-none",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
);

/**
 * 바텀시트 내부에서는 캘린더 자체의 보더·그림자·패딩을 제거해 박스-속-박스를 방지한다.
 * 폭은 자연 크기(w-fit) 그대로 두고 래퍼에서 가운데 정렬한다 — w-full로 늘리면
 * 고정폭 셀(w-9)이 좌측으로 쏠려 nav와 어긋난다.
 */
const SHEET_CALENDAR_CLASS = "border-0 p-0 shadow-none";

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
          "group flex h-10 w-full items-center justify-between gap-3 rounded-3 border border-gray-200 bg-white px-4",
          "outline-none transition-all duration-200",
          "data-[state=open]:border-brand hover:border-gray-400 focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:hover:border-gray-200",
          className
        )}
        {...props}
      >
        <Text
          size="body2"
          weight="medium"
          className={cn(
            label ? "text-gray-900" : "text-gray-500",
            "group-disabled:text-gray-400"
          )}
        >
          {label ?? placeholder}
        </Text>
        <CalendarIcon
          className="size-4 text-gray-600 group-disabled:text-gray-400"
          strokeWidth={2.2}
        />
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

function SheetTitle({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <BottomSheetTitle className="mb-3 text-center">{children}</BottomSheetTitle>
  );
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
  disabled = false,
  disableClickPropagation = false,
  mobileSheet = true,
  sheetTitle,
  calendarProps,
}: DatePickerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const useSheet = mobileSheet && isMobile;

  const label = value ? format(value, "yyyy/MM/dd") : undefined;

  const calendar = (
    <CalendarView
      {...calendarProps}
      mode="single"
      selected={value}
      onSelect={(date) => {
        onChange(date);
        if (date) setOpen(false);
      }}
      className={useSheet ? SHEET_CALENDAR_CLASS : undefined}
      initialFocus
    />
  );

  if (useSheet) {
    return (
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetTrigger asChild>
          <PickerTrigger label={label} placeholder={placeholder} className={className} disabled={disabled} />
        </BottomSheetTrigger>
        <BottomSheetContent showHandle={false} showClose>
          <SheetTitle>{sheetTitle ?? placeholder}</SheetTitle>
          <div className="flex justify-center">{calendar}</div>
        </BottomSheetContent>
      </BottomSheet>
    );
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <PickerTrigger label={label} placeholder={placeholder} className={className} disabled={disabled} />
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={POPOVER_CONTENT_CLASS}
          align="start"
          sideOffset={8}
          {...getPopoverContentProps(disableClickPropagation)}
        >
          {calendar}
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
  disabled = false,
  disableClickPropagation = false,
  mobileSheet = true,
  sheetTitle,
  calendarProps,
}: RangeDatePickerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const useSheet = mobileSheet && isMobile;
  const shouldRestartFromDateRef = React.useRef(false);

  const label =
    value?.from && value?.to
      ? `${format(value.from, "yyyy/MM/dd")} - ${format(value.to, "yyyy/MM/dd")}`
      : value?.from
        ? `${format(value.from, "yyyy/MM/dd")} -`
        : undefined;

  const handleOpenChange = (nextOpen: boolean): void => {
    setOpen(nextOpen);
    if (nextOpen) {
      shouldRestartFromDateRef.current = Boolean(value?.from && value?.to);
      return;
    }
    shouldRestartFromDateRef.current = false;
  };

  const calendar = (
    <CalendarView
      {...calendarProps}
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
      className={useSheet ? SHEET_CALENDAR_CLASS : undefined}
      initialFocus
    />
  );

  if (useSheet) {
    return (
      <BottomSheet open={open} onOpenChange={handleOpenChange}>
        <BottomSheetTrigger asChild>
          <PickerTrigger label={label} placeholder={placeholder} className={className} disabled={disabled} />
        </BottomSheetTrigger>
        <BottomSheetContent showHandle={false} showClose>
          <SheetTitle>{sheetTitle ?? placeholder}</SheetTitle>
          <div className="flex justify-center">{calendar}</div>
        </BottomSheetContent>
      </BottomSheet>
    );
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger asChild>
        <PickerTrigger label={label} placeholder={placeholder} className={className} disabled={disabled} />
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={POPOVER_CONTENT_CLASS}
          align="start"
          sideOffset={8}
          {...getPopoverContentProps(disableClickPropagation)}
        >
          {calendar}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
