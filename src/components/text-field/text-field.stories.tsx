import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './text-field';

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot type here',
    disabled: true,
  },
};
