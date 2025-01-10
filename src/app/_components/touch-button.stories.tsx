import type { Meta, StoryObj } from "@storybook/react";

import TouchButton from "./touch-button";
import { fn } from "@storybook/test";

const meta = {
  component: TouchButton,
  args: { onClick: fn() },
} satisfies Meta<typeof TouchButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "TouchButton",
    primary: true,
  },
};
export const Secondary: Story = {
  args: {
    label: "TouchButton",
    primary: false,
  },
};
