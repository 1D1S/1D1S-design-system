import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { label: "아침 30분 러닝" } };

export const Checked: Story = {
  args: { label: "아침 30분 러닝", defaultChecked: true },
};

export const WithoutLabel: Story = { args: {} };

export const Disabled: Story = {
  args: { label: "비활성", disabled: true },
};

export const ReadOnly: Story = {
  args: { label: "읽기 전용 (Checked)", checked: true, readOnly: true },
};

export const TodoList: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="아침 30분 러닝" defaultChecked />
      <Checkbox label="하루 한 권 책 읽기" defaultChecked />
      <Checkbox label="물 2L 마시기" />
      <Checkbox label="코딩테스트 1문제" />
    </div>
  ),
};
