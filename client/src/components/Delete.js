import { useState } from "react";
import { useHistory } from "react-router-dom";
import { deletePassword } from "../api/passwords";

export default function Delete() {
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await deletePassword(password);
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
    </div>
  );
}
