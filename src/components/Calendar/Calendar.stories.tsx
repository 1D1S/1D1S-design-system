import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

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
