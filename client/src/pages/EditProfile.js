import React, { Component } from 'react';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
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

  componentWillReceiveProps(nextProps){
    if(nextProps.data.loading === false){
      this.setState({
        firstName: nextProps.data.viewer.profile.firstName,
        lastName: nextProps.data.viewer.profile.lastName,
      });
    }
  }

  render(){

    return(
      <div>
        {
          (this.props.data.loading === true) ?
          <p>Loading...</p>:
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                First Name:
                <input
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.handleChange} />
              </label><br />
              <label>
                Last Name:
                <input
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.handleChange} />
              </label><br />

              <input type="submit" value="Update Profile"/>
            </form><br />
          </div>
        }
      </div>
    );
  }
}

export default EditProfile;
