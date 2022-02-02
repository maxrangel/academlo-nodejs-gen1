import axios from 'axios';

import { productsActions } from '../slices/products.slice';

export const fetchProducts = () => {
	return async dispatch => {
		try {
			// TODO: FETCH PRODUCTS FROM THE DB
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/products`,
				
			);

			console.log(response);

			dispatch(productsActions.getProducts({ products: [] }));
		} catch (error) {
			console.log(error);
		}
	};
};
