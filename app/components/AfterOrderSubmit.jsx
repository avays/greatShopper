import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

// import { clearCart } from '../reducers/cart';


/* -----------------    COMPONENT     ------------------ */

class AfterOrderSubmit extends Component {

	constructor(props) {
		super(props);
		this.confirm = this.confirm.bind(this)

	}

	confirm(evt) {
		evt.preventDefault();
		// this.props.clearCart();
		browserHistory.push('/');
	}

	render() {
		const { charge } = this.props
		return (
			<div>
				{
					!charge.received ?
					<span>Move along, move along...</span>
					:
					<div>
						{
							charge.received && charge.chargeData.id ? 
							<div>
								<h3>Payment Success!</h3>
								<p>Keep this transaction ID for your records: {charge.chargeData.id}</p>
								<p>You should receive an email confirmation shortly.</p>
								<Button onClick={ this.confirm }>Cool!</Button>
							</div>
							:
							<div>
								<h3>Payment Failure!</h3>
								<p>Here's what we know: { charge.chargeData.message }</p>
							</div>
						}
					</div>
				}
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ charge }) => ({ charge });

const mapDispatch = dispatch => ({
  // clearCart: () => dispatch(clearCart())
})

export default connect(mapState, mapDispatch)(AfterOrderSubmit);


/*
if failed --> display error (charge.message, no charge.id)
if success -->
	1. display success message
	2. 


	charge.amount (order total)
	charge.id (stripe transaction id)
	charge.receiptid (maybe?)

*/
