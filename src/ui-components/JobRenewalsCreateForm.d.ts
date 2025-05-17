import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobRenewalsCreateFormInputValues = {
    notes?: string;
    job_id?: number;
    date_of_renewal?: string;
    renewal_period?: number;
    new_client_pricing?: number;
    new_candidate_pricing?: number;
    new_hours?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type JobRenewalsCreateFormValidationValues = {
    notes?: ValidationFunction<string>;
    job_id?: ValidationFunction<number>;
    date_of_renewal?: ValidationFunction<string>;
    renewal_period?: ValidationFunction<number>;
    new_client_pricing?: ValidationFunction<number>;
    new_candidate_pricing?: ValidationFunction<number>;
    new_hours?: ValidationFunction<number>;
    status?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobRenewalsCreateFormOverridesProps = {
    JobRenewalsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    job_id?: PrimitiveOverrideProps<TextFieldProps>;
    date_of_renewal?: PrimitiveOverrideProps<TextFieldProps>;
    renewal_period?: PrimitiveOverrideProps<TextFieldProps>;
    new_client_pricing?: PrimitiveOverrideProps<TextFieldProps>;
    new_candidate_pricing?: PrimitiveOverrideProps<TextFieldProps>;
    new_hours?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type JobRenewalsCreateFormProps = React.PropsWithChildren<{
    overrides?: JobRenewalsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: JobRenewalsCreateFormInputValues) => JobRenewalsCreateFormInputValues;
    onSuccess?: (fields: JobRenewalsCreateFormInputValues) => void;
    onError?: (fields: JobRenewalsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: JobRenewalsCreateFormInputValues) => JobRenewalsCreateFormInputValues;
    onValidate?: JobRenewalsCreateFormValidationValues;
} & React.CSSProperties>;
export default function JobRenewalsCreateForm(props: JobRenewalsCreateFormProps): React.ReactElement;
