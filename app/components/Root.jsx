import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


export default class MainPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Navbar/>
          { this.props.children }
        <Footer/>
      </div>
    )
  }
}