import type { Meta, StoryObj } from '@storybook/react';
import { BookOpen, Code2, Dumbbell, Palette, Salad } from 'lucide-react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    pressed: { control: 'boolean' },
    onPressedChange: { action: 'pressed changed' },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const RoundedSelected: Story = {
  args: {
    shape: 'rounded',
    pressed: true,
    icon: <Code2 />,
    children: 'Development',
  },
};

export const SquareSelected: Story = {
  args: {
    shape: 'square',
    pressed: true,
    children: '전체',
  },
};

export const RowPreview: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Toggle shape="square" pressed>
        전체
      </Toggle>
      <Toggle shape="square" icon="💻">
        개발
      </Toggle>
      <Toggle shape="square" icon="💪">
        운동
      </Toggle>
      <Toggle shape="square" icon="📚">
        독서
      </Toggle>
      <Toggle shape="square" icon="🎨">
        디자인
      </Toggle>
      <Toggle shape="square" icon="🥗">
        식단
      </Toggle>
    </div>
  ),
};

export const RoundedRowPreview: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Toggle shape="rounded" icon={<Code2 />} pressed>
        Development
      </Toggle>
      <Toggle shape="rounded" icon={<Dumbbell />}>
        Exercise
      </Toggle>
      <Toggle shape="rounded" icon={<BookOpen />}>
        Reading
      </Toggle>
      <Toggle shape="rounded" icon={<Palette />}>
        Design
      </Toggle>
      <Toggle shape="rounded" icon={<Salad />}>
        Lifestyle
      </Toggle>
    </div>
  ),
};

export const CustomSizeByClassName: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Toggle shape="rounded" className="h-12 w-52" icon={<Code2 />} pressed>
        Custom Rounded
      </Toggle>
      <Toggle shape="square" className="h-14 w-40" icon="💪">
        Custom Square
      </Toggle>
    </div>
  ),
};
