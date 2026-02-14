import type { Meta, StoryObj } from '@storybook/react';
import { RightSidebar } from './RightSidebar';

const meta: Meta<typeof RightSidebar> = {
  title: 'RightSidebar',
  component: RightSidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RightSidebar>;

export const Default: Story = {
  args: {
    fixed: false,
    isLoggedIn: true,
    userName: '고라니',
    userHandle: 'gorani',
    streakDays: 12,
    diaryButtonLabel: '일지 작성하기',
    myPageButtonLabel: '마이페이지',
    challengeTitle: '참여중인 챌린지',
    challenges: [
      { id: '1', title: '알고리즘 부시기', progress: 45, tone: 'blue' },
      { id: '2', title: '새벽 러닝', progress: 80, tone: 'green', hasDeadline: false },
    ],
  },
};

export const LoggedOut: Story = {
  args: {
    fixed: false,
    isLoggedIn: false,
    streakDays: 0,
    loginButtonLabel: '로그인',
    loginPromptMessage: '로그인하고 연속 기록을 시작해보세요',
  },
};
