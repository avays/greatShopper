import React, { Component } from 'react';
import { Link } from 'react-router';
import { Image, Glyphicon } from 'react-bootstrap';


export default ({ item, remove }) => (
   <li className="cart-item">
    <Link to={`/product/${item.product.sku}`}>
      <product className="carted-product">
	      <h4>{item.product.name}</h4>
	      <img src={item.product.img} />
      </product>
    </Link>
	  <item-details>
		  <h4>${ item.product.price && item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</h4>
	    <h6>Quantity: {item.quantity}</h6>
	    <button onClick= { () => { remove(item) }}><Glyphicon glyph="remove" /></button>
   	</item-details>
   </li>
);
