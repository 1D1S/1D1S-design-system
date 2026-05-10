import type { Meta, StoryObj } from "@storybook/react-vite";
import { Snackbar } from "./Snackbar";
import { SnackbarProvider, useSnackbar } from "./SnackbarProvider";
import { Button } from "../Button";

const meta: Meta<typeof Snackbar> = {
  title: "Feedback/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Snackbar>;

export const WithAction: Story = {
  args: {
    text: "일지가 임시저장되었어요",
    action: "복구",
  },
};

export const TextOnly: Story = {
  args: {
    text: "링크를 복사했어요",
  },
};

function PushDemo(): React.ReactElement {
  const { show } = useSnackbar();
  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          show({
            text: "일지가 임시저장되었어요",
            action: "복구",
            onAction: () => alert("복구!"),
          })
        }
      >
        스낵바 (액션)
      </Button>
      <Button
        variant="secondary"
        onClick={() => show({ text: "링크를 복사했어요" })}
      >
        스낵바 (기본)
      </Button>
    </div>
  );
}

export const WithProvider: Story = {
  render: () => (
    <SnackbarProvider position="bottom">
      <PushDemo />
    </SnackbarProvider>
  ),
};
