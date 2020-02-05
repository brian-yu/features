import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Form from './components/form/Form'
import CreateForm from './components/createForm/CreateForm'
import 'bulma/css/bulma.min.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">Itemz</Link>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/new">Create a Form</Link>
            </div>
          </div>
        </nav>
        <div>
          <Switch>
            <Route path="/new">
              <CreateForm />
            </Route>
            <Route path="/form/:id">
              <Form />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;


function Home() {
  return <h2>Home</h2>;
}
