import axios from 'axios';
import { browserHistory } from 'react-router';

/* -----------------    ACTIONS     ------------------ */

const SELECT_ORDER = 'SELECT_ORDER';
const CLEAR_ORDER = 'CLEAR_ORDER';

/* ------------   ACTION CREATORS     ------------------ */

export const selectOrder = order => ({ type: SELECT_ORDER, order });

export const clearOrder = () => ({
  type: CLEAR_ORDER
});

/* ------------       REDUCER     ------------------ */

export default function reducer (state = {}, action) {
  switch (action.type) {

    case SELECT_ORDER:
      return action.order;

    case CLEAR_ORDER:
      return {};

    default:
      return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchAndGoToOrder = (orderNumber) => {
  return dispatch => {
    axios.get(`/api/orders/${orderNumber}`)
      .then(order => {
        axios.get(`/api/payments/${order.data.payment_id}`)
          .then(publicData => {
            return Object.assign(order.data, publicData.data)
          })
          .then(combinedOrder => {
            dispatch(selectOrder(combinedOrder))
          })
          .catch(err => console.error('Stripe call failure', err))
      })
      .catch(err => console.error('API call failure', err))
  };
}
