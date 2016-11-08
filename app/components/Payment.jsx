import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import { LinkContainer } from 'react-router-bootstrap';
import { browserHistory } from 'react-router';
require('APP/.env.js');



/* -----------------     COMPONENT     ------------------ */

var Payment = React.createClass({
    mixins: [ReactScriptLoaderMixin],
    
    getInitialState: function() {
    	return {
    		scriptLoading: true,
    		scriptLoadError: false
    	};
    },

    getScriptURL: function() {
       return 'https://js.stripe.com/v2/';
    },

    onScriptLoaded: function() {
      this.setState({ scriptLoading: false });
     	Stripe.setPublishableKey(process.env.STRIPE_TEST_PUBLISHABLE_SECRET);
    },

    onScriptError: function() {
    	this.setState({ scriptLoading: false, scriptLoadError: true })
    },

    sendPayment: function(evt) {
    	evt.preventDefault();
    	var number = evt.target.number.value;
    	var exp_month = evt.target.exp_month.value;
    	var exp_year = evt.target.exp_year.value;
    	var cvc = evt.target.cvc.value;
    	Stripe.card.createToken({
    		number,
    		cvc,
    		exp_month,
    		exp_year
    	}, this.stripeResponseHandler)
    },

    stripeResponseHandler: function(status, response) {
        if (response.error) {
            console.log('STRIPE ERROR', response.error);
        } else {
    		console.log('STRIPE RESPONSE: ', response);
    		var token = response.id;
    		browserHistory.push(`/checkout/confirmation/${token}`);
	   }
    },

    render: function() {
      return (
     		<div>
	     		{
	     			(this.state.scriptLoading) ?
	     			<h3>Payment form loading...</h3> :
	     			<div>
							<h2>Enter payment info</h2>
							<form action="/your-charge-code" method="POST" id="payment-form" onSubmit={this.sendPayment}>
							  <span className="payment-errors"></span>

							  <div className="form-row">
							    <label>
							      <span>Card Number</span>
							      <input name="number" type="text" size="20" data-stripe="number" />
							    </label>
							  </div>

							  <div className="form-row">
							    <label>
							      <span>Expiration (MM/YY)</span>
							      <input name="exp_month" type="text" size="2" data-stripe="exp_month" />
							    </label>
							    <span> / </span>
							    <input name="exp_year" type="text" size="2" data-stripe="exp_year" />
							  </div>

							  <div className="form-row">
							    <label>
							      <span>CVC</span>
							      <input name="cvc" type="text" size="4" data-stripe="cvc" />
							    </label>
							  </div>
							  <input type="submit" className="submit" value="Submit Payment" />
							</form>
						</div>
	   		}  
    		  <div>
                <p> You will be able to review your order on the next screen</p>
              </div>
            </div>
      );
    }
});


export default Payment;
