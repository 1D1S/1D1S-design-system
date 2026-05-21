"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Person } from "../Icons";
import { Text } from "../Text";

const DEFAULT_WEEK_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;

type DayTone = "default" | "strong" | "accent" | "muted";
type BarTone = "main" | "soft";

export interface ScheduleCalendarBar {
  width?: number | string;
  tone?: BarTone;
}

export interface ScheduleCalendarCell {
  id?: string;
  day?: React.ReactNode;
  dayTone?: DayTone;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  bars?: ScheduleCalendarBar[];
  /** 해당 날짜에 일지를 작성한 사용자 수. 2 이상일 때 셀 하단에 카운트 pill로 표시됨. */
  participantCount?: number;
  highlighted?: boolean;
  muted?: boolean;
  colSpan?: number;
  content?: React.ReactNode;
}

export interface ScheduleCalendarProps {
  rows: ScheduleCalendarCell[][];
  weekLabels?: string[];
  cellMinHeight?: number;
  className?: string;
}

function resolveWidth(width?: number | string): string {
  if (width === undefined) return "100%";
  if (typeof width === "number") return `${width}%`;
  return width;
}

function getDayToneClass(dayTone: DayTone = "default"): string {
  if (dayTone === "strong") return "text-gray-900 font-extrabold";
  if (dayTone === "accent") return "text-main-800 font-extrabold";
  if (dayTone === "muted") return "text-gray-400 font-medium";
  return "text-gray-700 font-medium";
}

function getBarToneClass(barTone: BarTone = "main"): string {
  return barTone === "soft" ? "bg-main-600/50" : "bg-main-800";
}

/**
 * ScheduleCalendar
 * 주 단위 표 형태로 일정을 보여주는 커스텀 캘린더 컴포넌트.
 */
export function ScheduleCalendar({
  rows,
  weekLabels = [...DEFAULT_WEEK_LABELS],
  cellMinHeight = 140,
  className,
}: ScheduleCalendarProps): React.ReactElement {
  return (
    <div className={cn("w-full overflow-hidden rounded-3 border border-gray-200 bg-white", className)}>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            {weekLabels.map((label, index) => (
              <th
                key={`${label}-${index}`}
                className={cn(
                  "h-8 border-b border-r border-gray-200 bg-gray-50 px-1 text-center align-middle sm:h-11 sm:px-2.5",
                  index === weekLabels.length - 1 && "border-r-0"
                )}
                scope="col"
              >
                <Text size="caption3" weight="medium" className="text-gray-500 sm:text-sm">
                  {label}
                </Text>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                const span = cell.colSpan ?? 1;
                const key = cell.id ?? `r${rowIndex}-c${cellIndex}`;
                const isLastColumn = row
                  .slice(0, cellIndex + 1)
                  .reduce((acc, current) => acc + (current.colSpan ?? 1), 0) >= 7;

                return (
                  <td
                    key={key}
                    colSpan={span}
                    className={cn(
                      "border-r border-b border-gray-200 align-top",
                      isLastColumn && "border-r-0"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-full flex-col gap-1 p-1 transition-colors duration-200 sm:gap-2 sm:p-2",
                        cell.muted && "bg-gray-50",
                        cell.highlighted && "bg-main-200/70 ring-1 ring-inset ring-main-400"
                      )}
                      style={{ minHeight: `${cellMinHeight}px` }}
                    >
                      {cell.content ? (
                        cell.content
                      ) : (
                        <>
                          {cell.day !== undefined ? (
                            <Text
                              size="caption3"
                              weight="medium"
                              className={cn("leading-tight sm:text-base", getDayToneClass(cell.dayTone))}
                            >
                              {cell.day}
                            </Text>
                          ) : null}

                          {cell.title !== undefined ? (
                            <Text size="caption3" weight="bold" className="line-clamp-1 text-gray-900 sm:text-sm">
                              {cell.title}
                            </Text>
                          ) : null}

                          {cell.bars && cell.bars.length > 0 ? (
                            <div className="mt-0.5 flex flex-col gap-1">
                              {cell.bars.map((bar, barIndex) => (
                                <span
                                  key={`${key}-bar-${barIndex}`}
                                  className={cn(
                                    "block h-1 rounded-full transition-all duration-200 sm:h-1.5",
                                    getBarToneClass(bar.tone)
                                  )}
                                  style={{ width: resolveWidth(bar.width) }}
                                />
                              ))}
                            </div>
                          ) : null}

                          {cell.subtitle !== undefined ? (
                            <Text size="caption3" weight="medium" className="hidden text-gray-600 sm:block">
                              {cell.subtitle}
                            </Text>
                          ) : null}

                          {typeof cell.participantCount === "number" && cell.participantCount >= 2 ? (
                            <div
                              className="mt-auto inline-flex w-fit items-center gap-0.5 rounded-full bg-main-200 px-1.5 py-0.5 text-main-800 sm:gap-1 sm:px-2"
                              aria-label={`${cell.participantCount}명 작성`}
                            >
                              <Person className="size-2.5 sm:size-3" strokeWidth={2.4} />
                              <Text size="caption3" weight="bold" className="leading-none tabular-nums">
                                {cell.participantCount}
                              </Text>
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
