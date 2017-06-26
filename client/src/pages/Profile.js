import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {

  render(){
    const user = this.props.data.viewer;

    return (
      <div>
        {
        (user === undefined) ?
        <p>Loading...</p> :
        <div>
          <p>You are logged in as {user.username}</p>
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
          <Link to="/profile/edit">Edit</Link>
        </div>}
      </div>

    );
  }
}

export default Profile;
