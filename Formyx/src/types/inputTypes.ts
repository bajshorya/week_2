interface FieldConfig {
  name: string;
  label?: string;
  required?: boolean;
  validate?: (value: unknown, formData?: FormData) => string | undefined;
  dependencies?: string[];
}

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

type FieldValue =
  | string
  | number
  | boolean
  | File
  | FileList
  | unknown[]
  | null
  | undefined;

type FormData = Record<string, FieldValue>;

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

interface ValidatedFieldConfig extends FieldConfig {
  type?: InputType;
  validation?: ValidationRule;
  options?: { label: string; value: FieldValue }[];
  multiple?: boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
}

interface FormState {
  values: FormData;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

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
