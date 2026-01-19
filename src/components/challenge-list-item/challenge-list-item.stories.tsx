import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeListItem } from './challenge-list-item';

const meta: Meta<typeof ChallengeListItem> = {
  title: 'ChallengeListItem',
  component: ChallengeListItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChallengeListItem>;

export const Default: Story = {
  args: {
    challengeName: 'My Awesome Challenge',
    startDate: '2023-01-01',
    endDate: '2023-01-31',
    maxParticipants: 30,
    currentParticipants: 15,
  },
};
