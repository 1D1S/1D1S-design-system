import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GoalAddList } from "./GoalAddList";

const meta: Meta<typeof GoalAddList> = {
  title: "GoalAddList",
  component: GoalAddList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[820px] bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GoalAddList>;

export const Default: Story = {
  args: {
    defaultGoals: ["매일 물 2L 마시기", "영양제 챙겨 먹기"],
    placeholder: "목표를 입력하세요",
  },
};

export const Controlled: Story = {
  render: () => {
    const [goals, setGoals] = React.useState<string[]>([
      "매일 물 2L 마시기",
      "영양제 챙겨 먹기",
    ]);

    return <GoalAddList goals={goals} onGoalsChange={setGoals} />;
  },
};

