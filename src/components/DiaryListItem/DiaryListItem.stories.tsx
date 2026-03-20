import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DiaryListItem } from './DiaryListItem';

const meta: Meta<typeof DiaryListItem> = {
  title: 'DiaryListItem',
  component: DiaryListItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    emotion: {
      control: 'select',
      options: ['happy', 'soso', 'sad'],
    },
    totalMemberCount: {
      control: 'number',
    },
    onChallengeClick: { action: 'challenge clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof DiaryListItem>;

export const Default: Story = {
  args: {
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    title: '오늘 알고리즘 문제 3개 풀기 완료! 역시 꾸준함이 답이다.',
    user: '라니',
    userImage:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    challengeLabel: '1D1S 챌린지',
    totalMemberCount: 1,
    date: '5분 전',
    percent: 80,
    likes: 10,
    emotion: 'happy',
  },
};

export const NoImage: Story = {
  args: {
    title: '고라니 밥준 일지',
    user: '고라니',
    challengeLabel: '1D1S 챌린지',
    totalMemberCount: 3,
    date: '2시간 전',
    percent: 60,
    likes: 5,
    emotion: 'soso',
  },
};

export const ControlledLike: Story = {
  args: {
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    title: '오늘 알고리즘 문제 3개 풀기 완료! 역시 꾸준함이 답이다.',
    user: '라니',
    userImage:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    challengeLabel: '1D1S 챌린지',
    totalMemberCount: 3,
    date: '5분 전',
    percent: 80,
    likes: 10,
    emotion: 'happy',
  },
  render: (args) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(args.likes);
    return (
      <DiaryListItem
        {...args}
        likes={likes}
        isLiked={isLiked}
        onLikeToggle={(nextLiked) => {
          setIsLiked(nextLiked);
          setLikes((prev) => Math.max(0, prev + (nextLiked ? 1 : -1)));
        }}
      />
    );
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    title: '오늘 알고리즘 문제 3개 풀기 완료! 역시 꾸준함이 답이다.',
    user: '라니',
    userImage:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    challengeLabel: '1D1S 챌린지',
    totalMemberCount: 3,
    date: '5분 전',
    percent: 80,
    likes: 10,
    emotion: 'happy',
  },
};

export const MobileList: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        {
          title: '고라니 밥준 일지',
          user: '고라니',
          date: '2시간 전',
          percent: 60,
          likes: 10,
          emotion: 'happy' as const,
          challengeLabel: '1D1S 챌린지',
          totalMemberCount: 1,
        },
        {
          title: '오늘 알고리즘 문제 3개 풀기 완료! 역시 꾸준함이 답이다.',
          imageUrl:
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          user: '라니',
          date: '5분 전',
          percent: 80,
          likes: 42,
          emotion: 'soso' as const,
          challengeLabel: '알고리즘 스터디',
          totalMemberCount: 5,
        },
      ].map((item, i) => (
        <DiaryListItem key={i} {...item} />
      ))}
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        {
          title: '고라니 밥준 일지',
          user: '고라니',
          date: '2시간 전',
          percent: 60,
          likes: 10,
          emotion: 'happy' as const,
          challengeLabel: '1D1S 챌린지',
          totalMemberCount: 1,
        },
        {
          title: '오늘 알고리즘 문제 3개 풀기 완료! 역시 꾸준함이 답이다.',
          imageUrl:
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          user: '라니',
          date: '5분 전',
          percent: 80,
          likes: 42,
          emotion: 'soso' as const,
          challengeLabel: '알고리즘 스터디',
          totalMemberCount: 5,
        },
        {
          title: '새벽 러닝 30일차, 드디어 완주!',
          user: '러닝러버',
          date: '1일 전',
          percent: 100,
          likes: 88,
          emotion: 'sad' as const,
          challengeLabel: '새벽 러닝',
          totalMemberCount: 1,
          defaultLiked: true,
        },
      ].map((item, i) => (
        <DiaryListItem key={i} {...item} />
      ))}
    </div>
  ),
};
