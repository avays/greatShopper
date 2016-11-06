'use strict';

import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

/* -----------------    COMPONENTS     ------------------ */
import Root from './components/Root';
import Main from './components/Main';
import CurrentProduct from './components/CurrentProduct';
import SelectedProducts from './components/SelectedProducts';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Shipping from './components/Shipping';
import Login from './components/Login';

/* -----------------    ON-ENTER HOOKS     ------------------ */
import { onProductSelect } from './enter-hooks';
import { loadCategories } from './enter-hooks';
import { loadCategoryProducts } from './enter-hooks';

export default () => (
	<Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={loadCategories}>
      <IndexRoute component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/product/:sku" component={CurrentProduct} onEnter={onProductSelect} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} >
        <Route path="/checkout/shipping" component={Shipping} />
      </Route>
      <Route path="/search" component={SelectedProducts}/>
      <Route path="/:categoryName" component={SelectedProducts} onEnter={loadCategoryProducts} />
    </Route>
  </Router>
);
    //    <Route path="/payment" component={Payment} />
      //  <Route path="/confirmation" component={Confirmation} />

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