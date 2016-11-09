
/* -----------------    ACTIONS     ------------------ */

const SET_SHIPPING_ADDRESS = 'SET_SHIPPING_ADDRESS';

/* ------------   ACTION CREATORS     ------------------ */

export const setShippingAddress = address => ({ type: SET_SHIPPING_ADDRESS, address });


/* ------------       REDUCER     ------------------ */

const defaultState = {};

export default function reducer (state = defaultState, action) {
  switch (action.type) {

    case SET_SHIPPING_ADDRESS:
      return action.address;

    default:
      return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */


