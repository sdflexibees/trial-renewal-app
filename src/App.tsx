import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [jobRenewals, setTodos] = useState<Array<Schema["Job_Renewals"]["type"]>>([]);

  useEffect(() => {
    client.models.Job_Renewals.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Job_Renewals.create({ content: window.prompt("Todo content") });
  }

  function updateTodo(id: string) {
    client.models.Job_Renewals.update(id, { content: window.prompt("New todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
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
