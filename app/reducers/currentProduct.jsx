import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const LOAD_PRODUCT = 'LOAD_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';


/* ------------   ACTION CREATORS     ------------------ */

const loadProduct = product => ({
  type: LOAD_PRODUCT,
  product
});

export const clearProduct = () => ({
  type: CLEAR_PRODUCT
});


/* ------------       REDUCER     ------------------ */

export default function reducer (previousState = {}, action) {
  switch (action.type) {

    case LOAD_PRODUCT:
      return action.product;

    case CLEAR_PRODUCT:
      return {};

    default:
      return previousState;
  }
}


/* ------------       DISPATCHERS     ------------------ */

// export const clickRight = index => dispatch => {
//   dispatch(moveForward(index));
// };



export const fetchAndGoToProduct = sku => {
  return dispatch => {
    axios.get(`/api/products/${sku}`)
      .then(product => dispatch(loadProduct(product.data)))
      .catch(err => console.error('Fetching product failed', err))
  }
}