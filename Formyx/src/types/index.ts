import React from 'react';
import type {
  FieldConfig,
  InputType,
  FieldValue,
  FormData,
  ValidationRule,
  ValidatedFieldConfig,
  ValidationResult,
  FormState,
  FormConfig,
} from './inputTypes';

export type {
  FieldConfig,
  InputType,
  FieldValue,
  FormData,
  ValidationRule,
  ValidatedFieldConfig,
  ValidationResult,
  FormState,
  FormConfig,
};

export interface InputFieldProps {
  name: string;
  type?: InputType;
  label?: string;
  value: FieldValue;
  options?: { label: string; value: FieldValue }[];
  multiple?: boolean;
  required?: boolean;
  validation?: ValidationRule;
  error?: string;
  touched?: boolean;
  onChange: (name: string, value: FieldValue, shouldValidate?: boolean) => void;
  onBlur: (name: string, touched?: boolean) => void;
  formData?: FormData;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  rows?: number;
  accept?: string;
  debounce?: number;
  throttle?: number;
  validationStrategy?: 'debounce' | 'throttle' | 'immediate';
}
