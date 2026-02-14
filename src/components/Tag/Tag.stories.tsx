import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
    },
    weight: {
      control: 'select',
      options: ['bold', 'medium', 'regular', 'light'],
    },
    size: {
        control: 'select',
        options: ['caption3', 'caption2', 'caption1', 'body2', 'body1'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Tag',
  },
};

export const WithIcon: Story = {
  args: {
    icon: '🔥',
    children: 'Popular',
  },
};

export const CustomWeight: Story = {
  args: {
    weight: 'light',
    children: 'Light Weight',
  },
};
