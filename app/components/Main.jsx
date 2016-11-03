import React, { Component } from 'react';
import Carousel from './Carousel';

export default class Main extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <div className="main-container">
      	<Carousel />
      </div>
    )
  }
}