import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [jobRenewals, setTodos] = useState<Array<Schema["JobRenewals"]["type"]>>([]);

  useEffect(() => {
    client.models.JobRenewals.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.JobRenewals.create({ notes: window.prompt("Todo content") });
  }

  function updateTodo(id: integer) {
    client.models.JobRenewals.update(id, { notes: window.prompt("New todo content") });
  }

  return (
    <main>
      <h1>Job Renewals</h1>
      <button onClick={createTodo}> + new</button>
      <table>
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
      </table>
    </main>
  );
}

export default App;
