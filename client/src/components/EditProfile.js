import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: this.props.profile.firstName,
      lastName: this.props.profile.lastName,
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
    const {firstName, lastName} = this.state;
    this.props.updateProfile(firstName, lastName);
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First name:
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange} />
          </label><br />
          <label>
            Last name:
            <input
              name="lastName"
              type="test"
              value={this.state.lastName}
              onChange={this.handleChange} />
          </label><br />

          <input type="submit" value="Update Profile"/>
        </form><br />
        {this.state.errorMessage}
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
}

export default EditProfile;
