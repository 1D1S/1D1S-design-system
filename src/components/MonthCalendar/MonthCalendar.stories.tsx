import { useState } from "react";
import { addDays, format, startOfMonth } from "date-fns";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../Text";
import { MonthCalendar, type MonthCalendarDay } from "./MonthCalendar";

const meta: Meta<typeof MonthCalendar> = {
  title: "Calendar/MonthCalendar",
  component: MonthCalendar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[520px] bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MonthCalendar>;

const BASE = new Date("2026-07-11");

// 챌린지 기간(6/20 ~ 7/25)의 날짜별 일지 수 목업.
function buildDays(): MonthCalendarDay[] {
  const start = new Date("2026-06-20");
  const days: MonthCalendarDay[] = [];
  for (let i = 0; i <= 35; i += 1) {
    const date = format(addDays(start, i), "yyyy-MM-dd");
    const seed = (i * 7) % 11;
    days.push({ date, count: seed > 6 ? seed - 5 : seed > 3 ? 1 : 0 });
  }
  return days;
}

const DAYS = buildDays();
const MIN = "2026-06-20";
const MAX = "2026-07-25";

function Interactive({
  indicator,
}: {
  indicator: "count" | "dot" | "intensity";
}) {
  const [selected, setSelected] = useState<string | undefined>();
  const [month, setMonth] = useState(startOfMonth(BASE));
  return (
    <div className="flex flex-col gap-3">
      <MonthCalendar
        days={DAYS}
        indicator={indicator}
        month={month}
        onMonthChange={setMonth}
        minDate={MIN}
        maxDate={MAX}
        today={BASE}
        selectedDate={selected}
        onSelectDate={setSelected}
      />
      <Text size="caption2" className="text-gray-500">
        선택: {selected ?? "없음"}
      </Text>
    </div>
  );
}

export const Count: Story = {
  render: () => <Interactive indicator="count" />,
};

export const Dot: Story = {
  render: () => <Interactive indicator="dot" />,
};

export const Intensity: Story = {
  render: () => <Interactive indicator="intensity" />,
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <MonthCalendar
      days={DAYS}
      month={startOfMonth(BASE)}
      minDate={MIN}
      maxDate={MAX}
      today={BASE}
    />
  ),
};
