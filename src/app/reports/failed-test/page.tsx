import { getFailedTestFireHoses } from "@/lib/fireHoseRepository";
import { OWNER_MURRHARDT } from "@/lib/static";
import FailedTestReport from "@/app/_components/failed-test-report";
import TouchButton from "@/app/_components/touch-button";
import Link from "next/link";

export default async function FailedTestReportPage() {
  const hoses = await getFailedTestFireHoses(OWNER_MURRHARDT.id);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Nicht bestandene Prüfungen</h1>

      <div className="w-full max-w-6xl">
        <FailedTestReport hoses={hoses} ownerName={OWNER_MURRHARDT.name} />
      </div>

      <div className="flex gap-4 mt-4">
        <Link href="/reports">
          <TouchButton label="Zurück zu Berichte" />
        </Link>
        <Link href="/">
          <TouchButton label="Zur Startseite" />
        </Link>
      </div>
    </main>
  );
}
