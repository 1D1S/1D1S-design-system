import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
    },
    pressed: {
      control: 'boolean',
    },
    onPressedChange: { action: 'pressed changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: 'Toggle Me',
  },
};

export const WithIcon: Story = {
  args: {
    icon: '🔥',
    children: 'Popular',
  },
};
