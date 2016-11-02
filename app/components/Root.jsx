import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default class MainPage extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <div>
        <Navbar/>
        <Footer/>
      </div>
    )


  }
}