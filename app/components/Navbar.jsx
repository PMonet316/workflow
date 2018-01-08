import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link, browserHistory } from 'react-router-dom';



export default class Navbar extends Component {


      // componentDidMount () {
      //   this.props.loadCampuses();
      // }



    render() {

      // const campuses = this.props.campuses;
      return (
        <div>
          <div id="nav-bar">
            <div className="logo">
              <Link to="/" id="brand-logo"><img src="/images/logo.png" id="logo-image"/></Link>
              <Link to="/"><p id="logo-name">WM</p></Link>
            </div>
            <ul id="nav-links">
              <li><Link to="/login" className="nav-button">Login</Link></li>
              <li><Link to="/sign_up" className="nav-button">Sign Up</Link></li>
            </ul>
          </div>
        </div>
      )};
  }

