import axios from 'axios';
import socket from '../socket'



//ACTIONS

const GET_PROJECTS = 'GET_PROJECTS';
const CREATE_PROJECT = 'CREATE_PROJECT';
const COMPLETED_PROJECT = 'COMPLETED_PROJECT';
const UPDATE_PROJECT = 'UPDATE_PROJECT'


//ACTION CREATORS


const getProjects = (projects) => {
  return {
    type: GET_PROJECTS,
    projects
  }
}

export const addNewProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project
  }
}

export const updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project
  }
}

const updateCompletedProject = (project) => {
  return {
    type: COMPLETED_PROJECT,
    project
  }
}


//REDUCER

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_PROJECTS:
      return action.projects;
    case CREATE_PROJECT:
      return [...state, action.project];
    case COMPLETED_PROJECT:
      return [action.project, ...state];
    case UPDATE_PROJECT:
      return state.map((project) => (
        project.id === action.project.id ? action.project: project
      ))
    default: return state;
  }
}


//DISPATCHERS(THUNKS)


export const postNewProject = (name, projectType, officer, analyst, status, notes) => dispatch => {
  axios.post(`/api/projects`, {
    name,
    projectType,
    officer,
    analyst,
    status,
    notes
  })
  .then(project => {
    dispatch(addNewProject(project));
    socket.emit('new-project', project)
  })
  .catch(err => console.error("New project was not successfully created: ", err))
}

export const submitCompletedProject = (projectId) => dispatch => {
  axios.put(`/api/projects/${projectId}`, {
    status
  })
  .then(project => dispatch(updateCompletedProject(project)))
  .catch
}

export const fetchProjects = () => dispatch => {
  axios.get('/api/projects')
  .then(res => res.data)
  .then(projects => dispatch(getProjects(projects)))
  .catch(err => console.error(err));
}

export const updateProjectThunk = project => dispatch => {
  axios.put(`/api/projects/${project.projectId}`, project)
  .then(updatedProject => dispatch(updateProject(updatedProject)))
  .catch(err => console.error(err));
}
