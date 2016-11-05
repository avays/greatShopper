import React, { Component } from 'react';


/* -----------------    COMPONENT     ------------------ */

function SelectedProducts({ products, go }){
 return (
  <div>
   <h3>Products</h3>
   <div className="row">
     {
       products.map(products => (
         <div className="col-xs-4" key={ products.id }>
           <a className="thumbnail" href="#" onClick={() => go(products)}>
             <img src={ products.imageUrl } />
             <div className="caption">
               <h5>
                 <span>{ products.name }</span>
               </h5>
               <small>{ products.songs.length } songs</small>
             </div>
           </a>
         </div>
       ))
     }
   </div>
 </div>);
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ selectedProducts }) => ({ selectedProducts });
const mapDispatchToProps = () => ({
  clickRight,
  clickLeft
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedProducts);