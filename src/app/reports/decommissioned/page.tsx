import { getDecommissionedFireHoses } from "@/lib/fireHoseRepository";
import { OWNER_MURRHARDT } from "@/lib/static";
import DecommissionedReportAdapter from "./decommissioned-report-adapter";
import { DateRangePreset } from "@/app/_components/date-range-selector";

interface DecommissionedReportPageProps {
  searchParams: Promise<{
    start?: string;
    end?: string;
    preset?: string;
  }>;
}

function getDefaultDateRange(): { start: Date; end: Date } {
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const start = new Date(Date.UTC(currentYear - 1, 0, 1, 0, 0, 0, 0));
  const end = new Date(Date.UTC(currentYear - 1, 11, 31, 23, 59, 59, 999));
  return { start, end };
}

function parsePreset(preset: string | undefined): DateRangePreset {
  if (preset === "lastYear" || preset === "thisYear" || preset === "custom") {
    return preset;
  }
  return "lastYear";
}

export default async function DecommissionedReportPage({
  searchParams,
}: DecommissionedReportPageProps) {
  const params = await searchParams;
  const defaultRange = getDefaultDateRange();

  let startDate: Date;
  let endDate: Date;

  if (params.start && params.end) {
    startDate = new Date(params.start);
    startDate.setUTCHours(0, 0, 0, 0);
    endDate = new Date(params.end);
    endDate.setUTCHours(23, 59, 59, 999);
  } else {
    startDate = defaultRange.start;
    endDate = defaultRange.end;
  }

  const initialPreset = parsePreset(params.preset);

  const hoses = await getDecommissionedFireHoses(
    OWNER_MURRHARDT.id,
    startDate,
    endDate,
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Ausgemusterte Schläuche</h1>

      <DecommissionedReportAdapter
        hoses={hoses}
        startDate={startDate}
        endDate={endDate}
        ownerName={OWNER_MURRHARDT.name}
        initialPreset={initialPreset}
      />
    </main>
  );
}
