import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './text-area';

const meta: Meta<typeof TextArea> = {
  title: 'TextArea',
  component: TextArea,
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
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Enter bio...',
    value: 'Too long...',
    error: 'Bio must be under 100 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Area',
    placeholder: 'Cannot type here',
    disabled: true,
  },
};
