import axios from 'axios';
import { browserHistory } from 'react-router';

/* -----------------    ACTIONS     ------------------ */

const SELECT_ORDERS = 'SELECT_ORDERS';

/* ------------   ACTION CREATORS     ------------------ */

const selectOrders = orders => ({ type: SELECT_ORDERS, orders });

/* ------------       REDUCER     ------------------ */

export default function reducer (state = [], action) {
  switch (action.type) {

    case SELECT_ORDERS:
      return action.orders;

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
