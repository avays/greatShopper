import store from './store';

import { clearProduct } from './reducers/currentProduct';
import { deloadProducts} from './reducers/selectedProducts'

export const onProductLeave = () => {
	store.dispatch(clearProduct());
};

export const deloadCategoryProducts = () => {
	store.dispatch(deloadProducts());
};
