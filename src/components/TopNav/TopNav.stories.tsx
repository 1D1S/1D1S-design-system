import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TopNav } from "./TopNav";
import { TextField } from "../TextField";
import { CircleAvatar } from "../CircleAvatar";
import { Search } from "../Icons/Search";
import { Bell } from "../Icons/Bell";

const meta: Meta<typeof TopNav> = {
  title: "Navigation/TopNav",
  component: TopNav,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[960px] overflow-hidden rounded-3 border border-gray-200">
        <Story />
        <div className="h-32 bg-gray-50 p-4 text-xs text-gray-500">
          (페이지 콘텐츠)
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TopNav>;

const NAV_ITEMS = [
  { id: "home", label: "홈" },
  { id: "challenge", label: "챌린지" },
  { id: "diary", label: "일지" },
  { id: "mypage", label: "마이페이지" },
];

export const Default: Story = {
  render: () => {
    const [tab, setTab] = useState("home");
    return (
      <TopNav
        brand={<TopNav.Brand letters="1D" name="1Day 1Streak" />}
        items={NAV_ITEMS}
        activeId={tab}
        onChange={setTab}
        end={
          <>
            <div className="w-[260px]">
              <TextField
                size="sm"
                placeholder="챌린지·일지 검색"
                iconLeft={<Search width={14} height={14} />}
              />
            </div>
            <button className="grid h-[34px] w-[34px] place-items-center rounded-2 bg-gray-100 hover:bg-gray-200">
              <Bell width={16} height={16} className="text-gray-700" />
            </button>
            <CircleAvatar size="sm" tone="peach" ring />
          </>
        }
      />
    );
  },
};

export const Compact: Story = {
  render: () => {
    const [tab, setTab] = useState("home");
    return (
      <TopNav
        compact
        brand={<TopNav.Brand letters="1D" name="1Day 1Streak" />}
        items={NAV_ITEMS}
        activeId={tab}
        onChange={setTab}
        end={
          <>
            <button className="grid h-[34px] w-[34px] place-items-center rounded-2 bg-gray-100 hover:bg-gray-200">
              <Search width={16} height={16} className="text-gray-700" />
            </button>
            <button className="grid h-[34px] w-[34px] place-items-center rounded-2 bg-gray-100 hover:bg-gray-200">
              <Bell width={16} height={16} className="text-gray-700" />
            </button>
            <CircleAvatar size="sm" tone="peach" ring />
          </>
        }
      />
    );
  },
};

export const WithoutEnd: Story = {
  render: () => {
    const [tab, setTab] = useState("home");
    return (
      <TopNav
        brand={<TopNav.Brand letters="1D" name="1Day 1Streak" />}
        items={NAV_ITEMS}
        activeId={tab}
        onChange={setTab}
      />
    );
  },
};
