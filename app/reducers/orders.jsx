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
    axios.get(`/api/orders/${userid}`)
      .then(orders => {
        dispatch(selectOrders(orders.data));
      })
      .catch(err => console.error('Fetching orders failed', err))
  };
}
