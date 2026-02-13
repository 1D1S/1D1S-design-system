import type { Meta, StoryObj } from "@storybook/react";
import { Dumbbell, Plane } from "lucide-react";
import { CheckContainer } from "./CheckContainer";
import { Text } from "../Text";

const meta: Meta<typeof CheckContainer> = {
  title: "CheckContainer",
  component: CheckContainer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CheckContainer>;

export const WithIndicator: Story = {
  args: {
    label: "운동",
    icon: <Dumbbell />,
    checked: true,
    showCheckIndicator: true,
    width: 520,
    height: 320,
  },
};

export const WithoutIndicator: Story = {
  args: {
    label: "여가",
    icon: <Plane />,
    checked: false,
    showCheckIndicator: false,
    width: 520,
    height: 320,
  },
};

export const CustomSize: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <CheckContainer
        label="작은 카드"
        icon={<Plane />}
        checked={false}
        showCheckIndicator={false}
        width={220}
        height={140}
      />
      <CheckContainer
        label="중간 카드"
        icon={<Dumbbell />}
        checked
        width={320}
        height={200}
      />
      <CheckContainer
        label="큰 카드"
        icon={<Dumbbell />}
        checked
        width={520}
        height={320}
      />
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <CheckContainer
      checked
      width={520}
      height={320}
      showCheckIndicator
      aria-label="커스텀 콘텐츠 카드"
    >
      <div className="flex flex-col items-center gap-3">
        <Text size="caption1" weight="medium" className="text-gray-600">
          커스텀 콘텐츠
        </Text>
        <Text size="display2" weight="bold" className="text-gray-800">
          12
        </Text>
        <Text size="body2" weight="medium" className="text-gray-600">
          Days
        </Text>
      </div>
    </CheckContainer>
  ),
};
