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
    client.models.JobRenewals.update(id, { content: window.prompt("New todo content") });
  }

  return (
    <main>
      <h1>Job Renewals</h1>
      <button onClick={createTodo}> + new</button>
      <ul>
        {jobRenewals.map((renewal) => (
          <li key={renewal.id}>{renewal.notes}</li>
        ))}
      </ul>
      <button onClick={() => updateTodo(jobRenewals[0]?.id)}>Update first</button>
    </main>
  );
}

export default App;
