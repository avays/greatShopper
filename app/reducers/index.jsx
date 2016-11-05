import { combineReducers } from 'redux';
import selectedProducts from './selectedProductsRedux';
import currentProduct from './currentProduct';

const rootReducer = combineReducers({
	currentProduct,
  	selectedProducts
});


export default rootReducer
