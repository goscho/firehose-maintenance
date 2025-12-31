import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MaintainHoseForm from "./maintain-hose-form";
import { fn } from "storybook/test";
import { FireHose } from "@/lib/types";

const mockFirehose: FireHose = {
  id: "1",
  number: 123,
  owner: { id: "owner1", name: "Feuerwehr Muster", marker: "BK-31" },
  length: 20,
  diameter: "B",
  commissionedAt: new Date("2020-01-15"),
  decommissionedAt: null,
  maintenances: [],
};

const meta = {
  component: MaintainHoseForm,
  args: {
    onCheckSuccess: fn(),
    onCheckFailed: fn(),
  },
} satisfies Meta<typeof MaintainHoseForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defectDescriptions: ["Einband defekt", "Loch im Schlauch", "..."],
    firehose: mockFirehose,
  },
};
