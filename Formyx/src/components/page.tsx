import React, { useState, useCallback } from 'react';
import InputField from './InputField';
import type { FieldValue, FormData } from '../types';
import { useDebounce, useThrottle } from '../hooks';

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    age: '',
    bio: '',
    country: '',
    subscribe: false,
    gender: '',
    avatar: null,
    search: '',
    priceRange: 50,
    rating: 3,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmailField = useCallback((email: string) => {
    let error = '';

    if (!email) {
      error = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error = 'Email format is invalid (example: user@example.com)';
    }

    setErrors((prev) => ({
      ...prev,
      email: error,
    }));
  }, []);

  const debouncedEmailValidation = useDebounce((email: string) => {
    validateEmailField(email);
  }, 500);

  const throttledPriceTracking = useThrottle((price: number) => {
    void price;
  }, 200);

  const debouncedBioValidation = useDebounce((bio: string) => {
    if (bio.length > 0) {
      let error = '';
      if (bio.length < 10) {
        error = 'Bio should be at least 10 characters';
      } else if (bio.length > 500) {
        error = 'Bio should be less than 500 characters';
      }
      setErrors((prev) => ({ ...prev, bio: error }));
    }
  }, 400);

  const throttledUsernameCheck = useThrottle((username: string) => {
    const takenUsernames = ['admin', 'user', 'test'];
    if (takenUsernames.includes(username.toLowerCase())) {
      setErrors((prev) => ({
        ...prev,
        username: 'Username is already taken',
      }));
    }
  }, 800);

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
      case 'email':
        if (typeof value === 'string') {
          if (shouldValidate) {
            let immediateError = '';
            if (!value) {
              immediateError = 'Email is required';
            }
            setErrors((prev) => ({ ...prev, email: immediateError }));
          }

          if (value) {
            debouncedEmailValidation(value);
          } else {
            setErrors((prev) => ({ ...prev, email: '' }));
          }
        }
        break;

      case 'priceRange':
        if (typeof value === 'number') {
          throttledPriceTracking(value);
        }
        break;

      case 'bio':
        if (typeof value === 'string') {
          debouncedBioValidation(value);
        }
        break;

      case 'username':
        if (typeof value === 'string' && value.length > 2) {
          throttledUsernameCheck(value);
        }
        break;

      default:
        if (shouldValidate) {
          validateField(name, value);
        }
        break;
    }
  };

  const handleBlur = (name: string, isTouched = true) => {
    if (isTouched) {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      if (name === 'email') {
        validateEmailField(formData.email as string);
      } else {
        validateField(name, formData[name]);
      }
    }
  };

  const validateField = (name: string, value: FieldValue) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!value) {
          error = 'Username is required';
        } else if ((value as string).length < 3) {
          error = 'Username must be at least 3 characters';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if ((value as string).length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;

      case 'age':
        if (value && (Number(value) < 18 || Number(value) > 100)) {
          error = 'Age must be between 18 and 100';
        }
        break;

      case 'country':
        if (!value) {
          error = 'Please select a country';
        }
        break;

      case 'rating':
        if (!value) {
          error = 'Please select a rating';
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const debouncedSubmit = useDebounce((data: FormData) => {
    validateEmailField(data.email as string);

    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      alert('Form submitted successfully!');
    }
  }, 300);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );

    setTouched(allTouched);

    Object.keys(formData).forEach((key) => {
      if (key === 'email') {
        validateEmailField(formData.email as string);
      } else {
        validateField(key, formData[key]);
      }
    });

    debouncedSubmit(formData);
  };

  const countryOptions = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Australia', value: 'au' },
  ];

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const ratingOptions = [
    { label: '⭐', value: '1' },
    { label: '⭐⭐', value: '2' },
    { label: '⭐⭐⭐', value: '3' },
    { label: '⭐⭐⭐⭐', value: '4' },
    { label: '⭐⭐⭐⭐⭐', value: '5' },
  ];

  return (
    <div className="formyx-form">
      <h2>Formyx Demo Form</h2>

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
          required
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
          required
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
          required
          placeholder="Enter your password"
          validationStrategy="immediate"
        />

        <InputField
          name="search"
          type="text"
          label="Search Products"
          value={formData.search}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Type to search..."
          throttle={300}
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
          placeholder="Enter your age"
          min="18"
          max="100"
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
          name="rating"
          type="radio"
          label="How would you rate our service?"
          value={formData.rating}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.rating}
          touched={touched.rating}
          options={ratingOptions}
          throttle={500}
          validationStrategy="throttle"
        />

        <InputField
          name="country"
          type="select"
          label="Country"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.country}
          touched={touched.country}
          options={countryOptions}
          required
        />

        <InputField
          name="gender"
          type="radio"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          options={genderOptions}
        />

        <InputField
          name="subscribe"
          type="checkbox"
          label="Subscribe to newsletter"
          value={formData.subscribe}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <InputField
          name="avatar"
          type="file"
          label="Profile Picture"
          value={formData.avatar}
          onChange={handleChange}
          onBlur={handleBlur}
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
