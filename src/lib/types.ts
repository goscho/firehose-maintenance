export interface Maintenance {
  id: string;
  username: string;
  timestamp: Date;
  testPassed: boolean;
  failureDescription: string | null;
  fireHoseId: string;
}

export interface Owner {
  id: string;
  name: string;
  marker: string;
}

export type FireHoseDiameter = "A" | "B" | "C" | "D";

export interface FireHose {
  id: string;
  number: number;
  owner: Owner;
  length: number;
  diameter: FireHoseDiameter;
  commissionedAt: Date;
  decommissionedAt: Date | null;
  maintenances: Maintenance[];
}
