import type { Meta, StoryObj } from "@storybook/react-vite";
import { StreakChip } from "./StreakChip";

const meta: Meta<typeof StreakChip> = {
  title: "Display/StreakChip",
  component: StreakChip,
  tags: ["autodocs"],
  argTypes: {
    days: { control: { type: "number", min: 0, max: 999 } },
  },
};

export default meta;
type Story = StoryObj<typeof StreakChip>;

export const Default: Story = { args: { days: 27 } };

export const WithUnit: Story = { args: { days: 27, unit: "일" } };

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <StreakChip days={3} />
      <StreakChip days={27} />
      <StreakChip days={142} />
      <StreakChip days={365} unit="일" />
    </div>
  ),
};
