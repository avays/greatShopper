import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createOrFindUser } from "../reducers/auth";

import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';


/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<h2>Create an Account</h2>
					<Form horizontal onSubmit={evt => {
						evt.preventDefault();
						const email = evt.target.email.value
						const password = evt.target.password.value
						const firstName = evt.target.firstName.value
						const lastName = evt.target.lastName.value
						this.props.createUser(email, password, firstName, lastName)
					}}>

						<FormGroup controlId="formHorizontalfirstName">
			        <Col componentClass={ControlLabel} sm={2}>
			          First Name
			        </Col>
			        <Col sm={6}>
			          <FormControl name="firstName" type="text" placeholder="First Name" />
			        </Col>
			      </FormGroup>

			      <FormGroup controlId="formHorizontallastName">
			        <Col componentClass={ControlLabel} sm={2}>
			          Last Name
			        </Col>
			        <Col sm={6}>
			          <FormControl name="lastName" type="text" placeholder="Last Name" />
			        </Col>
			      </FormGroup>

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


			    	<Button type="submit">Register</Button>
		    	</Form>
			</div>
		);
	}
}

/*

		        <div className="form-group">
		            <label>First Name:</label>
		            <input type="text"  name="firstname"/>
		        </div>
		        <div className="form-group">
		            <label>Last Name:</label>
		            <input type="text"  name="lastname"/>
		        </div>
		        <div className="form-group">
		            <label>Email:</label>
		            <input type="text"  name="email"/>
		        </div>
		        <div className="form-group">
		            <label>Password:</label>
		            <input type="text"  name="password"/>
		        </div>



*/


/* -----------------    CONTAINER     ------------------ */

const mapDispatch = dispatch => ({
  createUser: (email, password, firstName, lastName) => dispatch(createOrFindUser(email, password, firstName, lastName))
})

export default connect(null, mapDispatch)(Signup);