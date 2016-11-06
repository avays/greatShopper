import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import Search from './Search';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

/* -----------------    COMPONENT     ------------------ */

class Navigbar extends React.Component {
  constructor(props) {
    super(props);

    // this.renderLoginSignup = this.renderLoginSignup.bind(this);
    // this.renderLogout = this.renderLogout.bind(this);
  }


  render(){
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Great Shopper</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Search />
        <Navbar.Collapse>
          <Nav title="Departments">
            <NavDropdown title="Vehicles" id="vehicles-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 2
              }).map(category => (
                <LinkContainer key={category.id} to={`/${category.name}`}><MenuItem>{ category.name }</MenuItem></LinkContainer>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Real Estate" id="real-estate-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 3
              }).map(category => (
                <LinkContainer key={category.id} to={`/${category.name}`}><MenuItem>{ category.name }</MenuItem></LinkContainer>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Apparel" id="apparel-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 4
              }).map(category => (
                <LinkContainer key={category.id} to={`/${category.name}`}><MenuItem>{ category.name }</MenuItem></LinkContainer>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Accessories" id="accessories-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 1
              }).map(category => (
                <LinkContainer key={category.id} to={`/${category.name}`}><MenuItem>{ category.name }</MenuItem></LinkContainer>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Services" id="services-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 5
              }).map(category => (
                <LinkContainer key={category.id} to={`/${category.name}`}><MenuItem>{ category.name }</MenuItem></LinkContainer>
              ))
              }
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/cart"><NavItem>Cart</NavItem></LinkContainer>
            <LinkContainer to="/"><NavItem>Login</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ categories }) => ({ categories });

// const mapDispatch = dispatch => ({
//   go: category => dispatch(fetchCategoryProducts(category))
//   }
//   // logout: () => {
//   //   dispatch(logout())
//   //   browserHistory.push('/');
//   // }
// })

export default connect(mapProps, null)(Navigbar);