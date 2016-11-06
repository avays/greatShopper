import React, { Component } from 'react';
import { Link } from 'react-router';
import { Image } from 'react-bootstrap';


export default ({ item, index, remove }) => (
   <li key={index}>
    <Link to={`/product/${item.product.sku}`}>
      <h3>{item.product.name}</h3>
      <Image src={item.product.img} responsive />
    </Link>
	  <h4>${ item.product.price && item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</h4>
    <h6>Quantity: {item.quantity}</h6>
    <button onClick= { () => { remove(item) }}>Remove from cart</button>
   </li>
);
