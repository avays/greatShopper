import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { setShippingAddress } from '../reducers/shippingAddress';
import { browserHistory } from 'react-router';

/* -----------------    DUMB COMPONENT     ------------------ */

const DumbShipping = ({ updateField, submitAddress }) => (

	<div className="comp-container">
		<h2>Enter Shipping Address</h2>
			<Form horizontal onSubmit={ submitAddress }>

				<FormGroup controlId="formHorizontalName">
	        <Col componentClass={ControlLabel} sm={2}>
	          Name
	        </Col>
	        <Col sm={6}>
	          <FormControl name="Name" type="text" placeholder="Name" onChange={updateField} />
	        </Col>
	      </FormGroup>

	      <FormGroup controlId="formHorizontalStreet1">
	        <Col componentClass={ControlLabel} sm={2}>
	          Street
	        </Col>
	        <Col sm={6}>
	          <FormControl name="street1" type="text" placeholder="Street" onChange={updateField} />
	        </Col>
	      </FormGroup>

				<FormGroup controlId="formHorizontalStreet2">
	        <Col componentClass={ControlLabel} sm={2}>
	          Apt / Unit
	        </Col>
	        <Col sm={6}>
	          <FormControl name="street2" type="text" placeholder="Apt / Unit" onChange={updateField} />
	        </Col>
	      </FormGroup>

	      <FormGroup controlId="formHorizontalCity">
	        <Col componentClass={ControlLabel} sm={2}>
	          City
	        </Col>
	        <Col sm={6}>
	          <FormControl name="city" type="text" placeholder="State" onChange={updateField} />
	        </Col>
	      </FormGroup>

	      <FormGroup controlId="formHorizontalState">
	        <Col componentClass={ControlLabel} sm={2}>
	          State
	        </Col>
	        <Col sm={6}>
	          <FormControl name="state" type="text" placeholder="State" pattern="[a-zA-Z]{2}" onChange={updateField} />
	        </Col>
	      </FormGroup>

	      <FormGroup controlId="formHorizontalZip">
	        <Col componentClass={ControlLabel} sm={2}>
	          Zip
	        </Col>
	        <Col sm={6}>
	          <FormControl name="zip" type="text" placeholder="Zip" pattern="\d{5}" onChange={updateField} />
	        </Col>
	      </FormGroup>

	      <FormGroup controlId="formHorizontalEmail">
	        <Col componentClass={ControlLabel} sm={2}>
	          Email
	        </Col>
	        <Col sm={6}>
	          <FormControl name="email" type="email" placeholder="Email" onChange={updateField} />
	        </Col>
	      </FormGroup>	      

	    	<Button type="submit">Next: Payment</Button>
    	</Form>
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
		const key = evt.target.name;
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