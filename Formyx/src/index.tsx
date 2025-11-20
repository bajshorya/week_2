import React from 'react';
import Form from './components/page';
import InputField from './components/InputField';
import { useDebounce, useThrottle } from './hooks';
import './styles/formyx.css';
import type {
  phoneValidator,
  phoneValidationRule,
  urlValidator,
  urlValidationRule,
  creditCardValidator,
  creditCardValidationRule,
  ageValidator,
  createAgeValidationRule,
  emailValidator,
  emailValidationRule,
  passwordValidator,
  passwordValidationRule,
  usernameValidator,
  usernameValidationRule,
  requiredValidator,
  createRequiredValidator,
} from './validators';
export * from './validators';

const Formyx = () => {
  return (
    <div className="formyx-form">
      Formyx Library
      <Form />
    </div>
  );
};

export { Formyx, Form, InputField, useDebounce, useThrottle };

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
  InputFieldProps,
} from './types';

export type {
  urlValidationRule,
  urlValidator,
  phoneValidationRule,
  phoneValidator,
  creditCardValidationRule,
  creditCardValidator,
  ageValidator,
  createAgeValidationRule,
  emailValidator,
  emailValidationRule,
  passwordValidator,
  passwordValidationRule,
  usernameValidator,
  usernameValidationRule,
  requiredValidator,
  createRequiredValidator,
};
