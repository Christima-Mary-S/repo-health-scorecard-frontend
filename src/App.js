import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [ping, setPing] = useState(null);
  const [error, setError] = useState(null);

  // On first render, call the /ping endpoint
  useEffect(() => {
    axios
      .get("/ping")
      .then((res) => setPing(res.data.pong))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Repo Health Scorecard</h1>
      {ping !== null && <p>Backend Ping Response: {ping.toString()}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {ping === null && !error && <p>Loading ping…</p>}
    </div>
  );
}

export default App;
