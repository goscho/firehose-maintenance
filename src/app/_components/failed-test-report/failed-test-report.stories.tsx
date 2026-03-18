import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import FailedTestReport from "./index";
import { FireHose, Maintenance, Owner } from "@/lib/types";

const meta = {
  component: FailedTestReport,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FailedTestReport>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockOwner: Owner = {
  id: "owner1",
  name: "FF Murrhardt",
  marker: "BK-31",
};

const createMaintenance = (
  id: string,
  passed: boolean,
  description: string | null,
  daysAgo: number,
): Maintenance => ({
  id,
  timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
  testPassed: passed,
  failureDescription: description,
  fireHoseId: "hose1",
});

const createHose = (
  id: string,
  number: number,
  diameter: "A" | "B" | "C" | "D",
  length: number,
  maintenances: Maintenance[],
): FireHose => ({
  id,
  number,
  owner: mockOwner,
  length,
  diameter,
  commissionedAt: new Date("2018-01-15"),
  decommissionedAt: null,
  maintenances,
});

const mockHoses: FireHose[] = [
  createHose("h1", 101, "C", 15, [
    createMaintenance("m1", false, "Loch im Schlauch", 5),
    createMaintenance("m2", true, null, 120),
  ]),
  createHose("h2", 102, "C", 15, [
    createMaintenance("m3", false, "Einband defekt", 10),
  ]),
  createHose("h3", 205, "B", 20, [
    createMaintenance("m4", false, "Kupplungen beschädigt", 15),
    createMaintenance("m5", true, null, 180),
    createMaintenance("m6", true, null, 300),
  ]),
  createHose("h4", 88, "D", 5, [
    createMaintenance("m7", false, "Altersschwäche", 20),
  ]),
];

export const Default: Story = {
  args: {
    hoses: mockHoses,
    ownerName: "FF Murrhardt",
  },
};

export const EmptyReport: Story = {
  args: {
    hoses: [],
    ownerName: "FF Murrhardt",
  },
};

export const SingleHose: Story = {
  args: {
    hoses: [mockHoses[0]],
    ownerName: "FF Murrhardt",
  },
};

export const ManyHoses: Story = {
  args: {
    hoses: [
      ...mockHoses,
      createHose("h5", 501, "A", 30, [
        createMaintenance("m8", false, "Totalschaden", 3),
      ]),
      createHose("h6", 502, "A", 30, [
        createMaintenance("m9", false, "Riss an der Naht", 7),
      ]),
      createHose("h7", 155, "C", 15, [
        createMaintenance("m10", false, "Riss", 12),
      ]),
      createHose("h8", 156, "C", 15, [
        createMaintenance("m11", false, "Verschleiß", 18),
      ]),
    ],
    ownerName: "FF Murrhardt",
  },
};

export const AllSameDiameter: Story = {
  args: {
    hoses: [
      createHose("h1", 101, "C", 15, [
        createMaintenance("m1", false, "Defekt 1", 5),
      ]),
      createHose("h2", 102, "C", 15, [
        createMaintenance("m2", false, "Defekt 2", 10),
      ]),
      createHose("h3", 103, "C", 20, [
        createMaintenance("m3", false, "Defekt 3", 15),
      ]),
    ],
    ownerName: "FF Murrhardt",
  },
};
