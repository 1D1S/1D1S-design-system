import type { Meta, StoryObj } from '@storybook/react';
import { BackButton } from './back-button';

const meta: Meta<typeof BackButton> = {
  title: 'BackButton',
  component: BackButton,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {};
