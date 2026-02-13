import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { DateRange } from "react-day-picker";
import { DatePicker, RangeDatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[820px] bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date("2023-10-27"));
    return <DatePicker value={date} onChange={setDate} />;
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date("2023-10-27"),
      to: new Date("2023-10-31"),
    });

    return <RangeDatePicker value={range} onChange={setRange} />;
  },
};
