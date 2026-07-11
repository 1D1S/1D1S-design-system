"use client";

import React, { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "../Icons";
import { Text } from "../Text";

const DEFAULT_WEEK_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;
const DATE_FMT = "yyyy-MM-dd";

/** 월간 캘린더의 한 날짜에 붙는 지표. */
export interface MonthCalendarDay {
  /** yyyy-MM-dd */
  date: string;
  /** 숫자 지표 — 0 초과이면 셀에 카운트/도트로 표시. */
  count?: number;
  /** 0~1 강도. indicator="intensity"일 때 배경 진하기. 미지정 시 count/maxCount로 자동. */
  intensity?: number;
  /** 이 날짜를 비활성(클릭 불가, 흐리게)으로 강제. 범위(min/max) 밖은 자동 비활성. */
  disabled?: boolean;
}

export type MonthCalendarIndicator = "count" | "dot" | "intensity" | "none";

export interface MonthCalendarProps {
  /** 날짜별 지표 목록. date(yyyy-MM-dd) 기준으로 매칭. */
  days?: MonthCalendarDay[];
  /** 지표 표현 방식. 기본 "count". */
  indicator?: MonthCalendarIndicator;
  /** 제어형: 표시할 월(그 달의 아무 날). onMonthChange와 함께 사용. */
  month?: Date;
  /** 비제어형 초기 월. 기본 오늘. */
  defaultMonth?: Date;
  onMonthChange?(month: Date): void;
  /** 이동/활성 범위 하한·상한(yyyy-MM-dd). 이 범위 밖 날짜는 비활성, 밖 월로는 이동 불가. */
  minDate?: string;
  maxDate?: string;
  /** 선택된 날짜(yyyy-MM-dd). */
  selectedDate?: string;
  onSelectDate?(date: string): void;
  /** 오늘 기준일(SSR/테스트용 override). 기본 new Date(). */
  today?: Date;
  weekLabels?: string[];
  className?: string;
}

/** min/max(yyyy-MM-dd)와 비교해 date가 범위 안인지. yyyy-MM-dd는 사전순=시간순. */
function inRange(date: string, min?: string, max?: string): boolean {
  if (min && date < min) return false;
  if (max && date > max) return false;
  return true;
}

/**
 * MonthCalendar
 * 컨테이너 너비를 꽉 채우는 월간 캘린더. 월 이동·요일 헤더·오늘 표시·
 * 날짜별 지표(숫자/도트/강도)·선택 상태·범위 밖 비활성을 지원한다.
 * 표 렌더러인 ScheduleCalendar와 달리 월 상태를 스스로 관리한다.
 */
export function MonthCalendar({
  days = [],
  indicator = "count",
  month,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  selectedDate,
  onSelectDate,
  today = new Date(),
  weekLabels = [...DEFAULT_WEEK_LABELS],
  className,
}: MonthCalendarProps): React.ReactElement {
  const [internalMonth, setInternalMonth] = useState<Date>(
    () => defaultMonth ?? month ?? today
  );
  const cursor = month ?? internalMonth;

  const dayMap = useMemo(() => {
    const map = new Map<string, MonthCalendarDay>();
    for (const d of days) map.set(d.date, d);
    return map;
  }, [days]);

  const maxCount = useMemo(
    () => days.reduce((m, d) => Math.max(m, d.count ?? 0), 0),
    [days]
  );

  const weeks = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(cursor), { weekStartsOn: 0 });
    const gridEnd = endOfWeek(endOfMonth(cursor), { weekStartsOn: 0 });
    const rows: Date[][] = [];
    for (let day = gridStart; day <= gridEnd; ) {
      const row: Date[] = [];
      for (let i = 0; i < 7; i += 1) {
        row.push(day);
        day = addDays(day, 1);
      }
      rows.push(row);
    }
    return rows;
  }, [cursor]);

  const changeMonth = (next: Date): void => {
    if (month === undefined) setInternalMonth(next);
    onMonthChange?.(next);
  };

  const todayStr = format(today, DATE_FMT);
  const monthLabel = `${cursor.getFullYear()}년 ${cursor.getMonth() + 1}월`;

  // 월 이동 가능 여부: 이전/다음 달이 min/max 월 범위 안에 걸치는지.
  const prevMonthEnd = format(endOfMonth(subMonths(cursor, 1)), DATE_FMT);
  const nextMonthStart = format(startOfMonth(addMonths(cursor, 1)), DATE_FMT);
  const canPrev = !minDate || prevMonthEnd >= minDate;
  const canNext = !maxDate || nextMonthStart <= maxDate;

  const lastRow = weeks.length - 1;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2.5 flex items-center justify-between">
        <Text size="body1" weight="extrabold" className="text-gray-900">
          {monthLabel}
        </Text>
        <div className="flex items-center gap-1">
          <NavButton
            direction="prev"
            disabled={!canPrev}
            onClick={() => changeMonth(subMonths(cursor, 1))}
          />
          <NavButton
            direction="next"
            disabled={!canNext}
            onClick={() => changeMonth(addMonths(cursor, 1))}
          />
        </div>
      </div>

      {/* 격자형 표 — 관리자 ScheduleCalendar 톤(테두리/셀 구분선/헤더 bg). */}
      <div className="overflow-hidden rounded-3 border border-gray-200 bg-white">
        <div className="grid grid-cols-7">
          {weekLabels.map((label, index) => (
            <div
              key={`${label}-${index}`}
              className={cn(
                "flex h-8 items-center justify-center border-b border-r border-gray-200 bg-gray-50 sm:h-10",
                index === weekLabels.length - 1 && "border-r-0"
              )}
            >
              <Text
                size="caption3"
                weight="medium"
                className="text-gray-500 sm:text-sm"
              >
                {label}
              </Text>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {weeks.map((week, rowIndex) =>
            week.map((date, colIndex) => {
              const dateStr = format(date, DATE_FMT);
              const meta = dayMap.get(dateStr);
              const outsideMonth = !isSameMonth(date, cursor);
              const disabled =
                meta?.disabled === true ||
                outsideMonth ||
                !inRange(dateStr, minDate, maxDate);
              const isToday = dateStr === todayStr;
              const isSelected = selectedDate === dateStr;
              const count = meta?.count ?? 0;
              const intensity =
                meta?.intensity ?? (maxCount > 0 ? count / maxCount : 0);

              return (
                <DayCell
                  key={dateStr}
                  dayNumber={date.getDate()}
                  indicator={indicator}
                  count={count}
                  intensity={intensity}
                  disabled={disabled}
                  dimmed={outsideMonth}
                  isToday={isToday}
                  isSelected={isSelected}
                  isLastColumn={colIndex === 6}
                  isLastRow={rowIndex === lastRow}
                  onClick={
                    disabled || !onSelectDate
                      ? undefined
                      : () => onSelectDate(dateStr)
                  }
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick(): void;
}): React.ReactElement {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "이전 달" : "다음 달"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-8 items-center justify-center rounded-full text-gray-600 transition-colors",
        "hover:bg-gray-100 active:bg-gray-200",
        "disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

interface DayCellProps {
  dayNumber: number;
  indicator: MonthCalendarIndicator;
  count: number;
  intensity: number;
  disabled: boolean;
  dimmed: boolean;
  isToday: boolean;
  isSelected: boolean;
  isLastColumn: boolean;
  isLastRow: boolean;
  onClick?(): void;
}

function DayCell({
  dayNumber,
  indicator,
  count,
  intensity,
  disabled,
  dimmed,
  isToday,
  isSelected,
  isLastColumn,
  isLastRow,
  onClick,
}: DayCellProps): React.ReactElement {
  const hasValue = count > 0;
  const showIntensityBg = indicator === "intensity" && hasValue && !isSelected;

  return (
    <button
      type="button"
      disabled={disabled || !onClick}
      onClick={onClick}
      aria-label={`${dayNumber}일${hasValue ? ` 일지 ${count}개` : ""}`}
      aria-current={isToday ? "date" : undefined}
      aria-pressed={onClick ? isSelected : undefined}
      className={cn(
        "relative flex min-h-[52px] flex-col items-start gap-1 overflow-hidden border-b border-r border-gray-200 p-1.5 text-left align-top transition-colors sm:min-h-[64px] sm:p-2",
        isLastColumn && "border-r-0",
        isLastRow && "border-b-0",
        onClick && "hover:bg-gray-50 active:bg-gray-100",
        (disabled || !onClick) && "cursor-default",
        dimmed && "bg-gray-50",
        isSelected && "bg-brand-soft ring-1 ring-inset ring-brand",
        isToday && !isSelected && "ring-1 ring-inset ring-main-400"
      )}
    >
      {showIntensityBg ? (
        <span
          aria-hidden
          className="absolute inset-0 bg-brand"
          style={{ opacity: 0.12 + Math.min(1, intensity) * 0.5 }}
        />
      ) : null}

      <span
        className={cn(
          "relative z-[1] text-xs leading-none tabular-nums sm:text-sm",
          isSelected
            ? "font-extrabold text-brand"
            : dimmed || disabled
              ? "font-medium text-gray-300"
              : hasValue
                ? "font-bold text-gray-900"
                : "font-medium text-gray-700"
        )}
      >
        {dayNumber}
      </span>

      {indicator === "count" && hasValue ? (
        <span
          className={cn(
            "relative z-[1] rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums sm:text-[11px]",
            isSelected ? "bg-brand text-white" : "bg-brand-soft text-brand"
          )}
        >
          {count}
        </span>
      ) : null}

      {indicator === "dot" && hasValue ? (
        <span
          aria-hidden
          className="relative z-[1] block size-1 rounded-full bg-brand sm:size-1.5"
        />
      ) : null}
    </button>
  );
}
