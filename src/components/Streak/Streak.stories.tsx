import type { Meta, StoryObj } from "@storybook/react";
import { Streak } from "./Streak";

const meta: Meta<typeof Streak> = {
  title: "Streak",
  component: Streak,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Streak>;

const sampleData = Array.from({ length: 50 }, (_, i) => ({
  date: `2023-10-${i + 1}`,
  count: Math.floor(Math.random() * 10),
}));

export const Default: Story = {
  args: {
    data: sampleData,
    size: 16,
  },
};

export const OneYear: Story = {
  args: {
    data: Array.from({ length: 365 }, (_, i) => ({
      date: `Day ${i + 1}`,
      count: Math.floor(Math.random() * 10),
    })),
    size: 12,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
