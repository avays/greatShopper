import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_SHIPPING_ADDRESS = 'SET_SHIPPING_ADDRESS';

/* ------------   ACTION CREATORS     ------------------ */

export const setShippingAddress = address => ({ type: SET_SHIPPING_ADDRESS, address });


/* ------------       REDUCER     ------------------ */

const defaultState = {
  name: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  zip: ''
};

export default function reducer (state = defaultState, action) {
  switch (action.type) {

    case SET_ADDRESS:
      return action.address;

    default:
      return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */

// export const fetchAndGoToOrder = (orderNumber) => {
//   return dispatch => {
//     axios.get(`/api/orders/${orderNumber}`)
//       .then(order => {
//         axios.get(`/api/payments/${order.data.payment_id}`)
//           .then(publicData => {
//             return Object.assign(order.data, publicData.data)
//           })
//           .then(combinedOrder => {
//             dispatch(selectOrder(combinedOrder))
//           })
//           .catch(err => console.error('Stripe call failure', err))
//       })
//       .catch(err => console.error('API call failure', err))
//   };
// }
