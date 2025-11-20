import React from "react";
import Form from "./components/page";
import InputField from "./components/InputField";
import { useDebounce, useThrottle } from "./hooks";
import "./styles/formyx.css";

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
} from "./types";
