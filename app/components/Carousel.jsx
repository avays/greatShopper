import React, { Component } from 'react';
import { Carousel, Image } from 'react-bootstrap';

/* -----------------    COMPONENT     ------------------ */
export default class DumbCarousel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Carousel >
        <Carousel.Item>
          <Image width={900} height={500} alt="900x500" src="/images/default.jpg" responsive />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={900} height={500} alt="900x500" src="/images/default.jpg" responsive/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={900} height={500} alt="900x500" src="/images/default.jpg" responsive/>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
  }
}


