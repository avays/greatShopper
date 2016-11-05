import { combineReducers } from 'redux';
import selectedProducts from './selectedProducts';
import currentProduct from './currentProduct';
import categories from  './categories'
import cart from  './cart'

const rootReducer = combineReducers({
	currentProduct,
  	selectedProducts,
  	categories,
  	cart
});


export default rootReducer
