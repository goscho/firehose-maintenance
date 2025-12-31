import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Numpad from "./index";
import { fn } from "storybook/test";

const meta = {
  component: Numpad,
  args: {
    initialValue: "",
    onValueChange: fn(),
  },
} satisfies Meta<typeof Numpad>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
