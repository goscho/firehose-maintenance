"use client";

import TouchButton from "@/app/_components/touch-button";
import { useState } from "react";
import SuggestedValuesInput from "@/app/_components/suggested-values-input";

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
  const [defectDescription, setDefectDescription] = useState("");

  if (!defectFound) {
    return (
      <div className={"flex flex-col gap-3 max-w-md"}>
        <TouchButton
          label={"Prüfung bestanden"}
          primary
          disabled={defectFound}
          onClick={onCheckSuccess}
          aria-label="Confirm successful check"
          data-testid="success-button"
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
        <SuggestedValuesInput
          className={"flex flex-row gap-1"}
          suggestedValues={defectDescriptions}
          onValueChange={(value) => {
            setDefectDescription(value);
          }}
          data-testid="defect-input"
          aria-label="Defect description input"
          role="combobox"
        />
        <div className={"flex flex-row gap-3 justify-end"}>
          <TouchButton label={"zurück"} onClick={() => setDefectFound(false)} />
          <TouchButton
            label={"Defekt speichern"}
            primary
            onClick={() => onCheckFailed && onCheckFailed(defectDescription)}
          />
        </div>
      </div>
    );
  }
}
