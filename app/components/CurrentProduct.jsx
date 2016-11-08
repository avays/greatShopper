import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import Review from './Review';
import Notification from './Notification';
import { addItem } from '../reducers/cart';
import ContentEditable from "react-contenteditable";
import {updateProduct} from '../reducers/currentProduct'

/* -----------------    DUMB COMPONENT     ------------------ */


// NOTE: IF YOU EDIT THE TAG INSIDE HTML OF CONTENTEDITABLE, MAKE SURE TO UPDATE THE SLICE IN THE CHANGE____FIELD FNS TO THE NEW SIZE
const DumbCurrentProduct = ({ modifyProduct, state, changeNameField, changeDescriptionField, changePriceField, user, currentProduct, categories, addToCart, changeAmnt, notify }) => (
	<div id="currentProduct">
		{
			notify ? <Notification /> : ''
		}
		<photo>
			<Image className="mainPhoto" src={ currentProduct && currentProduct.img } responsive />
		</photo>
		<info>
			<ContentEditable
                html={`<h3>${ currentProduct.name }</h3>`}
                disabled={!(user && user.isAdmin)}      
                onChange={changeNameField}
              />
			<h5>SKU { currentProduct.sku }</h5>
			<ContentEditable
                html={`<h4>${ currentProduct.price && currentProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</h4>`}
                disabled={!(user && user.isAdmin)}      
                onChange={changePriceField}
              />
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
			<ContentEditable
                html={`<p>${ currentProduct.description }</p>`}
                disabled={!(user && user.isAdmin)}      
                onChange={changeDescriptionField}
              />
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
		{(user && user.isAdmin && (state.name || state.description || state.price || state.description) && <footer className="footery"><div><button onClick={modifyProduct}>Save Changes</button></div></footer>)}   
	</div>
)
	


/* -----------------    STATEFUL REACT COMPONENT     ------------------ */

class CurrentProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
			notify: false,
			name: "",
			description: "",
			price: "",
			imageUrl: ""
		};
		this.addToCart = this.addToCart.bind(this);
		this.changeAmnt = this.changeAmnt.bind(this);

		this.changeNameField = this.changeNameField.bind(this);
		this.changeDescriptionField = this.changeDescriptionField.bind(this);
		this.changePriceField = this.changePriceField.bind(this);

		this.modifyProduct = this.modifyProduct.bind(this);

	}

	changeNameField(evt) {
		evt.preventDefault();
		var name = evt.target.value.slice(4,-5)
		// console.log(name) 
		this.setState({ name })
	}

	changeDescriptionField(evt) {
		evt.preventDefault();
		var description = evt.target.value.slice(3,-4)
		// console.log(description) 
		this.setState({ description })
	}

	changePriceField(evt) {
		evt.preventDefault();
		var price = evt.target.value.slice(4,-5)
		this.setState({ price })
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

	modifyProduct(){
		var output = {sku: this.props.currentProduct.sku};

		if(this.state.name){ output.name = this.state.name; }
		if(this.state.description){ output.description = this.state.description; }
		if(this.state.price){ output.price = this.state.price; }
		if(this.state.imageUrl){ output.imageUrl = this.state.imageUrl; }

		this.props.changeProduct(output);
	}


	render() {
		const { categories, user, currentProduct } = this.props;
		return (
			<DumbCurrentProduct
				currentProduct={ currentProduct }
				addToCart={ this.addToCart }
				changeAmnt={ this.changeAmnt }
				notify={ this.state.notify }
				user={ user}
				changeNameField={ this.changeNameField }
				changeDescriptionField={ this.changeDescriptionField }
				changePriceField={ this.changePriceField }
				state={this.state}
				categories={categories}
				modifyProduct={this.modifyProduct}
			/>
		)
	}
}



/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ({ categories, user, currentProduct }) => ({ categories, user, currentProduct });
const mapDispatchToProps = (dispatch) => ({
	add: (product, quantity) => dispatch(addItem(product, quantity)),
	changeProduct: (product) => dispatch(updateProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentProduct);