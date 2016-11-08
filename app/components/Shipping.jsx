import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setShippingAddress } from '../reducers/shippingAddress';
import { browserHistory } from 'react-router';

/* -----------------    DUMB COMPONENT     ------------------ */

const DumbShipping = ({ updateField, submitAddress }) => (

	<div className="comp-container">
		<h2>Enter shipping address</h2>
			<form onSubmit={submitAddress}>
		        <div className="form-group">
		            <label>Name:</label>
		            <input required type="text" id="name" onChange={updateField}/>
		        </div>
		        <div className="form-group">
		            <label>Street 1:</label>
		            <input required type="text" id="street1" onChange={updateField}/>
		        </div>
		        <div className="form-group">
		            <label>Street 2:</label>
		            <input type="text" id="street2" onChange={updateField}/>
		        </div>
		        <div className="form-group">
		            <label>City:</label>
		            <input required type="text" id="city" onChange={updateField}/>
		        </div>
		        <div className="form-group">
		            <label>State:</label>
		            <input required type="text" pattern="[a-zA-Z]{2}" id="state" onChange={updateField}/>
		        </div>
		        <div className="form-group">
		            <label>Zip:</label>
		            <input required type="text" pattern="\d{5}" id="zip" onChange={updateField}/>
		        </div>
		        <div className="form-group">
		            <label>Email:</label>
		            <input required type="email" id="email" onChange={updateField}/>
		        </div>
			    	<Button type="submit">Next: Payment</Button>
	    	</form>
	</div>

)


/* -----------------    STATEFUL REACT COMPONENT     ------------------ */

class Shipping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			street1: "",
			street2: "",
			city: "",
			state: "",
			zip: "",
			email: ""
		}
		this.updateField = this.updateField.bind(this);
		this.submitAddress = this.submitAddress.bind(this);
	}

	updateField (evt) {
		evt.preventDefault();
		const key = evt.target.id;
		const value = evt.target.value;
		this.setState(prevState => {
			prevState[key] = value;
			return prevState;
		});
	}

	submitAddress(evt) {
		evt.preventDefault();
		this.props.updateAddress(this.state);
		browserHistory.push('/checkout/payment');
	}


	render(){
		return (
			<DumbShipping
				updateField={this.updateField}
				submitAddress={this.submitAddress}
			/>
		)
	}
}


/* -----------------    CONTAINER     ------------------ */

const mapDispatch = dispatch => ({
  updateAddress: address => dispatch(setShippingAddress(address))
})

export default connect(null, mapDispatch)(Shipping);