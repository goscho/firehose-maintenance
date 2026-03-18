"use client";

import { useState } from "react";
import { Maintenance } from "@/lib/types";

export interface HoseTestHistoryProps {
  maintenances: Maintenance[];
}

export default function HoseTestHistory({
  maintenances,
}: HoseTestHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const historyMaintenances = maintenances.slice(1);

  if (historyMaintenances.length === 0) {
    return null;
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

  function getMaintenanceBgColor(testPassed: boolean): string {
    return testPassed ? "bg-green-100" : "bg-red-100";
  }

  return (
    <div className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-base cursor-pointer py-3"
      >
        &#9432; {isExpanded ? "Prüfungshistorie ausblenden" : "Prüfungshistorie anzeigen"}
      </button>

      {isExpanded && (
        <div className="mt-3 flex flex-col gap-2">
          {historyMaintenances.map((maintenance, index) => {
            const testNumber = maintenances.length - index - 1;
            return (
              <div
                key={maintenance.id}
                className={`flex flex-col p-3 rounded ${getMaintenanceBgColor(maintenance.testPassed)}`}
              >
                <div className="flex flex-row justify-between text-base">
                  <span>
                    <span className="font-bold min-w-8 inline-block">{testNumber}</span>{" "}
                    {formatDateTime(maintenance.timestamp)}
                  </span>
                  <span className="font-medium">
                    {maintenance.testPassed ? "bestanden" : "nicht bestanden"}
                  </span>
                </div>
                {!maintenance.testPassed && maintenance.failureDescription && (
                  <span className="text-sm text-gray-700 mt-1 text-right">
                    {maintenance.failureDescription}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
