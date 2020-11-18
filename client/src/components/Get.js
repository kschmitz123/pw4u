import { useState } from "react";
import { getPassword } from "../api/passwords";
import { useHistory } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import Button from "./Button";
import Header from "./Header";

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
      <Header />
      <h3> Show me the password for:</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={password} onChange={handleChange} />
      </form>
      <h3>{data}</h3>
      <div>
        <Button onClick={() => history.push("/")}>Back</Button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
    </div>
  );
}
