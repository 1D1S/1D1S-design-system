import type { Meta, StoryObj } from "@storybook/react";
import { Streak } from "./Streak";

const meta: Meta<typeof Streak> = {
  title: "Streak",
  component: Streak,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Streak>;

function getSparseCount(): number {
  const value = Math.random();
  if (value < 0.72) return 0;
  if (value < 0.83) return 1;
  if (value < 0.91) return 2;
  if (value < 0.97) return 3;
  return 4;
}

const sampleData = Array.from({ length: 210 }, (_, i) => ({
  date: `2023-10-${i + 1}`,
  count: getSparseCount(),
}));

export const Default: Story = {
  args: {
    data: sampleData,
    size: 26,
    gap: 8,
  },
};

export const OneYear: Story = {
  args: {
    data: Array.from({ length: 365 }, (_, i) => ({
      date: `Day ${i + 1}`,
      count: getSparseCount(),
    })),
    size: 14,
    gap: 5,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
