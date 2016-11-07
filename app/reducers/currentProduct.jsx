import axios from 'axios';
import {browserHistory} from "react-router";

/* -----------------    ACTIONS     ------------------ */

const LOAD_PRODUCT = 'LOAD_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';
// const UPDATE_PRODUCT = 'UPDATE_PRODUCT';


/* ------------   ACTION CREATORS     ------------------ */

const loadProduct = product => ({
  type: LOAD_PRODUCT,
  product
});

// const updateProduct = product => ({
//   type: UPDATE_PRODUCT,
//   product
// });

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

    // case UPDATE_PRODUCT:
    //   return Object.assign({}, previousState, action.product}

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

export const updateProduct = product => {
  return dispatch => {
    axios.put(`/api/products/${product.sku}`, product)
      .then(() => {
        // console.log("pets are mini children")
        dispatch(fetchAndGoToProduct(product.sku))
      })
      .catch(err => console.error('Fetching product failed', err))
  }
}

export const addProduct = (product, categoryProduct) => {
  return dispatch => {
    console.log("AAAAAAAAA", product)
    axios.post(`/api/products`, product)
      .then(() => axios.post(`/api/category_products`, categoryProduct))
      .then(() => {
        dispatch(fetchAndGoToProduct(product.sku))
      })
      .then(browserHistory.push(`/product/${product.sku}`))
      .catch(err => console.error('Fetching product failed', err))
  }
}