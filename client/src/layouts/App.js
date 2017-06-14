import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import AuthSignIn from '../pages/AuthSignIn';
import AuthJoin from '../pages/AuthJoin';
import EditProfile from '../pages/EditProfile';
import './App.css';
import logo from '../logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Apollo Express Starter</h2>
        </div>
        <p className="App-intro">
        </p>
        <Switch>
          <Route path="/profile" component={EditProfile} />
          <Route path="/signin" component={AuthSignIn} />
          <Route path="/join" component={AuthJoin} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
