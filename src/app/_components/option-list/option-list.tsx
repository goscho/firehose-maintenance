import React from "react";

export interface OptionListItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface OptionListProps {
  options: OptionListItem[];
  selectedValue?: string;
  onSelectionChange?: (value: string) => void;
  className?: string;
}

export default function OptionList({
  options,
  selectedValue,
  onSelectionChange,
  className,
}: OptionListProps) {
  const containerClassNames = [
    "flex",
    "flex-col",
    "gap-2",
    "w-full",
  ];

  function handleOptionClick(value: string, disabled?: boolean) {
    if (!disabled && onSelectionChange) {
      onSelectionChange(value);
    }
  }

  function getOptionClassNames(option: OptionListItem, isSelected: boolean) {
    const classNames = [
      "p-4",
      "text-xl",
      "border",
      "rounded-sm",
      "cursor-pointer",
      "transition-colors",
      "text-center",
    ];

    if (option.disabled) {
      classNames.push(
        "text-gray-400",
        "border-gray-400",
        "bg-gray-100",
        "cursor-not-allowed"
      );
    } else if (isSelected) {
      classNames.push(
        "bg-indigo-500",
        "text-gray-100",
        "border-indigo-800",
        "active:bg-indigo-800"
      );
    } else {
      classNames.push(
        "bg-gray-100",
        "text-gray-800",
        "border-gray-500",
        "hover:bg-gray-200",
        "active:bg-gray-300"
      );
    }

    return classNames.join(" ");
  }

  function concatContainerClassNames() {
    if (className) {
      containerClassNames.push(className);
    }
    return containerClassNames.join(" ");
  }

  return (
    <div className={concatContainerClassNames()}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <div
            key={option.value}
            className={getOptionClassNames(option, isSelected)}
            onClick={() => handleOptionClick(option.value, option.disabled)}
            role="button"
            tabIndex={option.disabled ? -1 : 0}
            aria-pressed={isSelected}
            aria-disabled={option.disabled}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
}