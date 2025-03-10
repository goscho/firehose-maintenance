import { auth } from "@/auth";
import HoseSelector from "@/app/_components/hose-selector";

export default async function Home() {
  const session = await auth();
  console.debug("page.tsx", session);

  return (
    <main>
      <HoseSelector />
    </main>
  );
}
