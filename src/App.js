import React from 'react';
import './App.css';
import Kart from './components/kart';
import CartsInput from './components/CartsInput';
import About from './components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    //<CartsInput />
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Kart />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

/*function Home() {
  return <h2>Home</h2>;
}


function About() {
  return <h2>About</h2>;
}
*/

function Users() {
  return <h2>Users</h2>;
}


// food store
export default App;
