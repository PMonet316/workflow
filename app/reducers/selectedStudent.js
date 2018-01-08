import axios from 'axios';


//ACTIONS
const SELECTED_STUDENT = 'SELECTED_STUDENT';

//ACTION CREATORS
export const setSelectedStudent = (student) => {
  return {
    type: SELECTED_STUDENT,
    student
  }
}

//REDUCER
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SELECTED_STUDENT:
      return action.student;
    default: return state;
  }
}

//DISPATCHER
export const fetchSelectedStudent = studentId => dispatch => {
  axios.get(`/api/students/${studentId}`)
  .then(res => res.data)
  .then(student => {
    dispatch(setSelectedStudent(student))
  })
  .catch(err => console.error(err));
}
