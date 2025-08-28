export interface Maintenance {
  id: string;
  userId: string;
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

export interface FireHose {
  id: string;
  number: number;
  owner: Owner;
  length: number;
  diameter: "A" | "B" | "C" | "D";
  commissionedAt: Date;
  decommissionedAt: Date | null;
  maintenances: Maintenance[];
}
