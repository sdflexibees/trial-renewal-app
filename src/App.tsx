import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator, Button, Card, Collection, Flex, Heading, Label, Link, Tabs, withAuthenticator } from "@aws-amplify/ui-react";
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
      <Flex id="Update"  >
        <JobRenewalsUpdateForm jobRenewals={jobRenewals.find((renewal) => renewal.id === id)} />
      </Flex>
    </>
  }
  function getRenewals() {
    return <>
      <Flex id="Renewals"  >
        {/* <Table  isPaginated={true} isSearchable={true} itemsPerPage={2} column={3} row={5}>
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
        </Table> */}

        <Collection items={jobRenewals} type="list" isPaginated={true} isSearchable={true} itemsPerPage={5} column={3} row={5}>
          {(item, index) =>
            <Card key={index} backgroundColor={"inherit"} border={"brown"}>
              Job Id: <Label children={item.job_id} /> , <br></br>
              Date of Renewal: <Label children={item.date_of_renewal} /> , <br></br>
              Renewal Period: <Label children={item.renewal_period} /> , <br></br>
              New Client Pricing: <Label children={item.new_client_pricing} /> , <br></br>
              New Candidate Pricing: <Label children={item.new_candidate_pricing} /> , <br></br>
              New Hours: <Label children={item.new_hours} /> , <br></br>
              Comment: <Label children={item.notes} /> <br></br>
              <p />
              <Button onClick={() => updateRenewals(item.id)}>Update</Button>
            </Card>
          }
        </Collection>
      </Flex>
    </>
  }
  function getForm() {
    return <>
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
            <Tabs defaultValue="renewalForm" justifyContent={"stretch"}
              items={[
                { label: 'Renewals', value: 'renewal', content: (getRenewals()) },
                { label: 'RenewalForm', value: 'renewalForm', content: (getForm()) },
              ]}
              isLazy
            />
          </main>
        )}
      </Authenticator>
    </Flex>

  );
}

export default withAuthenticator(App);
