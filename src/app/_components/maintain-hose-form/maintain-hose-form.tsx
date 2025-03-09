"use client";

import TouchButton from "@/app/_components/touch-button";
import { useRef, useState } from "react";

export interface MaintainHoseFormProps {
  defectDescriptions: string[];
  onCheckSuccess?: () => void;
  onCheckFailed?: (msg: string) => void;
}

export default function MaintainHoseForm({
  defectDescriptions,
  onCheckSuccess,
  onCheckFailed,
}: MaintainHoseFormProps) {
  const [defectFound, setDefectFound] = useState(false);
  const defectDescriptionInput = useRef<HTMLInputElement>(null);

  if (!defectFound) {
    return (
      <div className={"flex flex-col gap-3 max-w-md"}>
        <TouchButton
          label={"Prüfung bestanden"}
          primary
          disabled={defectFound}
          onClick={onCheckSuccess}
        />
        <TouchButton
          label={"Schlauch defekt"}
          disabled={defectFound}
          onClick={() => setDefectFound(true)}
        />
      </div>
    );
  } else {
    return (
      <div className={"flex flex-col gap-3 max-w-md"}>
        <div className={"flex flex-row gap-1"}>
          <input
            placeholder={"Fehlerbeschreibung"}
            list={"defects"}
            ref={defectDescriptionInput}
            className={"p-5 flex-grow text-xl rounded"}
          />
          <datalist id={"defects"}>
            {defectDescriptions.map((defect) => (
              <option key={defect} value={defect} />
            ))}
          </datalist>
          <TouchButton
            label={"\u2573"}
            onClick={() => (defectDescriptionInput.current!.value = "")}
          />
        </div>
        <div className={"flex flex-row gap-3 justify-end"}>
          <TouchButton label={"zurück"} onClick={() => setDefectFound(false)} />
          <TouchButton
            label={"Defekt speichern"}
            primary
            onClick={() =>
              onCheckFailed &&
              onCheckFailed(defectDescriptionInput.current!.value)
            }
          />
        </div>
      </div>
    );
  }
}
