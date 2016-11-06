import axios from 'axios'
import { browserHistory } from 'react-router';

// Action Creators
const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

// Reducer
const reducer = (state='', action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user  
  }
  return state
}
export default reducer;

// Dispatchers
export const createOrFindUser = (email, password, firstName, lastName) =>
  dispatch =>
    axios.post('/api/users/',
      {email, password, firstName, lastName})
      .then(() => dispatch(login(email, password)))
      .catch(() => dispatch(whoami()))  

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/local/login',
      {username, password})
      .then(() => dispatch(whoami()))
      .then(browserHistory.push("/"))
      .catch(() => dispatch(whoami()))      

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .then(browserHistory.push('/'))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))