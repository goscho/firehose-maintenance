import React, { HTMLAttributes, useEffect, useState } from "react";
import TouchButton from "@/app/_components/touch-button";

interface SuggestedValuesInputProps extends HTMLAttributes<HTMLDivElement> {
  suggestedValues: string[];
  initialValue?: string;
  onValueChange?: (value: string) => void;
}

const SuggestedValuesInput: React.FC<SuggestedValuesInputProps> = ({
  suggestedValues,
  initialValue,
  onValueChange,
  className,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>(initialValue || "");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [onValueChange, inputValue]);

  // Handle input change and filter suggestions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setIsSuggestionsOpen(false); // Close the suggestions when a suggestion is selected
  };

  // Toggle suggestions visibility
  const toggleSuggestions = () => {
    setIsSuggestionsOpen(!isSuggestionsOpen);
  };

  const rootClassName = `relative ${className || ""}`.trim();

  return (
    <div className={rootClassName} {...rest}>
      <div className="w-full flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Fehlerbeschreibung"
          className="w-full p-5 border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-l text-xl "
        />
        <TouchButton
          onClick={toggleSuggestions}
          primary
          label={"▼"}
          className={"rounded-l-none border-none"}
        />
      </div>
      {isSuggestionsOpen && (
        <ul className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-sm shadow-lg z-10 text-xl ">
          {suggestedValues.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestedValuesInput;
