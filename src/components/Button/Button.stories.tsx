import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronLeft, ChevronRight, Plus } from '../Icons';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Form/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'soft', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'icon'],
    },
    pill: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: '참여하기' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Button size="xs">참여</Button>
      <Button size="sm">참여하기</Button>
      <Button size="md">참여하기</Button>
      <Button size="lg">참여하기</Button>
      <Button size="xl">참여하기</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button iconLeft={<Plus className="h-4 w-4" />}>새 챌린지</Button>
      <Button variant="soft" iconLeft={<Plus className="h-4 w-4" />}>참여하기</Button>
      <Button variant="ghost" iconRight={<ChevronRight className="h-4 w-4" />}>다음</Button>
    </div>
  ),
};

export const Pill: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="primary" pill>+ 팔로우</Button>
      <Button variant="secondary" pill iconLeft={<Plus className="h-3.5 w-3.5" />}>24</Button>
      <Button variant="soft" pill size="sm">완료</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-80 flex flex-col gap-2">
      <Button fullWidth>챌린지 참여하기</Button>
      <Button fullWidth variant="secondary">취소</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon" variant="secondary"><ChevronLeft className="h-5 w-5" /></Button>
      <Button size="icon" variant="ghost"><ChevronRight className="h-5 w-5" /></Button>
      <Button size="icon" variant="soft"><Plus className="h-5 w-5" /></Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', children: 'Disabled', disabled: true },
};
