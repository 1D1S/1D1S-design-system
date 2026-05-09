import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const ITEMS = [
  { id: "challenge", label: "챌린지" },
  { id: "diary", label: "일지" },
  { id: "cheer", label: "응원" },
];

export const Default: Story = {
  render: () => {
    const [tab, setTab] = useState("challenge");
    return <Tabs items={ITEMS} activeId={tab} onChange={setTab} />;
  },
};

export const FullWidth: Story = {
  render: () => {
    const [tab, setTab] = useState("challenge");
    return (
      <div className="w-[480px]">
        <Tabs items={ITEMS} activeId={tab} onChange={setTab} fullWidth />
      </div>
    );
  },
};

export const WithBadges: Story = {
  render: () => {
    const [tab, setTab] = useState("diary");
    return (
      <Tabs
        activeId={tab}
        onChange={setTab}
        items={[
          { id: "challenge", label: "챌린지", badge: 6 },
          { id: "diary", label: "일지", badge: 48 },
          { id: "cheer", label: "응원", badge: 142 },
        ]}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState("challenge");
    const [b, setB] = useState("challenge");
    const [c, setC] = useState("challenge");
    return (
      <div className="flex flex-col gap-6">
        <Tabs size="sm" items={ITEMS} activeId={a} onChange={setA} />
        <Tabs size="md" items={ITEMS} activeId={b} onChange={setB} />
        <Tabs size="lg" items={ITEMS} activeId={c} onChange={setC} />
      </div>
    );
  },
};
