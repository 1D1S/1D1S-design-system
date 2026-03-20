import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen, Code2, Dumbbell, Palette, Salad } from '../Icons';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  title: 'ToggleGroup',
  component: ToggleGroup,
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
type Story = StoryObj<typeof ToggleGroup>;

export const SquareSingle: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="all">
      <ToggleGroupItem shape="square" value="all">
        전체
      </ToggleGroupItem>
      <ToggleGroupItem shape="square" value="dev" icon="💻">
        개발
      </ToggleGroupItem>
      <ToggleGroupItem shape="square" value="exercise" icon="💪">
        운동
      </ToggleGroupItem>
      <ToggleGroupItem shape="square" value="reading" icon="📚">
        독서
      </ToggleGroupItem>
      <ToggleGroupItem shape="square" value="design" icon="🎨">
        디자인
      </ToggleGroupItem>
      <ToggleGroupItem shape="square" value="diet" icon="🥗">
        식단
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const RoundedSingle: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="dev">
      <ToggleGroupItem shape="rounded" value="dev" icon={<Code2 />}>
        Development
      </ToggleGroupItem>
      <ToggleGroupItem shape="rounded" value="exercise" icon={<Dumbbell />}>
        Exercise
      </ToggleGroupItem>
      <ToggleGroupItem shape="rounded" value="reading" icon={<BookOpen />}>
        Reading
      </ToggleGroupItem>
      <ToggleGroupItem shape="rounded" value="design" icon={<Palette />}>
        Design
      </ToggleGroupItem>
      <ToggleGroupItem shape="rounded" value="lifestyle" icon={<Salad />}>
        Lifestyle
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const RoundedMultiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['dev', 'reading']}>
      <ToggleGroupItem shape="rounded" value="dev" icon={<Code2 />}>
        Development
      </ToggleGroupItem>
      <ToggleGroupItem shape="rounded" value="exercise" icon={<Dumbbell />}>
        Exercise
      </ToggleGroupItem>
      <ToggleGroupItem shape="rounded" value="reading" icon={<BookOpen />}>
        Reading
      </ToggleGroupItem>
      <ToggleGroupItem shape="rounded" value="design" icon={<Palette />}>
        Design
      </ToggleGroupItem>
      <ToggleGroupItem shape="rounded" value="lifestyle" icon={<Salad />}>
        Lifestyle
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
