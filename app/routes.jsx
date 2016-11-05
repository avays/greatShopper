'use strict';

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

/* -----------------    COMPONENTS     ------------------ */
import Root from './components/Root';
import Main from './components/Main';
import CurrentProduct from './components/CurrentProduct';

/* -----------------    ON-ENTER HOOKS     ------------------ */
import { onProductSelect } from './enter-hooks';

export default () => (
	<Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Main} />
      <Route path="/product/:sku" component={CurrentProduct} onEnter={onProductSelect} />
    </Route>
  </Router>
);

      // <Route path="/products/:selected" component={}



//==========================
// BELOW CODE FROM BONES
//==========================
// import Login from './components/Login';
// import WhoAmI from './components/WhoAmI';

// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav> 
//       {children}
//     </div>
// )