import axios from 'axios';



//ACTIONS

const GET_USERS = 'GET_USERS';
// const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const CREATE_USER = 'CREATE_USER';
// const UPDATE_CAMPUS = 'UPDATE_CAMPUS';


//ACTION CREATORS


const getUsers = (users) => {
  return {
    type: GET_USERS,
    users
  }
}

// const removeCampus = (campusId) => {
//   return {
//     type: REMOVE_CAMPUS,
//     campusId
//   }
// }

const addNewUser = (user) => {
  return {
    type: CREATE_USER,
    user
  }
}

// const updateCampus = campus => {
//   return {
//     type: UPDATE_CAMPUS,
//     campus
//   }
// }


//REDUCER

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    // case REMOVE_CAMPUS:
    //   return [...state].filter(campus => {
    //     return campus.id !== +action.campusId
    //   });
    case CREATE_USER:
      return [...state, action.user];
    // case UPDATE_CAMPUS:
    //   const filteredCampuses = [...state].filter(campus => {
    //     return campus.id !== Number(action.campus.id)
    //   });
    //   return [...filteredCampuses, action.campus]
    default: return state;
  }
}


//DISPATCHERS(THUNKS)


export const postNewUser = (firstName, lastName, email, title, password) => dispatch => {
  axios.post(`/api/users`, {
    firstName,
    lastName,
    email,
    title,
    password
  })
  .then(user => dispatch(addNewUser(user)))
  .catch(err => console.error("New user was not successfully created: ", err))
}

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
  .then(res => res.data)
  .then(users => dispatch(getUsers(users)))
  .catch(err => console.error(err));
}

// export const deleteCampusThunk = campusId => dispatch => {
//   dispatch(removeCampus(campusId))
//   axios.delete(`/api/campuses/${campusId}`)
//   .then(res => console.log('response from delete', res))
//   .catch(err => console.error(err))
// }

// export const createCampusThunk = (name, imageUrl, description) => dispatch => {
//   axios.post(`/api/campuses`, {
//     name,
//     imageUrl,
//     description
//   })
//   .then(campus => dispatch(createCampus(campus)))
//   .catch(err => console.error(err))
// }

// export const updateCampusThunk = campus => dispatch => {
//   axios.put(`/api/campuses/${campus.id}`, campus)
//   .then(updatedCampus => dispatch(updateCampus(updatedCampus)))
//   .catch(err => console.error(err));
// }
