import React, { Component } from 'react';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    if(props.data.viewer !== undefined){
      this.state = {
        firstName: this.props.data.viewer.profile.firstName,
        lastName: this.props.data.viewer.profile.lastName,
      }
    }else{
      this.state = {
        firstName: "",
        lastName: "",
      }
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
    this.props.mutate({
      variables: {
        id: this.props.data.viewer.profile.id,
        firstName,
        lastName,
      }
    }).then(({ data }) => {
      this.props.data.refetch();
      this.props.history.push('/profile');
    })
  }

  render(){
    return(
      <div>
        {
          (this.props.data.viewer === undefined) ?
          <p>Loading...</p>:
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
                  type="text"
                  value={this.state.lastName}
                  onChange={this.handleChange} />
              </label><br />

              <input type="submit" value="Update Profile"/>
            </form><br />
            {this.state.errorMessage}
          </div>
        }
      </div>
    );
  }
}

export default EditProfile;
