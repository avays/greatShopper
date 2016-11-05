import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem, changeQuantity, clearCart } from '../reducers/cart'


/* -----------------    COMPONENT     ------------------ */

function Cart({ cart, add, remove, change, clear }){

 return (
  <div>
   <h3>Your Cart</h3>
   <ul>
     {
       cart && cart.map((item, index) => (
         <li key={index}>
          <h3>{item.product.name}</h3>
          <img src={item.product.img}/>
     	  <h4>${ item.product.price && item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</h4>
          <h6>Quantity: {item.quantity}</h6>
          <button onClick= { () => remove(item.product)}>Remove from cart</button>
         </li>
       ))
     }
   </ul>
 </div>);
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => ({
	add: (product, quantity) => dispatch(addItem(product,quantity)),
	remove: (product) => dispatch(removeItem(product)),
	change: (product, quantity) => dispatch(changeQuantity(product, quantity)),
	clear: () => dispatch(clearCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
