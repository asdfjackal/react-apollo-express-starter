import React, { Component } from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import App from '../layouts/App'

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

    const client = new ApolloClient({
      networkInterface: networkInterface,
    });

    return (
      <ApolloProvider client={client}>
          <App updateToken={this.updateToken}/>
      </ApolloProvider>
    )

  }
}

export default AppContainer;
