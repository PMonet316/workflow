/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux';
import users from './users';
import companies from './companies';
import projects from './projects';
import auth from './auth'





let rootReducer = combineReducers({
  users,
  companies,
  projects,
  auth,
})


export default rootReducer
