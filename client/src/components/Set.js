import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postPassword } from "../api/passwords";

export default function Set() {
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleNewSubmit = async (event) => {
    event.preventDefault();
    await postPassword(password, value);
    alert(`Password for ${password} set`);
    window.location.reload();
  };

  return (
    <div>
      <p>Set new password</p>
      <form onSubmit={handleNewSubmit}>
        <input type="text" value={password} onChange={handlePasswordChange} />
        <input type="text" value={value} onChange={handleValueChange} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => history.push("/")}>Back</button>
    </div>
  );
}
