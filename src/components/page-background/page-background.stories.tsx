import type { Meta, StoryObj } from '@storybook/react';
import { PageBackground } from './page-background';

const meta: Meta<typeof PageBackground> = {
  title: 'PageBackground',
  component: PageBackground,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageBackground>;

export const Default: Story = {
  args: {
    children: <div className="p-10">Page Content</div>,
    className: 'min-h-[500px]',
  },
};
