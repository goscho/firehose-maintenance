import { FireHose } from "@/lib/types";

export interface HoseDetailsProps {
  firehose: FireHose;
}

export default function HoseDetails({ firehose }: HoseDetailsProps) {
  const latestMaintenance = firehose.maintenances[0];

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

  function renderLatestMaintenance() {
    if (!latestMaintenance) {
      return "noch nicht geprüft";
    }

    const result = latestMaintenance.testPassed ? (
      <span>bestanden</span>
    ) : (
      <span>
        nicht bestanden
        {latestMaintenance.failureDescription &&
          `: ${latestMaintenance.failureDescription}`}
      </span>
    );

    return (
      <>
        {formatDateTime(latestMaintenance.timestamp)} - {result}
      </>
    );
  }

  function getMaintenanceBgColor() {
    if (!latestMaintenance) {
      return "bg-gray-100";
    }
    return latestMaintenance.testPassed ? "bg-green-100" : "bg-red-100";
  }

  return (
    <div className="text-2xl flex flex-col gap-3 w-full max-w-md">
      <div className="flex flex-row justify-between border-b pb-2 px-3">
        <span className="font-bold">Nummer:</span>
        <span>
          {firehose.number}
        </span>
      </div>
      <div className="flex flex-row justify-between border-b pb-2 px-3">
        <span className="font-bold">Eigentümer:</span>
        <span>{firehose.owner.name}</span>
      </div>
      <div className="flex flex-row justify-between border-b pb-2 px-3">
        <span className="font-bold">Maße:</span>
        <span>
          {firehose.diameter} {firehose.length}&nbsp;m
        </span>
      </div>
      <div className="flex flex-row justify-between border-b pb-2 px-3">
        <span className="font-bold">Im Dienst seit:</span>
        <span>{formatDate(firehose.commissionedAt)}</span>
      </div>
      <div className="flex flex-row justify-between border-b pb-2 px-3">
        <span className="font-bold">Anzahl Prüfungen:</span>
        <span>{firehose.maintenances.length}</span>
      </div>
      <div
        className={`flex flex-col border-b pb-2 p-3 rounded ${getMaintenanceBgColor()}`}
      >
        <span className="font-bold">Letzte Prüfung:</span>
        <span className="text-base">{renderLatestMaintenance()}</span>
      </div>
    </div>
  );
}
