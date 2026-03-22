import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from './Calendar';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { subDays, startOfDay } from 'date-fns';

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(day) => setDate(day)}
        className="rounded-4 border border-gray-300 bg-white"
      />
    );
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
    });

    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={(nextRange) => setRange(nextRange)}
        className="rounded-4 border border-gray-300 bg-white"
      />
    );
  },
};

/** 오늘로부터 N일 이전/이후만 클릭 가능 */
export const DisabledOutsideRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const today = startOfDay(new Date());
    // 3일 전 ~ 오늘만 클릭 가능, 나머지는 비활성화
    const disabledDays = [
      { before: subDays(today, 3) },
      { after: today },
    ];

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(day) => setDate(day)}
        disabled={disabledDays}
        className="rounded-4 border border-gray-300 bg-white"
      />
    );
  },
};

/** 오늘 이후 날짜만 클릭 가능 (과거 비활성화) */
export const DisabledPastDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const today = startOfDay(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(day) => setDate(day)}
        disabled={{ before: today }}
        className="rounded-4 border border-gray-300 bg-white"
      />
    );
  },
};

/** 오늘 이전 날짜만 클릭 가능 (미래 비활성화) */
export const DisabledFutureDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const today = startOfDay(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(day) => setDate(day)}
        disabled={{ after: today }}
        className="rounded-4 border border-gray-300 bg-white"
      />
    );
  },
};

/** 특정 날짜 범위만 클릭 가능 */
export const DisabledWithCustomMatcher: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const today = startOfDay(new Date());
    // 커스텀 함수로 주말 비활성화
    const isWeekend = (day: Date) => day.getDay() === 0 || day.getDay() === 6;

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(day) => setDate(day)}
        disabled={[{ before: today }, isWeekend]}
        className="rounded-4 border border-gray-300 bg-white"
      />
    );
  },
};
