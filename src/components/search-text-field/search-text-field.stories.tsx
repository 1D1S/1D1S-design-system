import type { Meta, StoryObj } from '@storybook/react';
import { SearchTextField } from './search-text-field';

const meta: Meta<typeof SearchTextField> = {
  title: 'SearchTextField',
  component: SearchTextField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchTextField>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};
