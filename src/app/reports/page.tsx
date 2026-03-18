import ReportCard from "@/app/_components/report-card";
import TouchButton from "@/app/_components/touch-button";
import Link from "next/link";

export default async function ReportsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Berichte</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        <ReportCard
          title="Ausgemusterte Schläuche"
          description="Übersicht aller ausgemusterten Schläuche in einem Zeitraum"
          href="/reports/decommissioned"
        />
        <ReportCard
          title="Nicht bestandene Prüfungen"
          description="Schläuche, die die letzte Prüfung nicht bestanden haben"
          href="/reports/failed-test"
        />
      </div>

      <div className="mt-6">
        <Link href="/">
          <TouchButton label="Zurück zur Startseite" />
        </Link>
      </div>
    </main>
  );
}
