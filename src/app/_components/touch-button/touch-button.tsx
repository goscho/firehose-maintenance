import React, { ButtonHTMLAttributes } from "react";

export interface TouchButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  label: string;
  primary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function TouchButton({
  label,
  primary = false,
  disabled = false,
  onClick,
  className,
  ...rest
}: TouchButtonProps) {
  const classNames = [
    "inline-block",
    "rounded-sm",
    "p-5",
    "min-w-[80px]",
    "text-2xl",
    "border",
    "cursor-pointer",
  ];

  if (disabled) {
    classNames.push("text-gray-400", "border-gray-400, cursor-not-allowed");
    if (primary) {
      classNames.push("bg-gray-300");
    } else {
      // secondary
      classNames.push("bg-gray-100");
    }
  } else if (primary) {
    classNames.push(
      "bg-indigo-500",
      "active:bg-indigo-800",
      "text-gray-100",
      "border-indigo-800",
    );
  } else {
    // secondary
    classNames.push(
      "bg-gray-100",
      "active:bg-gray-300",
      "text-gray-800",
      "border-gray-500",
    );
  }

  function concatClassNames() {
    if (className) {
      classNames.push(className);
    }
    return classNames.join(" ");
  }

  return (
    <button
      type="button"
      className={concatClassNames()}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {label}
    </button>
  );
}
