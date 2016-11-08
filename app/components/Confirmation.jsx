import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { submitOrder } from '../reducers/charge';


/* -----------------    DUMB COMPONENT     ------------------ */



class Confirmation extends Component {
	constructor(props) {
		super(props)
		this.sendOrder = this.sendOrder.bind(this);
	}

	sendOrder(evt) {
		evt.preventDefault();
		
		const { user_id, shippingAddress, order_items, email, amount  } = this.props;
		
		const orderDataForStripe = {
			amount,
			email,
			token: this.props.params.token
		};

		const orderDataFromStore = {
			user_id,
			shippingAddress,
			order_items
		}

		this.props.submit(orderDataForStripe, orderDataFromStore);

	}


	render() {
		return(
			<div>
				<p>CART info: { this.props.orderDataFromStore && this.props.orderDataFromStore.cart.length }</p>
				<h3>stripe token: {this.props.params.token}</h3>
				<h3>MAKE SHOPPING GREAT AGAIN</h3>
				<Button onClick={ this.sendOrder }>SUBMIT</Button>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

// HERE , we can filter out exactly what parts of state we would need to persist an order
// need to total order amount, product ids and quantities, prices, shippingAddress info, userID (if exists)

// order_items: array of products, each one has ID and price
// user: just user ID, if there is one
// transaction_total: calculate this from the cart


const mapState = ({ cart, shippingAddress, user }) => { 
	const order_items = cart.map(item => {
		return {
			quantity: item.quantity,
			priceAtPurchase: +item.product.price,
			product_sku: item.product.sku
		}
	});

	const user_id = user.id || '';

	const email = shippingAddress.email;
	const amount = 
		cart
			.map(item => (+item.quantity * +item.product.price))
			.reduce((prev, curr) => prev + curr);

	const orderDataFromStore = {
		user_id,
		shippingAddress,
		order_items,
		email,
		amount
	}
	console.log(orderDataFromStore);
	return orderDataFromStore;
};

const mapDispatch = dispatch => ({
  submit: (orderDataForStripe, orderDataFromStore) => { dispatch(submitOrder(orderDataForStripe, orderDataFromStore))}
})

export default connect(mapState, mapDispatch)(Confirmation);

