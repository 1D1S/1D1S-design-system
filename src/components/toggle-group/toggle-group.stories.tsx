import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const meta: Meta<typeof ToggleGroup> = {
  title: 'ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="1">
      <ToggleGroupItem value="1" icon="🔥">
        Popular
      </ToggleGroupItem>
      <ToggleGroupItem value="2" icon="⭐">
        Recommended
      </ToggleGroupItem>
      <ToggleGroupItem value="3" icon="💬">
        Discussion
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['1']}>
      <ToggleGroupItem value="1" icon="🔥">
        Popular
      </ToggleGroupItem>
      <ToggleGroupItem value="2" icon="⭐">
        Recommended
      </ToggleGroupItem>
      <ToggleGroupItem value="3" icon="💬">
        Discussion
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
