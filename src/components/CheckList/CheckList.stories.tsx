import type { Meta, StoryObj } from "@storybook/react";
import { CheckList } from "./CheckList";
import { useState } from "react";

const meta: Meta<typeof CheckList> = {
  title: "CheckList",
  component: CheckList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "1500px", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CheckList>;

const options = [
  { id: "wake-up", label: "아침 7시에 기상하기" },
  { id: "water", label: "물 2L 마시기" },
  { id: "reading", label: "하루 30분 독서" },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["wake-up", "water"]);
    return (
      <CheckList
        options={options}
        value={selected}
        onValueChange={setSelected}
      />
    );
  },
};

export const Empty: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <CheckList
        options={options}
        value={selected}
        onValueChange={setSelected}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    options: options,
    value: ["wake-up"],
    disabled: true,
    onValueChange: () => {},
  },
};
