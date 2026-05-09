import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircularProgress } from "./CircularProgress";

const meta: Meta<typeof CircularProgress> = {
  title: "Display/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    showPercentage: { control: "boolean" },
    color: { control: "color" },
    trackColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = { args: { value: 75, size: "md" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <CircularProgress value={75} size="sm" />
      <CircularProgress value={75} size="md" />
      <CircularProgress value={75} size="lg" />
      <CircularProgress value={75} size="xl" />
    </div>
  ),
};

export const CustomSize: Story = {
  args: { value: 67, size: 120, stroke: 10 },
};

export const CustomColor: Story = {
  args: { value: 80, size: "lg", color: "#3eb489", trackColor: "#c8f4e1" },
};

export const NoLabel: Story = {
  args: { value: 60, size: "md", showPercentage: false },
};

export const CustomCenter: Story = {
  render: () => (
    <CircularProgress
      value={67}
      size="lg"
      centerSlot={
        <div className="text-center">
          <div className="text-2xl font-extrabold text-brand">14</div>
          <div className="text-[10px] font-bold text-gray-500">/ 21일</div>
        </div>
      }
    />
  ),
};
