import type { Meta, StoryObj } from '@storybook/react';
import { Spacing } from './spacing';

const meta: Meta<typeof Spacing> = {
  title: 'Spacing',
  component: Spacing,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="border border-red-500">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Spacing>;

export const Default: Story = {
  args: {
    className: 'h-10',
  },
};
