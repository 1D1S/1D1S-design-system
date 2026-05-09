import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Display/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  argTypes: {
    kind: { control: "select", options: ["NEW", "HOT", "TIP", undefined] },
    tone: {
      control: "select",
      options: ["brand", "blue", "mint", "red", "green", "gray"],
    },
    variant: { control: "select", options: ["standalone", "inline"] },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Kinds: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <StatusBadge kind="NEW" />
      <StatusBadge kind="HOT" />
      <StatusBadge kind="TIP" />
    </div>
  ),
};

export const CustomLabel: Story = {
  args: { tone: "green", children: "UPCOMING" },
};

export const InlineOnBanner: Story = {
  render: () => (
    <div className="rounded-4 p-6 bg-[linear-gradient(135deg,#ff8a65,#ff5722)] text-white">
      <StatusBadge variant="inline" kind="NEW" />
      <div className="mt-3 text-xl font-extrabold tracking-[-0.4px]">5월 챌린지 시즌 오픈!</div>
    </div>
  ),
};
