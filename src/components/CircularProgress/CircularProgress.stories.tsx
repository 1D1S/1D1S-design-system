import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from './CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    showPercentage: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  args: {
    value: 80,
    size: 'sm',
    showPercentage: true,
  },
};

export const Large: Story = {
  args: {
    value: 80,
    size: 'lg',
    showPercentage: true,
  },
};

export const ExtraLarge: Story = {
  args: {
    value: 80,
    size: 'lg',
    showPercentage: true,
  },
};
