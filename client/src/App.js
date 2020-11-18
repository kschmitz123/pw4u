import "./App.css";
import { deletePassword, getPassword, postPassword } from "./api/passwords";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [newValue, setNewValue] = useState("");
  const [searchPassword, setSearchPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setSearchPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const newPassword = await getPassword(searchPassword);
      setPassword(newPassword);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    await deletePassword(searchPassword);
    alert("Password deleted");
    window.location.reload();
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleNewValueChange = (event) => {
    setNewValue(event.target.value);
  };

  const handleNewSubmit = async (event) => {
    event.preventDefault();
    await postPassword(newPassword, newValue);
  };

  return (
    <div className="App">
      <h1>Password Manager</h1>

      <p> Show me the password for:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchPassword} onChange={handleChange} />
      </form>
      <h3>{password}</h3>
      <p>Set new password</p>
      <form onSubmit={handleNewSubmit}>
        <input
          type="text"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <input type="text" value={newValue} onChange={handleNewValueChange} />
        <button type="submit">Click</button>
      </form>

      {password && (
        <div>
          <button onClick={handleClick}>Delete</button>
          <button onClick={() => window.location.reload()}>Back</button>
        </div>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default App;
