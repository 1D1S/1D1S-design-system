import type { Meta, StoryObj } from '@storybook/react';
import { DiaryCard } from './DiaryCard';

const meta: Meta<typeof DiaryCard> = {
  title: 'DiaryCard',
  component: DiaryCard,
  tags: ['autodocs'],
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
    title: 'My Diary Entry',
    user: 'John Doe',
    challengeLabel: '100 Days of Code',
    challengeUrl: '#',
    date: '2023-10-27',
    percent: 85,
    likes: 42,
    emotion: 'happy',
  },
};
