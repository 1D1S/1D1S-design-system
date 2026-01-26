import type { Meta, StoryObj } from "@storybook/react";
import { ToggleCheck } from "./ToggleCheck";
import { useState } from "react";

const meta: Meta<typeof ToggleCheck> = {
  title: "ToggleCheck",
  component: ToggleCheck,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToggleCheck>;

export const Default: Story = {
  args: {
    children: "Toggle this option",
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    return (
      <div className="flex flex-col gap-2">
        <ToggleCheck
          pressed={selected.includes("1")}
          onPressedChange={() => toggle("1")}
        >
          Morning Workout
        </ToggleCheck>
        <ToggleCheck
          pressed={selected.includes("2")}
          onPressedChange={() => toggle("2")}
        >
          Read a Book
        </ToggleCheck>
        <ToggleCheck
          pressed={selected.includes("3")}
          onPressedChange={() => toggle("3")}
        >
          Write Code
        </ToggleCheck>
      </div>
    );
  },
};
