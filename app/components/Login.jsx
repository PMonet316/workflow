import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAndGoToUser, login } from '../reducers/auth'



class Login extends Component {
    constructor(props) {
      super(props);
      // this.state = {
      //   email: "",
      //   password: "",
      // }
      this.onLoginSubmit = this.onLoginSubmit.bind(this)
    }

  onLoginSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;

    const password = event.target.password.value
    console.log("EMAIL: ", email)
    console.log("PASSWORD: ", password)
    const credentials = {
      email,
      password
    };
    this.props.login(credentials);
  }

    render() {
      const { message } = this.props;
      console.log("PROPS: ", this.props)
      // const campuses = this.props.campuses;
      return (
        <div id='login-container'>
        <h1 className="header-text login-text">Welcome back!</h1>
        <form onSubmit={this.onLoginSubmit} id="login-submit">
          <div className="form-submit">
            <div>
              <input name="email"  type="email" placeholder="Email" className="form-one-col" />
            </div>
            <div>
            <input name="password" type="password" placeholder="Password" className="form-one-col" />
            </div>
          </div>
          <button className="submit-button" type='submit'>Log In!</button>
        </form>
        <div className="form-submit">
        <p id="route-to-signup">Are you new here? <Link to="/sign_up" className="component-link">Sign Up here</Link></p>
      </div>
        </div>
      )};
  }

  const mapState = () => ({ message: 'Log in' });

  const mapDispatch = (dispatch) => {
    return {
      login (credentials) {
        dispatch(login(credentials))
      }
    }
  }
  // // equivalent to:
  // const mapDispatch = (dispatch) => {
  //   return {
  //     login: function (credentials) {
  //       dispatch(loginAndGoToUser(credentials));
  //     }
  //   };
  // };

  export default connect(mapState, mapDispatch)(Login);
