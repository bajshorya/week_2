import type { InputFieldProps } from "./types";
import type { FC } from "react";

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

export type UseDebounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay?: number
) => (...args: T) => void;

export type UseThrottle = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay?: number
) => (...args: T) => void;

export declare const Formyx: FC;
export declare const Form: FC;
export declare const InputField: FC<InputFieldProps>;

// Export hooks
export declare const useDebounce: UseDebounce;
export declare const useThrottle: UseThrottle;
