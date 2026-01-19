import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from './circular-progress';

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
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['red', 'blue', 'green'],
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
    value: 75,
    size: 'md',
    color: 'red',
    showPercentage: true,
  },
};

export const Blue: Story = {
  args: {
    value: 50,
    size: 'lg',
    color: 'blue',
    showPercentage: true,
  },
};

export const Green: Story = {
  args: {
    value: 90,
    size: 'xl',
    color: 'green',
    showPercentage: false,
  },
};
