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
import Signup from './components/Signup';
import Orders from './components/Orders';
// import Account from './components/Account';

/* -----------------    ON-ENTER HOOKS     ------------------ */
import { onProductSelect, loadCategories, loadCategoryProducts, loadQueriedProducts, loadOrders } from './enter-hooks';
import { onProductLeave, deloadCategoryProducts } from './leave-hooks';


export default () => (
	<Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={loadCategories}>
      <IndexRoute component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/orders/:id" component={Orders} onEnter={loadOrders}/>
      <Route path="/product/:sku" component={CurrentProduct} onEnter={onProductSelect} onLeave={onProductLeave} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} >
        <Route path="/checkout/shipping" component={Shipping} />
      </Route>
      <Route path="/search/:query" component={SelectedProducts} onEnter={loadQueriedProducts} />
      <Route path="/:categoryName" component={SelectedProducts} onEnter={loadCategoryProducts} onLeave={deloadCategoryProducts}/>
    </Route>
  </Router>
);
   //    <Route path="/account" component={Account} onEnter={loadAccount}/>
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