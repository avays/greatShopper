import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

class Notification extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="notification">
				<h5>Item added to cart!</h5>
				<LinkContainer to="/cart"><Button>My Cart</Button></LinkContainer>
			</div>
		)
	}
}

export default Notification;

// When <Add to Cart> button is clicked, triggers change in local UI state
// Change in local UI state causes alert to popup
// alert renders but fades out. Alert has link to cart.