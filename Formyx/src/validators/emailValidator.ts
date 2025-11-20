import type { ValidatorFunction } from './types';

export const emailValidator: ValidatorFunction = (value) => {
  if (!value) {
    return { isValid: false, message: 'Email is required' };
  }

  const email = value as string;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  const commonTypos = [
    /@gmai\.com$/,
    /@gmial\.com$/,
    /@yahhoo\.com$/,
    /@hotmai\.com$/,
    /@outloo\.com$/,
  ];

  for (const typo of commonTypos) {
    if (typo.test(email)) {
      return { isValid: false, message: 'Email domain might have a typo' };
    }
  }

  return { isValid: true, message: '' };
};

export const emailValidationRule = {
  validate: emailValidator,
  required: true,
};
