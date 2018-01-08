import axios from 'axios'

//ACTION TYPE
const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';


//ACTION CREATORS
function getAllStudents (students){
  return {
    type: GET_ALL_STUDENTS,
    students
  }
}

function createStudent (student) {
  return {
    type: CREATE_STUDENT,
    student
  }
}

function deleteStudent (studentid) {
  return {
    type: DELETE_STUDENT,
    studentid
  }
}

function updateStudent (student) {
  return {
    type: UPDATE_STUDENT,
    student
  }
}

//REDUCER
export default function studentsReducer (students = [], action) {
  switch (action.type){
    case GET_ALL_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...students, action.student]
    case DELETE_STUDENT:
      return students.filter((student) => student.id !== action.studentid )
    case UPDATE_STUDENT:
      return students.map((student) => (
        student.id === action.student.id ? action.student : student
      ))
    default:
      return students
  }
}

//DISPATCHERS
export const fetchAllStudents = () => dispatch => {
  axios.get('/api/students')
  .then(res => res.data)
  .then(students => dispatch(getAllStudents(students)))
}

export const deleteStudentThunk = (studentId) => dispatch => {
  dispatch(deleteStudent(studentId));
  axios.delete(`/api/students/${studentId}`)
  .then(res => console.log('RESPONSE: ', res))
  .catch(err => console.error(err))
}

export const createNewStudent = (firstName, lastName, email, gpa, campusId) => dispatch => {
  axios.post(`/api/students/`, {
    firstName,
    lastName,
    email,
    gpa,
    campusId
  })
  .then(student => dispatch(createStudent(student)))
  .catch(err => console.error(err));
}



export const updateStudentThunk = student => dispatch => {
  axios.put(`/api/students/${student.id}`, student)
  .then(updatedStudent => dispatch(updateStudent(updatedStudent)))
  .catch(err => console.error(err));
}



