import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/* -----------------    COMPONENT     ------------------ */

function SelectedOrder({ selectedOrder }){

 return (
  <div className="order">
   <h3>Your Order</h3>
   {
    (Object.keys(selectedOrder).length) ?
    <div>
    <p>Date Placed: {selectedOrder.submitDate}</p>
    <p>Status: {selectedOrder.status}</p>
    <ul>Shipping Address:     {selectedOrder.address.alias}
      <li>{selectedOrder.address.name}</li>
      <li>{selectedOrder.address.street1}</li>
      <li>{selectedOrder.address.street2}</li>
      <li>{selectedOrder.address.city}</li>
      <li>{selectedOrder.address.state}</li>
      <li>{selectedOrder.address.zip}</li>
    </ul>
    <div>Payment Method:     {selectedOrder.brand}
    </div>
    <ul>Order Summary:
      <li>Item(s) Subtotal: ${selectedOrder.order_items.map(item=>item.itemCost).reduce((sum, itemCost)=> +sum + +itemCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
      <li>Shipping and Handling: ${selectedOrder.order_items.map(item=>item.shippingCost).reduce((sum, shippingCost)=> +sum + +shippingCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
      <li>Estimated tax to be collected: ${selectedOrder.order_items.map(item=>item.taxCost).reduce((sum, taxCost)=> +sum + +taxCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
   </ul> 
      <p>Grand Total: ${selectedOrder.order_items.map(item=>item.totalCost).reduce((sum, totalCost)=> +sum + +totalCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
      <hr></hr>
    <h5>Items from this Order</h5>
     <ul>
       {
         selectedOrder.order_items.map((item, index) => (
           <li key={ index }>
            <p>Quantity: {item.quantity}</p>
            <LinkContainer to={`/product/${item.product_sku}`}>
              <Button>Product purchased: {item.product.name}</Button>
            </LinkContainer>
            <p>Price at Purchase: {item.priceAtPurchase.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            <p>Status: {item.status}</p>
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

export default connect(mapStateToProps, null)(SelectedOrder);
