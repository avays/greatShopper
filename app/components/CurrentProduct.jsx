import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import Review from './Review';
import Notification from './Notification';
import { addItem } from '../reducers/cart';

/* -----------------    DUMB COMPONENT     ------------------ */

const DumbCurrentProduct = ({ currentProduct, addToCart, changeAmnt, notify }) => (
	<div id="currentProduct">
		{
			notify ? <Notification /> : ''
		}
		<photo>
			<Image className="mainPhoto" src={ currentProduct && currentProduct.img } responsive />
		</photo>
		<info>
			<h3>{ currentProduct.name }</h3>
			<h5>SKU { currentProduct.sku }</h5>
			<h4>${ currentProduct.price && currentProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</h4>
			<form onSubmit={ addToCart }>
				<select onChange={ changeAmnt } name="dropdown">
					<option value="1" defaultValue>1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
				<button type="submit">Add To Cart</button>
			</form>
		</info>
		<description>
			<h4>PRODUCT DETAILS</h4>
			<p>{ currentProduct.description }</p>
		</description>
		<reviews>
			<h4>REVIEWS</h4>
			{
				currentProduct.reviews && currentProduct.reviews.length ?
					currentProduct.reviews.map((review, index) => {
						return (
							<Review key={index} review={review} />
						);
					})
					: 
						<div>
							<p>Be the first to review this product!</p>
						</div>	
			}	
		</reviews>
	</div>
)
	


/* -----------------    STATEFUL REACT COMPONENT     ------------------ */

class CurrentProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
			notify: false
		};
		this.addToCart = this.addToCart.bind(this);
		this.changeAmnt = this.changeAmnt.bind(this);
	}

	addToCart(evt) {
		evt.preventDefault();
		this.setState({ notify: true })
		this.props.add(this.props.currentProduct, this.state.quantity);
	}

	changeAmnt(evt) {
		const quantity = +evt.target.value;
		this.setState({ quantity });
	}


	render() {
		const { currentProduct } = this.props;
		return (
			<DumbCurrentProduct
				currentProduct={ currentProduct }
				addToCart={ this.addToCart }
				changeAmnt={ this.changeAmnt }
				notify={ this.state.notify }
			/>
		)
	}
}



/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ({ currentProduct }) => ({ currentProduct });
const mapDispatchToProps = (dispatch) => ({
	add: (product, quantity) => dispatch(addItem(product, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentProduct);