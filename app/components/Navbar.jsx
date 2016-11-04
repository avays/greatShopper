import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import Search from './navbarComponents/search';
import Login from './navbarComponents/login';
import Cart from './navbarComponents/cart';
import Catagories from './navbarComponents/collapsable';

export default class CustomNavBar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Great Shopper</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Search />
      <Navbar.Collapse>
        <Nav title="Departments">
          <NavDropdown title="Vehicles" id="vehicles-nav">
            <MenuItem>Jets</MenuItem>
            <MenuItem>Yachts</MenuItem>
            <MenuItem>Cars</MenuItem>
            <MenuItem>Motorcycles</MenuItem>
            <MenuItem>Helicopters</MenuItem>
          </NavDropdown>
          <NavDropdown title="Real Estate" id="real-estate-nav">
            <MenuItem>Mansions</MenuItem>
            <MenuItem>Walls</MenuItem>
            <MenuItem>Hotels</MenuItem>
            <MenuItem>Casinos</MenuItem>
            <MenuItem>Islands</MenuItem>
            <MenuItem>Golf Courses</MenuItem>
          </NavDropdown>
          <NavDropdown title="Apparel" id="apparel-nav">
            <MenuItem>Suits</MenuItem>
            <MenuItem>Shoes</MenuItem>
            <MenuItem>Ties</MenuItem>
            <MenuItem>Accessories</MenuItem>
          </NavDropdown>
          <NavDropdown title="Services" id="services-nav">
            <MenuItem>Lawyers</MenuItem>
            <MenuItem>Bodyguards</MenuItem>
            <MenuItem>Accountants</MenuItem>
            <MenuItem>Social Media Reps</MenuItem>
            <MenuItem>Chauffeurs</MenuItem>
            <MenuItem>Pilots</MenuItem>
            <MenuItem>Butlers</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">Cart</NavItem>
          <NavItem eventKey={1} href="#">Login</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}
