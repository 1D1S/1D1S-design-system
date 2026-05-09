import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { BottomNav } from "./BottomNav";
import { Home } from "../Icons/Home";
import { LayoutGrid } from "../Icons/LayoutGrid";
import { BookOpen } from "../Icons/BookOpen";
import { Person } from "../Icons/Person";

const meta: Meta<typeof BottomNav> = {
  title: "Navigation/BottomNav",
  component: BottomNav,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[360px] h-[420px] flex flex-col bg-white border border-gray-200 rounded-3 overflow-hidden">
        <div className="flex-1 bg-gray-50 p-4 text-xs text-gray-500">
          (페이지 콘텐츠)
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  render: () => {
    const [tab, setTab] = useState("home");
    return (
      <BottomNav
        activeId={tab}
        onChange={setTab}
        items={[
          { id: "home", icon: <Home width={20} height={20} />, label: "홈" },
          { id: "challenge", icon: <LayoutGrid width={20} height={20} />, label: "챌린지" },
          { id: "diary", icon: <BookOpen width={20} height={20} />, label: "일지" },
          { id: "mypage", icon: <Person width={20} height={20} />, label: "마이" },
        ]}
      />
    );
  },
};

export const ActiveStrokeBoost: Story = {
  render: () => {
    const [tab, setTab] = useState("home");
    return (
      <BottomNav
        activeId={tab}
        onChange={setTab}
        items={[
          {
            id: "home",
            icon: (a) => <Home width={20} height={20} strokeWidth={a ? 2.4 : 1.8} />,
            label: "홈",
          },
          {
            id: "challenge",
            icon: (a) => <LayoutGrid width={20} height={20} strokeWidth={a ? 2.4 : 1.8} />,
            label: "챌린지",
          },
          {
            id: "diary",
            icon: (a) => <BookOpen width={20} height={20} strokeWidth={a ? 2.4 : 1.8} />,
            label: "일지",
          },
          {
            id: "mypage",
            icon: (a) => <Person width={20} height={20} strokeWidth={a ? 2.4 : 1.8} />,
            label: "마이",
          },
        ]}
      />
    );
  },
};
