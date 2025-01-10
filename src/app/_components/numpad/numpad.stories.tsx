import type { Meta, StoryObj } from "@storybook/react";

import Numpad from "./index";
import { fn } from "@storybook/test";

const meta = {
  component: Numpad,
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Numpad>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
