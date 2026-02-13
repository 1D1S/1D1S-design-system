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

export const Default: Story = {
  args: {
    brandName: '1D1S',
    activeKey: 'challenge',
    navItems: [
      { key: 'home', label: '홈' },
      { key: 'explore', label: '탐색' },
      { key: 'challenge', label: '챌린지' },
      { key: 'diary', label: '일지' },
    ],
    profileImage: '/DefaultProfile.png',
  },
};
