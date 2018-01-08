import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import EditProject from './EditProject'
import { submitCompletedProject } from '../reducers/projects'





class OpenProjects extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        projectType: "",
        officer: "",
        analyst: "",
        status: "",
        notes: "",
        redirect: false
      }
    }

    // inputProjectName(e) {
    //   this.setState({
    //     name: e.target.value
    //   })
    // }

    // inputProjectType(e) {
    //   this.setState({
    //     projectType: e.target.value,
    //   })
    // }

    // inputTsoName(e) {
    //   this.setState({
    //     officer: e.target.value
    //   })
    // }

    // inputTsaName(e) {
    //   this.setState({
    //     analyst: e.target.value
    //   })
    // }

    // inputStatus(e) {
    //   this.setState({
    //     status: e.target.value
    //   })
    // }

    // inputDueDate(e) {
    //   this.setState({
    //     dueDate: e.target.value
    //   })
    // }

    // inputNotes(e) {
    //   this.setState({
    //     notes: e.target.value
    //   })
    // }



    // handleProjectSubmit(e) {
    //   e.preventDefault()
    //   this.props.submitProject(this.state.name, this.state.projectType, this.state.officer, this.state.analyst,this.state.status,this.state.notes)
    //   this.setState({
    //     redirect: true
    //   })
    // }

    // handleCompleteSubmit(e) {
    //   e.preventDefault()
    //   console.log(key)

    // }

  render() {
    console.log("PROPS: ", this.props)
    // console.log("STATE: ", this.state)
    // const currentUser = this.props.users.map(function(id) => )
    const openProjects = this.props.projects.filter( project => {
      return project.status === "In Process"
    })

    // const projectUserId = this.props.match.params.personId

    // console.log(openProjects)

    return (
        <div id="in-progress-queue">
          <div id="label-project">
            <label >In Process Projects</label>
            </div>
            <div id="queue-header">
              <li className="title-queue">Company</li>
              <li className="title-queue">Project Type</li>
              <li className="title-queue">TSO</li>
              <li className="title-queue">Status</li>
              <li className="title-notes">Notes</li>
              <li className="title-queue">Action</li>
              </div>
                {

                  openProjects.map(project => {
                    return (
                      <div key={project.projectId} >
                      <form>
                          <div id="queue-list">
                            <li className="user-queue">{ project.name }</li>
                            <li className="user-queue">{ project.projectType }</li>
                            <li className="user-queue">{ project.officer }</li>
                            <li className="user-queue">{ project.status }</li>
                            <textarea value=""  className="user-notes" placeholder={ project.notes} />
                            <div className="queue-complete">
                            <button type='button' value={project.projectId} onClick={() => this.props.completeProject(project.projectId)} className='complete-btn'>Complete</button>
                            <Link to={`/projects/${project.projectId}`}>
                              <button type='submit' className='edit-btn'>Edit</button>
                            </Link>
                            </div>
                          </div>
                        </form>
                      </div>
                    )
                  })
                }
        </div>

    )
  }
}


const mapStateToProps = state => {
  return {
    companies: state.companies,
    users: state.users,
    projects: state.projects,
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    completeProject: (projectId) => {
      dispatch(submitCompletedProject(projectId))
    }
  }
}

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(OpenProjects)

export default UserContainer
