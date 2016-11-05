import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

/* -----------------    COMPONENT     ------------------ */

const CurrentProduct = ({ currentProduct }) => (
	<div id="currentProduct">
		<photo>
			<Image className="mainPhoto" src="/images/default.jpg" responsive />
		</photo>
		<info>
			<h3>{ currentProduct.name }</h3>
			<h5>SKU { currentProduct.sku }</h5>
			<h4>${ currentProduct.price && currentProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</h4>
			<form>
				<select name="dropdown">
					<option value="1" defaultValue>1</option>
					<option value="2">2</option>
					<option value="2">3</option>
				</select>
			</form>
			<button>Add To Cart</button>
		</info>
		<description>
			<h4>PRODUCT DETAILS</h4>
			<p>{ currentProduct.description }</p>
		</description>
		<reviews>
			<div>Number of reviews: { currentProduct.reviews && currentProduct.reviews.length }</div>
		</reviews>
	</div>
)


/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ({ currentProduct }) => ({ currentProduct });
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentProduct);