import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Flame, Flag } from '../Icons';
import { Tag } from './Tag';
import { FilterChip } from './FilterChip';

const meta: Meta<typeof Tag> = {
  title: 'Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['gray', 'brand', 'mint', 'blue', 'red', 'green'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    pill: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: { tone: 'brand', size: 'md', children: '운동' },
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-2 flex-wrap">
      <Tag tone="gray">개인</Tag>
      <Tag tone="brand">운동</Tag>
      <Tag tone="mint">독서</Tag>
      <Tag tone="blue">건강</Tag>
      <Tag tone="red">긴급</Tag>
      <Tag tone="green">성장</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag tone="brand" size="xs">xs</Tag>
      <Tag tone="brand" size="sm">sm</Tag>
      <Tag tone="brand" size="md">md</Tag>
      <Tag tone="brand" size="lg">lg</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2 flex-wrap">
      <Tag tone="brand" icon={<Flag className="h-3 w-3" />}>아침 30분 러닝하기</Tag>
      <Tag tone="brand" icon="🔥">14일 연속</Tag>
      <Tag tone="mint" size="sm" icon={<Flame className="h-2.5 w-2.5" />}>HOT</Tag>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag tone="brand" pill={false}>운동</Tag>
      <Tag tone="gray" pill={false}>개인</Tag>
    </div>
  ),
};

export const FilterChips: StoryObj<typeof FilterChip> = {
  render: () => {
    const [active, setActive] = useState('전체');
    const cats = ['전체', '운동', '독서', '건강', '학습', '취미'];
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {cats.map((c) => (
          <FilterChip key={c} active={active === c} onClick={() => setActive(c)}>
            {c}
          </FilterChip>
        ))}
      </div>
    );
  },
};

export const FilterChipSizes: StoryObj<typeof FilterChip> = {
  render: () => (
    <div className="flex items-center gap-3">
      <FilterChip size="sm" active>전체</FilterChip>
      <FilterChip size="md" active>전체</FilterChip>
      <FilterChip size="lg" active>전체</FilterChip>
    </div>
  ),
};
