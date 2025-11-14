import React$1 from 'react';

type PageProps = {
    title: string;
    children: React.ReactNode;
};

declare const Page: React$1.FC<PageProps>;

type FormValues = {
    name?: string;
    email?: string;
    message?: string;
};
type FormProps = {
    onSubmit?: (values: FormValues) => void;
    submitLabel?: string;
};

declare const Form: React$1.FC<FormProps>;

export { Form, Page };
