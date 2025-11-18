// Basic field configuration
interface FieldConfig {
  name: string;
  label?: string;
  required?: boolean;
  validate?: (value: any, formData?: FormData) => string | undefined;
  dependencies?: string[];
}

// Input field types
type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "file"
  | "date"
  | "datetime-local"
  | "custom";

// Field value types
type FieldValue =
  | string
  | number
  | boolean
  | File
  | FileList
  | any[]
  | null
  | undefined;

// Form data structure
type FormData = Record<string, FieldValue>;

// Validation rules
interface ValidationRule {
  required?: boolean | string;
  min?: number | string;
  max?: number | string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp | string;
  validate?: (
    value: FieldValue,
    formData?: FormData
  ) => string | boolean | undefined | Promise<string | boolean | undefined>;
  message?: string;
}

// Field configuration with validation
interface ValidatedFieldConfig extends FieldConfig {
  type?: InputType;
  validation?: ValidationRule;
  options?: { label: string; value: FieldValue }[];
  multiple?: boolean;
}

// Validation result
interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
}

// Form state
interface FormState {
  values: FormData;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

// Form configuration
interface FormConfig {
  fields: Record<string, ValidatedFieldConfig>;
  initialValues?: FormData;
  onSubmit?: (data: FormData) => void | Promise<void>;
  validate?: (values: FormData) => Record<string, string | undefined>;
  validationMode?: "onChange" | "onBlur" | "onSubmit" | "onTouched";
  reValidateMode?: "onChange" | "onBlur";
}

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
