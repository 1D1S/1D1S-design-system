"use client";

import React from "react";
import { format } from "date-fns";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { DateRange } from "react-day-picker";
import { cn } from "../../lib/utils";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { Calendar as CalendarView } from "../Calendar";
import { Calendar as CalendarIcon } from "../Icons";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "../BottomSheet";

interface BasePickerProps {
  className?: string;
  /** 트리거 높이 — TextField·Select 와 같은 눈금: `sm` 32px · `default` 40px */
  size?: "sm" | "default";
  /** 트리거의 접근성 이름 (보이는 라벨이 없을 때) */
  "aria-label"?: string;
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
  "z-50 w-auto text-fg outline-none",
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
  /** 선택된 날짜가 있을 때 캘린더 아래에 '날짜 지우기'를 보인다. */
  clearable?: boolean;
}

export interface RangeDatePickerProps extends BasePickerProps {
  value: DateRange | undefined;
  onChange(range: DateRange | undefined): void;
}

interface PickerTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  placeholder: string;
  size?: "sm" | "default";
}

const PickerTrigger = React.forwardRef<HTMLButtonElement, PickerTriggerProps>(
  ({ label, placeholder, className, size = "default", type = "button", ...props }, ref) => {
    const isSmall = size === "sm";
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          // 플랫: Select·TextField 와 같은 채움 면, 열림·포커스만 brand 선.
          "group flex w-full min-w-0 items-center justify-between gap-2 rounded-ui-xl border border-transparent bg-fill font-medium",
          "outline-none transition-[border-color,background-color] duration-150",
          "data-[state=open]:border-brand focus-visible:border-brand",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isSmall ? "h-8 px-3 text-xs" : "h-10 px-3.5 text-sm",
          className
        )}
        {...props}
      >
        <span className={cn("truncate", label ? "text-fg" : "text-mute")}>
          {label ?? placeholder}
        </span>
        <CalendarIcon
          className={cn("shrink-0 text-sub", isSmall ? "size-3.5" : "size-4")}
          strokeWidth={2.2}
        />
      </button>
    );
  }
);

PickerTrigger.displayName = "PickerTrigger";

/**
 * 모달 다이얼로그(Radix Dialog) 안에서 팝오버가 곧바로 닫히는 것을 막는다.
 *
 * 팝오버 콘텐츠는 다이얼로그 밖(body)으로 포탈되는데, 열릴 때 스스로 포커스를
 * 가져간다(FocusScope.onMountAutoFocus). 다이얼로그의 FocusScope 는 trapped 라
 * 포커스를 곧바로 다이얼로그 안으로 되돌리고, 팝오버는 그것을 "포커스가 밖으로
 * 나갔다"로 보고 스스로 닫는다. WebKit(사파리·아이패드)에서 재현되고 Chromium
 * 에서는 나지 않는다 — DatePicker.dialog.browser.test.tsx 가 두 엔진에서 검증한다.
 *
 * 열림/닫힘 시 자동 포커스 이동을 막으면 이 다툼이 사라진다. 포커스는 트리거에
 * 남고(다이얼로그 안이라 트랩과 무관), 캘린더는 포인터로 조작한다.
 */
function getPopoverContentProps(disableClickPropagation: boolean): {
  onMouseDownCapture?: (event: React.MouseEvent) => void;
  onOpenAutoFocus(event: Event): void;
  onCloseAutoFocus(event: Event): void;
} {
  return {
    onOpenAutoFocus: (event: Event) => event.preventDefault(),
    onCloseAutoFocus: (event: Event) => event.preventDefault(),
    ...(disableClickPropagation
      ? {
          onMouseDownCapture: (event: React.MouseEvent) =>
            event.stopPropagation(),
        }
      : {}),
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
  size,
  "aria-label": ariaLabel,
  clearable = false,
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
      footer={
        clearable && value ? (
          <button
            type="button"
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
            className="mt-2 h-8 w-full rounded-ui-md text-xs font-semibold text-sub transition-colors hover:bg-fill hover:text-fg"
          >
            날짜 지우기
          </button>
        ) : (
          calendarProps?.footer
        )
      }
      onSelect={(date) => {
        onChange(date);
        if (date) setOpen(false);
      }}
      className={useSheet ? SHEET_CALENDAR_CLASS : undefined}
      // 바텀시트는 자체 포커스 스코프라 안전하다. 팝오버에서 포커스를 옮기면
      // 다이얼로그 포커스 트랩과 다시 다퉈 즉시 닫힌다(getPopoverContentProps 주석).
      initialFocus={useSheet}
    />
  );

  if (useSheet) {
    return (
      <BottomSheet open={open} onOpenChange={setOpen}>
        <BottomSheetTrigger asChild>
          <PickerTrigger label={label} placeholder={placeholder} className={className} size={size} aria-label={ariaLabel} disabled={disabled} />
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
        <PickerTrigger label={label} placeholder={placeholder} className={className} size={size} aria-label={ariaLabel} disabled={disabled} />
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
  size,
  "aria-label": ariaLabel,
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
      // 바텀시트는 자체 포커스 스코프라 안전하다. 팝오버에서 포커스를 옮기면
      // 다이얼로그 포커스 트랩과 다시 다퉈 즉시 닫힌다(getPopoverContentProps 주석).
      initialFocus={useSheet}
    />
  );

  if (useSheet) {
    return (
      <BottomSheet open={open} onOpenChange={handleOpenChange}>
        <BottomSheetTrigger asChild>
          <PickerTrigger label={label} placeholder={placeholder} className={className} size={size} aria-label={ariaLabel} disabled={disabled} />
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
        <PickerTrigger label={label} placeholder={placeholder} className={className} size={size} aria-label={ariaLabel} disabled={disabled} />
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
