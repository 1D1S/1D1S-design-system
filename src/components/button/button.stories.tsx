import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'disabled', 'warning', 'loading', 'outline'],
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    children: 'Large Button',
  },
};

export const Medium: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: 'Medium Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'lg',
    children: 'Outline Button',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    size: 'lg',
    children: 'Warning Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    size: 'lg',
    children: 'Disabled Button',
    disabled: true,
  },
};