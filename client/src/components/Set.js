import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postPassword } from "../api/passwords";
import useAsync from "../hooks/useAsync";
import Button from "./Button";
import Header from "./Header";

export default function Set() {
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();
  const { loading, error, doFetch } = useAsync(() =>
    postPassword(password, value)
  );

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleNewSubmit = async (event) => {
    event.preventDefault();
    doFetch();
    alert(`Password for ${password} set`);
    window.location.reload();
  };

  return (
    <div>
      <Header />
      <h3>Set new password / Update password</h3>
      <form onSubmit={handleNewSubmit}>
        <input
          type="text"
          placeholder="passwordname"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="text"
          placeholder="passwordvalue"
          value={value}
          onChange={handleValueChange}
        />
        <button type="submit">Submit</button>
      </form>
      <Button onClick={() => history.push("/")}>Back</Button>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
    </div>
  );
}
