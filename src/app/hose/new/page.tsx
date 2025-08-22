"use client";

import { useRouter } from "next/navigation";
import NewHoseForm from "@/app/_components/new-hose-form";
import { FireHose } from "@/lib/types";

export default function NewHosePage() {
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (data: Partial<FireHose>) => {
    // TODO  send the data to an API
    console.log("Submitting new hose:", data);

    // For now, just navigate back to the home page
    router.push("/");
  };

  // Handle form cancellation
  const handleCancel = () => {
    // Navigate back to home
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Neuen Schlauch anlegen</h1>

      <NewHoseForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </main>
  );
}
