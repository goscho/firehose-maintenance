"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageHeader() {
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname.startsWith("/hose");
  const isReports = pathname.startsWith("/reports");

  return (
    <header className="flex flex-row justify-between p-5 drop-shadow-xs bg-gray-200 border-b border-gray-400">
      <div className="flex items-baseline gap-8">
        <h1 className="text-3xl font-bold leading-none tracking-tight">
          <Link href={"/"}>Schlauchverwaltung</Link>
        </h1>

        <nav className="flex items-baseline">
          <Link
            href="/"
            className={`text-xl px-4 py-1 ${
              isHome ? "text-gray-900 font-medium" : "text-gray-600"
            }`}
          >
            Reinigen & Prüfen
          </Link>
          <span className="text-gray-400 mx-1">|</span>
          <Link
            href="/reports"
            className={`text-xl px-4 py-1 ${
              isReports ? "text-gray-900 font-medium" : "text-gray-600"
            }`}
          >
            Berichte
          </Link>
        </nav>
      </div>

      <div className="text-gray-500 my-auto">
        {process.env.NEXT_PUBLIC_APP_VERSION}
      </div>
    </header>
  );
}
