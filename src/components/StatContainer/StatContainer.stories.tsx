import type { Meta, StoryObj } from "@storybook/react";
import {
  CircleCheck,
  FilePenLine,
  Flag,
  Flame,
  Medal,
  Target,
  Trophy,
} from "lucide-react";
import { StatContainer } from "./StatContainer";

const meta: Meta<typeof StatContainer> = {
  title: "StatContainer",
  component: StatContainer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StatContainer>;

export const Default: Story = {
  args: {
    icon: <Flame />,
    iconClassName: "text-main-800",
    title: "현재 일지 스트릭",
    value: 12,
    unit: "일",
  },
};

export const DashboardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatContainer icon={<Flame />} iconClassName="text-main-800" title="현재 일지 스트릭" value={12} unit="일" />
      <StatContainer icon={<Trophy />} iconClassName="text-main-700" title="일지 최장 스트릭" value={42} unit="일" />
      <StatContainer icon={<Medal />} iconClassName="text-main-600" title="목표 최장 스트릭" value={30} unit="일" />
      <StatContainer icon={<Flag />} iconClassName="text-blue-500" title="참여한 모든 챌린지" value={15} unit="개" />
      <StatContainer icon={<CircleCheck />} iconClassName="text-green-500" title="완료한 단기 챌린지" value={8} unit="개" />
      <StatContainer icon={<FilePenLine />} iconClassName="text-violet-500" title="작성한 전체 일지" value={156} unit="개" />
      <StatContainer icon={<Target />} iconClassName="text-pink-500" title="완료한 전체 목표" value={320} unit="개" />
    </div>
  ),
};
