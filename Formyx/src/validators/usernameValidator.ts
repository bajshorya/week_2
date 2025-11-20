import type { ValidatorFunction } from './types';

export const usernameValidator: ValidatorFunction = (value) => {
  if (!value) {
    return 'Username is required';
  }
  const username = value as string;
  if (username.length < 3) {
    return 'Username must be at least 3 characters';
  }
  if (username.length > 20) {
    return 'Username must be less than 20 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return undefined;
};

export const usernameValidationRule = {
  validate: usernameValidator,
  required: true,
};
