import axios from 'axios';

import { productsActions } from '../slices/products.slice';

export const fetchProducts = token => {
	return async dispatch => {
		try {
			const response = await axios.get(`/api/v1/products`);

			const { products } = response.data.data;

			console.log(products);

			dispatch(productsActions.getProducts({ products }));
		} catch (error) {
			console.log(error);
		}
	};
};
