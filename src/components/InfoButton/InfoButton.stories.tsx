import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const MobileGrid: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-2 p-4">
      <InfoButton
        mainText="이번 주"
        subText="챌린지"
        imageSrc="/DefaultProfile.png"
        gradientFrom="#FF5F6D"
        gradientTo="#FFC371"
      />
      <InfoButton
        mainText="오늘의"
        subText="일지"
        imageSrc="/DefaultProfile.png"
        gradientFrom="#4facfe"
        gradientTo="#00f2fe"
      />
      <InfoButton
        mainText="나의"
        subText="목표"
        imageSrc="/DefaultProfile.png"
        gradientFrom="#43e97b"
        gradientTo="#38f9d7"
      />
    </div>
  ),
};

export const TabletGrid: Story = {
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-3 p-4">
      <InfoButton
        mainText="이번 주"
        subText="챌린지"
        imageSrc="/DefaultProfile.png"
        gradientFrom="#FF5F6D"
        gradientTo="#FFC371"
      />
      <InfoButton
        mainText="오늘의"
        subText="일지"
        imageSrc="/DefaultProfile.png"
        gradientFrom="#4facfe"
        gradientTo="#00f2fe"
      />
      <InfoButton
        mainText="나의"
        subText="목표"
        imageSrc="/DefaultProfile.png"
        gradientFrom="#43e97b"
        gradientTo="#38f9d7"
      />
    </div>
  ),
};

export const DesktopGrid: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <InfoButton
        mainText="이번 주"
        subText="챌린지"
        imageSrc="/DefaultProfile.png"
        gradientFrom="#FF5F6D"
        gradientTo="#FFC371"
      />
      <InfoButton
        mainText="오늘의"
        subText="일지"
        imageSrc="/DefaultProfile.png"
        gradientFrom="#4facfe"
        gradientTo="#00f2fe"
      />
      <InfoButton
        mainText="나의"
        subText="목표"
        imageSrc="/DefaultProfile.png"
        gradientFrom="#43e97b"
        gradientTo="#38f9d7"
      />
    </div>
  ),
};
