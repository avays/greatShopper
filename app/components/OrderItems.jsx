import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

/* -----------------    COMPONENT     ------------------ */

function OrderItems({ selectedOrder }){

 return (
  <div className="order">
   <h3>Your Order</h3>
   {
    (selectedOrder && selectedOrder[0] && selectedOrder[0].order) ?
    <div>
    <p>Date Placed: {selectedOrder[0].order.submitDate}</p>
    <p>Status: {selectedOrder[0].order.status}</p>
    <ul>Shipping Address:     {selectedOrder[0].order.address.alias}
      <li>{selectedOrder[0].order.address.name}</li>
      <li>{selectedOrder[0].order.address.street1}</li>
      <li>{selectedOrder[0].order.address.street2}</li>
      <li>{selectedOrder[0].order.address.city}</li>
      <li>{selectedOrder[0].order.address.state}</li>
      <li>{selectedOrder[0].order.address.zip}</li>
    </ul>
    <div>Payment Method:     {selectedOrder[0].order.payment.cardType}
    </div>
    <ul>Order Summary:
      <li>Item(s) Subtotal: {selectedOrder.map(item=>item.itemCost).reduce((sum, itemCost)=> +sum + +itemCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
      <li>Shipping and Handling: {selectedOrder.map(item=>item.shippingCost).reduce((sum, shippingCost)=> +sum + +shippingCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
      <li>Estimated tax to be collected: {selectedOrder.map(item=>item.taxCost).reduce((sum, taxCost)=> +sum + +taxCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
   </ul> 
      <p>Grand Total: {selectedOrder.map(item=>item.totalCost).reduce((sum, totalCost)=> +sum + +totalCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
      <hr></hr>
    <h5>Items from this Order</h5>
     <ul>
       {
         selectedOrder.map((item, index) => (
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

const mapStateToProps = ({ selectedOrder }) => ({ selectedOrder });

export default connect(mapStateToProps, null)(OrderItems);
