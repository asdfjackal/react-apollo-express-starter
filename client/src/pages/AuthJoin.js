import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: this.props.errorMessage,
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
    const {username, email, password, confirmPassword} = this.state;
    if (password === confirmPassword){
      this.props.register({
        variables: {
          username,
          password,
          email,
        }
      }).then(() => {
        this.props.login({
          variables:{
            username,
            password,
          }
        }).then(({data}) => {
          if (data.createToken.token){
            localStorage.setItem("authToken", data.createToken.token);
            this.props.updateToken();
            this.props.history.push('/');
          }
        });
      });
    }else{
      this.setState({errorMessage: 'passwords do not match'})
    }
  }

  render() {
    return(
      <div>
        <button onClick={this.props.toggleForm}>Log In</button><br />
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
            Email:
            <input
              name="email"
              type="text"
              value={this.state.email}
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
          <label>
            Confirm Password:
            <input
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChange} />
          </label><br />
          <input type="submit" value="Register"/>
        </form><br />
        {this.state.errorMessage}
      </div>
    );
  }
}

AuthJoin.propTypes = {
  updateToken: PropTypes.func,
};

export default AuthJoin;
