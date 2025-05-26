/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createJobRenewals } from "./graphql/mutations";
const client = generateClient();
export default function JobRenewalsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    notes: "",
    job_id: "",
    date_of_renewal: "",
    renewal_period: "",
    new_client_pricing: "",
    new_candidate_pricing: "",
    new_hours: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  };
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [job_id, setJob_id] = React.useState(initialValues.job_id);
  const [date_of_renewal, setDate_of_renewal] = React.useState(
    initialValues.date_of_renewal
  );
  const [renewal_period, setRenewal_period] = React.useState(
    initialValues.renewal_period
  );
  const [new_client_pricing, setNew_client_pricing] = React.useState(
    initialValues.new_client_pricing
  );
  const [new_candidate_pricing, setNew_candidate_pricing] = React.useState(
    initialValues.new_candidate_pricing
  );
  const [new_hours, setNew_hours] = React.useState(initialValues.new_hours);
  const [status, setStatus] = React.useState(initialValues.status);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setNotes(initialValues.notes);
    setJob_id(initialValues.job_id);
    setDate_of_renewal(initialValues.date_of_renewal);
    setRenewal_period(initialValues.renewal_period);
    setNew_client_pricing(initialValues.new_client_pricing);
    setNew_candidate_pricing(initialValues.new_candidate_pricing);
    setNew_hours(initialValues.new_hours);
    setStatus(initialValues.status);
    setCreatedAt(initialValues.createdAt);
    setUpdatedAt(initialValues.updatedAt);
    setErrors({});
  };
  const validations = {
    notes: [],
    job_id: [],
    date_of_renewal: [],
    renewal_period: [],
    new_client_pricing: [],
    new_candidate_pricing: [],
    new_hours: [],
    status: [],
    createdAt: [],
    updatedAt: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          notes,
          job_id,
          date_of_renewal,
          renewal_period,
          new_client_pricing,
          new_candidate_pricing,
          new_hours,
          status,
          createdAt,
          updatedAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createJobRenewals.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "JobRenewalsCreateForm")}
      {...rest}
    >
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes: value,
              job_id,
              date_of_renewal,
              renewal_period,
              new_client_pricing,
              new_candidate_pricing,
              new_hours,
              status,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.notes ?? value;
          }
          if (errors.notes?.hasError) {
            runValidationTasks("notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("notes", notes)}
        errorMessage={errors.notes?.errorMessage}
        hasError={errors.notes?.hasError}
        {...getOverrideProps(overrides, "notes")}
      ></TextField>
      <TextField
        label="Job id"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={job_id}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id: value,
              date_of_renewal,
              renewal_period,
              new_client_pricing,
              new_candidate_pricing,
              new_hours,
              status,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.job_id ?? value;
          }
          if (errors.job_id?.hasError) {
            runValidationTasks("job_id", value);
          }
          setJob_id(value);
        }}
        onBlur={() => runValidationTasks("job_id", job_id)}
        errorMessage={errors.job_id?.errorMessage}
        hasError={errors.job_id?.hasError}
        {...getOverrideProps(overrides, "job_id")}
      ></TextField>
      <TextField
        label="Date of renewal"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={date_of_renewal}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              date_of_renewal: value,
              renewal_period,
              new_client_pricing,
              new_candidate_pricing,
              new_hours,
              status,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.date_of_renewal ?? value;
          }
          if (errors.date_of_renewal?.hasError) {
            runValidationTasks("date_of_renewal", value);
          }
          setDate_of_renewal(value);
        }}
        onBlur={() => runValidationTasks("date_of_renewal", date_of_renewal)}
        errorMessage={errors.date_of_renewal?.errorMessage}
        hasError={errors.date_of_renewal?.hasError}
        {...getOverrideProps(overrides, "date_of_renewal")}
      ></TextField>
      <TextField
        label="Renewal period"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={renewal_period}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              date_of_renewal,
              renewal_period: value,
              new_client_pricing,
              new_candidate_pricing,
              new_hours,
              status,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.renewal_period ?? value;
          }
          if (errors.renewal_period?.hasError) {
            runValidationTasks("renewal_period", value);
          }
          setRenewal_period(value);
        }}
        onBlur={() => runValidationTasks("renewal_period", renewal_period)}
        errorMessage={errors.renewal_period?.errorMessage}
        hasError={errors.renewal_period?.hasError}
        {...getOverrideProps(overrides, "renewal_period")}
      ></TextField>
      <TextField
        label="New client pricing"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={new_client_pricing}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              date_of_renewal,
              renewal_period,
              new_client_pricing: value,
              new_candidate_pricing,
              new_hours,
              status,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.new_client_pricing ?? value;
          }
          if (errors.new_client_pricing?.hasError) {
            runValidationTasks("new_client_pricing", value);
          }
          setNew_client_pricing(value);
        }}
        onBlur={() =>
          runValidationTasks("new_client_pricing", new_client_pricing)
        }
        errorMessage={errors.new_client_pricing?.errorMessage}
        hasError={errors.new_client_pricing?.hasError}
        {...getOverrideProps(overrides, "new_client_pricing")}
      ></TextField>
      <TextField
        label="New candidate pricing"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={new_candidate_pricing}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              date_of_renewal,
              renewal_period,
              new_client_pricing,
              new_candidate_pricing: value,
              new_hours,
              status,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.new_candidate_pricing ?? value;
          }
          if (errors.new_candidate_pricing?.hasError) {
            runValidationTasks("new_candidate_pricing", value);
          }
          setNew_candidate_pricing(value);
        }}
        onBlur={() =>
          runValidationTasks("new_candidate_pricing", new_candidate_pricing)
        }
        errorMessage={errors.new_candidate_pricing?.errorMessage}
        hasError={errors.new_candidate_pricing?.hasError}
        {...getOverrideProps(overrides, "new_candidate_pricing")}
      ></TextField>
      <TextField
        label="New hours"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={new_hours}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              date_of_renewal,
              renewal_period,
              new_client_pricing,
              new_candidate_pricing,
              new_hours: value,
              status,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.new_hours ?? value;
          }
          if (errors.new_hours?.hasError) {
            runValidationTasks("new_hours", value);
          }
          setNew_hours(value);
        }}
        onBlur={() => runValidationTasks("new_hours", new_hours)}
        errorMessage={errors.new_hours?.errorMessage}
        hasError={errors.new_hours?.hasError}
        {...getOverrideProps(overrides, "new_hours")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              date_of_renewal,
              renewal_period,
              new_client_pricing,
              new_candidate_pricing,
              new_hours,
              status: value,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              date_of_renewal,
              renewal_period,
              new_client_pricing,
              new_candidate_pricing,
              new_hours,
              status,
              createdAt: value,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Updated at"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={updatedAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              date_of_renewal,
              renewal_period,
              new_client_pricing,
              new_candidate_pricing,
              new_hours,
              status,
              createdAt,
              updatedAt: value,
            };
            const result = onChange(modelFields);
            value = result?.updatedAt ?? value;
          }
          if (errors.updatedAt?.hasError) {
            runValidationTasks("updatedAt", value);
          }
          setUpdatedAt(value);
        }}
        onBlur={() => runValidationTasks("updatedAt", updatedAt)}
        errorMessage={errors.updatedAt?.errorMessage}
        hasError={errors.updatedAt?.hasError}
        {...getOverrideProps(overrides, "updatedAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
