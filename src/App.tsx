import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();
const renewals = client.models.JobRenewals.create({
  notes: 'New todo content', job_id: 1, date_of_renewal: new Date(), 
  renewal_period: 1, new_client_pricing: 0, new_candidate_pricing: 0, new_hours: 0, status: 'active' })

function App() {
  const [jobRenewals, setTodos] = useState<Array<Schema["JobRenewals"]["type"]>>([]);

  useEffect(() => {
    client.models.JobRenewals.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    console.log("Create Renewal")
    client.models.JobRenewals.create(renewals);
  }

  function updateTodo(id: integer) {
    client.models.JobRenewals.update(id, { notes: window.prompt("New todo content") });
  }

  return (
    <main>
      <h1>Job Renewals</h1>
      <button onClick={createTodo ()}> + new</button>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Date of Renewal</th>
            <th>Renewal Period</th>
            <th>New Client Pricing</th>
            <th>New Candidate Pricing</th>
            <th>New Hours</th>
          </tr>
        </thead>
        <tbody>
          {jobRenewals.map((renewal) => (

            <tr key={renewal.id}>
              <td>{renewal.job_id}</td>
              <td>{renewal.date_of_renewal}</td>
              <td>{renewal.renewal_period}</td>
              <td>{renewal.new_candidate_pricing}</td>
              <td>{renewal.new_hours}</td>

              <td>
                <button onClick={() => updateTodo(renewal.id)}>Update first</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;