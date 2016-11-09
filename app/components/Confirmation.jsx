import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Panel, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { submitOrder } from '../reducers/charge';


/* -----------------    DUMB COMPONENT     ------------------ */



class Confirmation extends Component {
	constructor(props) {
		super(props)
		this.sendOrder = this.sendOrder.bind(this);
	}

	sendOrder(evt) {
		evt.preventDefault();
		
		const { user_id, shippingAddress, order_items, receipt_email, amount  } = this.props;
		
		const orderDataForStripe = {
			amount,
			receipt_email,
			source: this.props.params.token,
			currency: 'usd'
		};

		const orderDataFromStore = {
			user_id,
			shippingAddress,
			order_items
		}

		this.props.submit(orderDataForStripe, orderDataFromStore);

	}


	render() {
		const { cart, amount, shippingAddress } = this.props;
		const indollars = amount / 100;
		const title = ( <h3>Shipping Address</h3> )
		return(
			<div>
				<Row>
			    <Panel header={title}>
			      <Col sm={4}>
				      <h5>Name: {shippingAddress.name}</h5>
				      <h5>Street: {shippingAddress.street1}</h5>
				      <h5>Apt/Unit: {shippingAddress.street2}</h5>
				      <h5>City: {shippingAddress.city}</h5>
				      <h5>State: {shippingAddress.state}</h5>
				      <h5>Zip: {shippingAddress.zip}</h5>
				      <h5>Email: {shippingAddress.email}</h5>
				     </Col>
				     <Col sm={4}>
				      <LinkContainer to={`/cart/`}>
				      	<Button className="btn-warning">Edit Cart</Button>
				      </LinkContainer>
				      <LinkContainer to={`/checkout/shipping`}>
				      	<Button className="btn-warning">Edit Address</Button>
				      </LinkContainer>
			      </Col>
			    </Panel>
			  </Row>

				<h3>ORDER TOTAL: ${ indollars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>

				<Button className="btn-success" onClick={ this.sendOrder }>MAKE SHOPPING GREAT AGAIN</Button>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */



const mapState = ({ cart, shippingAddress, user }) => { 
	const order_items = cart.map(item => {
		return {
			quantity: item.quantity,
			priceAtPurchase: +item.product.price,
			product_sku: item.product.sku
		}
	});

	const user_id = (user.id) ? user.id : null;

	const receipt_email = shippingAddress.email;
	const amount = 100 *
		cart
			.map(item => (+item.quantity * +item.product.price))
			.reduce((prev, curr) => prev + curr);

	const orderDataFromStore = {
		user_id,
		shippingAddress,
		order_items,
		receipt_email,
		amount,
		cart
	}
	return orderDataFromStore;
};

const mapDispatch = dispatch => ({
  submit: (orderDataForStripe, orderDataFromStore) => { dispatch(submitOrder(orderDataForStripe, orderDataFromStore))}
})

export default connect(mapState, mapDispatch)(Confirmation);

