import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import OrderItem from './OrderItem';
import { Button } from 'react-bootstrap';

/* -----------------    COMPONENT     ------------------ */

function Orders({ orders }){

 return (
  <div className="order comp-container">
   <h3>Your Orders</h3>
   {
    (orders && orders.length) ?
    <div>
     <ul>
       {
         orders.map((order, index) => (
           <li key={ index }>
            <p>Date Placed: {order.submitDate}</p>
            <p>Status: {order.status}</p>
            <Button><Link to={`/order/${order.orderNumber}`}>Order details</Link></Button>
            <hr></hr>
           </li>
         ))
       }
      </ul>

     </div>
     :
    <h3>Your have no orders.</h3>
  }

 </div>);
}



/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ orders }) => ({ orders });

export default connect(mapStateToProps, null)(Orders);
