import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Form/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = { args: { label: "알림 켜짐", defaultChecked: true } };

export const Off: Story = { args: { label: "공개" } };

export const NoLabel: Story = { args: {} };

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Toggle defaultChecked disabled label="비활성 (켜짐)" />
      <Toggle disabled label="비활성 (꺼짐)" />
    </div>
  ),
};

export const LabelPosition: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Toggle defaultChecked label="알림 켜짐" labelPosition="right" />
      <Toggle defaultChecked label="알림 켜짐" labelPosition="left" />
    </div>
  ),
};
