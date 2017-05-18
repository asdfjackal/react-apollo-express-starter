import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Authentication from './components/Authentication';

class App extends Component {
  constructor(props){
    super(props);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login(username, password){

  }

  register(username, email, password, confirmPassword){

  }

  logout(){

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React Apollo Express Starter</h2>
        </div>
        <p className="App-intro">
        </p>
        <Authentication login={this.login} register={this.register} />
      </div>
    );
  }
}

App.propTypes = {
  updateToken: PropTypes.func,
}

export default App;
