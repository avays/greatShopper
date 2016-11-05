import React, { Component } from 'react';

export default ({ cart }) => (
	<div>
		<h2>Hello world!</h2>
		<div>Items in your cart: { cart.length }</div>
	</div>
);
