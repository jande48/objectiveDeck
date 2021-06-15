import React from 'react';
import './App.css';
import Home from './Components/Home'
import store from './redux/store'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavComponent from './Components/NavComponent'
import LoginContainer from './Components/LoginContainer'
import { Provider } from 'react-redux'

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <NavComponent/>
          <Home/>
          <Switch>
            {/* <Route path="/login" component={LoginContainer} /> 
            <Route path="/logout" component={LogoutContainer} /> 
            <Route path="/register" component={RegisterContainer} /> 
            <Route path="/account" component={AccountContainer} /> 
            <Route path="/resetPassword" component={ResetPasswordContainer} /> 
            <Route path="/" component={HomeComponent} /> */}
          </Switch>
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
