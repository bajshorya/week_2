import React, { useState, useCallback } from "react";
import InputField from "./InputField";
import type { FieldValue, FormData } from "../types";
import { useDebounce, useThrottle } from "../hooks";

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    age: "",
    bio: "",
    country: "",
    subscribe: false,
    gender: "",
    avatar: null,
    search: "",
    priceRange: 50,
    rating: 3,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Remove unused variables
  // const [searchResults, setSearchResults] = useState<string[]>([]);
  // const [priceHistory, setPriceHistory] = useState<number[]>([]);

  // Email validation function - move to top to avoid use-before-declaration
  const validateEmailField = useCallback((email: string) => {
    let error = "";

    if (!email) {
      error = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error = "Email format is invalid (example: user@example.com)";
    }

    setErrors((prev) => ({
      ...prev,
      email: error,
    }));
  }, []);

  // Debounced email validation
  const debouncedEmailValidation = useDebounce((email: string) => {
    validateEmailField(email);
  }, 500);

  // Throttled search API calls
  const throttledSearch = useThrottle((query: string) => {
    // Remove console.log
    // console.log("Searching for:", query);

    if (query.length > 2) {
      // Simulate API call for search - remove unused setSearchResults
      // const mockResults = [
      //   `Result for "${query}" 1`,
      //   `Result for "${query}" 2`,
      //   `Result for "${query}" 3`
      // ];
      // setSearchResults(mockResults);
    } else {
      // setSearchResults([]);
    }
  }, 300);

  // Throttled price range tracking (for analytics/slider events)
  const throttledPriceTracking = useThrottle((price: number) => {
    // Price is provided for tracking/analytics; use 'price' to avoid unused param warning.
    void price;
    // Implement analytics tracking here, e.g. send to analytics service.
  }, 200);

  // Debounced bio validation (for character count/quality check)
  const debouncedBioValidation = useDebounce((bio: string) => {
    if (bio.length > 0) {
      let error = "";
      if (bio.length < 10) {
        error = "Bio should be at least 10 characters";
      } else if (bio.length > 500) {
        error = "Bio should be less than 500 characters";
      }
      setErrors((prev) => ({ ...prev, bio: error }));
    }
  }, 400);

  // Throttled username availability check
  const throttledUsernameCheck = useThrottle((username: string) => {
    // Simulate username availability API call - remove console.log
    // console.log("Checking username availability:", username);
    const takenUsernames = ["admin", "user", "test"];
    if (takenUsernames.includes(username.toLowerCase())) {
      setErrors((prev) => ({
        ...prev,
        username: "Username is already taken",
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

    // Apply different strategies based on input type
    switch (name) {
      case "email":
        if (typeof value === "string") {
          // Immediate UI update for empty field
          if (shouldValidate) {
            let immediateError = "";
            if (!value) {
              immediateError = "Email is required";
            }
            setErrors((prev) => ({ ...prev, email: immediateError }));
          }

          // Debounced detailed validation
          if (value) {
            debouncedEmailValidation(value);
          } else {
            setErrors((prev) => ({ ...prev, email: "" }));
          }
        }
        break;

      case "search":
        if (typeof value === "string") {
          // Throttled search execution
          throttledSearch(value);
        }
        break;

      case "priceRange":
        if (typeof value === "number") {
          // Throttled price tracking for analytics
          throttledPriceTracking(value);
        }
        break;

      case "bio":
        if (typeof value === "string") {
          // Debounced bio validation
          debouncedBioValidation(value);
        }
        break;

      case "username":
        // Throttled username availability check (simulated)
        if (typeof value === "string" && value.length > 2) {
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

      // Final validation on blur
      if (name === "email") {
        validateEmailField(formData.email as string);
      } else {
        validateField(name, formData[name]);
      }
    }
  };

  const validateField = (name: string, value: FieldValue) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value) {
          error = "Username is required";
        } else if ((value as string).length < 3) {
          error = "Username must be at least 3 characters";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if ((value as string).length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;

      case "age":
        if (value && (Number(value) < 18 || Number(value) > 100)) {
          error = "Age must be between 18 and 100";
        }
        break;

      case "country":
        if (!value) {
          error = "Please select a country";
        }
        break;

      case "rating":
        if (!value) {
          error = "Please select a rating";
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

  // Debounced form submission
  const debouncedSubmit = useDebounce((data: FormData) => {
    // Remove console.log
    // console.log("Form submitted:", data);

    // Final validation before submission
    validateEmailField(data.email as string);

    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      alert("Form submitted successfully!");
    }
  }, 300);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched on submit
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setTouched(allTouched);

    // Validate all fields before submission
    Object.keys(formData).forEach((key) => {
      if (key === "email") {
        validateEmailField(formData.email as string);
      } else {
        validateField(key, formData[key]);
      }
    });

    debouncedSubmit(formData);
  };

  const countryOptions = [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" },
    { label: "Australia", value: "au" },
  ];

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const ratingOptions = [
    { label: "⭐", value: "1" },
    { label: "⭐⭐", value: "2" },
    { label: "⭐⭐⭐", value: "3" },
    { label: "⭐⭐⭐⭐", value: "4" },
    { label: "⭐⭐⭐⭐⭐", value: "5" },
  ];

  return (
    <div className="formyx-form">
      <h2>Formyx Demo Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Username with Throttled Availability Check */}
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

        {/* Email with Debounced Validation */}
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

        {/* Password with Immediate Validation */}
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

        {/* Search with Throttled API Calls */}
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

        {/* Age with Immediate Validation */}
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

        {/* Bio with Debounced Length Validation */}
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

        {/* Rating with Throttled Feedback */}
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

        {/* Select Dropdown */}
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

        {/* Radio Buttons */}
        <InputField
          name="gender"
          type="radio"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          options={genderOptions}
        />

        {/* Checkbox */}
        <InputField
          name="subscribe"
          type="checkbox"
          label="Subscribe to newsletter"
          value={formData.subscribe}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* File Input */}
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
