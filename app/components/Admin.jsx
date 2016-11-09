import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addCategory } from '../reducers/categories'
import { addProduct } from '../reducers/currentProduct'
import { Select, Option, Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';


/* -----------------    COMPONENT     ------------------ */

class Admin extends Component{

  constructor(props) {
      super(props);
      this.makeCategory = this.makeCategory.bind(this);
      this.makeProduct = this.makeProduct.bind(this);
  }

  makeCategory(evt){
    evt.preventDefault();
    this.props.createCategory(evt.target.categoryName.value,
      evt.target.metaCategory.value);
  }

  makeProduct(evt){
    evt.preventDefault();

    var product = {
      name: evt.target.productName.value,
      sku: evt.target.sku.value,
      quantity: evt.target.quantity.value,
      imageUrl: evt.target.imageUrl.value,
      price: evt.target.price.value,
      description: evt.target.description.value
    }

    var categoryProduct = {
      id: evt.target.category.value,
      sku: evt.target.sku.value
    }

    this.props.createProduct(product, categoryProduct);
  }

 render(){
   return (
    <div className="comp-container">
     <h2>Admin Panel</h2>
     {
      (this.props.user && this.props.user.isAdmin) ?
      <div>
      <div>
      <h4>Create New Category</h4>
      <Form horizontal onSubmit={ this.makeCategory }>
        <FormGroup controlId="formHorizontalCat">
          <Col componentClass={ControlLabel} sm={2}>Category Name:</Col>
           <FormControl type="text"  name="categoryName"/>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>Meta Category:</Col>
            <select name="metaCategory">
              <option value="1">Accessories</option>
              <option value="4">Apparel</option>
              <option value="3">Real Estate</option>
              <option value="5">Services</option>
              <option value="2">Vehicles</option>
            </select>
        </FormGroup>
        <Button type="submit">Create</Button>
      </Form>
       </div>
       <div>
      <h4>Create New Product</h4>
      <Form horizontal onSubmit={ this.makeProduct }>
        <FormGroup controlId="formHorizontalProd">
          <Col componentClass={ControlLabel} sm={2}>Product Name:</Col>
          <FormControl type="text"  name="productName"/>
        </FormGroup>
        <FormGroup controlId="formHorizontalProdName">
          <Col componentClass={ControlLabel} sm={2}>Category:</Col>
            <select name="category">
              {this.props.categories && this.props.categories.filter(category => ((category.id !== 1) && (category.id !== 2) && (category.id !== 3) && (category.id !== 4) && (category.id !== 5))).map(category => <option value={`${category.id}`}>{category.name}</option>)}
            </select>
        </FormGroup>
        <FormGroup controlId="formHorizontalSku">
          <Col componentClass={ControlLabel} sm={2}>SKU:</Col>
          <FormControl type="text"  name="sku"/>
        </FormGroup>
        <FormGroup controlId="formHorizontalQuant">
          <Col componentClass={ControlLabel} sm={2}>Quantity:</Col>
          <FormControl type="text"  name="quantity"/>
        </FormGroup>
        <FormGroup controlId="formHorizontalUrl">
          <Col componentClass={ControlLabel} sm={2}>Image URL:</Col>
          <FormControl type="text"  name="imageUrl"/>
        </FormGroup>
        <FormGroup controlId="formHorizontalPrice">
          <Col componentClass={ControlLabel} sm={2}>Price:</Col>
          <FormControl type="text"  name="price"/>
        </FormGroup>
        <FormGroup controlId="formHorizontalDesc">
          <Col componentClass={ControlLabel} sm={2}>Description:</Col>
          <FormControl type="text"  name="description"/>
        </FormGroup>
        <Button type="submit">Create</Button>
      </Form>
       </div>
       </div>

       :
      <h3></h3>
      }
     </div>);
  }
}



/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ user , categories}) => ({ user , categories});

const mapDispatchToProps = (dispatch) => ({
  createCategory: (categoryName, metaCategory) => dispatch(addCategory(categoryName, metaCategory)),
  createProduct: (product, categoryProduct) => dispatch(addProduct(product, categoryProduct))
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
