import type { Meta, StoryObj } from '@storybook/react-vite';
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
  argTypes: {
    showBackButton: { control: 'boolean' },
    onBackClick: { action: 'back clicked' },
    onLogoClick: { action: 'logo clicked' },
    onNavChange: { action: 'nav changed' },
    onNotificationClick: { action: 'notification clicked' },
    onProfileClick: { action: 'profile clicked' },
  },
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

export const WithBackButton: Story = {
  args: {
    ...baseArgs,
    showProfile: true,
    profileImage: '/DefaultProfile.png',
    showBackButton: true,
    onBackClick: () => alert('뒤로가기'),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const Mobile: Story = {
  args: {
    ...baseArgs,
    showProfile: true,
    profileImage: '/DefaultProfile.png',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

