import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Navigation extends Component {
  constructor(props){
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout(e){
    e.preventDefault();
    localStorage.removeItem("authToken");
    this.props.updateToken();
  }

  render(){
    return (
      <div>
        {
          this.props.data.viewer ?
          <p className="App-intro">
          <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <a href="#" onClick={this.handleLogout}> Logout </a>
          </p> :
          <p className="App-intro">
            <Link to="/">Home</Link> | <Link to="/signin">Sign In</Link> | <Link to="/join">Register</Link>
          </p>
        }
      </div>
    );
  }
}

Navigation.propTypes = {
  updateToken: PropTypes.func,
};

export default Navigation;
