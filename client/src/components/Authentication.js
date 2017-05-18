import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogIn from './LogIn';
import SignUp from './SignUp';

class Authentication extends Component {
  constructor( props ){
    super(props);
    this.state = {
      register: false,
      username: null,
      password: null,
    };

    this.toggleForm = this.toggleForm.bind(this);
  }

  renderLogIn( login ){
    return (
      <LogIn login={login} toggleForm={this.toggleForm} errorMessage="" />
    )
  }

  renderSignUp( register ){
    return (
      <SignUp register={register} toggleForm={this.toggleForm} errorMessage="" />
    )
  }

  toggleForm(){
    const register = this.state.register;
    this.setState({register: !register})
  }

  render(){
    const { login, register } = this.props;

    return (
      <div>
        {
          this.state.register
          ? this.renderSignUp( register )
          : this.renderLogIn( login )
        }
      </div>
    );
  }
}

Authentication.propTypes = {
  login: PropTypes.func,
  register: PropTypes.func,
};

export default Authentication;
