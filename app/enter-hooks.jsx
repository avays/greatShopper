import store from './store';
import { fetchAndGoToProduct } from './reducers/currentProduct';
import { fetchAndStoreCategories } from './reducers/categories' 

export const onProductSelect = ({ params }) => {
	store.dispatch(fetchAndGoToProduct(params.sku));
};

export const loadCategories = () => {
	store.dispatch(fetchAndStoreCategories());
};

