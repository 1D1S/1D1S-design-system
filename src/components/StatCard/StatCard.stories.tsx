import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../Icons/Icon";
import { StatCard } from "./StatCard";

const meta: Meta<typeof StatCard> = {
  title: "Display/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["raised", "flat"] },
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

export const Flat: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-2.5">
      <StatCard variant="flat" tone="brand" label="현재 스트릭" value="27" icon={<Icon name="Flame" size={14} aria-hidden />} />
      <StatCard variant="flat" label="최장 스트릭" value="45일" icon={<Icon name="Endless" size={14} aria-hidden />} />
      <StatCard variant="flat" label="작성한 일지" value="48" helper="이번 달 12개" icon={<Icon name="BookOpen" size={14} aria-hidden />} />
      <StatCard variant="flat" tone="mint" label="목표 최장 스트릭" value="9일" helper="목표: 물 마시기" icon={<Icon name="Target" size={14} aria-hidden />} />
    </div>
  ),
};

export const WithIcon: Story = {
  args: { label: "현재 스트릭", value: "27", tone: "brand", icon: <Icon name="Flame" size={14} aria-hidden /> },
};
