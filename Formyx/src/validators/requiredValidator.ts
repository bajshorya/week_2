import type { ValidatorFunction } from './types';

export const requiredValidator: ValidatorFunction = (
  value,
  formData,
  fieldName
) => {
  if (value === undefined || value === null || value === '') {
    return `${fieldName || 'This field'} is required`;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return `${fieldName || 'This field'} is required`;
  }
  if (Array.isArray(value) && value.length === 0) {
    return `${fieldName || 'This field'} is required`;
  }
  return undefined;
};

export const createRequiredValidator = (
  customMessage?: string
): ValidatorFunction => {
  return (value, formData, fieldName) => {
    const result = requiredValidator(value, formData, fieldName);
    if (result && customMessage) {
      return customMessage;
    }
    return result;
  };
};
