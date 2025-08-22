import HoseSelector from "@/app/_components/hose-selector";
import TouchButton from "@/app/_components/touch-button";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <HoseSelector />
      <div className="fixed bottom-6 right-6">
        <Link href={"/hose/new"}>
          <TouchButton
            label="Neuer Schlauch"
            primary
            className="rounded-full shadow-lg"
          />
        </Link>
      </div>
    </main>
  );
}
