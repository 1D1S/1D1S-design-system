import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarImagePicker } from './AvatarImagePicker';

const meta: Meta<typeof AvatarImagePicker> = {
  title: 'Form/AvatarImagePicker',
  component: AvatarImagePicker,
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
type Story = StoryObj<typeof AvatarImagePicker>;

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
