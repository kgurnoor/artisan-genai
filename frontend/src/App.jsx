import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.text())
      .then(setMessage);
  }, []);

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold text-red-800">{message}</h1>
    </div>
  );
}

export default App;
