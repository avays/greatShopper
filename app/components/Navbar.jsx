import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button } from 'react-bootstrap';
import Search from './Search';
import { Link } from 'react-router';
import { logout } from '../reducers/auth';
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
      <div>
        <div className="background"/>
        <Navbar inverse collapseOnSelect >
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <img id="mainLogo" src="/GreatShopperWithBack.svg"/>
          </Link>
        </Navbar.Brand>
            <Navbar.Collapse className="dropdownContainer">
              <div id="leftDepartments">
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
                  <div className="space" />
                 </Nav>
              </div>
               <div id="rightDepartments">
                  <Nav title="Departments">
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
                </div>
              <Nav pullRight>
                <LinkContainer to="/admin">
                  <NavItem>{this.props.user && this.props.user.isAdmin && "Admin Panel"}</NavItem>
                </LinkContainer>

                <LinkContainer to={`/orders/${this.props.user && this.props.user.id}`}>
                  <NavItem>{this.props.user && "Your Orders"}</NavItem>
                </LinkContainer>

                <LinkContainer to="/cart">
                  <NavItem>Cart ({this.props.cart && this.props.cart.length})</NavItem>
                </LinkContainer>

                {
                this.props.user && this.props.user.email ?
                  <NavItem onClick={this.props.signout}>Sign Out</NavItem> :
                  < LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>
                }

              </Nav>
            </Navbar.Collapse>
          <span style={{color: "white"}}>
        {
            this.props.user ?
              `Welcome back, ${this.props.user.firstName || this.props.user.email}!`
            :
              ''
          }
        </span>
        <Search />
        </Navbar>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ categories, user , cart}) => ({ categories, user, cart });

const mapDispatch = (dispatch) => ({
  signout: () => {
    dispatch(logout())
  }
})

export default connect(mapProps, mapDispatch)(Navigbar);