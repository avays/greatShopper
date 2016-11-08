import axios from 'axios';
import { browserHistory } from 'react-router';

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

// need to send cart, shippingAddress, and user
// could maybe bundle this data together on the frontEnd and then send
/*
  const orderDataFromStore = {
    user_id,
    shippingAddress,
    order_items
  }
  */

  /*
      order items is an array of: 
    return {
      quantity: item.quantity,
      priceAtPurchase: +item.product.price,
      product_sku: item.product.sku
    }
  */


export const submitOrder = (orderDataForStripe, orderDataFromStore) => {
  return dispatch => {
    axios.post(`/api/payments/${orderDataForStripe.token}`, {orderDataForStripe, orderDataFromStore})
      .then(charge => {
        dispatch(receiveCharge(charge.data));
      })
      .then(browserHistory.push('/checkout/aftersubmit'))
      .catch(err => console.error(err))
  }
}
