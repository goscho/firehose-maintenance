import type { Meta, StoryObj } from "@storybook/nextjs";

import NewHoseForm from "./new-hose-form";
import { fn } from "storybook/test";

const meta = {
  component: NewHoseForm,
  args: {
    onSubmit: fn(),
    onCancel: fn(),
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NewHoseForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// This story demonstrates how the component would look with a custom className
export const WithCustomStyling: Story = {
  args: {
    className: "bg-gray-100 p-8 rounded-lg shadow-md",
  },
};
