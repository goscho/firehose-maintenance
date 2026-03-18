import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import DecommissionedReport from "./index";
import { FireHose, Maintenance, Owner } from "@/lib/types";

const meta = {
  component: DecommissionedReport,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DecommissionedReport>;

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
  decommissionedDaysAgo: number,
  maintenances: Maintenance[],
): FireHose => ({
  id,
  number,
  owner: mockOwner,
  length,
  diameter,
  commissionedAt: new Date("2018-01-15"),
  decommissionedAt: new Date(
    Date.now() - decommissionedDaysAgo * 24 * 60 * 60 * 1000,
  ),
  maintenances,
});

const mockHoses: FireHose[] = [
  createHose("h1", 101, "C", 15, 30, [
    createMaintenance("m1", false, "Loch im Schlauch", 35),
    createMaintenance("m2", true, null, 120),
  ]),
  createHose("h2", 102, "C", 15, 45, [
    createMaintenance("m3", false, "Einband defekt", 50),
  ]),
  createHose("h3", 205, "B", 20, 60, [
    createMaintenance("m4", false, "Kupplungen beschädigt", 65),
    createMaintenance("m5", true, null, 180),
    createMaintenance("m6", true, null, 300),
  ]),
  createHose("h4", 301, "C", 20, 90, [createMaintenance("m7", true, null, 95)]),
  createHose("h5", 42, "B", 20, 120, []),
  createHose("h6", 88, "D", 5, 150, [
    createMaintenance("m8", false, "Altersschwäche", 155),
  ]),
];

const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 1);

const endDate = new Date();

export const Default: Story = {
  args: {
    hoses: mockHoses,
    startDate,
    endDate,
    ownerName: "FF Murrhardt",
  },
};

export const EmptyReport: Story = {
  args: {
    hoses: [],
    startDate,
    endDate,
    ownerName: "FF Murrhardt",
  },
};

export const SingleHose: Story = {
  args: {
    hoses: [mockHoses[0]],
    startDate,
    endDate,
    ownerName: "FF Murrhardt",
  },
};

export const ManyHoses: Story = {
  args: {
    hoses: [
      ...mockHoses,
      createHose("h7", 501, "A", 30, 20, [
        createMaintenance("m9", false, "Totalschaden", 25),
      ]),
      createHose("h8", 502, "A", 30, 25, [
        createMaintenance("m10", true, null, 30),
      ]),
      createHose("h9", 155, "C", 15, 55, [
        createMaintenance("m11", false, "Riss", 60),
      ]),
      createHose("h10", 156, "C", 15, 70, [
        createMaintenance("m12", false, "Verschleiß", 75),
      ]),
    ],
    startDate,
    endDate,
    ownerName: "FF Murrhardt",
  },
};

export const AllSameDiameter: Story = {
  args: {
    hoses: [
      createHose("h1", 101, "C", 15, 30, [
        createMaintenance("m1", false, "Defekt 1", 35),
      ]),
      createHose("h2", 102, "C", 15, 45, [
        createMaintenance("m2", false, "Defekt 2", 50),
      ]),
      createHose("h3", 103, "C", 20, 60, [
        createMaintenance("m3", false, "Defekt 3", 65),
      ]),
    ],
    startDate,
    endDate,
    ownerName: "FF Murrhardt",
  },
};
