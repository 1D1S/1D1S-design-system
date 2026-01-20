import type { Meta, StoryObj } from '@storybook/react';
import { InfoButton } from './InfoButton';

const meta: Meta<typeof InfoButton> = {
  title: 'InfoButton',
  component: InfoButton,
  tags: ['autodocs'],
  argTypes: {
    gradientFrom: { control: 'color' },
    gradientTo: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof InfoButton>;

export const Default: Story = {
  args: {
    mainText: 'Main Text',
    subText: 'Sub Text',
    imageSrc: '/DefaultProfile.png',
    gradientFrom: '#FF5F6D',
    gradientTo: '#FFC371',
  },
};
