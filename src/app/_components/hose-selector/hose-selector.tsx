"use client";

import Numpad from "@/app/_components/numpad";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TouchButton from "@/app/_components/touch-button";

export default function HoseSelector() {
  const ownerMarker = "BK-31";
  const [hoseNumber, setHoseNumber] = useState("");
  const router = useRouter();

  const handleNumpadValueChange = (value: string) => {
    setHoseNumber(value);
  };

  const buildHoseNumber = () => {
    if (hoseNumber) {
      return hoseNumber;
    }
  };

  const navigateToHosePage = () => {
    router.push("/hose/" + ownerMarker + "__" + buildHoseNumber());
  };

  const navigateToHoseMaintenancePage = () => {
    router.push("/hose/" + buildHoseNumber() + "/maintain");
  };

  return (
    <div className={"flex flex-col items-center gap-6"}>
      <div className={"flex flex-row gap-3 h-20 items-center"}>
        <span className={"inline-block text-3xl"}>{ownerMarker}</span>
        <span
          className={
            "block font-bold text-center text-3xl min-w-40 h-full border-2 p-5"
          }
        >
          {hoseNumber}
        </span>
      </div>
      <Numpad onValueChange={handleNumpadValueChange} />
      <div className={"flex flex-row gap-3 h-20 items-center"}>
        <TouchButton
          label="Anzeigen"
          disabled={!hoseNumber}
          onClick={navigateToHosePage}
        />
        <TouchButton
          label="Reinigen & Prüfen"
          primary
          disabled={!hoseNumber}
          onClick={navigateToHoseMaintenancePage}
        />
      </div>
    </div>
  );
}
