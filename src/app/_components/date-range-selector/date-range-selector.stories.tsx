import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import DateRangeSelector from "./index";

const meta = {
  component: DateRangeSelector,
  args: {
    onRangeChange: fn(),
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DateRangeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LastYear: Story = {
  args: {
    initialPreset: "lastYear",
  },
};

export const ThisYear: Story = {
  args: {
    initialPreset: "thisYear",
  },
};

export const CustomRange: Story = {
  args: {
    initialPreset: "custom",
    initialStartDate: new Date("2025-01-01"),
    initialEndDate: new Date("2025-06-30"),
  },
};
