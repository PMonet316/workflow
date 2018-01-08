import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import { updateProjectThunk, submitCompletedProject } from '../reducers/projects'
import socket from '../socket'
import axios from 'axios'





class EditProject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        project: {},
        redirect: false
      }

      this.inputProjectName = this.inputProjectName.bind(this);
      this.inputProjectType = this.inputProjectType.bind(this);
      this.inputTsoName = this.inputTsoName.bind(this);
      this.inputTsaName = this.inputTsaName.bind(this);
      this.inputStatus = this.inputStatus.bind(this);
      this.inputNotes = this.inputNotes.bind(this);

      this.getProject = this.getProject.bind(this)
      this.handleUpdateProject = this.handleUpdateProject.bind(this)
    }

    inputProjectName(e) {
      let project = Object.assign({}, this.state.project);
      project.name = e.target.value;
      this.setState({project})
    }

    inputProjectType(e) {
      let project = Object.assign({}, this.state.project);
      project.projectType = e.target.value;
      this.setState({project})
    }

    inputTsoName(e) {
      let project = Object.assign({}, this.state.project);
      project.officer = e.target.value;
      this.setState({project})
    }

    inputTsaName(e) {
      let project = Object.assign({}, this.state.project);
      project.analyst = e.target.value;
      this.setState({project})
    }

    inputStatus(e) {
      let project = Object.assign({}, this.state.project);
      project.status = e.target.value;
      this.setState({project})
    }

    inputNotes(e) {
      let project = Object.assign({}, this.state.project);
      project.notes = e.target.value;
      this.setState({project})
    }

    getProject(projectId) {
      axios.get(`/api/projects/${projectId}`)
      .then(res => {
        return res.data
      })
      .then(project => {
        this.setState({
          project
        })
      })
      .catch(err => console.error(err))
    }

    componentDidMount() {
      const projectId = this.props.match.params.projectId;
      this.getProject(projectId);
    }

    handleUpdateProject(e) {
      e.preventDefault()
      this.props.updateProject(this.state.project)
      this.setState({
        redirect: true
      })
    }



  render() {
    console.log("STATE: ", this.state)
    // console.log("PROPS: ", this.props)
    let companyName = this.state.project.name
    let projectType = this.state.project.projectType
    let tsoName = this.state.project.officer
    let tsaName = this.state.project.analyst
    let projectStatus = this.state.project.status
    let projectNotes = this.state.project.notes

    const companies = this.props.companies.sort(function(a,b) {
      var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
      if (nameA < nameB)
        return -1
      if(nameA>nameB)
        return 1
      return 0;
    })

    const tso = this.props.users.filter( user => {
      return user.title === "Treasury Solutions Officer";
    })

    const tsa = this.props.users.filter( user => {
      return user.title === "Treasury Solutions Analyst";
    })

    return (
      <div id="user-page-container">
      <div id="label-project">
      <label >Edit {projectType} project for company {companyName} and TSO {tsoName} </label>
      </div>
      <div id="form-container">
       <form onSubmit={this.handleUpdateProject} className="new-project-form" id="project-form">
          <input defaultValue={companyName} onChange={this.inputProjectName} type="text" name="search" list="companyList" className="select-company"  placeholder={companyName} />
           <datalist id="companyList">
          {
            companies.map(company =>
            <option key={company.id} value={company.name}>{company.name}</option>)
            }
          </datalist>
          <select value={projectType} onChange={this.inputProjectType} name="projectType" className="select-type">
            <option defaultValue="">{projectType}</option>
            <option value="Client Call">Client Call</option>
            <option value="Client Inquire">Client Inquiry</option>
            <option value="Client Issue">Client Issue</option>
            <option value="Exception Pricing">Exception Pricing</option>
            <option value="Implementation Request">Implementation Request</option>
            <option value="Pricing Proforma">Pricing Proforma</option>
            <option value="Refund Request">Refund Request</option>
            <option value="RFP">RFP</option>
            <option value="TMR">TMR</option>
            <option value="Special Project">Special Project</option>
          </select>
          <select value={tsoName} onChange={this.inputTsoName} name="tso" className="select-tso" >
            <option defaultValue="">{tsoName}</option>
          {
            tso.map(users =>
            <option key={users.id} value={users.name}>{users.name}</option>)
            }
         </select>
         <select value={tsaName} onChange={this.inputTsaName} name="tsa" className="select-tsa" >
         <option defaultValue="">{tsaName} </option>
          {
            tsa.map(users =>
            <option key={users.id} value={users.name}>{users.name}</option>)
            }
        </select>
        <select defaultValue="In Process" value={projectStatus} onChange={this.inputStatus} className="select-status" >
          <option defaultValue="In Process">In Process</option>
          <option value="Complete">Complete</option>
        </select>
          <div>
          <textarea value={projectNotes} onChange={this.inputNotes} name="notes" className="notes" placeholder={projectNotes}/>
          </div>
       </form>
       {this.state.redirect && <Redirect to='/users/2574' />}
          <div className="div-submit">
          <button className="project-submit" form="project-form" type='submit'>Update Project</button>
          </div>
       </div>

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

    updateProject: (project) => {
      dispatch(updateProjectThunk(project))
    }

  }
}

const EditProjectContainer = connect(mapStateToProps, mapDispatchToProps)(EditProject)

export default EditProjectContainer
