import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
  render(){
    const user = this.props.user;
    return (
      <div>
        <p>You are logged in as {user.username}</p>
        <button onClick={this.props.logout}>Logout</button>
      </div>

    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.required,
    email: PropTypes.string.required,
    profile: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.required,
      lastName: PropTypes.string.required,
    })
  }).isRequired,
  logout: PropTypes.func.isRequired,
}

export default Profile;
