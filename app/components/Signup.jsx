import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postNewUser } from '../reducers/users';



class Signup extends Component {
    constructor(props) {
      super(props);
        this.state = {
          firstName: "",
          lastName: "",
          email: "",
          title: "",
          password: "",
          redirect: false
        }

        this.inputFirstName = this.inputFirstName.bind(this);
        this.inputLastName = this.inputLastName.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputTitle = this.inputTitle.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);

    };

    inputFirstName(e){
      this.setState({
        firstName: e.target.value
      })
    }

    inputLastName(e){
      this.setState({
        lastName: e.target.value
      })
    }

    inputEmail(e){
      this.setState({
        email: e.target.value
      })
    }

    inputTitle(e) {
      this.setState({
        title: e.target.value
      })
    }

    inputPassword(e){
      this.setState({
        password: e.target.value
      })
    }

    handleSignupSubmit(e) {
      e.preventDefault()
      this.props.submitUser(this.state.firstName, this.state.lastName, this.state.email, this.state.title, this.state.password)
      this.setState({
        redirect: true
      })
    }


    render() {
      {console.log("STATE: ", this.state)}
      return (

        <div id='signup-container'>
        <h1 className="header-text signup-text">You're just seconds away from Accelerating your work!</h1>
        <form onSubmit={this.handleSignupSubmit} id="signup-submit">
          <div className="form-submit">
            <div>
              <input value={this.state.firstName}  onChange={this.inputFirstName} type="text" placeholder="First Name" className="form-two-col"/>
              <input value={this.state.lastName} onChange={this.inputLastName} type="text" placeholder="Last Name" className="form-two-col" />
            </div>
            <div>
            <input value={this.state.email} onChange={this.inputEmail} type="text" placeholder="name@company.com" className="form-one-col"/>

            </div>
            <div>
            <input value={this.state.password} onChange={this.inputPassword} type="password" placeholder="Enter Password" className="form-one-col"/>
            </div>

            <div className="position-select">
            <div id="label-position">
              <label >Please select your title below.</label>
            </div>
            <div>
              <select className="select-postion" onChange={this.inputTitle}>
                <option>Select...</option>
                <option value="Treasury Solutions Analyst">Treasury Solutions Analyst</option>
                <option value="Treasury Solutions Officer">Treasury Solutions Officer</option>
                <option value="Treasury Manager">Treasury Manager</option>
              </select>
            </div>
            </div>
          </div>
          <button className="submit-button" type='submit'>Sign Up!</button>
        </form>
        <div className="form-submit">
          <p id="route-to-login">Have an account? <Link to="/login" className="component-link">Log in here</Link></p>
        </div>
        {
          this.state.redirect && (
          <Redirect to={`/`} />
        )}
        </div>
      )};
  }

  const mapStateToProps = state => {
      return {
        users: state.users
      };
    };

  const mapDispatchToProps = (dispatch) => {
    return {

      submitUser: (firstName, lastName, email, title, password) => {
        dispatch(postNewUser(firstName, lastName, email, title, password))
      }
    }
  }

  const AddNewUserContainer = connect(mapStateToProps, mapDispatchToProps)(Signup)

  export default AddNewUserContainer
