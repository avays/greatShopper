import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/* -----------------    COMPONENT     ------------------ */

function SelectedProducts({ selectedProducts }){
 return (
  <div>
   <h3>Products</h3>
   <div className="gallery">
     {
       selectedProducts && selectedProducts.map(product => (
         <div className="productThumbnail" key={product.sku}>
          <Link to={`product/${product.sku}`}>
            <h4>{product.name}</h4>
            <img className="imgThumb" src={product.img} />
            <p>Price: ${product.price && product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          </Link>
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
