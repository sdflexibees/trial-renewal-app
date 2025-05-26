/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateJobRenewals = /* GraphQL */ `
  subscription OnCreateJobRenewals(
    $filter: ModelSubscriptionJobRenewalsFilterInput
  ) {
    onCreateJobRenewals(filter: $filter) {
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
export const onDeleteJobRenewals = /* GraphQL */ `
  subscription OnDeleteJobRenewals(
    $filter: ModelSubscriptionJobRenewalsFilterInput
  ) {
    onDeleteJobRenewals(filter: $filter) {
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
export const onUpdateJobRenewals = /* GraphQL */ `
  subscription OnUpdateJobRenewals(
    $filter: ModelSubscriptionJobRenewalsFilterInput
  ) {
    onUpdateJobRenewals(filter: $filter) {
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
