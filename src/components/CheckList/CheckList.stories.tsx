import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckList } from "./CheckList";
import { useState } from "react";

const meta: Meta<typeof CheckList> = {
  title: "Form/CheckList",
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

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState<string[]>(["wake-up"]);
    const [medium, setMedium] = useState<string[]>(["wake-up"]);
    const [large, setLarge] = useState<string[]>(["wake-up"]);

    const labelStyle = {
      fontSize: 12,
      fontWeight: 600,
      color: "#6b7280",
    } as const;
    const colStyle = {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem",
    } as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={colStyle}>
          <span style={labelStyle}>sm</span>
          <CheckList
            size="sm"
            options={options}
            value={small}
            onValueChange={setSmall}
          />
        </div>
        <div style={colStyle}>
          <span style={labelStyle}>md (default)</span>
          <CheckList
            size="md"
            options={options}
            value={medium}
            onValueChange={setMedium}
          />
        </div>
        <div style={colStyle}>
          <span style={labelStyle}>lg</span>
          <CheckList
            size="lg"
            options={options}
            value={large}
            onValueChange={setLarge}
          />
        </div>
      </div>
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

export const ReadOnly: Story = {
  args: {
    options: options,
    value: ["wake-up"],
    readOnly: true,
    onValueChange: () => {},
  },
};
