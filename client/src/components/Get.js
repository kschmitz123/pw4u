import { useState } from "react";
import { getPassword } from "../api/passwords";
import { useHistory } from "react-router-dom";

export default function Get() {
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPassword, setSearchPassword] = useState("");
  const history = useHistory();
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

  return (
    <div>
      <p> Show me the password for:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchPassword} onChange={handleChange} />
      </form>
      <h3>{password}</h3>
      <div>
        <button onClick={() => history.push("/")}>Back</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
    </div>
  );
}
