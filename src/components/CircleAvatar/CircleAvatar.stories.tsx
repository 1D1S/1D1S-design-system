import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAvatar } from "./CircleAvatar";

const meta: Meta<typeof CircleAvatar> = {
  title: "Display/CircleAvatar",
  component: CircleAvatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      control: "select",
      options: ["peach", "cream", "mint", "blue", "sky", "rose", "gray"],
    },
    ring: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CircleAvatar>;

export const Default: Story = { args: { size: "md", tone: "peach" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <CircleAvatar size="xs" />
      <CircleAvatar size="sm" />
      <CircleAvatar size="md" ring />
      <CircleAvatar size="lg" ring />
      <CircleAvatar size="xl" ring />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <CircleAvatar size="md" tone="peach" ring />
      <CircleAvatar size="md" tone="cream" ring />
      <CircleAvatar size="md" tone="mint" ring />
      <CircleAvatar size="md" tone="blue" ring />
      <CircleAvatar size="md" tone="sky" ring />
      <CircleAvatar size="md" tone="rose" ring />
      <CircleAvatar size="md" tone="gray" ring />
    </div>
  ),
};

export const CustomTone: Story = {
  args: { size: "lg", tone: "#a78bfa", ring: true },
};

export const NumericSize: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <CircleAvatar size={28} tone="peach" />
      <CircleAvatar size={48} tone="mint" ring />
      <CircleAvatar size={88} tone="blue" ring />
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    size: "lg",
    imageUrl: "https://github.com/shadcn.png",
    ring: true,
  },
};

export const WithFallbackNode: Story = {
  args: {
    size: "lg",
    tone: "peach",
    fallback: <span className="text-base font-extrabold text-brand">민</span>,
  },
};
