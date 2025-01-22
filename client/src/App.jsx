import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://sig-gudep-bpp-server.vercel.app/") // Ganti dengan URL backend Vercel kamu
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return <h1>{message}</h1>;
}

export default App;
