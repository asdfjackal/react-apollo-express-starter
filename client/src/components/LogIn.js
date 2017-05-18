import React, { Component, PropTypes } from 'react';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
    const {username, password} = this.state;
    this.props.register(username, password);
  }

  render() {
    return(
      <div>
        <button onClick={this.props.toggleForm}>SignUp</button><br />
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
        {this.state.errorMessage}
      </div>
    );
  }
}

LogIn.propTypes = {
  login: PropTypes.func,
  toggleForm: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default LogIn;
