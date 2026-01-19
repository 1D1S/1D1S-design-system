import type { Meta, StoryObj } from '@storybook/react';
import { UserListItem } from './user-list-item';

const meta: Meta<typeof UserListItem> = {
  title: 'UserListItem',
  component: UserListItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserListItem>;

export const Default: Story = {
  args: {
    userName: 'Jane Doe',
    isAuthor: false,
    className: 'w-[300px]',
  },
};

export const Author: Story = {
  args: {
    userName: 'John Smith',
    isAuthor: true,
    className: 'w-[300px]',
  },
};
