import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Cart extends React.Component {
	render(){
		return (
			<div>
				<h2>Checkout</h2>
				<div>Items in your cart: { this.props.cart && this.props.cart.length }</div>
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