import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { DropdownMenu } from "./DropdownMenu";
import { MultiSelect } from "./MultiSelect";

const meta: Meta<typeof Dropdown> = {
  title: "Form/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    open: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = { args: { value: "인기순" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Dropdown size="sm" value="최신순" />
      <Dropdown size="md" value="인기순" />
      <Dropdown size="lg" value="달성률 높은순" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex items-start gap-3">
      <Dropdown label="기본" placeholder="카테고리 선택" />
      <Dropdown label="선택됨" value="운동" />
      <Dropdown label="열림 (focus)" value="운동" open />
      <Dropdown label="비활성" value="수정 불가" disabled />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [val, setVal] = useState<string | undefined>();
    const items = [
      { value: "all", label: "전체" },
      { value: "exercise", label: "운동" },
      { value: "reading", label: "독서" },
      { value: "health", label: "건강" },
      { value: "study", label: "학습" },
      { value: "hobby", label: "취미" },
    ];
    const labelByValue = Object.fromEntries(items.map((i) => [i.value, i.label]));
    return (
      <div className="relative w-60">
        <Dropdown
          full
          open={open}
          value={val ? (labelByValue[val] as string) : undefined}
          placeholder="카테고리 선택"
          onClick={() => setOpen((o) => !o)}
        />
        <div className="absolute top-full left-0 z-10 mt-1.5 w-full">
          <DropdownMenu
            open={open}
            items={items}
            value={val}
            onSelect={(v) => {
              setVal(v);
              setOpen(false);
            }}
            width="100%"
          />
        </div>
      </div>
    );
  },
};

export const MenuOnly: Story = {
  render: () => (
    <DropdownMenu
      width={200}
      value="popular"
      onSelect={() => undefined}
      items={[
        { value: "recent", label: "최신순" },
        { value: "popular", label: "인기순" },
        { value: "rate", label: "달성률 높은순" },
        { value: "deadline", label: "마감 임박순" },
      ]}
    />
  ),
};

export const Multi: Story = {
  render: () => {
    const [tags, setTags] = useState(["운동", "건강"]);
    return (
      <MultiSelect
        selected={tags}
        placeholder={`${tags.length}/8 선택됨 — 추가하기`}
        onRemove={(v) => setTags(tags.filter((t) => t !== v))}
        onAddClick={() => undefined}
      />
    );
  },
};
