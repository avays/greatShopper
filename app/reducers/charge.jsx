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
    axios.post(`/api/payments/${orderDataForStripe.token}`, orderDataForStripe)
      .then(charge => {
        if (charge.id) {

          axios.post(`/api/addresses/`, orderDataFromStore.shippingAddress)
            .then(address => {
              return address.id
            })
            .then(address_id => {

              const payment_id = charge.id;
              const user_id = orderDataFromStore.user_id;
              const completeOrderInfo = Object.assign(user_id, payment_id, address_id)
              
              axios.post(`/api/orders`, completeOrderInfo)
                .then(order => {
                  //order.id

                  const completeOrderItemArray = orderDataFromStore.map(item => {
                    return Object.assign({}, item, { order_orderNumber: order.id })
                  });
                  const orderItemsObj = { items: completeOrderItemArray }

                  axios.post(`/api/order_items/bulk`, orderItemsObj)
                  //

                })
            })
        } 

        dispatch(receiveCharge(charge.data));
      })
      .then(browserHistory.push('/checkout/aftersubmit'))
      .catch(err => console.error(err))
  }
}

// ===============================
// NEED TO MIMIC THIS FUNCTIONALITY IN ORDER SUBMIT DISPATCHER
// ===============================

const persistOrder = (charge, cart, shippingAddress, user) => {
  // const makingOrder = axios.post(`/api/orders`)
  // const makingAddress = axios.post(`/api/address`, shippingAddress)


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
