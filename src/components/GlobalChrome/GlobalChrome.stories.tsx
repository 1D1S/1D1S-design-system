import type { Meta, StoryObj } from '@storybook/react';
import { GlobalChrome } from './GlobalChrome';

const meta: Meta<typeof GlobalChrome> = {
  title: 'GlobalChrome',
  component: GlobalChrome,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlobalChrome>;

export const Default: Story = {
  args: {
    pathname: '/',
  },
};

export const BackOnly: Story = {
  args: {
    pathname: '/auth/login',
  },
};
