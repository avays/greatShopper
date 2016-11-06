import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import OrderItem from './OrderItem';
import { Button } from 'react-bootstrap';

/* -----------------    COMPONENT     ------------------ */

function Order({ orders }){

 return (
  <div className="order">
   <h3>Your Orders</h3>
   {
    (orders && orders.length) ?
    <div>
     <ul>
       {
         cart.map((item, index) => (
           <OrderItem
            key={ index }
            item={ item }
            remove={ remove }
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
      <Button><Link to="/checkout/shipping">Proceed to Checkout</Link></Button>
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
	add: (product, quantity) => dispatch(addItem(product, quantity)),
	remove: (item) => dispatch(removeItem(item)),
	change: (product, quantity) => dispatch(changeQuantity(product, quantity)),
	clear: () => dispatch(clearOrder())
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
