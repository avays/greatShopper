import axios from 'axios';
import { browserHistory } from 'react-router';

/* -----------------    ACTIONS     ------------------ */

const SELECT_ORDERS = 'SELECT_ORDERS';
const DELOAD = 'DELOAD';

/* ------------   ACTION CREATORS     ------------------ */

const selectOrders = orders => ({ type: SELECT_ORDERS, orders });

export const deloadAllOrders = () => ({
  type: DELOAD
});

/* ------------       REDUCER     ------------------ */

export default function reducer (state = [], action) {
  switch (action.type) {

    case SELECT_ORDERS:
      return action.orders;

    case DELOAD:
      return [];

    default:
      return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchAndGoToOrders = (userid) => {
  return dispatch => {
    axios.get(`/api/orders/user/${userid}`)
      .then(orders => {
        dispatch(selectOrders(orders.data));
      })
      .catch(err => console.error('Fetching orders failed', err))
  };
}

export const persistOrder = (charge, cart, shippingAddress, user) => {
  return dispatch => {
    axios.post(`/api/orders/`)
      .then(order => {
        console.log('made an order!')
        console.log('still have access to stuff like address: ', shippingAddress)
        console.log('Promisify the order-item creations')
        console.log(order.data)
      })
      .catch(err => console.error('Persisting order failed', err))
  }
}
