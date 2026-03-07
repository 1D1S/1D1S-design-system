import type { Meta, StoryObj } from '@storybook/react';
import { Dumbbell, Flag, Flame, Laptop, Target, Trophy } from '../Icons';
import { ChallengeListItem } from './ChallengeListItem';

const meta: Meta<typeof ChallengeListItem> = {
  title: 'ChallengeListItem',
  component: ChallengeListItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChallengeListItem>;

export const Ongoing: Story = {
  args: {
    challengeTitle: '새벽 러닝 챌린지',
    challengeCategory: '운동',
    challengeType: '인증형',
    challengeIcon: <Dumbbell />,
    currentUserCount: 92,
    maxUserCount: 100,
    startDate: '2025.03.01',
    endDate: '2025.04.01',
    isOngoing: true,
  },
};

export const Recruiting: Story = {
  args: {
    challengeTitle: '아침 코딩 챌린지',
    challengeCategory: '개발',
    challengeType: '자율형',
    challengeIcon: <Laptop />,
    currentUserCount: 5,
    maxUserCount: 15,
    startDate: '2025.04.10',
    endDate: '2025.05.10',
    isOngoing: false,
  },
};

export const Ended: Story = {
  args: {
    challengeTitle: '한 달 독서 기록 챌린지',
    challengeCategory: '자기계발',
    challengeType: '인증형',
    challengeIcon: <Flame />,
    imageUrl:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    currentUserCount: 60,
    maxUserCount: 60,
    startDate: '2025.01.01',
    endDate: '2025.01.31',
    isOngoing: false,
    isEnded: true,
  },
};

export const Individual: Story = {
  args: {
    challengeTitle: '개인 독서 챌린지',
    challengeCategory: '자기계발',
    challengeType: '인증형',
    challengeIcon: <Flame />,
    currentUserCount: 1,
    maxUserCount: 1,
    startDate: '2025.04.01',
    endDate: '2025.04.30',
    isOngoing: true,
  },
};

export const WithImage: Story = {
  args: {
    challengeTitle: '새벽 러닝 챌린지',
    challengeCategory: '운동',
    challengeType: '인증형',
    imageUrl:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    currentUserCount: 92,
    maxUserCount: 100,
    startDate: '2025.03.01',
    endDate: '2025.04.01',
    isOngoing: true,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <div className="w-full bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    challengeTitle: '새벽 러닝 챌린지',
    challengeCategory: '운동',
    challengeType: '인증형',
    challengeIcon: <Dumbbell />,
    currentUserCount: 92,
    maxUserCount: 100,
    startDate: '2025.03.01',
    endDate: '2025.04.01',
    isOngoing: true,
  },
};

export const MobileList: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <div className="w-full bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-3">
      <ChallengeListItem
        challengeTitle="새벽 러닝 챌린지"
        challengeCategory="운동"
        challengeType="인증형"
        challengeIcon={<Dumbbell />}
        currentUserCount={92}
        maxUserCount={100}
        startDate="2025.03.01"
        endDate="2025.04.01"
        isOngoing={true}
      />
      <ChallengeListItem
        challengeTitle="아침 코딩 챌린지"
        challengeCategory="개발"
        challengeType="자율형"
        challengeIcon={<Laptop />}
        currentUserCount={5}
        maxUserCount={15}
        startDate="2025.04.10"
        endDate="2025.05.10"
        isOngoing={false}
      />
      <ChallengeListItem
        challengeTitle="개인 독서 챌린지"
        challengeCategory="자기계발"
        challengeType="인증형"
        challengeIcon={<Flame />}
        currentUserCount={1}
        maxUserCount={1}
        startDate="2025.04.01"
        endDate="2025.04.30"
        isOngoing={true}
      />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ChallengeListItem
        challengeTitle="새벽 러닝 챌린지"
        challengeCategory="운동"
        challengeType="인증형"
        challengeIcon={<Dumbbell />}
        currentUserCount={92}
        maxUserCount={100}
        startDate="2025.03.01"
        endDate="2025.04.01"
        isOngoing={true}
      />
      <ChallengeListItem
        challengeTitle="아침 코딩 챌린지"
        challengeCategory="개발"
        challengeType="자율형"
        challengeIcon={<Laptop />}
        currentUserCount={5}
        maxUserCount={15}
        startDate="2025.04.10"
        endDate="2025.05.10"
        isOngoing={false}
      />
      <ChallengeListItem
        challengeTitle="하루 물 2L 마시기"
        challengeCategory="건강"
        challengeType="루틴형"
        challengeIcon={<Target />}
        currentUserCount={23}
        maxUserCount={40}
        startDate="2025.05.01"
        endDate="2025.05.31"
        isOngoing={true}
      />
      <ChallengeListItem
        challengeTitle="한 달 독서 기록 챌린지"
        challengeCategory="자기계발"
        challengeType="인증형"
        challengeIcon={<Flag />}
        currentUserCount={60}
        maxUserCount={60}
        startDate="2025.01.01"
        endDate="2025.01.31"
        isOngoing={false}
        isEnded={true}
      />
    </div>
  ),
};
