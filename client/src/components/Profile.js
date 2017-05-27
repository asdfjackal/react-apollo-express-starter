import React, { Component } from 'react';
import {graphql, gql} from 'react-apollo'
import PropTypes from 'prop-types';

import EditProfile from './EditPofile';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
    }
  }

  render(){
    const user = this.props.user;

    return (
      <div>
        <p>You are logged in as {user.username}</p>
        {
          this.state.edit ?
          <p>Placeholder edit form</p> :
          (<div>
            {
              user.profile.firstName ?
              (<p>First name: {user.profile.firstName}</p>):
              (<p>No First Name on Record</p>)
            }
            {
              user.profile.lastName ?
              (<p>Last name: {user.profile.lastName}</p>):
              (<p>No Last Name on Record</p>)
            }
          </div>)
        }
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
