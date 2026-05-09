import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Radio, RadioGroup } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Form/Radio",
  component: Radio,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Radio name="r1" value="solo" defaultChecked label="개인 챌린지" />
      <Radio name="r1" value="group" label="단체 챌린지" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Radio name="r2" defaultChecked disabled label="선택됨 (비활성)" />
      <Radio name="r2" disabled label="선택 안 함 (비활성)" />
    </div>
  ),
};

export const Group: Story = {
  render: () => {
    const [v, setV] = useState("solo");
    return (
      <RadioGroup
        name="type"
        value={v}
        onChange={setV}
        options={[
          { value: "solo", label: "개인 챌린지" },
          { value: "group", label: "단체 챌린지" },
          { value: "team", label: "팀 챌린지", disabled: true },
        ]}
      />
    );
  },
};

export const HorizontalGroup: Story = {
  render: () => {
    const [v, setV] = useState("week");
    return (
      <RadioGroup
        name="period"
        direction="horizontal"
        value={v}
        onChange={setV}
        options={[
          { value: "week", label: "1주" },
          { value: "month", label: "1개월" },
          { value: "quarter", label: "3개월" },
        ]}
      />
    );
  },
};
