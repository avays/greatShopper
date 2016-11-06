import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import Search from './Search';
import { Link } from 'react-router';
import { logout } from '../reducers/auth';

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
        <span style={{color: "white"}}>{this.props.user && this.props.user.firstName ? `Welcome back, ${this.props.user.firstName}!`: (this.props.user && this.props.user.email ? `Logged in as: ${this.props.user.email}` : '')}</span>
        <Navbar.Collapse>
          <Nav title="Departments">
            <NavDropdown title="Vehicles" id="vehicles-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 2
              }).map(category => (
                <Link to={`/${category.name}`}><MenuItem key={category.id}>{ category.name }</MenuItem></Link>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Real Estate" id="real-estate-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 3
              }).map(category => (
                <Link to={`/${category.name}`}><MenuItem key={category.id}>{ category.name }</MenuItem></Link>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Apparel" id="apparel-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 4
              }).map(category => (
                <Link to={`/${category.name}`}><MenuItem key={category.id}>{ category.name }</MenuItem></Link>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Accessories" id="accessories-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 1
              }).map(category => (
                <Link to={`/${category.name}`}><MenuItem key={category.id}>{ category.name }</MenuItem></Link>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Services" id="services-nav">
              {this.props.categories.filter((category) => {
                return category.meta_category_id === 5
              }).map(category => (
                <Link to={`/${category.name}`}><MenuItem key={category.id}>{ category.name }</MenuItem></Link>
              ))
              }
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem><Link to="/cart">Cart</Link></NavItem>
            {this.props.user && this.props.user.email ? <button onClick={this.props.signout}>Sign out</button> : <NavItem><Link to="/login">Login</Link></NavItem>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ categories, user }) => ({ categories, user });

const mapDispatch = (dispatch) => ({
  signout: () => {
    dispatch(logout())
  }
})

export default connect(mapProps, mapDispatch)(Navigbar);