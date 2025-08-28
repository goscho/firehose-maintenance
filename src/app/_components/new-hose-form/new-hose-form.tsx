"use client";

import { HTMLAttributes, useState } from "react";
import TouchButton from "@/app/_components/touch-button";
import Numpad from "@/app/_components/numpad";
import SuggestedValuesInput from "@/app/_components/suggested-values-input";
import { FireHose } from "@/lib/types";

export interface NewHoseFormProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /**
   * Callback when the form is submitted with complete data
   */
  onSubmit?: (data: FireHose) => void;
  /**
   * Callback when the form is canceled
   */
  onCancel?: () => void;
  /**
   * Additional class name for the form container
   */
  className?: string;
}

type FormStep = "number" | "length" | "diameter" | "review";

export default function NewHoseForm({
  onSubmit,
  onCancel,
  className,
  ...rest
}: NewHoseFormProps) {
  const [step, setStep] = useState<FormStep>("number");
  const [hoseData, setHoseData] = useState<Partial<FireHose>>({
    owner: { id: "uFpFjeCOZass", name: "Murrhardt", marker: "BK-31" },
    maintenances: [],
  });

  const [inputValue, setInputValue] = useState("");

  // Handle numpad value changes
  const handleNumpadValueChange = (value: string) => {
    setInputValue(value);
  };

  // Handle next step
  const handleNextStep = () => {
    // Save current input to the appropriate field
    if (step === "number" && inputValue) {
      setHoseData({ ...hoseData, number: parseInt(inputValue, 10) });
      setStep("length");
      setInputValue(hoseData.length?.toString(10) || "");
    } else if (step === "length" && inputValue) {
      setHoseData({ ...hoseData, length: parseInt(inputValue, 10) });
      setInputValue(hoseData.diameter || "");
      setStep("diameter");
    } else if (step === "diameter" && inputValue) {
      // Validate diameter is one of the allowed values
      if (["A", "B", "C", "D"].includes(inputValue)) {
        setHoseData({
          ...hoseData,
          diameter: inputValue as "A" | "B" | "C" | "D",
        });
        setStep("review");
      }
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(hoseData as FireHose);
    }
  };

  // Handle cancel/back
  const handleCancel = () => {
    if (step === "number") {
      // If on first step, cancel the form
      if (onCancel) {
        onCancel();
      }
    } else if (step === "review") {
      // If on review step, go back to diameter
      setStep("diameter");
    } else if (step === "diameter") {
      // Go back to length
      setStep("length");
      setInputValue(hoseData.length?.toString(10) || "");
    } else if (step === "length") {
      // Go back to owner
      setStep("number");
      setInputValue(hoseData.number?.toString(10) || "");
    }
  };

  function renderNumberStep() {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">Schlauch-Nummer eingeben</h2>
        <div className="flex flex-row gap-3 h-20 items-center">
          <span className="inline-block text-3xl">Nummer:</span>
          <span className="block font-bold text-center text-3xl min-w-40 h-full border-2 p-5">
            {inputValue}
          </span>
        </div>
        <Numpad
          key="number"
          onValueChange={handleNumpadValueChange}
          initialValue={inputValue}
        />
      </div>
    );
  }

  function renderLengthStep() {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">
          Schlauchlänge eingeben (in Meter)
        </h2>
        <div className="flex flex-row gap-3 h-20 items-center">
          <span className="inline-block text-3xl">Länge:</span>
          <span className="block font-bold text-center text-3xl min-w-30 h-full border-2 p-5">
            {inputValue}
          </span>
        </div>
        <Numpad
          key="length"
          onValueChange={handleNumpadValueChange}
          initialValue={inputValue}
        />
      </div>
    );
  }

  function renderDiameterStep() {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">Durchmesser auswählen</h2>
        <div className="flex flex-row gap-3 h-20 items-center">
          <span className="inline-block text-3xl">Durchmesser:</span>
          <SuggestedValuesInput
            suggestedValues={["A", "B", "C", "D"]}
            initialValue={inputValue}
            onValueChange={setInputValue}
            className={"w-36"}
          />
        </div>
      </div>
    );
  }

  function renderReviewStep() {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">Überprüfen und Speichern</h2>
        <div className="text-2xl flex flex-col gap-3 w-full max-w-md">
          <div className="flex flex-row justify-between border-b pb-2">
            <span className="font-bold">Nummer:</span>
            <span>{hoseData.number}</span>
          </div>
          <div className="flex flex-row justify-between border-b pb-2">
            <span className="font-bold">Eigentümer:</span>
            <span>{hoseData.owner?.marker}</span>
          </div>
          <div className="flex flex-row justify-between border-b pb-2">
            <span className="font-bold">Länge:</span>
            <span>{hoseData.length} m</span>
          </div>
          <div className="flex flex-row justify-between border-b pb-2">
            <span className="font-bold">Durchmesser:</span>
            <span>{hoseData.diameter}</span>
          </div>
        </div>
      </div>
    );
  }

  // Render the appropriate step
  const renderStep = () => {
    if (step === "number") {
      return renderNumberStep();
    } else if (step === "length") {
      return renderLengthStep();
    } else if (step === "diameter") {
      return renderDiameterStep();
    } else if (step === "review") {
      return renderReviewStep();
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-6 ${className || ""}`}
      {...rest}
    >
      {renderStep()}

      <div className="flex flex-row gap-3 mt-6">
        <TouchButton
          label={step === "number" ? "Abbrechen" : "Zurück"}
          onClick={handleCancel}
        />
        <TouchButton
          label={step === "review" ? "Speichern" : "Weiter"}
          primary
          disabled={!inputValue && step !== "review"}
          onClick={step === "review" ? handleSubmit : handleNextStep}
        />
      </div>
    </div>
  );
}
