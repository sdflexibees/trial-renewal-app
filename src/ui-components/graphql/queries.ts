/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getJobRenewals = /* GraphQL */ `
  query GetJobRenewals($id: ID!) {
    getJobRenewals(id: $id) {
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
export const listJobRenewals = /* GraphQL */ `
  query ListJobRenewals(
    $filter: ModelJobRenewalsFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listJobRenewals(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
