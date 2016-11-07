import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

/* -----------------    COMPONENT     ------------------ */

function Account({ user }){

 return (
  <div className="order">
   <h3>Your Order</h3>
   {
    (user && user[0] && user[0].order) ?
    <div>
    <p>Date Placed: {user[0].order.submitDate}</p>
    <p>Status: {user[0].order.status}</p>
    <ul>Shipping Address:     {user[0].order.address.alias}
      <li>{user[0].order.address.name}</li>
      <li>{user[0].order.address.street1}</li>
      <li>{user[0].order.address.street2}</li>
      <li>{user[0].order.address.city}</li>
      <li>{user[0].order.address.state}</li>
      <li>{user[0].order.address.zip}</li>
    </ul>
    <div>Payment Method:     {user[0].order.payment.cardType}
    </div>
    <ul>Order Summary:
      <li>Item(s) Subtotal: {user.map(item=>item.itemCost).reduce((sum, itemCost)=> +sum + +itemCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
      <li>Shipping and Handling: {user.map(item=>item.shippingCost).reduce((sum, shippingCost)=> +sum + +shippingCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
      <li>Estimated tax to be collected: {user.map(item=>item.taxCost).reduce((sum, taxCost)=> +sum + +taxCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
   </ul> 
      <p>Grand Total: {user.map(item=>item.totalCost).reduce((sum, totalCost)=> +sum + +totalCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
      <hr></hr>
    <h5>Items from this Order</h5>
     <ul>
       {
         user.map((item, index) => (
           <li key={ index }>
            <p>{item.quantity} of {item.product.name}</p>
            <p>{item.product.manufacturer && item.product.manufacturer}</p>
            <p>{item.product.location && item.product.location}</p>
            <p>{item.product.size && item.product.size}</p>
            <p>{item.product.color && item.product.color}</p>
            <p>{item.itemCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            <p>{item.status}</p>
            <img src={item.product.img}/>
            <Button>Return item</Button>
            <hr></hr>
           </li>
         ))
       }
      </ul>

     </div>
     :
    <h3>No order to show</h3>
  }

 </div>);
}



/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, null)(Account);
