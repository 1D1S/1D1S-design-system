import type { Meta, StoryObj } from '@storybook/react';
import { DiaryCard } from './DiaryCard';

const meta: Meta<typeof DiaryCard> = {
  title: 'DiaryCard',
  component: DiaryCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[350px] bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    emotion: {
      control: 'select',
      options: ['happy', 'soso', 'sad'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DiaryCard>;

export const Default: Story = {
  args: {
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    title: '오늘 알고리즘 문제 3개 풀기 완료! 역시 꾸준함이 답이다.',
    user: '라니',
    userImage:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    challengeLabel: '1D1S 챌린지',
    challengeUrl: '#',
    date: '5분 전',
    percent: 80,
    likes: 10,
    emotion: 'happy',
  },
};
