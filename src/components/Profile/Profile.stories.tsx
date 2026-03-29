import type { Meta, StoryObj } from '@storybook/react-vite';
import { Profile } from './Profile';

const meta: Meta<typeof Profile> = {
  title: 'Display/Profile',
  component: Profile,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-start gap-6 bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Default: Story = {
  args: {
    nickname: '홍길동',
    size: 'md',
    layout: 'horizontal',
  },
};

export const WithStatus: Story = {
  args: {
    nickname: '홍길동',
    statusText: '온라인',
    size: 'md',
    layout: 'horizontal',
  },
};

export const WithImage: Story = {
  args: {
    nickname: '홍길동',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    size: 'md',
    layout: 'horizontal',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Profile nickname="작은 프로필" size="sm" />
      <Profile nickname="중간 프로필" size="md" />
      <Profile nickname="큰 프로필" size="lg" />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    nickname: '홍길동',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    size: 'lg',
    layout: 'vertical',
  },
};

export const VerticalWithStatus: Story = {
  args: {
    nickname: '홍길동',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    statusText: '챌린지 3개 진행 중',
    size: 'lg',
    layout: 'vertical',
  },
};

export const Clickable: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Profile
        nickname="홍길동"
        imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
        statusText="온라인"
        size="md"
        layout="horizontal"
        onClick={() => alert('프로필 클릭')}
      />
      <Profile
        nickname="홍길동"
        imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
        statusText="챌린지 3개 진행 중"
        size="lg"
        layout="vertical"
        onClick={() => alert('프로필 클릭')}
      />
    </div>
  ),
};
