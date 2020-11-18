import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Get from "./components/Get";
import Delete from "./components/Delete";
import Set from "./components/Set";
import GlobalStyle from "./GlobalStyle";
import styled from "styled-components/macro";

const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;

  > a {
    text-decoration: none;
    color: white;
  }
  > a:hover {
    text-decoration: underline;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <h1>Password Manager</h1>
            <h3>What do you want to do?</h3>
            <Links>
              <Link to="/get">Get passwords</Link>

              <Link to="/delete">Delete passwords</Link>

              <Link to="/set">Set new passwords</Link>
            </Links>
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
