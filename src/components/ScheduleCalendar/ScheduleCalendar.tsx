"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Text } from "../Text";

const DEFAULT_WEEK_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

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
  if (dayTone === "strong") return "text-gray-900 font-bold";
  if (dayTone === "accent") return "text-main-800 font-bold";
  if (dayTone === "muted") return "text-gray-500 font-medium";
  return "text-gray-600 font-medium";
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
  cellMinHeight = 150,
  className,
}: ScheduleCalendarProps): React.ReactElement {
  return (
    <div className={cn("w-full overflow-hidden rounded-4 border border-gray-300 bg-white", className)}>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            {weekLabels.map((label, index) => (
              <th
                key={`${label}-${index}`}
                className={cn(
                  "h-14 border-b border-r border-gray-300 bg-gray-100 px-3 text-center align-middle",
                  index === weekLabels.length - 1 && "border-r-0"
                )}
                scope="col"
              >
                <Text size="body1" weight="bold" className="text-gray-600">
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
                      "border-r border-b border-gray-300 align-top",
                      isLastColumn && "border-r-0"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-full min-h-[120px] flex-col gap-2.5 p-2.5",
                        cell.muted && "bg-gray-300",
                        cell.highlighted && "bg-main-200 ring-1 ring-inset ring-main-400"
                      )}
                      style={{ minHeight: `${cellMinHeight}px` }}
                    >
                      {cell.content ? (
                        cell.content
                      ) : (
                        <>
                          {cell.day !== undefined ? (
                            <Text
                              size="body1"
                              weight="medium"
                              className={cn("leading-tight", getDayToneClass(cell.dayTone))}
                            >
                              {cell.day}
                            </Text>
                          ) : null}

                          {cell.title !== undefined ? (
                            <Text size="body2" weight="bold" className="line-clamp-1 text-gray-900">
                              {cell.title}
                            </Text>
                          ) : null}

                          {cell.bars && cell.bars.length > 0 ? (
                            <div className="mt-1 flex flex-col gap-2">
                              {cell.bars.map((bar, barIndex) => (
                                <span
                                  key={`${key}-bar-${barIndex}`}
                                  className={cn(
                                    "block h-2 rounded-full transition-all duration-200",
                                    getBarToneClass(bar.tone)
                                  )}
                                  style={{ width: resolveWidth(bar.width) }}
                                />
                              ))}
                            </div>
                          ) : null}

                          {cell.subtitle !== undefined ? (
                            <Text size="caption1" weight="medium" className="text-gray-600">
                              {cell.subtitle}
                            </Text>
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
