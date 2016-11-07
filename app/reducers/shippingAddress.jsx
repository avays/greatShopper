
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

    case SET_SHIPPING_ADDRESS:
      return action.address;

    default:
      return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */


