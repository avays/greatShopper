import React, { Component } from 'react';

export default class Search extends Component {
  constructor() {
    super()

  }

  render() {
    return (
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
    )
  }
}