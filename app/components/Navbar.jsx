import React, { Component } from 'react';
import Search from './navbarComponents/search';
import Login from './navbarComponents/login';
import Cart from './navbarComponents/cart';
import Catagories from './navbarComponents/collapsable';

export default class Navbar extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Brand</a>
            </div>
            <Search />
            <Cart />
            <Login />
            <Catagories />
          </div>
        </nav>
      </div>
    )
  }
}