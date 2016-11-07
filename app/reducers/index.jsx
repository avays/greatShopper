import { combineReducers } from 'redux';
import selectedProducts from './selectedProducts';
import currentProduct from './currentProduct';
import categories from  './categories';
import cart from  './cart';
import user from  './auth';
import orders from  './orders';
import selectedOrder from  './selectedOrder';
import shippingAddress from './shippingAddress';

const rootReducer = combineReducers({
	currentProduct,
	selectedProducts,
	categories,
	cart,
	user,
	orders,
	selectedOrder,
	shippingAddress
});


export default rootReducer;
