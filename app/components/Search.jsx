import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';


export default class Search extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <Navbar.Form>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" placeholder="Winner!" />
            <InputGroup.Addon>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        
      </Navbar.Form>
    )
  }
}