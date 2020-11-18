import { useState } from "react";
import { getPassword } from "../api/passwords";
import { useHistory } from "react-router-dom";
import useAsync from "../hooks/useAsync";

export default function Get() {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword(password)
  );

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    doFetch();
  };

  return (
    <div>
      <p> Show me the password for:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={password} onChange={handleChange} />
      </form>
      <h3>{data}</h3>
      <div>
        <button onClick={() => history.push("/")}>Back</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
    </div>
  );
}
