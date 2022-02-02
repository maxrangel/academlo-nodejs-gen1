import axios from 'axios';

import { cartActions } from '../slices/cart.slice';

export const fetchCart = () => {
	return async dispatch => {
		try {
			// TODO: FETCH DATA FROM API
			dispatch(cartActions.getCart({ cartProducts: [] }));
		} catch (error) {
			console.log(error);
		}
	};
};
