import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Shipping extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		alias: "",
		name: "",
		street1: "",
		street2: "",
		city: "",
		state: "",
		zip: "",
		}
	}


	render(){
		// make sure users can't move on without valid fields
		return (
			<div>
				<h2>Enter shipping address</h2>
					<form>
				        <div className="form-group">
				            <label>Alias:</label>
				            <input type="text" id="alias-field" onChange={this.updateField}/>
				        </div>
				        <div className="form-group">
				            <label>Name:</label>
				            <input type="text" id="name-field" onChange={this.updateField}/>
				        </div>
				        <div className="form-group">
				            <label>Street 1:</label>
				            <input type="text" id="street1-field" onChange={this.updateField}/>
				        </div>
				        <div className="form-group">
				            <label>Street 2:</label>
				            <input type="text" id="street2-field" onChange={this.updateField}/>
				        </div>
				        <div className="form-group">
				            <label>City:</label>
				            <input type="text" id="city-field" onChange={this.updateField}/>
				        </div>
				        <div className="form-group">
				            <label>State:</label>
				            <input type="text" id="state-field" onChange={this.updateField}/>
				        </div>
				        <div className="form-group">
				            <label>Zip:</label>
				            <textarea id="zip-field" onChange={this.updateField}/>
				        </div>
				    	<button type="submit">Next: Payment</button>
			    	</form>
			</div>
		);
	}
}


/* -----------------    CONTAINER     ------------------ */

const mapDispatch = dispatch => ({
  updateAddress: category => dispatch(updateShippingAddress(category))
})

export default connect(null, mapDispatch)(Shipping);