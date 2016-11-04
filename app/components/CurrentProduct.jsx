import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

const CurrentProduct = ({ currentProduct }) => (
	<div>
		<h3>{ currentProduct.name }</h3>
		<img src="./images/default.jpg"></img>
		<h4>{ currentProduct.price }</h4>
		<p>{ currentProduct.description }</p>
	</div>

)


/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = ({ currentProduct }) => ({ currentProduct });
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentProduct);