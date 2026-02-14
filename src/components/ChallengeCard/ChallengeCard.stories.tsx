import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeCard } from './ChallengeCard';
import {
  Dumbbell,
  Flag,
  Flame,
  Laptop,
  Target,
  Trophy,
} from '../Icons';

const meta: Meta<typeof ChallengeCard> = {
  title: 'ChallengeCard',
  component: ChallengeCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChallengeCard>;

export const Default: Story = {
  args: {
    challengeTitle: '새벽 러닝 챌린지',
    challengeCategory: '운동',
    challengeType: '인증형',
    challengeIcon: <Dumbbell />,
    imageUrl:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: '',
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
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    currentUserCount: 60,
    maxUserCount: 60,
    startDate: '2025.01.01',
    endDate: '2025.01.31',
    isOngoing: false,
    isEnded: true,
  },
};

export const Grid3x2: Story = {
  render: () => {
    const cards = [
      {
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
      {
        challengeTitle: '아침 코딩 챌린지',
        challengeCategory: '개발',
        challengeType: '자율형',
        challengeIcon: <Laptop />,
        currentUserCount: 15,
        maxUserCount: 30,
        startDate: '2025.04.10',
        endDate: '2025.05.10',
        isOngoing: false,
      },
      {
        challengeTitle: '한 달 독서 기록',
        challengeCategory: '자기계발',
        challengeType: '인증형',
        challengeIcon: <Flame />,
        imageUrl:
          'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
        currentUserCount: 44,
        maxUserCount: 60,
        startDate: '2025.02.15',
        endDate: '2025.03.15',
        isOngoing: true,
      },
      {
        challengeTitle: '하루 물 2L 마시기',
        challengeCategory: '건강',
        challengeType: '루틴형',
        challengeIcon: <Target />,
        imageUrl: '',
        currentUserCount: 23,
        maxUserCount: 40,
        startDate: '2025.05.01',
        endDate: '2025.05.31',
        isOngoing: true,
      },
      {
        challengeTitle: '주 3회 홈트 달성',
        challengeCategory: '운동',
        challengeType: '자율형',
        challengeIcon: <Trophy />,
        imageUrl:
          'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
        currentUserCount: 8,
        maxUserCount: 20,
        startDate: '2025.06.01',
        endDate: '2025.06.30',
        isOngoing: false,
        isEnded: true,
      },
      {
        challengeTitle: '프로젝트 회고 작성',
        challengeCategory: '커리어',
        challengeType: '인증형',
        challengeIcon: <Flag />,
        currentUserCount: 29,
        maxUserCount: 50,
        startDate: '2025.03.20',
        endDate: '2025.04.20',
        isOngoing: true,
      },
    ];

    return (
      <div className="w-full max-w-[1080px] bg-gray-100 p-4">
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card) => (
            <ChallengeCard key={card.challengeTitle} {...card} />
          ))}
        </div>
      </div>
    );
  },
};

export const ChallengeIcons: Story = {
  render: () => {
    const icons = [
      { name: 'Dumbbell', icon: <Dumbbell /> },
      { name: 'Laptop', icon: <Laptop /> },
      { name: 'Flame', icon: <Flame /> },
      { name: 'Target', icon: <Target /> },
      { name: 'Trophy', icon: <Trophy /> },
      { name: 'Flag', icon: <Flag /> },
    ];

    return (
      <div className="grid grid-cols-3 gap-3 bg-gray-100 p-4">
        {icons.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center gap-2 rounded-3 border border-gray-200 bg-white p-4 text-blue-500"
          >
            <span className="[&>svg]:h-8 [&>svg]:w-8">{item.icon}</span>
            <span className="text-xs text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    );
  },
};
