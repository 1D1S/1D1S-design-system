import type { Meta, StoryObj } from "@storybook/react-vite";
import { StreakHero } from "./StreakHero";

const meta: Meta<typeof StreakHero> = {
  title: "Display/StreakHero",
  component: StreakHero,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[280px] p-4 bg-gray-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StreakHero>;

export const Default: Story = {
  args: { days: 27, meta: "최장 45일 · 이번주 5/7" },
};

export const Bare: Story = { args: { days: 27 } };

export const Custom: Story = {
  args: {
    days: 365,
    label: "연속 출석",
    unit: "일",
    meta: "축하해요! 1년 달성 🎉",
  },
};
