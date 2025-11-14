export type FormValues = {
  name?: string;
  email?: string;
  message?: string;
};

export type FormProps = {
  onSubmit?: (values: FormValues) => void;
  submitLabel?: string;
};
