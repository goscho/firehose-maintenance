"use server";

import prisma from "./prisma";
import { Maintenance } from "@/lib/types";

export async function createMaintenance(data: {
  fireHoseId: string;
  testPassed: boolean;
  failureDescription: string | null;
  timestamp: Date;
}): Promise<Maintenance> {
  if (!data.fireHoseId) {
    throw new Error("FireHose ID is required");
  }
  if (!data.timestamp) {
    throw new Error("Timestamp is required");
  }

  return prisma.maintenance.create({
    data,
  });
}
