import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import { useState } from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  tags: ['autodocs'],
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
        className="rounded-md border"
      />
    );
  },
};
