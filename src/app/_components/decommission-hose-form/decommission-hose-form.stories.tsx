import type { Meta, StoryObj } from "@storybook/nextjs";
import DecommissionHoseForm from "./decommission-hose-form";
import { FireHose } from "@/lib/types";
import { fn } from "storybook/test";

const meta = {
  component: DecommissionHoseForm,
  argTypes: {
    onCancel: fn(),
    onDecommission: fn(),
  },
} satisfies Meta<typeof DecommissionHoseForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockFirehose: FireHose = {
  id: "1",
  number: 123,
  owner: {
    id: "owner1",
    name: "Feuerwehr Muster",
    marker: "FM",
  },
  length: 20,
  diameter: "B",
  commissionedAt: new Date("2020-01-15"),
  decommissionedAt: null,
  maintenances: [],
};

export const Default: Story = {
  args: {
    firehose: mockFirehose,
    onDecommission: fn(),
    onCancel: fn(),
  },
};
