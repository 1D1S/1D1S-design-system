import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-3">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

const baseArgs = {
  brandName: '1D1S',
  activeKey: 'challenge',
  navItems: [
    { key: 'home', label: '홈' },
    { key: 'explore', label: '탐색' },
    { key: 'challenge', label: '챌린지' },
    { key: 'diary', label: '일지' },
  ],
};

export const WithProfile: Story = {
  args: {
    ...baseArgs,
    showProfile: true,
    profileImage: '/DefaultProfile.png',
  },
};

export const WithoutProfile: Story = {
  args: {
    ...baseArgs,
    showProfile: false,
  },
};
