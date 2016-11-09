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
          <Image width={900} height={500} alt="900x500" src="/images/patek.jpg" responsive />
          <Carousel.Caption>
            <h3>Perpetual Calendar Platinum 2499</h3>
            <p>Patek Philippe. The one and only.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={900} height={500} alt="900x500" src="/images/yacht.jpg" responsive/>
          <Carousel.Caption>
            <h3>Dominator 800</h3>
            <p>Immerse yourself in a luxury playground by the sea.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image width={900} height={500} alt="900x500" src="/images/tie.jpg" responsive/>
          <Carousel.Caption>
            <h3>Stefano Ricci</h3>
            <p>Silk. Made in Italy.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
  }
}


