import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import { useEffect, useState } from "react";

function App() {
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      const newPassword = await getPassword("wifi");
      setPassword(newPassword);
    };
    doFetch();
  }, []);
  return (
    <div className="App">
      <h1>Password Manager</h1>
      <h3>{password}</h3>
    </div>
  );
}

export default App;
