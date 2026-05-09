import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatCard } from "./StatCard";

const meta: Meta<typeof StatCard> = {
  title: "Display/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["white", "brand", "mint", "blue", "gray"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: { label: "현재 스트릭", value: "🔥 27", tone: "brand" },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-2.5">
      <StatCard label="현재 스트릭" value="🔥 27" tone="brand" />
      <StatCard label="최장 스트릭" value="45일" />
      <StatCard label="참여 챌린지" value="6" />
      <StatCard label="작성한 일지" value="48" />
    </div>
  ),
};

export const WithHelper: Story = {
  args: { label: "이번 달 일지", value: "12", helper: "지난 달 대비 +5" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <StatCard label="레벨" value="3" size="sm" />
      <StatCard label="레벨" value="3" size="md" />
      <StatCard label="레벨" value="3" size="lg" />
    </div>
  ),
};
