import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import Home from '../pages/Home';
import AuthSignIn from '../pages/AuthSignIn';
import AuthJoin from '../pages/AuthJoin';
import EditProfile from '../pages/EditProfile';
import Navigation from '../components/Navigation';
import './App.css';
import logo from '../logo.svg';

class App extends Component {
  render() {

    const viewerQuery = gql`
      query{
        viewer{
          id
          username
          email
          profile {
            id
            firstName
            lastName
          }
        }
      }
    `;

    const loginMutation = gql`
      mutation login($username: String!, $password: String!) {
        createToken(username: $username, password: $password) {
          token
        }
      }
    `;

    const NavigationWithQuery = graphql(viewerQuery)(Navigation);
    const AuthSignInWithMutation = graphql(loginMutation)(AuthSignIn)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Apollo Express Starter</h2>
        </div>
        <NavigationWithQuery updateToken={this.props.updateToken}/>
        <Switch>
          <Route path="/profile" component={EditProfile} />
          <Route path="/signin" render={props => (
            <AuthSignInWithMutation updateToken={this.props.updateToken} />
          )
          } />
          <Route path="/join" component={AuthJoin} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  updateToken: PropTypes.func,
};

export default App;
