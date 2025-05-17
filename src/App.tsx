import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Flex, Heading, Table, TableBody, TableCell, TableHead, TableRow, Tabs } from "@aws-amplify/ui-react";
// import RenewalsTable from "./ui-components/RenewalsTable";

const client = generateClient<Schema>();


function App() {
  const [jobRenewals, setTodos] = useState<Array<Schema["JobRenewals"]["type"]>>([]);

  useEffect(() => {
    client.models.JobRenewals.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    const renewals = {
      job_id: 1,
      date_of_renewal: new Date(2024, 12, 1),
      renewal_period: 12,
      new_client_pricing: 100.0,
      new_candidate_pricing: 50.0,
      new_hours: 40,
    };
    console.log("Create Renewal")
    client.models.JobRenewals.create(renewals);
  }

  function updateTodo() {
    console.log("Create Renewal for updates")
  }



  function getRenewals() {
    return <>
      <Flex id="Renewals"  >
        <Heading level={1} >Job Renewals</Heading>
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>Job ID</TableCell>
            <TableCell>Date of Renewal</TableCell>
            <TableCell>Renewal Period</TableCell>
            <TableCell>New Client Pricing</TableCell>
            <TableCell>New Candidate Pricing</TableCell>
            <TableCell>New Hours</TableCell>
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
                  {/* <Button onClick={() => updateRenewals(renewal.id)}>Update first</Button> */}
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </Flex>
    </>
  }
  
  return (


    <main>
      <Flex padding={"medium"} >
        <Heading level={1} children="Job Renewals" alignSelf={"center"}></Heading>
        <Tabs defaultValue="create" justifyContent={"stretch"}
          items={[
            { label: 'Renewals', value: 'renewal', content: (getRenewals()) },
            // { label: 'History', value: 'read', content: (getR())  },
          ]}
        />
      </Flex>
    </main>
  );
}

export default App;