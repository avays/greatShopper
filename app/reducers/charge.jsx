import axios from 'axios';
import { browserHistory } from 'react-router';
import { clearCart } from './cart';

/* -----------------    ACTIONS     ------------------ */

const RECEIVE_CHARGE = 'RECEIVE_CHARGE';
const DELOAD_CHARGE = 'DELOAD_CHARGE';


/* ------------   ACTION CREATORS     ------------------ */

const receiveCharge = charge => ({
  type: RECEIVE_CHARGE,
  charge
});

export const deloadCharge = () => ({
  type: DELOAD_CHARGE
})


/* ------------       REDUCER     ------------------ */

const defaultState = {
  received: false,
  chargeData: {}
}

export default function reducer (previousState = defaultState, action) {
  switch (action.type) {

    case RECEIVE_CHARGE:
      return { received: true, chargeData: action.charge };

    case DELOAD_CHARGE:
      return defaultState;

    default:
      return previousState;
  }
}


/* ------------       DISPATCHERS     ------------------ */



export const submitOrder = (orderDataForStripe, orderDataFromStore) => {
  return dispatch => {
    axios.post(`/api/payments/${orderDataForStripe.token}`, {orderDataForStripe, orderDataFromStore})
      .then(charge => {
        
        if (charge.data.id) {
          dispatch(clearCart())
        }

        dispatch(receiveCharge(charge.data));
      })
      .then(browserHistory.push('/checkout/aftersubmit'))
      .catch(err => console.error(err))
  }
}
