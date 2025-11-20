import React, { useState } from 'react';
import InputField from './InputField';
import type { FieldValue, FormData } from '../types';
import { useDebounce, useThrottle } from '../hooks';
import {
  emailValidationRule,
  passwordValidationRule,
  usernameValidationRule,
  requiredValidator,
  handleValidation,
  phoneValidationRule,
  urlValidationRule,
  creditCardValidationRule,
  createAgeValidationRule,
} from '../validators';
import type { ValidatorFunction } from '../validators/types';

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    bio: '',
    avatar: null,
    search: '',
    phone: '',
    website: '',
    creditCard: '',
    age: '',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const throttledSearch = useThrottle((query: string) => {
    if (query.length > 2) {
      console.log('Searching for:', query);
    }
  }, 300);

  const debouncedBioValidation = useDebounce((bio: string) => {
    if (bio && bio.length > 500) {
      setErrors((prev) => ({
        ...prev,
        bio: 'Bio must be less than 500 characters',
      }));
    } else {
      setErrors((prev) => ({ ...prev, bio: '' }));
    }
  }, 400);

  const createValidatorWrapper = (
    validator: ValidatorFunction
  ): ((
    value: FieldValue,
    formData?: FormData
  ) => Promise<string | undefined>) => {
    return async (value: FieldValue, formData?: FormData) => {
      const result = await handleValidation(validator, value, formData);
      return result.isValid ? undefined : result.message;
    };
  };

  const fileValidator: ValidatorFunction = async (value) => {
    if (!value) {
      return { isValid: true, message: '' };
    }
    if (value instanceof FileList) {
      const file = value[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          return { isValid: false, message: 'Please upload an image file' };
        }
        if (file.size > 2 * 1024 * 1024) {
          return { isValid: false, message: 'File size must be less than 2MB' };
        }
      }
    }
    return { isValid: true, message: '' };
  };

  const handleChange = (
    name: string,
    value: FieldValue,
    shouldValidate = true
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    switch (name) {
      case 'search':
        if (typeof value === 'string') {
          throttledSearch(value);
        }
        break;
      case 'bio':
        if (typeof value === 'string') {
          debouncedBioValidation(value);
        }
        break;
      case 'avatar':
        if (shouldValidate) {
          validateField(name, value);
        }
        break;
      default:
        if (shouldValidate) {
          validateField(name, value);
        }
        break;
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = async (name: string, value: FieldValue) => {
    let error = '';
    try {
      switch (name) {
        case 'username':
          if (value) {
            const result = await handleValidation(
              usernameValidationRule.validate!,
              value,
              formData,
              name
            );
            if (!result.isValid) {
              error = result.message;
            }
          } else {
            const requiredResult = await handleValidation(
              requiredValidator,
              value,
              formData,
              'Username'
            );
            if (!requiredResult.isValid) {
              error = requiredResult.message;
            }
          }
          break;
        case 'email':
          if (value) {
            const result = await handleValidation(
              emailValidationRule.validate!,
              value,
              formData,
              name
            );
            if (!result.isValid) {
              error = result.message;
            }
          } else {
            const requiredResult = await handleValidation(
              requiredValidator,
              value,
              formData,
              'Email'
            );
            if (!requiredResult.isValid) {
              error = requiredResult.message;
            }
          }
          break;
        case 'password':
          if (value) {
            const result = await handleValidation(
              passwordValidationRule.validate!,
              value,
              formData,
              name
            );
            if (!result.isValid) {
              error = result.message;
            }
          } else {
            const requiredResult = await handleValidation(
              requiredValidator,
              value,
              formData,
              'Password'
            );
            if (!requiredResult.isValid) {
              error = requiredResult.message;
            }
          }
          break;
        case 'phone':
          if (value) {
            const result = await handleValidation(
              phoneValidationRule.validate!,
              value,
              formData,
              name
            );
            if (!result.isValid) {
              error = result.message;
            }
          }
          break;
        case 'website':
          if (value) {
            const result = await handleValidation(
              urlValidationRule.validate!,
              value,
              formData,
              name
            );
            if (!result.isValid) {
              error = result.message;
            }
          }
          break;
        case 'creditCard':
          if (value) {
            const result = await handleValidation(
              creditCardValidationRule.validate!,
              value,
              formData,
              name
            );
            if (!result.isValid) {
              error = result.message;
            }
          } else {
            const requiredResult = await handleValidation(
              requiredValidator,
              value,
              formData,
              'Credit card'
            );
            if (!requiredResult.isValid) {
              error = requiredResult.message;
            }
          }
          break;
        case 'age':
          if (value) {
            const ageValidator = createAgeValidationRule(18).validate!;
            const result = await handleValidation(
              ageValidator,
              value,
              formData,
              name
            );
            if (!result.isValid) {
              error = result.message;
            }
          } else {
            const requiredResult = await handleValidation(
              requiredValidator,
              value,
              formData,
              'Age'
            );
            if (!requiredResult.isValid) {
              error = requiredResult.message;
            }
          }
          break;
        case 'avatar': {
          const fileResult = await fileValidator(value);
          if (typeof fileResult === 'object' && !fileResult.isValid) {
            error = fileResult.message;
          }
          break;
        }
        default:
          break;
      }
    } catch (err) {
      console.error(err);
      error = 'Validation failed';
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );
    setTouched(allTouched);
    const validationPromises = Object.keys(formData).map(async (key) => {
      await validateField(key, formData[key]);
    });
    await Promise.all(validationPromises);

    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      alert('Form submitted successfully!');
    } else {
      alert('Please fix the errors before submitting.');
    }
  };

  return (
    <div className="formyx-form">
      <h2>Formyx Demo - Modular Validators & Performance Hooks</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          name="username"
          type="text"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
          touched={touched.username}
          validation={{
            validate: createValidatorWrapper(usernameValidationRule.validate!),
            required: true,
          }}
          placeholder="Choose a username"
          throttle={800}
          validationStrategy="throttle"
        />
        <InputField
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          validation={{
            validate: createValidatorWrapper(emailValidationRule.validate!),
            required: true,
          }}
          placeholder="your.email@example.com"
          debounce={500}
          validationStrategy="debounce"
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
          validation={{
            validate: createValidatorWrapper(passwordValidationRule.validate!),
            required: true,
          }}
          placeholder="Enter your password"
          validationStrategy="immediate"
        />
        <InputField
          name="phone"
          type="tel"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
          validation={{
            validate: createValidatorWrapper(phoneValidationRule.validate!),
            required: false,
          }}
          placeholder="+1 (555) 123-4567"
          debounce={400}
          validationStrategy="debounce"
        />
        <InputField
          name="website"
          type="url"
          label="Website"
          value={formData.website}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.website}
          touched={touched.website}
          validation={{
            validate: createValidatorWrapper(urlValidationRule.validate!),
            required: false,
          }}
          placeholder="https://example.com"
          debounce={500}
          validationStrategy="debounce"
        />
        <InputField
          name="creditCard"
          type="text"
          label="Credit Card"
          value={formData.creditCard}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.creditCard}
          touched={touched.creditCard}
          validation={{
            validate: createValidatorWrapper(
              creditCardValidationRule.validate!
            ),
            required: true,
          }}
          placeholder="1234 5678 9012 3456"
          throttle={600}
          validationStrategy="throttle"
        />
        <InputField
          name="age"
          type="number"
          label="Age"
          value={formData.age}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.age}
          touched={touched.age}
          validation={{
            validate: createValidatorWrapper(
              createAgeValidationRule(18).validate!
            ),
            required: true,
          }}
          placeholder="Enter your age"
          validationStrategy="immediate"
        />
        <InputField
          name="search"
          type="text"
          label="Product Search"
          value={formData.search}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.search}
          touched={touched.search}
          placeholder="Type to search products..."
          throttle={300}
          validationStrategy="throttle"
        />
        <InputField
          name="bio"
          type="textarea"
          label="Bio"
          value={formData.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.bio}
          touched={touched.bio}
          placeholder="Tell us about yourself..."
          rows={3}
          debounce={400}
          validationStrategy="debounce"
        />
        <InputField
          name="avatar"
          type="file"
          label="Profile Picture"
          value={formData.avatar}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.avatar}
          touched={touched.avatar}
          validation={{ validate: createValidatorWrapper(fileValidator) }}
          accept="image/*"
        />
        <button type="submit" className="formyx-submit-button">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default Form;
