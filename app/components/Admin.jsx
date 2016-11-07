import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { addCategory } from '../reducers/categories'

/* -----------------    COMPONENT     ------------------ */

class Admin extends Component{

  constructor(props) {
      super(props);
      this.makeCategory = this.makeCategory.bind(this);
  }

  makeCategory(evt){
    evt.preventDefault();
    this.props.createCategory(evt.target.categoryName.value,
      evt.target.metaCategory.value);
  }

 render(){
   return ( 
    <div className="order">
     <h3>Admin Panel</h3>
     {
      (this.props.user && this.props.user.isAdmin) ?
      <div>
      <p>Create New Category</p>
      <form onSubmit={ this.makeCategory }>
        <div className="form-group">
          <label>Category Name:</label>
          <input type="text"  name="categoryName"/>
        </div>
        <div className="form-group">
          <label>Meta Category:</label>
            <select name="metaCategory">
              <option value="1">Accessories</option>
              <option value="4">Apparel</option>
              <option value="3">Real Estate</option>
              <option value="5">Services</option>
              <option value="2">Vehicles</option>
            </select>
        </div>
        <button type="submit">Create</button>
      </form>
       </div>
       :
      <h3></h3>
      }
     </div>);
  }
}



/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  createCategory: (categoryName, metaCategory) => dispatch(addCategory(categoryName, metaCategory))
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
