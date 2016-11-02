import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super()

  }

  render() {
    return (
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
    )
  }
}