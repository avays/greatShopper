import React from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import { Link } from 'react-router';

export const Login = ({ login }) => (
  <div>
    <div>
    <form onSubmit={evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
    } }>
      <label>Email:</label>
      <input name="username" />
      <label>Password:</label>
      <input name="password" type="password" />
      <input type="submit" value="Login" />
    </form>
    <Link to="/signup"><button>Sign up</button></Link>
    </div>
    <div><a href="/api/auth/google">Google Sign In</a></div>
    <div><a href="/api/auth/facebook">Facebook Sign In</a></div>
  </div>
)

const mapProps = (state) => ({});
const mapDispatch = (dispatch) => ({
  login: (username, password) => {
    dispatch(login(username, password));
  },
  google: () => dispatch()
})

export default connect(mapProps, mapDispatch)(Login);





// BELOW IS ORIGIN LOGIN.JSX BEFORE 11/5
/*
import React from 'react'

export const Login = ({ login }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
*/