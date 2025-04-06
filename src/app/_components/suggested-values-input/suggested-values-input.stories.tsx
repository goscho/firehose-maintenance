import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import SuggestedValuesInput from "./suggested-values-input";

const meta = {
  component: SuggestedValuesInput,
} satisfies Meta<typeof SuggestedValuesInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onValueChange: fn(),
    suggestedValues: ["Einband undicht", "Loch im Schlauch", "aufgeplatzt"],
  },
};
