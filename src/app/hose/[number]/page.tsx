import { getFireHoseByNumberAndOwner } from "@/lib/fireHoseRepository";
import TouchButton from "@/app/_components/touch-button";
import Link from "next/link";

export interface HosePageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function HosePage({ params }: HosePageProps) {
  const { number } = await params;
  const [owner, hoseNumber] = decodeURIComponent(number).split("__");

  const firehose = await getFireHoseByNumberAndOwner(
    parseInt(hoseNumber),
    owner,
  );

  const latestMaintenance = firehose?.maintenances[0];

  const maintenanceCount = firehose?.maintenances.length;

  function renderTestResults() {
    if (latestMaintenance) {
      return (
        <p>
          Letze Prüfung am:{" "}
          {latestMaintenance.timestamp.toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
          {latestMaintenance.testPassed
            ? " bestanden"
            : " nicht bestanden: " + latestMaintenance.failureDescription}
        </p>
      );
    }
    return <p>Letze Prüfung: noch nicht geprüft</p>;
  }

  return (
    <>
      <h1 className={"text-2xl"}>
        Schlauch: {firehose?.owner.marker}-{firehose?.number}
      </h1>
      <div>
        <p>
          Im Dienst seit:{" "}
          {firehose?.commissionedAt.toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        {renderTestResults()}
        <p>
          Dimensionen: {firehose?.diameter} {firehose?.length} m
        </p>
        <p>Anzahl Prüfungen: {maintenanceCount}</p>
      </div>
      <div>
        <Link href={"/"}>
          <TouchButton label={"Abbrechen"} />
        </Link>
        <Link
          href={`/hose/${firehose?.owner.marker}__${firehose?.number}/maintain`}
        >
          <TouchButton label={"Reinigen & Prüfen"} primary />
        </Link>
      </div>
    </>
  );
}
