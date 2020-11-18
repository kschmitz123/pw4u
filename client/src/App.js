import "./App.css";
import { deletePassword, getPassword } from "./api/passwords";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState(null);
  const [searchPassword, setSearchPassword] = useState("");

  const handleChange = async (event) => {
    setSearchPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPassword = await getPassword(searchPassword);
    setPassword(newPassword);
  };

  const handleClick = async () => {
    await deletePassword(searchPassword);
    alert("Password deleted");
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>Password Manager</h1>

      <p> Show me the password for:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchPassword} onChange={handleChange} />
      </form>
      <h3>{password}</h3>
      {password && <button onClick={handleClick}>Delete</button>}
    </div>
  );
}

export default App;
