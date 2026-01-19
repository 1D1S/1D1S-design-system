import type { Meta, StoryObj } from '@storybook/react';
import { GlobalChrome } from './global-chrome';

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

export const Default: Story = {};

export const BackOnly: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/auth/login',
      },
    },
  },
};
