import type { Meta, StoryObj } from "@storybook/react-vite";
import { MobileHeader } from "./MobileHeader";
import { Settings } from "../Icons/Settings";
import { Bell } from "../Icons/Bell";

const meta: Meta<typeof MobileHeader> = {
  title: "Navigation/MobileHeader",
  component: MobileHeader,
  tags: ["autodocs"],
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[420px] overflow-hidden rounded-3 border border-gray-200">
        <Story />
        <div className="h-40 bg-gray-50 p-4 text-xs text-gray-500">
          (페이지 콘텐츠)
        </div>
      </div>
    ),
  ],
  args: {
    title: "챌린지 상세",
    onBack: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof MobileHeader>;

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: {
    title: "인증 기록",
    subtitle: "7월 10일 · 12일째 연속",
  },
};

export const WithRightAction: Story = {
  args: {
    title: "마이페이지",
    right: (
      <button
        type="button"
        aria-label="설정"
        className="grid h-8 w-8 place-items-center rounded-2 text-gray-700 hover:bg-gray-100"
      >
        <Settings width={20} height={20} />
      </button>
    ),
  },
};

export const WithRightAndSubtitle: Story = {
  args: {
    title: "알림",
    subtitle: "읽지 않은 알림 3개",
    right: (
      <button
        type="button"
        aria-label="알림 설정"
        className="grid h-8 w-8 place-items-center rounded-2 text-gray-700 hover:bg-gray-100"
      >
        <Bell width={20} height={20} />
      </button>
    ),
  },
};

export const WithoutBack: Story = {
  args: {
    title: "홈",
    onBack: undefined,
  },
};

export const LongTitle: Story = {
  args: {
    title: "아주 긴 페이지 제목은 말줄임표로 처리되어 한 줄로 유지됩니다",
  },
};
