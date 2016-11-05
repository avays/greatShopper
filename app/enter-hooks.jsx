import store from './store';
import { fetchAndGoToProduct } from './reducers/currentProduct';
import { fetchAndStoreCategories } from './reducers/categories';
import { fetchAndGoToProducts } from './reducers/selectedProducts';

export const onProductSelect = ({ params }) => {
	store.dispatch(fetchAndGoToProduct(params.sku));
};

export const loadCategories = () => {
	store.dispatch(fetchAndStoreCategories());
};

export const loadCategoryProducts = ({ params }) => {
  	store.dispatch(fetchAndGoToProducts(params.categoryName));
}

