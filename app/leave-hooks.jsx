import store from './store';

import { clearProduct } from './reducers/currentProduct';


export const onProductLeave = () => {
	store.dispatch(clearProduct());
};
