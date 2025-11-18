import React from "react";
import type { FieldValue, ValidatedFieldConfig, FormData } from "../types";

interface InputFieldProps extends Omit<ValidatedFieldConfig, "validate"> {
  value: FieldValue;
  onChange: (name: string, value: FieldValue, shouldValidate?: boolean) => void;
  onBlur: (name: string, touched?: boolean) => void;
  error?: string;
  touched?: boolean;
  formData?: FormData;
  className?: string;
  style?: React.CSSProperties;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type = "text",
  label,
  value,
  options = [],
  multiple = false,
  required = false,
  validation,
  error,
  touched = false,
  onChange,
  onBlur,
  className = "",
  style,
  ...props
}) => {
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let newValue: FieldValue;

    switch (type) {
      case "checkbox":
        newValue = (event.target as HTMLInputElement).checked;
        break;
      case "file":
        newValue = (event.target as HTMLInputElement).files;
        break;
      case "number":
        newValue = event.target.value === "" ? "" : Number(event.target.value);
        break;
      case "select":
        if (multiple) {
          const selectedOptions = Array.from(
            (event.target as HTMLSelectElement).selectedOptions
          );
          newValue = selectedOptions.map((option) => option.value);
        } else {
          newValue = event.target.value;
        }
        break;
      default:
        newValue = event.target.value;
    }

    onChange(name, newValue, true);
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  const getInputClassName = () => {
    const baseClass = "formyx-input";
    const stateClass = error && touched ? "formyx-input-error" : "";
    return `${baseClass} ${stateClass} ${className}`.trim();
  };

  // Render different input types
  const renderInput = () => {
    const commonProps = {
      name,
      value: type === "checkbox" ? undefined : (value as string | number),
      checked: type === "checkbox" ? Boolean(value) : undefined,
      onChange: handleChange,
      onBlur: handleBlur,
      className: getInputClassName(),
      style,
      required,
      ...props,
    };

    switch (type) {
      case "textarea":
        return <textarea {...commonProps} value={value as string} rows={4} />;

      case "select":
        return (
          <select {...commonProps} value={value as string} multiple={multiple}>
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option.value as string}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <input {...commonProps} type="checkbox" checked={Boolean(value)} />
        );

      case "radio":
        return (
          <div className="formyx-radio-group">
            {options.map((option, index) => (
              <label key={index} className="formyx-radio-label">
                <input
                  type="radio"
                  name={name}
                  value={option.value as string}
                  checked={value === option.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName()}
                  required={required}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case "file":
        return (
          <input
            {...commonProps}
            type="file"
            multiple={multiple}
            value={undefined}
          />
        );

      default:
        return (
          <input
            {...commonProps}
            type={type}
            value={value as string | number}
          />
        );
    }
  };

  return (
    <div className={`formyx-field formyx-field-${type}`}>
      {label && (
        <label htmlFor={name} className="formyx-label">
          {label}
          {required && <span className="formyx-required">*</span>}
        </label>
      )}

      {renderInput()}

      {error && touched && <div className="formyx-error-message">{error}</div>}
    </div>
  );
};

export default InputField;
