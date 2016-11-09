import React, { Component } from 'react';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
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
           <div className="comp-container">
              {
                 (this.state.scriptLoading) ?
                 <h3>Payment form loading...</h3>
                    :
                 <div>
                    <h2>Enter payment info</h2>
                      <Form horizontal onSubmit={this.sendPayment}>
                      <FormGroup controlId="formHorizontalCardNumber">
                        <Col componentClass={ControlLabel} sm={4}>
                          Card Number
                        </Col>
                        <Col sm={6}>
                          <FormControl name="number" type="text" placeholder="Card Number" data-stripe="number" />
                        </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalExpiration">
                        <Col componentClass={ControlLabel} sm={4}>
                          Expiration
                        </Col>
                        <Col sm={6}>
                          <FormControl name="exp_month" componentClass="select" placeholder="Month" data-stripe="exp_month">
                            <option>Month</option>
                            <option value="01">Jan (01)</option>
                            <option value="02">Feb (02)</option>
                            <option value="03">Mar (03)</option>
                            <option value="04">Apr (04)</option>
                            <option value="05">May (05)</option>
                            <option value="06">Jun (06)</option>
                            <option value="07">Jul (07)</option>
                            <option value="08">Aug (08)</option>
                            <option value="09">Sep (09)</option>
                            <option value="10">Oct (10)</option>
                            <option value="11">Nov (11)</option>
                            <option value="12">Dec (12)</option>
                          </FormControl>

                          <FormControl name="exp_year" componentClass="select" placeholder="Year" data-stripe="exp_year">
                            <option>Year</option>
                            <option value="16">2016</option>
                            <option value="17">2017</option>
                            <option value="18">2018</option>
                            <option value="19">2019</option>
                            <option value="20">2020</option>
                            <option value="21">2021</option>
                            <option value="22">2022</option>
                            <option value="23">2023</option>
                          </FormControl>

                        </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalCVC">
                        <Col componentClass={ControlLabel} sm={4}>
                          cvc
                        </Col>
                        <Col sm={6}>
                          <FormControl name="cvc" type="password" pattern="\d{3}" placeholder="CVC"  data-stripe="cvc" />
                        </Col>
                      </FormGroup>
                      <Button type="submit">Next: Confirmation</Button>
                      </Form>
                    </div>
            }  
            <div>
                <p> You will be able to review your order on the next screen</p>
              </div>
            </div>
        )
    }
});


export default Payment;


