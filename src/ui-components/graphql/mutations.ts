/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createJobRenewals = /* GraphQL */ `
  mutation CreateJobRenewals(
    $condition: ModelJobRenewalsConditionInput
    $input: CreateJobRenewalsInput!
  ) {
    createJobRenewals(condition: $condition, input: $input) {
      createdAt
      date_of_renewal
      id
      job_id
      new_candidate_pricing
      new_client_pricing
      new_hours
      notes
      renewal_period
      status
      updatedAt
      __typename
    }
  }
`;
export const deleteJobRenewals = /* GraphQL */ `
  mutation DeleteJobRenewals(
    $condition: ModelJobRenewalsConditionInput
    $input: DeleteJobRenewalsInput!
  ) {
    deleteJobRenewals(condition: $condition, input: $input) {
      createdAt
      date_of_renewal
      id
      job_id
      new_candidate_pricing
      new_client_pricing
      new_hours
      notes
      renewal_period
      status
      updatedAt
      __typename
    }
  }
`;
export const updateJobRenewals = /* GraphQL */ `
  mutation UpdateJobRenewals(
    $condition: ModelJobRenewalsConditionInput
    $input: UpdateJobRenewalsInput!
  ) {
    updateJobRenewals(condition: $condition, input: $input) {
      createdAt
      date_of_renewal
      id
      job_id
      new_candidate_pricing
      new_client_pricing
      new_hours
      notes
      renewal_period
      status
      updatedAt
      __typename
    }
  }
`;
