import type { Meta, StoryObj } from '@storybook/react';
import { ImagePicker } from './ImagePicker';

const meta: Meta<typeof ImagePicker> = {
  title: 'ImagePicker',
  component: ImagePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImagePicker>;

export const Default: Story = {
  args: {
    size: 300,
    changeLabel: 'Change',
  },
};

export const WithImage: Story = {
  args: {
    size: 300,
    changeLabel: 'Change',
    defaultImageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  },
};
