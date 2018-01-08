import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link } from 'react-router-dom';



export default class Welcome extends Component {


      // componentDidMount () {
      //   this.props.loadCampuses();
      // }



    render() {

      // const campuses = this.props.campuses;
      return (
          <section id="welcome-page-container">

            <div id="cover-text">
              <h1 id="cover-title">Accelerate Your Work</h1>
              <div id="ul-cover">
                <p className="li-cover">Organize</p>
                <p className="li-cover">Measure</p>
                <p className="li-cover">Improve</p>
              </div>
            </div>
            <img src="/images/cover-photo-2.jpg" id="cover-image"/>
          </section>
      )};
  }
