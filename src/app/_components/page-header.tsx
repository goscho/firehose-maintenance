import Link from "next/link";

export default async function PageHeader() {
  return (
    <header className="flex flex-row justify-between p-5 drop-shadow-xs bg-gray-200  border-b border-gray-400">
      <h1 className="text-3xl font-bold leading-none tracking-tight my-auto">
        <Link href={"/"}>Schlauchverwaltung</Link>
      </h1>
      <div className={"text-gray-500"}>
        {process.env.NEXT_PUBLIC_APP_VERSION}
      </div>
    </header>
  );
}
