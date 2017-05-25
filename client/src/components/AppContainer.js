import React, { Component } from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider, graphql, gql, compose } from 'react-apollo';
import App from '../App'

class AppContainer extends Component{
  constructor(props){
    super(props)
    this.state={
      token: localStorage.getItem("authToken"),
    }
    this.updateToken = this.updateToken.bind(this);
  }

  updateToken(){
    this.setState({token: localStorage.getItem("authToken")});
  }

  render(){
    const { token } = this.state;
    const networkInterface = createNetworkInterface({
      uri: 'http://localhost:4000/graphql'
    });

    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};  // Create the header object if needed.
        }

        // get the authentication token from local storage if it exists
        if(token){
          req.options.headers.authorization = `Bearer ${token}`;
        }
        next();
      },
    }]);

    const registerMutation = gql`
      mutation register($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
          email
          username
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

    const AppWithMutations = compose(
      graphql(registerMutation, {
        name: 'register'
      }),
      graphql(loginMutation, {
        name: 'login'
      }),
      graphql(viewerQuery),
    )(App);

    const client = new ApolloClient({
      networkInterface: networkInterface,
    });

    return (
      <ApolloProvider client={client}>
        <AppWithMutations updateToken={this.updateToken}/>
      </ApolloProvider>
    )

  }
}

export default AppContainer;
