import store from './store';

import { clearProduct } from './reducers/currentProduct';
import { clearOrder } from './reducers/selectedOrder';
import { deloadProducts} from './reducers/selectedProducts';
import { deloadAllOrders} from './reducers/orders';
import { deloadCharge } from './reducers/charge'


export const onProductLeave = () => {
	store.dispatch(clearProduct());
};

export const onOrderLeave = () => {
	store.dispatch(clearOrder());
};

export const deloadCategoryProducts = () => {
	store.dispatch(deloadProducts());
};

export const deloadOrders = () => {
	store.dispatch(deloadAllOrders());
};

export const deloadSingleCharge = () => {
	store.dispatch(deloadCharge());
}
