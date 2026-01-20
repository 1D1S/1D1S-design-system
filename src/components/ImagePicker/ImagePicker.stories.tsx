import type { Meta, StoryObj } from '@storybook/react';
import { ImagePicker } from './ImagePicker';

const meta: Meta<typeof ImagePicker> = {
  title: 'ImagePicker',
  component: ImagePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImagePicker>;

export const Default: Story = {};
