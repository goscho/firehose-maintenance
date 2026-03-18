import { FireHose } from "@/lib/types";

export interface DecommissionedReportProps {
  hoses: FireHose[];
  startDate: Date;
  endDate: Date;
  ownerName: string;
  className?: string;
}

interface GroupedSummary {
  key: string;
  diameter: string;
  length: number;
  count: number;
}

function formatDate(date: Date): string {
  return date.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDateTime(date: Date): string {
  return date.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function groupHosesBySizeCategory(hoses: FireHose[]): GroupedSummary[] {
  const groups = new Map<string, GroupedSummary>();

  for (const hose of hoses) {
    const key = `${hose.diameter} ${hose.length} m`;
    const existing = groups.get(key);
    if (existing) {
      existing.count++;
    } else {
      groups.set(key, {
        key,
        diameter: hose.diameter,
        length: hose.length,
        count: 1,
      });
    }
  }

  return Array.from(groups.values()).sort((a, b) => {
    if (a.diameter !== b.diameter) {
      return a.diameter.localeCompare(b.diameter);
    }
    return a.length - b.length;
  });
}

function getLatestMaintenanceInfo(hose: FireHose): {
  date: Date | null;
  passed: boolean | null;
  description: string | null;
} {
  if (hose.maintenances.length === 0) {
    return { date: null, passed: null, description: null };
  }
  const latest = hose.maintenances[0];
  return {
    date: latest.timestamp,
    passed: latest.testPassed,
    description: latest.failureDescription,
  };
}

export default function DecommissionedReport({
  hoses,
  startDate,
  endDate,
  ownerName,
  className,
}: DecommissionedReportProps) {
  const classNames = ["flex", "flex-col", "gap-6", "w-full"];
  if (className) {
    classNames.push(className);
  }

  const groupedSummary = groupHosesBySizeCategory(hoses);

  return (
    <div className={classNames.join(" ")}>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-2">
          Bericht: Ausgemusterte Schläuche
        </h2>
        <p className="text-lg text-gray-600">
          {ownerName} | {formatDate(startDate)} - {formatDate(endDate)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Zusammenfassung</h3>
        {hoses.length === 0 ? (
          <p className="text-lg text-gray-500">
            Keine ausgemusterten Schläuche im ausgewählten Zeitraum.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="text-lg font-medium mb-2">
              Gesamt: {hoses.length} Schläuche ausgemustert
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {groupedSummary.map((group) => (
                <div
                  key={group.key}
                  className="flex flex-col p-3 bg-gray-100 rounded-lg"
                >
                  <span className="text-lg font-bold">{group.key}</span>
                  <span className="text-base text-gray-600">
                    {group.count} {group.count === 1 ? "Schlauch" : "Schläuche"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {hoses.length > 0 && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="p-3 text-lg font-bold">Nummer</th>
                  <th className="p-3 text-lg font-bold">Maße</th>
                  <th className="p-3 text-lg font-bold">Ausgemustert am</th>
                  <th className="p-3 text-lg font-bold">Letzte Prüfung</th>
                  <th className="p-3 text-lg font-bold">Beschreibung</th>
                </tr>
              </thead>
              <tbody>
                {hoses.map((hose) => {
                  const latestTest = getLatestMaintenanceInfo(hose);
                  return (
                    <tr
                      key={hose.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-3 text-lg">{hose.number}</td>
                      <td className="p-3 text-lg">
                        {hose.diameter} {hose.length} m
                      </td>
                      <td className="p-3 text-lg">
                        {hose.decommissionedAt
                          ? formatDate(hose.decommissionedAt)
                          : "-"}
                      </td>
                      <td className="p-3 text-lg">
                        {latestTest.date ? (
                          <span
                            className={
                              latestTest.passed
                                ? "text-green-700"
                                : "text-red-700"
                            }
                          >
                            {formatDateTime(latestTest.date)} -{" "}
                            {latestTest.passed
                              ? "bestanden"
                              : "nicht bestanden"}
                          </span>
                        ) : (
                          <span className="text-gray-500">
                            noch nicht geprüft
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-lg text-gray-600">
                        {latestTest.description || "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
