import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectSeparator,
} from './Dropdown';

const meta: Meta<typeof Select> = {
  title: 'Dropdown',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[640px]">
        <SelectValue placeholder="DD" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>카테고리</SelectLabel>
          <SelectItem value="dev">개발</SelectItem>
          <SelectItem value="health">건강</SelectItem>
          <SelectItem value="study">공부</SelectItem>
          <SelectItem value="finance">재테크</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>상태</SelectLabel>
          <SelectItem value="ongoing">진행중</SelectItem>
          <SelectItem value="ready">모집중</SelectItem>
          <SelectItem value="end" disabled>
            종료됨
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm" className="w-[220px]">
        <SelectValue placeholder="옵션 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="a">옵션 A</SelectItem>
          <SelectItem value="b">옵션 B</SelectItem>
          <SelectItem value="c">옵션 C</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
