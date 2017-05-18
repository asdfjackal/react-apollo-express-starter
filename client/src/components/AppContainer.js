import React, { Component } from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import App from '../App'

class AppContainer extends Component{
  constructor(props){
    super(props)
    this.state={
      token: localStorage.getItem("authToken"),
    }
    this.updateToken = this.updateToken.bind(this);
  }

  updateToken(newToken){
    this.setState({token: localStorage.getItem("authToken")});
  }

  render(){
    const { token } = this.state;
    const networkInterface = createNetworkInterface({
      uri: 'localhost:4000/graphql'
    });

    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};  // Create the header object if needed.
        }

        // get the authentication token from local storage if it exists
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
      },
    }]);

    const client = new ApolloClient({
      networkInterface: networkInterface,
    });

    return (
      <ApolloProvider client={client}>
        <App updateToken={this.updateToken} />
      </ApolloProvider>
    )

  }
}

export default AppContainer;
