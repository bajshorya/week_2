import type { ValidatorFunction } from './types';

export const passwordValidator: ValidatorFunction = (value) => {
  if (!value) {
    return 'Password is required';
  }
  const password = value as string;
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (password.length > 100) {
    return 'Password must be less than 100 characters';
  }
  return undefined;
};

export const passwordValidationRule = {
  validate: passwordValidator,
  required: true,
};
