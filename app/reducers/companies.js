import axios from 'axios';


//ACTION TYPE
const GET_COMPANIES = "GET_COMPANIES"



//ACTION CREATORS
export const getAllCompanies = (companies) => {
  return {
    type: GET_COMPANIES,
    companies
  }
}


//REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_COMPANIES:
      return action.companies;
    default:
      return state;
  }
}


//DISPATCHER/THUNK CREATOR

export const fetchCompanies = () => dispatch => {
  axios.get('/api/companies')
  .then(res => res.data)
  .then(companies => dispatch(getAllCompanies(companies)))
  .catch(err => console.error(err));
}
