import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator, Button, Flex, Heading, Link, Table, TableBody, TableCell, TableHead, TableRow, Tabs, withAuthenticator } from "@aws-amplify/ui-react";
import JobRenewalsCreateForm from "./ui-components/JobRenewalsCreateForm";
import JobRenewalsUpdateForm from "./ui-components/JobRenewalsUpdateForm";
// import RenewalsTable from "./ui-components/RenewalsTable";

const client = generateClient<Schema>();


function App() {
  const [jobRenewals, setRenewals] = useState<Array<Schema["JobRenewals"]["type"]>>([]);

  useEffect(() => {
    client.models.JobRenewals.observeQuery().subscribe({
      next: (data) => setRenewals([...data.items]),
    });
  }, []);
  const fetchJobRenewals = async () => {
    const { data: items } = await client.models.JobRenewals.list();
    setRenewals(items);
  };
  useEffect(() => {
    fetchJobRenewals();
  }, []);
  function updateRenewals(id: any) {
    return <>
      <Heading level={5}> Fill the form based on your feedback from the interview. </Heading>
      <Flex id="Create"  >
        <JobRenewalsUpdateForm />
      </Flex>
    </>
  }
  function getRenewals() {
    return <>
      <Flex id="Renewals"  >
        <Table  >
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Date of Renewal</TableCell>
              <TableCell>Renewal Period</TableCell>
              <TableCell>New Client Pricing</TableCell>
              <TableCell>New Candidate Pricing</TableCell>
              <TableCell>New Hours</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobRenewals.map((renewal) => (

              <TableRow key={renewal.id}>
                <TableCell>{renewal.job_id}</TableCell>
                <TableCell>{renewal.date_of_renewal}</TableCell>
                <TableCell>{renewal.renewal_period}</TableCell>
                <TableCell>{renewal.new_client_pricing}</TableCell>
                <TableCell>{renewal.new_candidate_pricing}</TableCell>
                <TableCell>{renewal.new_hours}</TableCell>

                <TableCell>
                  <Button onClick={() => updateRenewals(renewal.id)}>Update first</Button>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </Flex>
    </>
  }
  function getForm() {
    return <>
      <Heading level={5}> Fill the form based on your feedback from the interview. </Heading>
      <Flex id="RenewalForm"  >
        <JobRenewalsCreateForm />
      </Flex>
    </>
  }
  return (

     <Flex padding={"medium"} >
      <Authenticator>
        {({ signOut }) => (
          <main>
            <Heading level={1} children="Renewals" alignSelf={"center"}></Heading>

            <Link children="Signout" onClick={signOut} alignSelf={"end"} />
              <Tabs defaultValue="Renewals" justifyContent={"stretch"}
                items={[
                   { label: 'Renewals', value: 'renewal', content: (getRenewals()) },
                    { label: 'RenewalForm', value: 'RenewalForm', content: (getForm()) },

                ]}
              />
          </main>
        )}
      </Authenticator>
    </Flex>

  );
}

export default withAuthenticator(App);
