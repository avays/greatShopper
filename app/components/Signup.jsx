import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createOrFindUser } from "../reducers/auth"

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {
	constructor(props) {
	super(props);
	}

	render(){
		// make sure users can't move on without valid fields
		return (
	<div>
		<h2>Create an Account</h2>
			<form onSubmit={evt => {
				evt.preventDefault();
				this.props.createUser(evt.target.email.value,
					evt.target.password.value,
					evt.target.firstname.value,
					evt.target.lastname.value)
			}}>
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
		    	<button type="submit">Register</button>
	    	</form>
	</div>
		);
	}
}


/* -----------------    CONTAINER     ------------------ */

const mapDispatch = dispatch => ({
  createUser: (email, password, firstName, lastName) => dispatch(createOrFindUser(email, password, firstName, lastName))
})

export default connect(null, mapDispatch)(Signup);