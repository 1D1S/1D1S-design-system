import type { Meta, StoryObj } from '@storybook/react';
import { UserListItem } from './UserListItem';

const meta: Meta<typeof UserListItem> = {
  title: 'UserListItem',
  component: UserListItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserListItem>;

export const Default: Story = {
  args: {
    userName: 'Runner_Lee',
    timeLabel: '1일 전',
    isAuthor: false,
    className: 'w-[520px] max-w-full',
  },
};

export const Author: Story = {
  args: {
    userName: 'Runner_Lee',
    timeLabel: '1일 전',
    isAuthor: true,
    className: 'w-[520px] max-w-full',
  },
};
