import React, { Component } from 'react';
import { connect } from 'react-redux';
import { }


/* -----------------    COMPONENT     ------------------ */

function Cart({ cart, remove, change }){

 return (
  <div>
   <h3>Your Cart</h3>
   <div className="row">
     {
       cart && cart.map(item => (
         <div className="col-xs-4">
          <h3>{item.product.name}</h3>
          <img src={item.product.imageUrl}/>
     	  <h4>{item.product.price}</h4>
          <h6>{item.product.quantity}</h6>
         </div>
       ))
     }
   </div>
 </div>);
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => ({
	remove: (product) => dispatch(removeItem(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// <div className="col-xs-4" key={ products.id }>
//            <a className="thumbnail" href="#" onClick={() => go(products)}>
//              <img src={ products.imageUrl } />
//              <div className="caption">
//                <h5>
//                  <span>{ products.name }</span>
//                </h5>
//                <small>{ products.songs.length } songs</small>
//              </div>
//            </a>
//          </div>