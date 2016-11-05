import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

/* ------------   ACTION CREATORS     ------------------ */

export const addItem = (product, quantity) => ({
  type: ADD_ITEM,
  productAndQuantity: {product, quantity}
});
export const removeItem = product => ({
  type: REMOVE_ITEM,
  product
});
export const changeQuantity = (product, quantity) => ({
  type: CHANGE_QUANTITY,
  productAndQuantity: {product, quantity}
});
export const clearCart = () => ({
  type: CLEAR_CART
});

/* ------------       REDUCER     ------------------ */

export default function reducer (previousState = [], action) {
  switch (action.type) {

    case ADD_ITEM:
      return [...previousState, {product: action.productAndQuantity.product, quantity: action.productAndQuantity.quantity}]

    case CHANGE_QUANTITY:
      return previousState.map((item) => {
        if(item.product.sku === action.productAndQuantity.product.sku){
          return {product: item.product, quantity: action.productAndQuantity.quantity};
        } 
        else{
          return item;
        }
      })

    case REMOVE_ITEM:
      return previousState.filter((item) => {
        return (item.product.sku !== action.productAndQuantity.product.sku);
      })

    case CLEAR_CART:
      return [];

    default:
      return previousState;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchAndStoreCategories = dispatch => ({
  dispatch(addItem(product, quantity))
})
}