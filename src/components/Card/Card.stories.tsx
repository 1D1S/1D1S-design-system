import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Tag } from "../Tag";

const meta: Meta<typeof Card> = {
  title: "Display/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    radius: { control: "select", options: ["sm", "md", "lg", "xl"] },
    interactive: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[240px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

const Stripe = ({ tone }: { tone: string }) => (
  <div
    className="h-full w-full"
    style={{
      background: `repeating-linear-gradient(135deg, ${tone}, ${tone} 8px, ${tone}cc 8px, ${tone}cc 16px)`,
    }}
  />
);

export const Empty: Story = {
  render: () => (
    <Card interactive>
      <div className="h-32 bg-gray-100" />
      <Card.Body>
        <Card.Title>빈 카드</Card.Title>
      </Card.Body>
    </Card>
  ),
};

export const ChallengeCard: Story = {
  render: () => (
    <Card interactive>
      <Card.Thumb className="h-[110px]">
        <Stripe tone="#ffccbc55" />
      </Card.Thumb>
      <Card.Body>
        <div className="flex gap-1">
          <Tag size="xs" tone="brand">운동</Tag>
          <Tag size="xs" tone="gray">단체</Tag>
        </div>
        <Card.Title>아침 30분 러닝하기</Card.Title>
        <Card.Meta>
          <span>👥 12/30</span>
          <span className="font-bold text-brand">14일 남음</span>
        </Card.Meta>
      </Card.Body>
    </Card>
  ),
};

export const DiaryCard: Story = {
  render: () => (
    <Card interactive>
      <Card.Thumb className="h-[110px]">
        <Stripe tone="#ffe0b2" />
        <Card.Overlay position="top-left">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-extrabold text-brand">
            ✓ 100%
          </span>
        </Card.Overlay>
        <Card.Overlay position="top-right">
          <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-white text-[18px] shadow-default">
            😊
          </span>
        </Card.Overlay>
      </Card.Thumb>
      <Card.Body>
        <Card.Title>오늘은 5km 완주!</Card.Title>
        <div className="text-[11px] text-gray-500">@minji · ❤️ 24</div>
      </Card.Body>
    </Card>
  ),
};
