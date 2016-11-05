import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SELECT_PRODUCTS = 'SELECT_PRODUCTS';



/* ------------   ACTION CREATORS     ------------------ */

const selectProducts = products => ({ type: SELECT_PRODUCTS, products });



/* ------------       REDUCER     ------------------ */

export default function reducer (state = [], action) {
  switch (action.type) {

    case SELECT_PRODUCTS:
      return action.products;

    default:
      return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchAndGoToProducts = (categoryName) =>
  dispatch => {
    axios.get(`api/categories/${categoryName}`)
      .then(category => {
        let products = category.data[0] ? category.data[0].products : [];
        dispatch(selectProducts(products));
      });
};