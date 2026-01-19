import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './profile-card';

const meta: Meta<typeof ProfileCard> = {
  title: 'ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {};

export const Expanded: Story = {
  args: {
    initialMode: 'expanded',
  },
};
