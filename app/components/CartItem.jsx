import React, { Component } from 'react';
import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';


/* -----------------    DUMB COMPONENT     ------------------ */


export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.onItemQuantityChange = this.onItemQuantityChange.bind(this);
  }

  onItemQuantityChange(evt) {
    evt.preventDefault();
    const quantity = +evt.target.value;
    this.props.change(this.props.item.product, quantity);
  }

  render() {
    const { item, remove } = this.props;
    return (
     <li className="cart-item">
      <Link to={`/product/${item.product.sku}`}>
        <product className="carted-product">
          <h4>{item.product.name}</h4>
          <img src={item.product.img} />
        </product>
      </Link>
      <item-details>
        <h4>${ item.product.price && item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</h4>
        <div>
          <h6>Quantity:</h6>
          <select value={item.quantity.toString()} onChange={ this.onItemQuantityChange } name="dropdown">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button onClick= { () => { remove(item) }}><Glyphicon glyph="remove" /></button>
      </item-details>
     </li>
    );
  }
}

