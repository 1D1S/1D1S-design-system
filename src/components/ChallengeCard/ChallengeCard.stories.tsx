import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeCard } from './ChallengeCard';

const meta: Meta<typeof ChallengeCard> = {
  title: 'ChallengeCard',
  component: ChallengeCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChallengeCard>;

export const Default: Story = {
  args: {
    challengeTitle: 'Daily Coding Challenge',
    challengeType: 'Fixed Goal',
    currentUserCount: 12,
    maxUserCount: 20,
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    isOngoing: true,
  },
};

export const Recruiting: Story = {
  args: {
    challengeTitle: 'Morning Yoga',
    challengeType: 'Routine',
    currentUserCount: 5,
    maxUserCount: 15,
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    isOngoing: false,
  },
};
