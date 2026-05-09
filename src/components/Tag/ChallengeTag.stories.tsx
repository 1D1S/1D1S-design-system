import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChallengeTag } from "./ChallengeTag";

const meta: Meta<typeof ChallengeTag> = {
  title: "Display/ChallengeTag",
  component: ChallengeTag,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
  },
};

export default meta;
type Story = StoryObj<typeof ChallengeTag>;

export const Default: Story = { args: { children: "아침 30분 러닝하기" } };

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <ChallengeTag>아침 30분 러닝하기</ChallengeTag>
      <ChallengeTag>하루 한 권 책 읽기</ChallengeTag>
      <ChallengeTag>물 2L 마시기</ChallengeTag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <ChallengeTag size="sm">아침 30분 러닝</ChallengeTag>
      <ChallengeTag size="md">아침 30분 러닝</ChallengeTag>
    </div>
  ),
};
