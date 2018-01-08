import axios from 'axios';
import { addNewUser as createUser} from './users';
import history from '../history';
import { browserHistory } from 'react-router'

/* ------------------    ACTION TYPES --------------------- */

const INITIALIZE_CURRENT_USER    = 'INITIALIZE_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

/* --------------    ACTION CREATORS    ----------------- */

const initializeCurrentUser     = user => ({ type: INITIALIZE_CURRENT_USER, user });
const removeCurrentUser  = () => ({ type: REMOVE_CURRENT_USER });

/* ------------------    REDUCER    --------------------- */

const initialUser = {}

export default function reducer (currentUser = initialUser, action) {
  switch (action.type) {
    case INITIALIZE_CURRENT_USER:
      return action.user;
    case REMOVE_CURRENT_USER:
      return initialUser;
    default:
      return currentUser;
  }
}

/* ------------       THUNK CREATORS ------------------ */

/**
 * Thunk creators are just async action creators.
 * Action creators are supposed to emit actions.
 * Actions will be reduced to produce a new state.
 *
 * However, thunks can also do side effects, such as route to another location.
 * This could get fairly elaborate, by taking arguments as to where to go, or
 * whether to change routes at all. But we illustrate a simple case with some
 * composed thunk creators which also route to a specific page.
 *
 * If we wanted the calling code (component) to handle the result instead, we
 * would use the "simple" thunk creator and chain off the returned promise.
 * Components should probably know nothing about side effects, however.
 */

const resToData = res => res.data;

// a "simple" thunk creator which uses API, changes state, and returns a promise.
export const login = credentials => {
  return (dispatch)  => {
    return axios.put('/api/auth/login', credentials)
      .then(res => res.data)
      .then(user => {
        dispatch(initializeCurrentUser(user));
        // browserHistory.push(`/users/${user.userId}`)
      })
      .catch(err => console.error(err))
    };
  }

// a "composed" thunk creator which uses the "simple" one, then routes to a page.
export const loginAndGoToUser = credentials => dispatch => {
  dispatch(login(credentials))
  .then(user => history.push(`/users/${user.userId}`))
  .catch(err => console.error('Problem logging in:', err));
};

export const signup = credentials => {
  return (dispatch) => {
    return axios.post('/api/auth/signup', credentials)
      .then(res => res.data)
      .then(user => {
        dispatch(initializeCurrentUser(user)); // so new user appears in our master list
        // dispatch(setUser(user)); // set current user
        // return user;
      })
      .catch(err => console.error(err))
    }
  }

export const signupAndGoToUser = credentials => dispatch => {
  dispatch(signup(credentials))
  .then(user => history.push(`/users/${user.id}`))
  .catch(err => console.error('Problem signing up:', err));
};

export const retrieveLoggedInUser = () => {
  return (dispatch) => {
    return axios.get('/api/auth/me')
      .then(res => res.data)
      .then(user => {
        dispatch(initializeCurrentUser(user || initialUser))
      })
      .catch(err => console.error(err))
  }
}

// optimistic
export const logout = () => dispatch => {
  dispatch(removeCurrentUser());
  axios.delete('/api/auth/logout')
  .catch(err => console.error('logout unsuccessful', err));
};
