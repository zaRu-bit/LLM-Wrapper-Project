import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <div>
      <h1>React & Flask Connection</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;