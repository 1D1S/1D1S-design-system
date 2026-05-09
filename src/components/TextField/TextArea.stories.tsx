import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Form/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[420px] p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: { placeholder: "오늘 챌린지를 어떻게 보내셨나요?", rows: 4 },
};

export const WithCount: Story = {
  args: {
    placeholder: "오늘 이야기를 자유롭게 적어보세요",
    rows: 5,
    count: true,
    max: 500,
  },
};

export const WithLabelHelper: Story = {
  args: {
    label: "설명",
    labelHint: "(선택)",
    placeholder: "챌린지에 대한 자세한 설명",
    rows: 4,
    helper: "최대 500자",
    count: true,
    max: 500,
  },
};

export const ShortReply: Story = {
  args: { placeholder: "응원의 말을 남겨주세요", rows: 2 },
};

export const Error: Story = {
  args: {
    label: "내용",
    rows: 4,
    error: "최소 10자 이상 입력해주세요",
    defaultValue: "짧음",
  },
};
