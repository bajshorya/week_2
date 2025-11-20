import type { ValidatorFunction } from './types';

export const phoneValidator: ValidatorFunction = (value) => {
  if (!value) {
    return { isValid: false, message: 'Phone number is required' };
  }
  const phone = value as string;
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Please enter a valid phone number' };
  }
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return {
      isValid: false,
      message: 'Phone number must be at least 10 digits',
    };
  }
  return { isValid: true, message: '' };
};

export const phoneValidationRule = {
  validate: phoneValidator,
  required: true,
  message: 'Please enter a valid phone number',
};

export const urlValidator: ValidatorFunction = (value) => {
  if (!value) {
    return { isValid: false, message: 'URL is required' };
  }
  const url = value as string;
  try {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(url)) {
      return { isValid: false, message: 'Please enter a valid URL' };
    }
    const testUrl = url.startsWith('http') ? url : `https://${url}`;
    new URL(testUrl);
    return { isValid: true, message: '' };
  } catch {
    return { isValid: false, message: 'Please enter a valid URL' };
  }
};

export const urlValidationRule = {
  validate: urlValidator,
  required: false,
  message: 'Please enter a valid URL',
};

export const creditCardValidator: ValidatorFunction = (value) => {
  if (!value) {
    return { isValid: false, message: 'Credit card number is required' };
  }
  const cardNumber = (value as string).replace(/\s+/g, '');
  const cardRegex = /^\d{13,19}$/;
  if (!cardRegex.test(cardNumber)) {
    return {
      isValid: false,
      message: 'Please enter a valid credit card number',
    };
  }
  let sum = 0;
  let isEven = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }
  if (sum % 10 !== 0) {
    return {
      isValid: false,
      message: 'Please enter a valid credit card number',
    };
  }
  return { isValid: true, message: '' };
};

export const creditCardValidationRule = {
  validate: creditCardValidator,
  required: true,
  message: 'Please enter a valid credit card number',
};

export const ageValidator = (minAge: number = 18): ValidatorFunction => {
  return (value) => {
    if (!value) {
      return { isValid: false, message: 'Age is required' };
    }
    const age = Number(value);
    if (isNaN(age)) {
      return { isValid: false, message: 'Please enter a valid age' };
    }
    if (age < minAge) {
      return {
        isValid: false,
        message: `You must be at least ${minAge} years old`,
      };
    }
    if (age > 120) {
      return { isValid: false, message: 'Please enter a valid age' };
    }
    return { isValid: true, message: '' };
  };
};

export const createAgeValidationRule = (minAge: number = 18) => ({
  validate: ageValidator(minAge),
  required: true,
  message: `You must be at least ${minAge} years old`,
});
