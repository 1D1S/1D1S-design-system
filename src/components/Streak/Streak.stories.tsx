import type { Meta, StoryObj } from "@storybook/react";
import { Streak } from "./Streak";

const meta: Meta<typeof Streak> = {
  title: "Streak",
  component: Streak,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Streak>;

function getSparseCount(): number {
  const value = Math.random();
  if (value < 0.72) return 0;
  if (value < 0.83) return 1;
  if (value < 0.91) return 2;
  if (value < 0.97) return 3;
  return 4;
}

const sampleData = Array.from({ length: 210 }, (_, i) => ({
  date: `2023-10-${i + 1}`,
  count: getSparseCount(),
}));

export const Default: Story = {
  args: {
    data: sampleData,
    size: 26,
    gap: 8,
  },
};

export const OneYear: Story = {
  args: {
    data: Array.from({ length: 365 }, (_, i) => ({
      date: `Day ${i + 1}`,
      count: getSparseCount(),
    })),
    size: 14,
    gap: 5,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

/** 클릭 시 테두리와 함께 액션 버튼이 나타납니다. 모바일 환경 대응용. */
export const WithCellActions: Story = {
  args: {
    data: sampleData,
    size: 26,
    gap: 8,
    renderCellActions: (item) => (
      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          className="w-full rounded-lg bg-white/20 px-3 py-1.5 text-left text-xs font-medium text-white hover:bg-white/30"
          onClick={() => alert(`${item.date} 상세보기`)}
        >
          상세보기
        </button>
        <button
          type="button"
          className="w-full rounded-lg bg-white/20 px-3 py-1.5 text-left text-xs font-medium text-white hover:bg-white/30"
          onClick={() => alert(`${item.date} 활동 추가`)}
        >
          활동 추가
        </button>
      </div>
    ),
  },
};

/** 모바일 뷰포트에서 클릭 인터랙션을 확인합니다. */
export const MobileWithCellActions: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    data: Array.from({ length: 70 }, (_, i) => ({
      date: `2024-01-${String(i + 1).padStart(2, "0")}`,
      count: getSparseCount(),
    })),
    size: 32,
    gap: 8,
    renderCellActions: (item) => (
      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          className="w-full rounded-lg bg-white/20 px-3 py-1.5 text-left text-xs font-medium text-white hover:bg-white/30"
          onClick={() => alert(`${item.date} 상세보기`)}
        >
          상세보기
        </button>
        <button
          type="button"
          className="w-full rounded-lg bg-white/20 px-3 py-1.5 text-left text-xs font-medium text-white hover:bg-white/30"
          onClick={() => alert(`${item.date} 활동 추가`)}
        >
          활동 추가
        </button>
      </div>
    ),
  },
};
