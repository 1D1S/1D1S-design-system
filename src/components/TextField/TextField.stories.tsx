import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "../Icons";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Form/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    state: {
      control: "select",
      options: ["default", "focus", "filled", "error", "disabled"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[420px] p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = { args: { placeholder: "입력하세요" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((sz) => (
        <TextField key={sz} size={sz} placeholder={sz} />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField label="기본" placeholder="이메일 주소" />
      <TextField label="포커스" placeholder="email@1d1s.com" state="focus" />
      <TextField label="입력됨" defaultValue="민지" state="filled" />
      <TextField label="에러" defaultValue="민지" error="이미 사용 중인 닉네임입니다" />
      <TextField label="비활성" placeholder="수정할 수 없음" disabled />
    </div>
  ),
};

export const WithIconLeft: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <TextField iconLeft={<Search width={16} height={16} />} placeholder="챌린지·일지 검색" />
      <TextField iconLeft={<Search width={16} height={16} />} size="lg" placeholder="lg 검색" />
    </div>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <TextField label="목표 (글자수)" defaultValue="아침 30분" suffix="6/20" />
      <TextField label="기간" defaultValue="14" suffix="일" />
      <TextField label="가격" defaultValue="29900" suffix="원" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "이메일",
    required: true,
    placeholder: "email@1d1s.com",
    helper: "가입 시 사용할 이메일을 입력해주세요",
    iconLeft: <Search width={16} height={16} />,
  },
};

export const WithError: Story = {
  args: {
    label: "닉네임",
    required: true,
    error: "이미 사용 중인 닉네임입니다",
    defaultValue: "민지",
  },
};
