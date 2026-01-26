import type { Meta, StoryObj } from "@storybook/react";
import { CheckList } from "./CheckList";
import { useState } from "react";

const meta: Meta<typeof CheckList> = {
  title: "CheckList",
  component: CheckList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "400px", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CheckList>;

const options = [
  { id: "apple", label: "Apple 🍎" },
  { id: "banana", label: "Banana 🍌" },
  { id: "orange", label: "Orange 🍊" },
  { id: "grape", label: "Grape 🍇", disabled: true },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["apple"]);
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
    value: ["apple"],
    disabled: true,
    onValueChange: () => {},
  },
};
