import React from 'react';
import './App.css';
import Home from './Components/Home'
import store from './redux/store'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavComponent from './Components/NavComponent'
import { Provider } from 'react-redux'

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <NavComponent/>
          <Switch></Switch>
        </Router>
      </Provider>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br/><p>From server: <span id="server"> </span></p>
      </header> */}
      {/* <div className="infographicBlock">
        <Home />
      </div> */}
    </div>
  );
}

export default App;
