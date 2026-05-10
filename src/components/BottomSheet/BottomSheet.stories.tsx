import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetClose,
} from "./BottomSheet";
import { Button } from "../Button";
import { Icon } from "../Icons/Icon";

const meta: Meta<typeof BottomSheet> = {
  title: "Feedback/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const MoodPicker: Story = {
  render: () => (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button>기분 선택 시트 열기</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>기분을 골라주세요</BottomSheetTitle>
        </BottomSheetHeader>
        <div className="flex justify-around py-3">
          {["😊", "🙂", "😌", "😴", "🔥"].map((e) => (
            <button
              key={e}
              type="button"
              className="rounded-2.5 p-1.5 text-[28px] transition-colors hover:bg-gray-100"
            >
              {e}
            </button>
          ))}
        </div>
        <BottomSheetFooter>
          <BottomSheetClose asChild>
            <Button variant="secondary" fullWidth size="lg">
              건너뛰기
            </Button>
          </BottomSheetClose>
          <Button fullWidth size="lg">
            다음
          </Button>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  ),
};

export const Options: Story = {
  render: () => (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button variant="secondary">일지 옵션</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>일지 옵션</BottomSheetTitle>
        </BottomSheetHeader>
        {[
          { icon: "Heart" as const, label: "좋아요 누르기" },
          { icon: "PencilLine" as const, label: "댓글 남기기" },
          { icon: "Plane" as const, label: "공유하기" },
          { icon: "Flag" as const, label: "신고" },
        ].map((it) => (
          <button
            key={it.label}
            type="button"
            className="flex w-full items-center gap-3 border-b border-gray-100 px-1 py-3 text-left text-sm font-semibold text-gray-800 last:border-b-0 hover:bg-gray-50"
          >
            <Icon name={it.icon} size={18} className="text-gray-700" />
            {it.label}
          </button>
        ))}
      </BottomSheetContent>
    </BottomSheet>
  ),
};
