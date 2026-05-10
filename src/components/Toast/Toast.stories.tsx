import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "./Toast";
import { ToastProvider, useToast } from "./ToastProvider";
import { Button } from "../Button";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Brand: Story = {
  args: {
    tone: "brand",
    icon: "Flame",
    title: "🔥 27일 스트릭 달성!",
    body: "역대 최장 기록을 갱신했어요",
    action: "자세히",
  },
};

export const Success: Story = {
  args: {
    tone: "success",
    icon: "Check",
    title: "일지를 저장했어요",
    body: "응원이 도착하면 알려드릴게요",
  },
};

export const Info: Story = {
  args: {
    tone: "info",
    icon: "Bell",
    title: "새 응원 3개",
    body: "러닝하는민지님이 좋아요를 눌렀어요",
    action: "보기",
  },
};

export const Danger: Story = {
  args: {
    tone: "danger",
    icon: "Bell",
    title: "저장에 실패했어요",
    body: "네트워크를 확인해주세요",
    action: "다시",
  },
};

function PushDemo(): React.ReactElement {
  const { show } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          show({
            tone: "success",
            icon: "Check",
            title: "일지를 저장했어요",
            body: "응원이 도착하면 알려드릴게요",
          })
        }
      >
        성공 토스트
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          show({
            tone: "info",
            icon: "Bell",
            title: "새 응원 3개",
            body: "지금 확인해 보세요",
            action: "보기",
          })
        }
      >
        정보 토스트
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          show({
            tone: "danger",
            icon: "Bell",
            title: "저장에 실패했어요",
            body: "네트워크를 확인해주세요",
            action: "다시",
          })
        }
      >
        실패 토스트
      </Button>
    </div>
  );
}

export const WithProvider: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <PushDemo />
    </ToastProvider>
  ),
};
