import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogClose,
  ConfirmDialog,
} from "./Dialog";
import { Button } from "../Button";

const meta: Meta<typeof Dialog> = {
  title: "Feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const SizeSm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>알림 설정 (sm)</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>알림 설정</DialogTitle>
        </DialogHeader>
        <DialogBody>매일 아침 9시에 챌린지 알림을 받을 수 있어요.</DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SizeMd: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>챌린지 만들기 (md)</Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>챌린지 만들기</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-2.5">
            <div>
              <div className="mb-1.5 text-[11px] font-bold text-gray-700">챌린지 이름</div>
              <input
                defaultValue="아침 30분 러닝"
                className="w-full rounded-2 border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <div className="mb-1.5 text-[11px] font-bold text-gray-700">기간</div>
              <input
                defaultValue="14일"
                className="w-full rounded-2 border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button>만들기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SizeLg: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>리스트 (lg)</Button>
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>참여 가능한 챌린지</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ul className="flex flex-col gap-2">
            {["아침 30분 러닝", "물 2L 마시기", "10시 전 취침", "스마트폰 1시간 줄이기"].map(
              (it) => (
                <li
                  key={it}
                  className="rounded-2 border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-800"
                >
                  {it}
                </li>
              ),
            )}
          </ul>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ConfirmBrand: Story = {
  render: () => (
    <ConfirmDialog
      tone="brand"
      icon="Flag"
      title="챌린지에 참여할까요?"
      description={"아침 30분 러닝하기에 참여하면\n매일 일지를 작성해야 해요."}
      confirmLabel="참여하기"
    >
      <Button>참여 확인</Button>
    </ConfirmDialog>
  ),
};

export const ConfirmDanger: Story = {
  render: () => (
    <ConfirmDialog
      tone="danger"
      icon="Flame"
      title="정말 포기하시겠어요?"
      description={"27일 스트릭이 초기화돼요.\n이 동작은 되돌릴 수 없어요."}
      confirmLabel="포기"
    >
      <Button variant="danger">포기하기</Button>
    </ConfirmDialog>
  ),
};

export const ConfirmMint: Story = {
  render: () => (
    <ConfirmDialog
      tone="mint"
      icon="Check"
      title="오늘 일지 완료!"
      description={"멋진 하루였어요.\n내일도 함께 달려봐요."}
      confirmLabel="확인"
      cancelLabel="공유"
    >
      <Button variant="soft">완료 다이얼로그</Button>
    </ConfirmDialog>
  ),
};
