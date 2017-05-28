import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditProfile from './EditProfile';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
    }

    this.updateProfile = this.updateProfile.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  updateProfile(firstName, lastName){
    this.props.mutate({
      variables: {
        id: this.props.userData.viewer.profile.id,
        firstName,
        lastName,
      }
    }).then(() => {
      this.props.userData.refetch();
    })
  }

  toggleForm(){
    const edit = this.state.edit;
    this.setState({edit: !edit});
  }

  render(){
    const user = this.props.userData.viewer;

    return (
      <div>
        <p>You are logged in as {user.username}</p>
        {
          this.state.edit ?
          <EditProfile profile={this.props.userData.viewer.profile} updateProfile={this.updateProfile}/> :
          <div>
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
          </div>
        }
        <button onClick={this.toggleForm}>
          {this.state.edit ? "Cancel" : "Edit"}
        </button><br />
        <button onClick={this.props.logout}>Logout</button>
      </div>

    );
  }
}

Profile.propTypes = {
  userData: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

export default Profile;
