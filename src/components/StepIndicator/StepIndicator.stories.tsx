import type { Meta, StoryObj } from "@storybook/react";
import { StepIndicator } from "./StepIndicator";

const meta: Meta<typeof StepIndicator> = {
  title: "StepIndicator",
  component: StepIndicator,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1200px] bg-gray-100 p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StepIndicator>;

export const Default: Story = {
  args: {
    currentStep: 2,
    steps: [
      { id: "info", label: "Challenge Info" },
      { id: "schedule", label: "Schedule" },
      { id: "members", label: "Members" },
      { id: "goal", label: "Goal" },
    ],
  },
};

export const Completed: Story = {
  args: {
    currentStep: 4,
    steps: [
      { id: "info", label: "Challenge Info" },
      { id: "schedule", label: "Schedule" },
      { id: "members", label: "Members" },
      { id: "goal", label: "Goal" },
    ],
  },
};

export const FirstStep: Story = {
  args: {
    currentStep: 1,
    steps: [
      { id: "info", label: "Challenge Info" },
      { id: "schedule", label: "Schedule" },
      { id: "members", label: "Members" },
      { id: "goal", label: "Goal" },
    ],
  },
};
