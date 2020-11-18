import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Get from "./components/Get";
import Delete from "./components/Delete";
import Set from "./components/Set";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <h1>Password Manager</h1>
            <p>What do you want to do?</p>
            <div>
              <Link to="/get">Get passwords</Link>
            </div>
            <div>
              {" "}
              <Link to="/delete">Delete passwords</Link>
            </div>
            <div>
              <Link to="/set">Set new passwords</Link>
            </div>
          </Route>
          <Route path="/get">
            <Get />
          </Route>
          <Route path="/delete">
            <Delete />
          </Route>
          <Route path="/set">
            <Set />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
