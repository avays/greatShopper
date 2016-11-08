import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import { LinkContainer } from 'react-router-bootstrap';



/* -----------------    DUMB COMPONENT     ------------------ */




/* -----------------     COMPONENT     ------------------ */

class Payment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {scriptLoading: true, scriptLoadingError: false};
		// this.updateField = this.updateField.bind(this);
	}

	getScriptURL() {
		return 'https://js.stripe.com/v2/';
	}

	onScriptLoaded() {
		this.setState({scriptLoading: false})
	}

	onScriptError() {
		this.setState({scriptLoading: false, scriptLoadingError: true})
	}




	render(){

		return (
			<div>
				<h2>PAYMENT SHIT</h2>
				<h2>Enter payment info</h2>
				<form action="/your-charge-code" method="POST" id="payment-form">
				  <span className="payment-errors"></span>

				  <div className="form-row">
				    <label>
				      <span>Card Number</span>
				      <input type="text" size="20" data-stripe="number" />
				    </label>
				  </div>

				  <div className="form-row">
				    <label>
				      <span>Expiration (MM/YY)</span>
				      <input type="text" size="2" data-stripe="exp_month" />
				    </label>
				    <span> / </span>
				    <input type="text" size="2" data-stripe="exp_year" />
				  </div>

				  <div className="form-row">
				    <label>
				      <span>CVC</span>
				      <input type="text" size="4" data-stripe="cvc" />
				    </label>
				  </div>


				  <input type="submit" className="submit" value="Submit Payment" />
				</form>
			</div>
		)
	}
}


/* -----------------    CONTAINER     ------------------ */

const mapDispatch = dispatch => ({
});

export default connect(null, mapDispatch)(Payment);
