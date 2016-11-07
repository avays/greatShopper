import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem, changeQuantity, clearCart } from '../reducers/cart';
import { Link } from 'react-router';
import CartItem from './CartItem';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/* -----------------    COMPONENT     ------------------ */

function Cart({ cart, remove, change, clear }){

 return (
  <div className="cart">
   <h3>Your Cart</h3>
   {
    (cart && cart.length) ?
    <div>
     <ul>
       {
         cart.map((item, index) => (
           <CartItem
            key={ index }
            item={ item }
            remove={ remove }
            change={ change }
           />
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
      <LinkContainer to="/checkout/shipping">
        <Button>Proceed to Checkout</Button>
      </LinkContainer>
      <Button onClick={clear}>Clear all items from cart</Button>
     </div>
     :
    <h3>Your cart is empty!</h3>
  }

 </div>);
}



/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => ({
	remove: (item) => dispatch(removeItem(item)),
	change: (product, quantity) => dispatch(changeQuantity(product, quantity)),
	clear: () => dispatch(clearCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
