import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeader } from "./SectionHeader";

const meta: Meta<typeof SectionHeader> = {
  title: "Navigation/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  decorators: [
    (Story) => (
      <div className="w-[480px] p-4 bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  args: {
    title: "오늘 시작해볼 챌린지",
    subtitle: "추천 4개",
    onActionClick: () => undefined,
  },
};

export const NoAction: Story = {
  args: { title: "오늘의 일지", subtitle: "응원의 ❤️ 한 번씩 눌러주세요" },
};

export const NoSubtitle: Story = {
  args: { title: "진행 중인 챌린지", onActionClick: () => undefined },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <SectionHeader size="sm" title="작은 헤더" subtitle="size=sm" onActionClick={() => undefined} />
      <SectionHeader size="md" title="기본 헤더" subtitle="size=md" onActionClick={() => undefined} />
      <SectionHeader size="lg" title="큰 헤더" subtitle="size=lg" onActionClick={() => undefined} />
    </div>
  ),
};
