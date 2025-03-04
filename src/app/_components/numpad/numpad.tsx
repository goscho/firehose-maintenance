"use client";

import TouchButton from "@/app/_components/touch-button";
import { useEffect, useState } from "react";

export interface NumpadProps {
  onValueChange?: (value: string) => void;
}

export default function Numpad({ onValueChange }: NumpadProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [onValueChange, value]);

  const numbers = new Array(10).fill(1).map((_, i) => (i + 1) % 10);

  return (
    <div className="grid grid-cols-3 gap-2 w-72">
      {numbers.map((num) => (
        <TouchButton
          key={num}
          label={String(num)}
          onClick={() => setValue(value + num)}
          primary
        />
      ))}
      <TouchButton
        label={"DEL"}
        onClick={() => setValue(value.substring(0, value.length - 1))}
      />
      <TouchButton label={"AC"} onClick={() => setValue("")} />
    </div>
  );
}
