import type { Meta, StoryObj } from '@storybook/react';
import { ChevronLeft } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'large',
    children: 'Large Button',
  },
};

export const Medium: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    children: 'Medium Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'small',
    children: 'Small Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'large',
    children: 'Outline Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'large',
    children: 'Ghost Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'large',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Icon: Story = {
  args: {
    variant: 'outlined',
    size: 'icon',
    children: <ChevronLeft className="h-5 w-5" />,
  },
};
