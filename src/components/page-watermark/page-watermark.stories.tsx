import type { Meta, StoryObj } from '@storybook/react';
import { PageWatermark } from './page-watermark';

const meta: Meta<typeof PageWatermark> = {
  title: 'PageWatermark',
  component: PageWatermark,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageWatermark>;

export const Default: Story = {};
