import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Get from "./components/Get";
import Delete from "./components/Delete";
import Set from "./components/Set";
import GlobalStyle from "./GlobalStyle";
import styled from "styled-components/macro";
import GIF from "./animation_safe.gif";

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Gif = styled.img`
  border-radius: 25px;
  margin-top: 20px;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <header>
              <h1>Password Manager</h1>
            </header>
            <h3>What do you want to do?</h3>
            <Container>
              <Gif src={GIF} alt="safe" />
              <Links>
                <Link to="/get">Get password</Link>
                <Link to="/delete">Delete password</Link>
                <Link to="/set">Set new password / Update password</Link>
              </Links>
            </Container>
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
