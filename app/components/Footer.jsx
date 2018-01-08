import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link } from 'react-router-dom';



export default class Footer extends Component {


      // componentDidMount () {
      //   this.props.loadCampuses();
      // }



    render() {

      // const campuses = this.props.campuses;
      return (
        <div className="footer">
          <div id="footer-bar">
            <div id="footer-nav">
              <ul id="nav-links">
                <li><Link to="/home" className="nav-button">Home</Link></li>
                <li><Link to="/about_us" className="nav-button">About Us</Link></li>
                <li><Link to="/contact" className="nav-button">Contact Us</Link></li>
                <li><Link to="sign_up" className="nav-button">Sign Up</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )};
  }
