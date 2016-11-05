import { combineReducers } from 'redux';
import carousel from './carousel';
import selectedProducts from './selectedProductsRedux';

const rootReducer = combineReducers({
	carousel,
  	selectedProducts
});


export default rootReducer
