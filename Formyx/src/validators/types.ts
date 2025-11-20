import type { FieldValue, FormData } from '../types';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export type ValidatorFunction = (
  value: FieldValue,
  formData?: FormData,
  fieldName?: string
) =>
  | ValidationResult
  | Promise<ValidationResult>
  | string
  | boolean
  | undefined;

export interface ValidationRule {
  required?: boolean | string;
  min?: number | string;
  max?: number | string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp | string;
  validate?: ValidatorFunction;
  message?: string;
}

export const handleValidation = async (
  validator: ValidatorFunction,
  value: FieldValue,
  formData?: FormData,
  fieldName?: string
): Promise<ValidationResult> => {
  const result = validator(value, formData, fieldName);
  if (result instanceof Promise) {
    const awaitedResult = await result;
    return normalizeValidationResult(awaitedResult);
  }
  return normalizeValidationResult(result);
};

const normalizeValidationResult = (
  result: ValidationResult | string | boolean | undefined
): ValidationResult => {
  if (typeof result === 'string') {
    return { isValid: false, message: result };
  }
  if (typeof result === 'boolean') {
    return { isValid: result, message: result ? '' : 'Validation failed' };
  }
  if (result === undefined) {
    return { isValid: true, message: '' };
  }
  return result;
};
