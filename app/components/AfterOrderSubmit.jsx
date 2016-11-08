import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import { persistOrder } from '../reducers/orders';
import { clearCart } from '../reducers/cart';


/* -----------------    COMPONENT     ------------------ */

class AfterOrderSubmit extends Component {

	constructor(props) {
		super(props);
		this.confirmPersist = this.confirmPersist.bind(this)

	}

	confirmPersist(evt) {
		evt.preventDefault();
		const { charge, cart, shippingAddress, user } = this.props;
		this.props.persist(charge, cart, shippingAddress, user);
		this.props.clearCart();
		browserHistory.push('/');
	}

	render() {
		const { charge, cart, shippingAddress, user } = this.props
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
								<Button onClick={ this.confirmPersist }>Cool!</Button>
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

const mapState = ({ charge, cart, shippingAddress, user }) => ({ charge, cart, shippingAddress, user });

const mapDispatch = dispatch => ({
  persist: ( charge, cart, shippingAddress, user ) => dispatch(persistOrder(charge, cart, shippingAddress, user)),
  clearCart: () => dispatch(clearCart())
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
