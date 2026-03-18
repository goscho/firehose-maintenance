import Link from "next/link";
import { FireHose } from "@/lib/types";
import { createFirehoseSlug } from "@/lib/navigationUtils";

export interface FailedTestReportProps {
  hoses: FireHose[];
  ownerName: string;
  className?: string;
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

function getLatestMaintenanceInfo(hose: FireHose): {
  date: Date | null;
  description: string | null;
} {
  if (hose.maintenances.length === 0) {
    return { date: null, description: null };
  }
  const latest = hose.maintenances[0];
  return {
    date: latest.timestamp,
    description: latest.failureDescription,
  };
}

export default function FailedTestReport({
  hoses,
  ownerName,
  className,
}: FailedTestReportProps) {
  const classNames = ["flex", "flex-col", "gap-6", "w-full"];
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(" ")}>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-2">
          Bericht: Nicht bestandene Prüfungen
        </h2>
        <p className="text-lg text-gray-600">{ownerName}</p>
      </div>

      {hoses.length === 0 ? (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-lg text-gray-500">
            Alle Schläuche haben die letzte Prüfung bestanden.
          </p>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="p-3 text-lg font-bold">Nummer</th>
                  <th className="p-3 text-lg font-bold">Maße</th>
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
                      <td className="p-3 text-lg">
                        <Link
                          href={`/hose/${createFirehoseSlug(hose)}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {hose.owner.marker}-{hose.number}
                        </Link>
                      </td>
                      <td className="p-3 text-lg">
                        {hose.diameter} {hose.length} m
                      </td>
                      <td className="p-3 text-lg text-red-700">
                        {latestTest.date
                          ? formatDateTime(latestTest.date)
                          : "-"}
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
