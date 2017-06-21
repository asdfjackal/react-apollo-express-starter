import React, { Component } from 'react';
import PropTypes from 'prop-types';


class AuthSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {username, password} = this.state;
    this.props.mutate({
      variables: {
        username,
        password,
      }
    }).then(({data}) => {
      if (data.createToken.token){
        localStorage.setItem("authToken", data.createToken.token);
        this.props.updateToken();
      }
    }).catch((error) => {
      console.log('Error occured while loggin in', error);
    });
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange} />
          </label><br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange} />
          </label><br />

          <input type="submit" value="Log In"/>
        </form><br />
      </div>
    );
  }
}

AuthSignIn.propTypes = {
  updateToken: PropTypes.func,
};

export default AuthSignIn;
