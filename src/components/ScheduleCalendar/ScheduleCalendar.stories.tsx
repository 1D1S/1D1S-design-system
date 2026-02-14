import { useMemo, useState } from "react";
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { ChevronLeft, ChevronRight } from "../Icons";
import { Text } from "../Text";
import { ScheduleCalendar, type ScheduleCalendarCell } from "./ScheduleCalendar";

const meta: Meta<typeof ScheduleCalendar> = {
  title: "ScheduleCalendar",
  component: ScheduleCalendar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScheduleCalendar>;

type CalendarPreset = "month" | "twoWeeks" | "threeWeeks";

function chunkDays<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

function buildCell(date: Date, isVisible: boolean): ScheduleCalendarCell {
  if (!isVisible) {
    return {};
  }

  const day = date.getDate();
  const seed = day + (date.getMonth() + 1) * 3;
  const bars: NonNullable<ScheduleCalendarCell["bars"]> = [];

  if (seed % 2 === 0) {
    bars.push({ width: 92, tone: "main" });
  }
  if (seed % 5 === 0) {
    bars.push({ width: 58, tone: "soft" });
  }
  if (bars.length === 0 && seed % 7 === 0) {
    bars.push({ width: 72, tone: "main" });
  }

  return {
    day,
    dayTone: date.getDay() === 5 ? "accent" : seed % 3 === 0 ? "strong" : "default",
    highlighted: seed % 11 === 0,
    bars: bars.length > 0 ? bars : undefined,
  };
}

function getCalendarRows(cursorDate: Date, preset: CalendarPreset): { label: string; rows: ScheduleCalendarCell[][] } {
  if (preset === "month") {
    const monthStart = startOfMonth(cursorDate);
    const monthEnd = endOfMonth(cursorDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const days: Date[] = [];
    for (let current = gridStart; current <= gridEnd; current = addDays(current, 1)) {
      days.push(current);
    }

    const rows = chunkDays(days, 7).map((week) =>
      week.map((date) => buildCell(date, isSameMonth(date, cursorDate)))
    );

    return {
      label: format(cursorDate, "yyyy.MM"),
      rows,
    };
  }

  const weeks = preset === "twoWeeks" ? 2 : 3;
  const startDate = startOfWeek(cursorDate, { weekStartsOn: 0 });
  const endDate = addDays(startDate, weeks * 7 - 1);

  const days: Date[] = [];
  for (let current = startDate; current <= endDate; current = addDays(current, 1)) {
    days.push(current);
  }

  const rows = chunkDays(days, 7).map((week) => week.map((date) => buildCell(date, true)));

  return {
    label: `${format(startDate, "yyyy.MM.dd")} - ${format(endDate, "MM.dd")}`,
    rows,
  };
}

function ScheduleCalendarPager({ preset }: { preset: CalendarPreset }) {
  const [cursorDate, setCursorDate] = useState(new Date("2026-02-01"));

  const { label, rows } = useMemo(
    () => getCalendarRows(cursorDate, preset),
    [cursorDate, preset]
  );

  const handlePrev = (): void => {
    if (preset === "month") {
      setCursorDate((prev) => subMonths(prev, 1));
      return;
    }

    setCursorDate((prev) => addDays(prev, preset === "twoWeeks" ? -14 : -21));
  };

  const handleNext = (): void => {
    if (preset === "month") {
      setCursorDate((prev) => addMonths(prev, 1));
      return;
    }

    setCursorDate((prev) => addDays(prev, preset === "twoWeeks" ? 14 : 21));
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Text size="heading2" weight="bold" className="text-gray-900">
          {label}
        </Text>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outlined"
            size="icon"
            aria-label="이전 기간"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="icon"
            aria-label="다음 기간"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ScheduleCalendar rows={rows} cellMinHeight={122} />
    </div>
  );
}

export const OneMonth: Story = {
  render: () => <ScheduleCalendarPager preset="month" />,
};

export const TwoWeeks: Story = {
  render: () => <ScheduleCalendarPager preset="twoWeeks" />,
};

export const ThreeWeeks: Story = {
  render: () => <ScheduleCalendarPager preset="threeWeeks" />,
};
