import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";
import { Person, People } from "../Icons";

const meta: Meta<typeof SegmentedControl> = {
  title: "Form/SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof SegmentedControl>;

const challengeOptions = [
  { value: "personal", label: "개인 챌린지", icon: <Person /> },
  { value: "group", label: "단체 챌린지", icon: <People /> },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("group");
    return (
      <SegmentedControl
        {...args}
        aria-label="챌린지 유형"
        options={challengeOptions}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const NoIcon: Story = {
  render: () => {
    const [value, setValue] = useState("week");
    return (
      <SegmentedControl
        aria-label="기간"
        options={[
          { value: "day", label: "일간" },
          { value: "week", label: "주간" },
          { value: "month", label: "월간" },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState("personal");
    const [b, setB] = useState("personal");
    const [c, setC] = useState("personal");
    return (
      <div className="flex flex-col gap-4">
        <SegmentedControl size="sm" aria-label="sm" options={challengeOptions} value={a} onValueChange={setA} />
        <SegmentedControl size="md" aria-label="md" options={challengeOptions} value={b} onValueChange={setB} />
        <SegmentedControl size="lg" aria-label="lg" options={challengeOptions} value={c} onValueChange={setC} />
      </div>
    );
  },
};

export const AutoWidth: Story = {
  render: () => {
    const [value, setValue] = useState("week");
    return (
      <SegmentedControl
        fullWidth={false}
        aria-label="기간"
        options={[
          { value: "day", label: "일간" },
          { value: "week", label: "주간" },
          { value: "month", label: "월간" },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};
