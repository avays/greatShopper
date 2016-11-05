import { combineReducers } from 'redux';
import selectedProducts from './selectedProducts';
import currentProduct from './currentProduct';
import categories from  './categories'

const rootReducer = combineReducers({
	currentProduct,
  	selectedProducts,
  	categories
});


export default rootReducer
