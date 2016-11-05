import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import Search from './Search';

/* -----------------    COMPONENT     ------------------ */

class Navigbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessories: [],
      vehicles: [],
      realEstate: [],
      apparel: [],
      services: []};
    // this.renderLoginSignup = this.renderLoginSignup.bind(this);
    // this.renderLogout = this.renderLogout.bind(this);
  }

  componentDidMount(){
    // this adds the subcategories to the state
    this.props.categories.forEach(category => {
      switch (category.meta_category_id){
        case 1:
          return this.state.accessories.push(category);
        case 2:
          return this.state.vehicles.push(category);
        case 3:
          return this.state.realEstate.push(category);
        case 4:
          return this.state.apparel.push(category);
        case 5:
          return this.state.services.push(category);
        default:
          break;
        }
      }
    );
  }

  render(){
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
              {this.state.vehicles.map(category => (
                <MenuItem onClick={() => go(category)}>{ category.name }</MenuItem>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Real Estate" id="real-estate-nav">
              {this.state.realEstate.map(category => (
                <MenuItem onClick={() => go(category)}>{ category.name }</MenuItem>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Apparel" id="apparel-nav">
              {this.state.apparel.map(category => (
                <MenuItem onClick={() => go(category)}>{ category.name }</MenuItem>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Accessories" id="accessories-nav">
              {this.state.accessories.map(category => (
                <MenuItem onClick={() => go(category)}>{ category.name }</MenuItem>
              ))
              }
            </NavDropdown>
            <NavDropdown title="Services" id="services-nav">
              {this.state.services.map(category => (
                <MenuItem onClick={() => go(category)}>{ category.name }</MenuItem>
              ))
              }
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

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ categories }) => ({ categories });

const mapDispatch = dispatch => ({ 
  go: category => dispatch(fetchCategoryProducts(category))
  }
  // logout: () => {
  //   dispatch(logout())
  //   browserHistory.push('/');
  // }
})

export default connect(mapProps, mapDispatch)(Navigbar);