import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommentRow } from "./CommentRow";

const meta: Meta<typeof CommentRow> = {
  title: "Display/CommentRow",
  component: CommentRow,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[420px] rounded-3 border border-gray-200 bg-white px-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CommentRow>;

export const Default: Story = {
  args: {
    author: "새벽러너",
    text: "5km 축하드려요! 🏃",
    time: "1시간 전",
  },
};

export const Thread: Story = {
  render: () => (
    <>
      <CommentRow
        author="새벽러너"
        text="5km 축하드려요! 저도 곧 달성할 수 있었으면 🏃"
        time="1시간 전"
      />
      <CommentRow
        author="달리는곰"
        text="꾸준히 하시는 거 보고 자극 받고 갑니다 🔥"
        time="30분 전"
      />
      <CommentRow
        author="아침형인간"
        text="인증샷 멋져요! 오늘 저도 달리러 갔습니다"
        time="10분 전"
      />
    </>
  ),
};

export const NoDivider: Story = {
  args: {
    author: "익명",
    text: "구분선 없는 버전",
    time: "지금",
    divider: false,
  },
};
