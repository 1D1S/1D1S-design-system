import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner } from "./Banner";
import { Button } from "../Button";

const meta: Meta<typeof Banner> = {
  title: "Display/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["orange", "mint", "blue", "purple", "gray"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    kind: "NEW",
    title: "5월 챌린지\n시즌 오픈!",
    subtitle: "함께 도전할 챌린저를 찾아보세요",
  },
};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Banner kind="NEW" tone="orange" title={"5월 챌린지\n시즌 오픈!"} subtitle="함께 도전할 챌린저를 찾아보세요" />
      <Banner kind="TIP" tone="mint" title={"꾸준함이\n실력이 됩니다"} subtitle="매일 조금씩, 30일 후 달라진 나" />
      <Banner kind="HOT" tone="blue" title={"오늘의 일지\n인기글"} subtitle="챌린저들의 진솔한 하루를 만나보세요" />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Banner
      kind="NEW"
      title="아침 30분 러닝하기"
      subtitle="12명이 함께 도전 중 · 14일 남음"
      action={<Button variant="secondary" size="sm" pill>참여하기 →</Button>}
    />
  ),
};

export const CustomBg: Story = {
  args: {
    title: "보라빛 미션",
    subtitle: "커스텀 그라디언트 사용",
    bg: "linear-gradient(135deg, #c084fc 0%, #6b21a8 100%)",
  },
};
