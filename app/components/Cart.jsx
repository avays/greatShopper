import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem, changeQuantity, clearCart } from '../reducers/cart';
import { Link } from 'react-router';

/* -----------------    COMPONENT     ------------------ */

function Cart({ cart, add, remove, change, clear }){

 return (
  <div className="cart">
   <h3>Your Cart</h3>
   {
    (cart && cart.length) ?
    <div>
     <ul>
       {
         cart.map((item, index) => (
           <li key={index}>
            <Link to={`/product/${item.product.sku}`}>
              <h3>{item.product.name}</h3>
              <img src={item.product.img}/>
            </Link>
       	  <h4>${ item.product.price && item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</h4>
            <h6>Quantity: {item.quantity}</h6>
            <button onClick= { () => { remove(item) }}>Remove from cart</button>
           </li>
         ))
       }
      </ul>
      <div>Total price: ${
        cart.map(item => {
          return +item.product.price * +item.quantity;
        })
          .reduce((sum, current) => {
            return sum + current;
        }).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      </div>
      <button onClick={clear}>Clear all items from cart</button>
      <button><Link to="/checkout/shipping">Checkout</Link></button>
     </div>
     :
    <h3>Your cart is empty!</h3>
  }

 </div>);
}



/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => ({
	add: (product, quantity) => dispatch(addItem(product, quantity)),
	remove: (item) => dispatch(removeItem(item)),
	change: (product, quantity) => dispatch(changeQuantity(product, quantity)),
	clear: () => dispatch(clearCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
