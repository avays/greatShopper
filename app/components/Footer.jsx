import React, { Component } from 'react';


export default class Footer extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <div>
        <footer className="footer">
          <div>
            <p className="text-muted">Place sticky footer content here.</p>
          </div>
       </footer>
      </div>
    )


  }
}