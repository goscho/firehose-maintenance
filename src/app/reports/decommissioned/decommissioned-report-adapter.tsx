"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DateRangeSelector, {
  DateRangePreset,
} from "@/app/_components/date-range-selector";
import DecommissionedReport from "@/app/_components/decommissioned-report";
import { FireHose } from "@/lib/types";

interface DecommissionedReportAdapterProps {
  hoses: FireHose[];
  startDate: Date;
  endDate: Date;
  ownerName: string;
  initialPreset: DateRangePreset;
}

export default function DecommissionedReportAdapter({
  hoses,
  startDate,
  endDate,
  ownerName,
  initialPreset,
}: DecommissionedReportAdapterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRangeChange = (newStartDate: Date, newEndDate: Date) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("start", newStartDate.toISOString().split("T")[0]);
    params.set("end", newEndDate.toISOString().split("T")[0]);
    params.set("preset", "custom");
    router.push(`/reports/decommissioned?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl">
      <DateRangeSelector
        onRangeChange={handleRangeChange}
        initialPreset={initialPreset}
        initialStartDate={startDate}
        initialEndDate={endDate}
      />

      <DecommissionedReport
        hoses={hoses}
        startDate={startDate}
        endDate={endDate}
        ownerName={ownerName}
      />
    </div>
  );
}
