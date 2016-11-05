import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Glyphicon, InputGroup, Button } from 'react-bootstrap';
import { fetchAndGoToQueriedProduct } from '../reducers/selectedProducts';
import { connect } from 'react-redux';


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
    this.captureInput = this.captureInput.bind(this);
  }

captureInput = evt => {
  evt.preventDefault();
  this.props.search(this.state.search)
}
  render() {
    return (
      <Navbar.Form>
        <form onSubmit={this.captureInput}>
          <FormGroup>
            <InputGroup id="searchBar">
              <FormControl className="searchContainer" type="text" placeholder="Winner!" onChange={evt => this.setState({search: evt.target.value})}/>
            </InputGroup>
          </FormGroup>
          <Button className="searchBtn searchContainer" type="submit">
            <img id="searchImg" src="/images/search-icon-md.png" />
          </Button>
        </form>
      </Navbar.Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: input =>{
      console.log('input in search.jsx', input)
      dispatch(fetchAndGoToQueriedProduct(input))
    }
  }
}

export default connect(null, mapDispatchToProps)(Search);
