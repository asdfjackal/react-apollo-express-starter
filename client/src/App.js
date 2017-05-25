import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import logo from './logo.svg';
import Authentication from './components/Authentication';
import Profile from './components/Profile';

class App extends Component {
  constructor(props){
    super(props);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(username, password){
    this.props.login({
      variables: {
        username,
        password,
      }
    }).then(({data}) => {
      localStorage.setItem("authToken", data.createToken.token);
      this.props.updateToken();
    }).catch((error) => {
      console.log('Error occured while loggin in', error);
    });
  }

  register(username, email, password){
    this.props.register({
      variables: {
        username,
        password,
        email,
      }
    }).then(() => {
      this.login(username, password);
    });
  }

  logout(){
    localStorage.removeItem("authToken");
    this.props.updateToken();
  }

  render() {
    const viewer = this.props.data.viewer;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Apollo Express Starter</h2>
        </div>
        <p className="App-intro">
        </p>
        {
          viewer ?
          <Profile user={viewer} logout={this.logout} /> :
          <Authentication login={this.login} register={this.register} />
        }
      </div>
    );
  }
}

App.propTypes = {
  updateToken: PropTypes.func,
}

export default App;
