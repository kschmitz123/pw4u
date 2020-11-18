import { useState } from "react";
import { useHistory } from "react-router-dom";
import { deletePassword } from "../api/passwords";
import useAsync from "../hooks/useAsync";
import Button from "./Button";
import Header from "./Header";

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
      <Header />
      <h3> I want to delete the following password:</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={password} onChange={handleChange} />
        <button>Delete</button>
      </form>
      <Button onClick={() => history.push("/")}>Back</Button>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
    </div>
  );
}
