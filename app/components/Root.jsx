import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Main from './Main';

export default class MainPage extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <div>
        <Navbar/>
        <Main />
        <Footer/>
      </div>
    )


  }
}