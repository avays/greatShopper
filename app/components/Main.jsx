import React, { Component } from 'react';
import Carousel from './Carousel';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/* -----------------    COMPONENT     ------------------ */

class Main extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="main-container">
      	<Carousel />
         <div className="gallery">
     { (this.props.selectedProducts && this.props.selectedProducts.length) ? (
       this.props.selectedProducts && this.props.selectedProducts.map(product => (
         <div className="productThumbnail" key={product.sku}>
          <Link to={`product/${product.sku}`}>
            <h4>{product.name}</h4>
            <img className="imgThumb" src={product.img} />
            <p>Price: ${product.price && product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          </Link>
         </div>
       ))
     ): <p>No products found</p>}
   </div>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ selectedProducts }) => ({ selectedProducts });
const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);