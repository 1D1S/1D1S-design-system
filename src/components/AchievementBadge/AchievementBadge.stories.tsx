import type { Meta, StoryObj } from "@storybook/react-vite";
import { AchievementBadge } from "./AchievementBadge";

const meta: Meta<typeof AchievementBadge> = {
  title: "Display/AchievementBadge",
  component: AchievementBadge,
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["main", "peach", "mint", "blue", "green", "gray"] },
    layout: { control: "select", options: ["vertical", "horizontal"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof AchievementBadge>;

export const Default: Story = {
  args: { emoji: "🔥", label: "14일 연속" },
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <AchievementBadge emoji="🔥" label="14일 연속" tone="main" />
      <AchievementBadge emoji="🏆" label="첫 완주" tone="peach" />
      <AchievementBadge emoji="📖" label="독서광" tone="mint" />
      <AchievementBadge emoji="💧" label="물마시기" tone="blue" />
      <AchievementBadge emoji="🌱" label="새싹" tone="green" />
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <AchievementBadge emoji="🔥" label="14일 연속" tone="main" layout="horizontal" />
      <AchievementBadge emoji="🏆" label="첫 완주" tone="peach" layout="horizontal" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <AchievementBadge emoji="🔥" label="14일 연속" size="sm" />
      <AchievementBadge emoji="🔥" label="14일 연속" size="md" />
      <AchievementBadge emoji="🔥" label="14일 연속" size="lg" />
    </div>
  ),
};
