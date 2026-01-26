import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Check me",
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Read-only checkbox (Checked)",
    checked: true,
    readOnly: true,
  },
};

export const List: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <Checkbox label="Morning Workout" />
        <Checkbox label="Read a Book" defaultChecked />
        <Checkbox label="Write Code" />
        <Checkbox label="Disabled Item" disabled />
        <Checkbox label="Read Only Item" checked readOnly />
      </div>
    );
  },
};
