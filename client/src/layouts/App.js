import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { graphql, gql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import Home from '../pages/Home';
import AuthSignIn from '../pages/AuthSignIn';
import AuthJoin from '../pages/AuthJoin';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import Navigation from '../components/Navigation';
import './App.css';
import logo from '../resources/logo.svg';

class App extends Component {
  render() {

    const registerMutation = gql`
      mutation register($username: String!, $email: String!, $password: String!, $captcha: String!) {
        createUser(username: $username, email: $email, password: $password, captcha: $captcha) {
          email
          username
        }
      }
    `;

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

    const updateProfileMutation = gql`
      mutation($id:Int!, $firstName:String!, $lastName:String!){
        updateUserProfile(id: $id, firstName:$firstName, lastName:$lastName){
          firstName
          lastName
        }
      }
    `;

    const NavigationWithQuery = graphql(viewerQuery)(withRouter(Navigation));
    const AuthSignInWithMutation = graphql(loginMutation)(withRouter(AuthSignIn));
    const ProfileWithQuery = graphql(viewerQuery)(Profile);
    const EditProfileWithQueryAndMutation = compose(
      graphql(viewerQuery),
      graphql(updateProfileMutation),
    )(withRouter(EditProfile));
    const AuthJoinWithMutations = compose(
      graphql(registerMutation, {
        name: 'register'
      }),
      graphql(loginMutation, {
        name: 'login'
      }),
    )(withRouter(AuthJoin));

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Apollo Express Starter</h2>
        </div>
        <NavigationWithQuery updateToken={this.props.updateToken}/>
        <Switch>
          <Route path="/join" render={props => (
            <AuthJoinWithMutations updateToken={this.props.updateToken} />
          )
          } />
          <Route path="/signin" render={props => (
            <AuthSignInWithMutation updateToken={this.props.updateToken} />
          )
          } />
          <Route path="/profile/edit" component={EditProfileWithQueryAndMutation} />
          <Route path="/profile" component={ProfileWithQuery} />
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
