import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { submitOrder } from '../reducers/cart';

/* -----------------    DUMB COMPONENT     ------------------ */



class Confirmation extends Component {
	constructor(props) {
		super(props)
		this.sendOrder = this.sendOrder.bind(this);
	}

	sendOrder(evt) {
		evt.preventDefault();
		console.log('in sendOrder method')
		const amount = 100 * this.props.cart
			.map(item => (+item.quantity * +item.product.price))
			.reduce((prev, curr) => prev + curr);
		const orderData = {
			amount,
			email: this.props.shippingAddress.email,
			shippingAddress: this.props.shippingAddress, 
			token: this.props.params.token
		}
		this.props.orderSubmit(orderData);

	}


	render() {
		return(
			<div>
				<h3>stripe token: {this.props.params.token}</h3>
				<h3>CONFIRM, YO</h3>
				<Button onClick={ this.sendOrder }>Submit Order</Button>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */


const mapState = ({ cart, shippingAddress }) => ({ cart, shippingAddress });

const mapDispatch = dispatch => ({
  orderSubmit: orderData => { dispatch(submitOrder(orderData))}
})

export default connect(mapState, mapDispatch)(Confirmation);

