import { useState } from "react";
import { useHistory } from "react-router-dom";
import { deletePassword } from "../api/passwords";
import useAsync from "../hooks/useAsync";

export default function Delete() {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { loading, error, doFetch } = useAsync(() => deletePassword(password));

  const handleSubmit = async (event) => {
    event.preventDefault();
    doFetch();
    alert("Password deleted");
    window.location.reload();
  };
  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <p> I want to delete the following password:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={password} onChange={handleChange} />
        <button>Delete</button>
      </form>
      <button onClick={() => history.push("/")}>Back</button>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
    </div>
  );
}
