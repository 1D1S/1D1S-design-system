import type { Meta, StoryObj } from '@storybook/react';
import { CircleAvatar } from './circle-avatar';

const meta: Meta<typeof CircleAvatar> = {
  title: 'CircleAvatar',
  component: CircleAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CircleAvatar>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    imageUrl: 'https://github.com/shadcn.png',
    size: 'lg',
  },
};
