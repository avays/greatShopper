import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Panel, Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/* -----------------    COMPONENT     ------------------ */

class Cart extends React.Component {
	render(){
		return (
			<div className="comp-container" id="checkout-banner">
				<h2>Checkout</h2>
				<div>
					<h4>Items in your cart: </h4>
				{ 
					this.props.cart && this.props.cart.map((item, index) => {
						const title = (<h3>{item.product.name}</h3>)
					  return (
					  <div key={index}>
					  <Row>
					    <Panel header={title}>
					      <Col sm={4}>
						      <h5>Item price: ${item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
						      <h5>Quantity: {item.quantity}</h5>
						     </Col>
						     <Col sm={4}>
						      <LinkContainer to={`/product/${item.product.sku}`}>
						      	<Button>View Product</Button>
						      </LinkContainer>
					      </Col>
					    </Panel>
					  </Row>
					  </div>
					  )
					}) 
				}

				</div>
				{ this.props.children }
			</div>
		);
	}
}


/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ cart }) => ({ cart });

// const mapDispatch = dispatch => ({
//   go: category => dispatch(fetchCategoryProducts(category))
//   }
//   // logout: () => {
//   //   dispatch(logout())
//   //   browserHistory.push('/');
//   // }
// })

export default connect(mapProps, null)(Cart);