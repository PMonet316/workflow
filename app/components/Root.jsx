import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link, browserHistory } from 'react-router-dom';
// import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import Userpage from './Userpage'
import EditProject from './EditProject'
import { fetchUsers } from '../reducers/users';
import { fetchCompanies } from '../reducers/companies';
import { fetchProjects } from '../reducers/projects';
import { retrieveLoggedInUser } from '../reducers/auth';
import store from '../store'






/* The code below does NOT relate to your project.
   This code is just a nice BIG example of how you can make a component.
   Also it is HILARIOUS :D Have fun!
 */




export default class Main extends React.Component {
  componentDidMount() {
    const usersThunk = fetchUsers();
    const companiesThunk = fetchCompanies();
    const projectsThunk = fetchProjects()
    const loggedInUser = retrieveLoggedInUser();
    store.dispatch(usersThunk);
    store.dispatch(companiesThunk);
    store.dispatch(projectsThunk);
    store.dispatch(loggedInUser)
  }


  render() {

    return (
      <Router history={browserHistory} >
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path='/login' component={Login} />
            <Route exact path="/sign_up" component={Signup} />
            <Route path="/users/:personId" component={Userpage} />
            <Route exact path="/projects/:projectId" component={EditProject} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}


