import store from './store';

import { fetchAndGoToProduct } from './reducers/currentProduct';

export const onProductSelect = ({ params }) => {
	store.dispatch(fetchAndGoToProduct(params.sku));
}
// Need to add this as onEnter in React Router

