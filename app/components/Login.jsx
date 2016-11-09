import React from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

export const Login = ({ login }) => (
  <div>

    <Form horizontal onSubmit={ (evt) => {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      login(email, password)
    } }>

      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={6}>
          <FormControl name="email" type="email" placeholder="Email" />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={6}>
          <FormControl name="password" type="password" placeholder="Password" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={6}>
          <Button type="submit">
            Login
          </Button>
        </Col>
      </FormGroup>
    </Form>

    <LinkContainer to="/signup">
      <Button>Sign Up</Button>
    </LinkContainer>

    <Button href="/api/auth/google">Google Sign In</Button>
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

