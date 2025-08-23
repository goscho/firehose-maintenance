interface Maintenance {
  userId: string;
  timestamp: Date;
  testPassed: boolean;
  failureDescription?: string;
}

export interface FireHose {
  id: string;
  number: number;
  owner: string;
  length: number;
  diameter: "A" | "B" | "C" | "D";
  maintenances: Maintenance[];
}
