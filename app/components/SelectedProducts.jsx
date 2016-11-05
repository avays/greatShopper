import React, { Component } from 'react';
import { connect } from 'react-redux';


/* -----------------    COMPONENT     ------------------ */

function SelectedProducts({ selectedProducts, go }){
 console.log(selectedProducts)
 return (
  <div>
   <h3>Products</h3>
   <div className="row">
     {
       selectedProducts && selectedProducts.map(product => (
         <div className="col-xs-4">
          <h3>{product.name}</h3>
         </div>
       ))
     }
   </div>
 </div>);
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ selectedProducts }) => ({ selectedProducts });
const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProducts);

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