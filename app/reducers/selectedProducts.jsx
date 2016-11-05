import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SELECT_PRODUCT = 'SELECT_PRODUCT';



/* ------------   ACTION CREATORS     ------------------ */

const selectProduct = product => ({ type: SELECT_PRODUCT, product });



/* ------------       REDUCER     ------------------ */

export default function reducer (state = {}, action) {
  switch (action.type) {

    case SELECT_PRODUCT:
      return action.product;

    default:
      return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchAndGoToProduct = product =>
  dispatch => {
    axios.get(`api/products/${product.sku}`)
      .then(product => {
        dispatch(selectProduct(product));
      });
};