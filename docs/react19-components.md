# React 19 Components - Passing Any Attributes

This document explains how to pass any HTML attributes to custom React 19 components in the Firehose Maintenance
application.

## Overview

React 19 components can accept and pass through any valid HTML attributes to their underlying HTML elements. This is
useful for:

- Accessibility (aria-* attributes)
- Testing (data-testid attributes)
- Custom data attributes (data-* attributes)
- Event handlers
- And more

## Implementation

We've updated our custom components to accept and pass through any valid HTML attributes to their underlying elements.
This is done using TypeScript's rest parameter syntax (`...rest`) and the spread operator.

### TouchButton Component

The `TouchButton` component now extends `ButtonHTMLAttributes<HTMLButtonElement>` and passes through any additional
props to the underlying button element.

```tsx
export interface TouchButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
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
  // ...
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
```

### SuggestedValuesInput Component

The `SuggestedValuesInput` component now extends `HTMLAttributes<HTMLDivElement>` and passes through any additional
props to the root div element.

```tsx
interface SuggestedValuesInputProps extends HTMLAttributes<HTMLDivElement> {
  suggestedValues: string[];
  onValueChange?: (value: string) => void;
}

const SuggestedValuesInput: React.FC<SuggestedValuesInputProps> = ({
                                                                     suggestedValues,
                                                                     onValueChange,
                                                                     className,
                                                                     ...rest
                                                                   }) => {
  // ...
  const rootClassName = `relative w-96 ${className || ''}`.trim();

  return (
    <div className={rootClassName} {...rest}>
      {/* ... */}
    </div>
  );
};
```

## Usage Examples

### TouchButton with Additional Attributes

```tsx
<TouchButton
  label="Prüfung bestanden"
  primary
  disabled={defectFound}
  onClick={onCheckSuccess}
  aria-label="Confirm successful check"
  data-testid="success-button"
  title="Click to confirm the check was successful"
/>
```

### SuggestedValuesInput with Additional Attributes

```tsx
<SuggestedValuesInput
  className="flex flex-row gap-1"
  suggestedValues={defectDescriptions}
  onValueChange={(value) => {
    setDefectDescription(value);
  }}
  data-testid="defect-input"
  aria-label="Defect description input"
  role="combobox"
  aria-expanded={isSuggestionsOpen}
/>
```

## Best Practices

1. **Type Safety**: Always use TypeScript interfaces to ensure type safety when passing props.
2. **Avoid Prop Conflicts**: Be careful not to pass props that conflict with the component's internal props.
3. **Documentation**: Document which HTML element your component renders so developers know which attributes are valid.
4. **Accessibility**: Use this feature to enhance accessibility by passing aria-* attributes.
5. **Testing**: Use data-testid attributes for testing purposes.

## Conclusion

With these changes, our custom React 19 components can now accept any valid HTML attributes, making them more flexible
and easier to use in various contexts.